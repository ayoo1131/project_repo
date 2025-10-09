#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

read -p "Enter React app name (ex. react_project_name): "  react_project_name_underscore

cd "$SCRIPT_DIR/../applications" || {
	echo "failed to cd to /applications directory"
	exit 1
}

command -v npm >/dev/null 2>&1 || {
	echo "npm is not installed. Aborting."
	exit 1
}

echo -e "\nCreating React Project!\n"
echo -e "\nWhen prompted for use rolldown-vite (Experimental)? and Install with npm and start now?, Select no"
npm create vite@latest "$react_project_name_underscore" -- --template react
echo -e "\nReact Project: $react_project_name_underscore successfully created!\n"

cd "$react_project_name_underscore"

mkdir frontend backend

mv eslint.config.js index.html package.json public src vite.config.js frontend/

echo -e "\nInstalling Vite locally into project\n"
cd frontend
npm install vite --save-dev
npm run build
echo -e "\nVite Installation Complete!\n"

react_project_name_dash=$(echo "$react_project_name_underscore" | tr '_' '-')

sed -i "/})/i base: '/${react_project_name_dash}'," vite.config.js

echo -e "\nFrontend Directory Build Complete!\n"
cd ..
echo -e "\nPopulating Backend Directory\n"
cd backend
mkdir api utils

cat > __init__.py << EOF
#__init__.py
from flask import Blueprint
import os

${react_project_name_underscore}_blueprint = Blueprint('${react_project_name_underscore}',  __name__, static_folder='../frontend/dist/assets', template_folder='../frontend/dist')

#Import routes after Blueprint is created
from . import routes 
EOF

cat > routes.py << EOF
#routes.py
from flask import send_from_directory, render_template, jsonify, request
from flask_login import current_user, login_required
from . import ${react_project_name_underscore}_blueprint
from my_app import db
import os
from sqlalchemy.exc import SQLAlchemyError

build_dir = '/home/ayoo1131/project_repo/my_app/dashboard/applications/${react_project_name_underscore}/frontend/dist'

@${react_project_name_underscore}_blueprint.route('/${react_project_name_dash}', defaults={'path': ''}, methods=['GET'])
@${react_project_name_underscore}_blueprint.route('/${react_project_name_dash}/<path:path>')
def ${react_project_name_underscore}_home(path):
    if request.method == 'GET':
        file_path = os.path.join(build_dir, path)
        if path and os.path.exists(file_path):
            return send_from_directory(build_dir, path)
        return send_from_directory(build_dir, 'index.html')
EOF
echo -e "\nBackend Directory Build Complete!\n" 

echo -e "\nAdding React App to Shared UI Header Drowdown\n"
cd ..
cd ..
#Remove _ and capitalize each word in react project name
react_project_name_header=$(echo "$react_project_name_underscore" | sed -r 's/(^|_)([a-z])/\U\2/g')

