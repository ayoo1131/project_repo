#!/bin/bash

#Create a variable to get absolute path of script file
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

#Prompt user for react app name and read into variable
read -p "Enter React app name: "  react_project_name_underscore

# Move working directory to applications directory
cd "$SCRIPT_DIR/../applications" || {
	echo "failed to cd to /applications directory"
	exit 1
}

#Check if npm is installed
command -v npm >/dev/null 2>&1 || {
  echo "npm is not installed. Aborting."
  exit 1
}

#Create React project with Vite
echo -e "\nCreating React Project!\n"
npm create vite@latest "$react_project_name_underscore" -- --template react
echo -e "\nReact Project: $react_project_name_underscore successfully created!\n"

cd "$react_project_name_underscore"

#Create front and backend directories
mkdir frontend backend

#Move default files to frontend directory
mv eslint.config.js index.html package.json public src vite.config.js frontend/

#------------------Build Frontend Directory-----------------------
#Install Vite locally into React project, add Vite and devDependenct in package.json
echo -e "\nInstalling Vite locally into project\n"
cd frontend
npm install vite --save-dev
npm run build
echo -e "\nVite Installation Complete!\n"

# tr is transform character, used to replace, delete or squeeze input characters from input.
# '|' is pipe operator. Used to pass output of one command as input to another.
react_project_name_dash=$(echo "$react_project_name_underscore" | tr '_' '-')

#stream editor. command tool to process and transform text. used to search, replace, insert, delete, and edit file without opening it.
#sed '/pattern/i new line' file.txt - Inserts before pattern (a inserts after)
#sed -i "/})/i base: '/${react_project_name_dash}'," vite.config.js

echo -e "\nFrontend Directory Build Complete!\n"
cd ..
#-------------------Build Backend Directory-----------------------
echo -e "\nPopulating Backend Directory\n"
cd backend
mkdir api utils

#create __init__.py and write content into it. cat > overwrites or creates file. EOF (end of file) used to specify lines to insert
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

build_dir = '/home/ayoo1131/guitar_note_to_tabs/my_app/dashboard/applications/${react_project_name_underscore}/frontend/dist'

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
hyperlink_tag=$'\t\t\t\t<a className="navbar-item gray-background has-text-white" onClick={handle'"$react_project_name_header"'}>'"$react_project_name_link"'</a>'
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
echo $react_project_name_link
hyperlink_tag=$' '"$tabs_eight"'<a href="{{url_for('\'''"$react_project_name_underscore"'.'"$react_project_name_underscore"'_home'\'')}}" class="navbar-item gray-background has-text-white"> \n '"$tabs_nine""$react_project_name_link"$' \n '"$tabs_eight"'</a> '

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
tab_one=$'\t'
blueprint_registration=$' '"$tab_one"'from my_app.dashboard.applications.'"$react_project_name_underscore"'.backend import '"$react_project_name_underscore"'_blueprint \n '"$tab_one"'app.register_blueprint('"$react_project_name_underscore"'_blueprint)'
awk -v new_line="$blueprint_registration" '
        /^[[:space:]]*#Application Blueprint Route and Register/ {
                print
                print new_line
                next
        }
        {print}
' __init__.py > temp && mv temp __init__.py
echo -e "\nFinished Adding Blueprint and Registering React Project\n"
