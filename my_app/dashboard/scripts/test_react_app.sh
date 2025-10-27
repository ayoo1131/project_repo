#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$SCRIPT_DIR/../applications"

echo "List of all the React Applications:"
ls -d */ | grep -v -E '^(shared_ui|test_.*)/'
mapfile -t react_project_directories < <(ls -d */ | grep -v -E '^(shared_ui|test_.*)/')

read -p "Enter the name of the React app to create a copy of: " react_project_input

user_input_dir="${react_project_input%/}/"

user_input_dir_valid=false

react_project_original=""
react_project_copy=""

for dir in "${react_project_directories[@]}"; do
	if [[ "$dir" == "$user_input_dir" ]]; then
		react_project_original=$react_project_input
		react_project_copy="test_$react_project_original"
		user_input_dir_valid=true
		break
	fi
done

if $user_input_dir_valid; then
	echo "User entered directory is valid"
else
	echo "User directory not found"
	exit 1
fi

mkdir "$react_project_copy" #Create a new directory with format 'test_' + previous React project name. 

cp -r "$react_project_original/frontend" "$react_project_original/backend" "$react_project_copy"

cd $react_project_copy
cd backend/

#Work on __init__.py
replace="${react_project_copy}_blueprint = Blueprint('${react_project_copy}', __name__, static_folder='../frontend/dist/assets', template_folder='../frontend/dist')"

#rename Blueprint
search="${react_project_original}_blueprint"
sed -i "/$search/c\\$replace" __init__.py

#rename backend api routes
file="__init__.py"
pattern="from .api import"

temp_file=$(mktemp)

while IFS= read -r line; do
    if [[ "$line" == *"$pattern"* ]]; then
        read -ra words <<< "$line"
        if [[ ${#words[@]} -ge 4 ]]; then
            words[3]="test_${words[3]}"
        fi
        echo "${words[*]}" >> "$temp_file"
    else
        echo "$line" >> "$temp_file"
    fi
done < "$file"

mv "$temp_file" "$file"

#Work on routes.py
search="${react_project_original}"
replace="${react_project_copy}"
sed -i "s/$search/$replace/g" routes.py #This will find $search and replace just the search string with $replace

react_project_copy_dash="${react_project_copy//_/-}"
react_project_original_dash="${react_project_original//_/-}"
search="${react_project_original_dash}"
replace="${react_project_copy_dash}"
sed -i "s/$search/$replace/g" routes.py

#Work on api/ directory
cd api/

for file in *; do
	if [[ -f "$file" && "$file" != "__init__.py" ]]; then
		api="${file%.py}" #remove .py from filename
		api_copy="test_${api}"

		api_dash="${api//_/-}"
		api_copy_dash="${api_copy//_/-}"

		search="${react_project_original}"
		replace="${react_project_copy}"
		sed -i "s/$search/$replace/g" $file

		search="${api}"
                replace="${api_copy}"
                sed -i "s/$search/$replace/g" $file

		search="${api_dash}"
		replace="${api_copy_dash}"
		sed -i "s/$search/$replace/g" $file

		api_copy_file="${api_copy}.py"
		mv $file $api_copy_file
	fi
done

#Finished with backend
#Work on Frontend
#Work on frontend/index.html

cd ..
cd ..
cd frontend/

react_project_original_title=$(echo "$react_project_original" | tr '_' ' ' | sed -E 's/\b(.)/\u\1/g')
react_project_copy_title=$(echo "$react_project_copy" | tr '_' ' ' | sed -E 's/\b(.)/\u\1/g')

search="${react_project_original_title}"
replace="${react_project_copy_title}"
sed -i "s/$search/$replace/g" index.html

#Work on vite.config.js
react_project_original_dash="${react_project_original//_/-}"
react_project_copy_dash="${react_project_copy//_/-}"
search="${react_project_original_dash}"
replace="${react_project_copy_dash}"
sed -i "s/$search/$replace/g" vite.config.js

#Work on frontend/src/App.jsx
cd src/
search="${react_project_original_title}"
replace="${react_project_copy_title}"
sed -i "s/$search/$replace/g" App.jsx


#Work on applications/shared_ui/header/ApplicationDropdown.js
cd ..
cd ..
cd ..
cd shared_ui/header/

#Add handle function to route application click
react_project_copy_handle_method="handle${react_project_copy_title// /}" #// / removes space in between words
search="Insert handle method here"
tab=$'\t'
insert="${tab}const ${react_project_copy_handle_method} = () => { window.location.href='/${react_project_copy_dash}' };"
sed -i "\|${search}|a\\${insert}" ApplicationDropdown.jsx

search="Insert an application tag here"
tab=$'\t\t\t\t'
insert="${tab}{userRoleProp==='dev' && <a className='navbar-item gray-background has-text-white' onClick={${react_project_copy_handle_method}}>${react_project_copy_title}</a>}"
sed -i "\|${search}|a\\${insert}" ApplicationDropdown.jsx

#Work on project_repo/my_app/dashboard/templates/dashboard_base.html
cd ..
cd ..
cd ..
cd templates

search="Insert Application Dropdown Below"
tab8=$'\t\t\t\t\t\t\t\t'
tab9=$'\t\t\t\t\t\t\t\t\t'

awk -v search="$search" -v tab8="$tab8" -v tab9="$tab9" -v react_project_copy="$react_project_copy" -v react_project_copy_title="$react_project_copy_title" '
$0 ~ search {
	print $0
	print tab8 "{% if current_user.role=='\''dev'\''%}"
	print tab9 "<a href=\"{{url_for('\''" react_project_copy "." react_project_copy "_home'\'')}}\" class=\"navbar-item gray-background has-text-white\">" react_project_copy_title "</a>"
	print tab8 "{% endif %}"
	next
}
{ print }
' dashboard_base.html > temp && mv temp dashboard_base.html

#Work on project_repo/my_app/__init__.py
cd ..
cd ..

search="Application Blueprint Route and Register"
react_project_copy_blueprint="${react_project_copy}_blueprint"
tab='    '

awk \
	-v search="$search" \
	-v tab="$tab" \
	-v react_project_copy_blueprint="$react_project_copy_blueprint" \
	-v react_project_copy="$react_project_copy" '
$0 ~ search {
	print $0
	print tab "from my_app.dashboard.applications."react_project_copy".backend import "react_project_copy_blueprint
	print tab "app.register_blueprint(" react_project_copy_blueprint ")"
	print "" 
	next
}
{ print }
' __init__.py > temp && mv temp __init__.py

cd dashboard/applications/

mapfile -t react_project_directories < <(find . -maxdepth 1 -type d ! -name "shared_ui" ! -name "." -exec basename {} \;)

for dir in "${react_project_directories[@]}"; do
	cd $dir/frontend
	npm run build
	cd ..
	cd ..
done

sudo systemctl restart flaskapp.service

#Add Application to .gitignore file
cd ..
cd ..
cd ..

insert=$"/my_app/dashboard/applications/${react_project_copy}"
echo $insert >> .gitignore