#Add handle function to route application click
handle_function=$'\tconst handle'"$react_project_name_header"' = () => { \n\t\twindow.location.href='\'/$react_project_name_dash\''\n\t};'
#inserts text before target line
awk -v new_line="$handle_function" '
	/^[[:space:]]*return \(/ {
		print new_line
	}
	{ print }
# Overwrite the original file with the modified one
' shared_ui/header/ApplicationDropdown.jsx > temp && mv temp shared_ui/header/ApplicationDropdown.jsx

#Add <a> tag to add React Project to dropdown app
react_project_name_link=$(echo "$react_project_name_header" | sed -E 's/([A-Z])/ \1/g' | sed 's/^ //')
hyperlink_tag=$'\t\t\t\t{userRoleProp==='"'"'dev'"'"'&&\n\t\t\t\t\t<a className="navbar-item gray-background has-text-white" onClick={handle'"$react_project_name_header"'}>'"$react_project_name_link"'</a>\n\t\t\t\t}'

#inserts text after target line
awk -v new_line="$hyperlink_tag" '
	/^[[:space:]]*<div className="navbar-dropdown">/ {
		print
		print new_line
		next
	}
	{ print }
' shared_ui/header/ApplicationDropdown.jsx > temp && mv temp shared_ui/header/ApplicationDropdown.jsx
echo -e "\nReact App Added to Application Dropdown in Shared Header!\n"

echo -e "\nAdding React App to Home Page Dropdown Header\n"
cd ..

#Add <a> tag to add React Project to dropdown app
#<div class="navbar-dropdown">
#react_project_name_header=$(echo "$react_project_name_underscore" | sed -r 's/(^|_)([a-z])/\U\2/g')
#react_project_name_link=$(echo "$react_project_name_header" | sed -E 's/([A-Z])/ \1/g' | sed 's/^ //')

tabs_eight=$'\t\t\t\t\t\t\t\t'
tabs_nine=$'\t\t\t\t\t\t\t\t\t'
tabs_ten=$'\t\t\t\t\t\t\t\t\t\t'

line_one=''"$tabs_eight"'{% if current_user.role=='"'"'dev'"'"'%} '"\n"''
line_two=''"$tabs_nine"'<a href="{{url_for('\'''"$react_project_name_underscore"'.'"$react_project_name_underscore"'_home'\'')}}" class="navbar-item gray-background has-text-white">'"\n"''
line_three=''"$tabs_ten"''"$react_project_name_link"' '"\n"''
line_four=''"$tabs_nine"'</a> '"\n"''
line_five=''"$tabs_eight"'{% endif %}'

hyperlink_tag=$''"$line_one"''"$line_two"''"$line_three"''"$line_four"''"$line_five"''

awk -v new_line="$hyperlink_tag" '
        /^[[:space:]]*<!--Insert Application Dropdown Below-->/ {
		print
		print new_line
		next
	}
	{print}
' templates/dashboard_base.html > temp && mv temp templates/dashboard_base.html
echo -e "\nReact App Added to Home Page Dropdown Header\n"

echo -e "\nAdding Blueprint and Registering for React Project\n"
cd ..
tab_one=$'    '
blueprint_registration=$''"$tab_one"'from my_app.dashboard.applications.'"$react_project_name_underscore"'.backend import '"$react_project_name_underscore"'_blueprint\n'"$tab_one"'app.register_blueprint('"$react_project_name_underscore"'_blueprint)'
awk -v new_line="$blueprint_registration" '
        /^[[:space:]]*#Application Blueprint Route and Register/ {
                print
                print new_line
                next
        }
        {print}
' __init__.py > temp && mv temp __init__.py
echo -e "\nFinished Adding Blueprint and Registering React Project\n"

#Restart the system manager
sudo systemctl restart flaskapp.service

cd dashboard/applications/
echo -e "\nBuilding all React Applications to Reflect Application Dropdown Change\n"
#Loop through all the entries in applications/ that end with a slash(directories)
for dir in */; do
        #Remove trailing slash from directory name
        dirname="${dir%/}"
	
	#Ignore shared_ui directory
        if [[ "$dirname" != "shared_ui" ]]; then
                cd ${dirname}/frontend
                echo -e "\nBuilding Application: $dirname\n"
		npm run build
                cd ..
                cd ..
        fi
done
echo -e "\n$react_project_name_header has been added \n"
echo "$react_project_name_header has been added. Check to verify default React Page is accessable. Press Enter to continue:"
read user_input

#------------------------Remove Default React App, Build Header and Body--------------------------------------------------------
cd $react_project_name_underscore/frontend/

echo -e "\nEditing /frontend/index.html\n"
sed -i "s|<title>.*</title>|<title>$react_project_name_header</title>|" index.html

tabs_two=$'\t\t'
bulma_css="$tabs_two<link rel="stylesheet" href="https://andrewyoo.xyz/static/css/bulma.css">"
global_css="$tabs_two<link rel="stylesheet" href="https://andrewyoo.xyz/static/css/global.css">"
awk -v first="$bulma_css" -v second="$global_css" '
        /^[[:space:]]*<\/head>/ {
                print first
                print second
        }
        { print }
' index.html > temp && mv temp index.html
echo -e "\nCompleted editing /frontend/index.html\n"

echo -e "\nStarting edit of frontend/src/App.jsx\n"
cd src
rm -rf App.jsx
cat << EOF > App.jsx
//App.jsx
import React, { useEffect, useState } from 'react';
import useCheckGuestInactivity from '../../../shared_ui/inactivity_logout/utils/useCheckGuestInactivity.js';
import GuestInactivityWarning from '../../../shared_ui/inactivity_logout/GuestInactivityWarning.jsx';
import Header from '../../../shared_ui/header/Header.jsx';
import Body from './components/Body.jsx';

function App() {
	const [showGuestInactiveWarning, setShowGuestInactiveWarning] = useState(false);
	const [userData, setUserData] = useState(null);

	useCheckGuestInactivity( userData?.is_guest, setShowGuestInactiveWarning);

	useEffect(() => { //Get user information from api
		const fetchUserData = async () => {
			try{
				const response = await fetch('/api/user-info', {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include', // Send cookies with request (important for Flask sessions)
				});
				const result = await response.json();
				if (response.ok){
					setUserData(result);
				}
				else{
					console.error('Server error: ', result.error);
				}
			}
			catch(error){
				console.error('Fetch error: ', error);
			}
		};
		fetchUserData();
	} ,[]);

	return (
		<section className = 'hero is-fullheight background-color-blue'>
			{showGuestInactiveWarning &&  
				<GuestInactivityWarning setShowGuestInactiveWarningCallback={setShowGuestInactiveWarning}/>
			}
			{userData &&
				<Header appName='$react_project_name_header' userRoleProp={userData.role}/> 
			}
			<Body />
		</section>
	)
}

export default App;
EOF
echo -e "\nfrontend/src/App.jsx edit complete!\n"

echo -e "\nRemoving index.css from frontend/src/main.jsx\n"
sed -i "/index.css/d" main.jsx
echo -e "\nRemoved index.css from main.jsx\n"

echo -e "\nCreating src/components/ dir, src/components/utils/ dir, and src/components/Body.jsx file\n"
mkdir components
cd components
mkdir utils

cat << EOF > Body.jsx
//Body.jsx
import React, {useState, useEffect} from 'react';

const Body = () => {

        return (
                <div>
                        <p>Hello</p>
                </div>
        );
};

export default Body;
EOF
echo -e "\nCompleted creating components/ utils/ and Body.jsx\n"

echo -e "\nChange Vite development dependency versions to resolve react/jsx-runtime Header.jsx error \n"
npm install vite@^6.3.5 --save-dev
npm install @vitejs/plugin-react@4.4.1 --save-dev
echo -e "\nVite dependency successsfully changed\n"

npm run build
