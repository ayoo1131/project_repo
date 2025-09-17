#!/bin/bash
#remove_react_app.sh

#Get current path of the current file minus the file name.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

#Get list of all React apps
cd "$SCRIPT_DIR/../applications" || {
        echo "failed to cd to directory"
        exit 1
}

echo "List of all React Apps:"
ls -d */ | grep -v "^shared_ui/"
echo -e "\n"

#Prompt user for name of react app to delete
read -p "Enter name of React app to delete: " react_project_name_underscore

#Check if the react project directory exists with -d test flag
#-d returns true if the specified path exists and is a directory
if [ -d "$react_project_name_underscore" ]; then
	# If directory exists, remove it
	# -r flag: remove directory and contents recursively
	# -f flag: force removal without prompting user confirmation
	rm -rf "$react_project_name_underscore"
else
	echo "React project not found, it may not exist or spelling might be incorrect"
	#exit 1
fi

cd shared_ui/header

#format react_app_name to React App Name
react_project_name_dropdown=$(echo "$react_project_name_underscore" | sed 's/_/ /g; s/\b\(.\)/\u\1/g')

#format react_app_name to React App Name
react_project_name_dash="${react_project_name_underscore//_/-}"

#In the Application Dropdown component, find the React app Title and remove the line
grep -v "$react_project_name_dropdown" ApplicationDropdown.jsx > temp.jsx && mv temp.jsx ApplicationDropdown.jsx

# Remove line containing "/react-app" plus line above and below.
# example output: 12: window.location.href='/react-app'
# -n in grep adds line number to output 
# | pipes output to cut command
# cut is a command to extract sections from each line of text
# -d sets delimiter(character that seperates parts of text) to :
# -f1 stands for field 1, the first part of the delimiter, ex. 12
line_num=$(grep -n "/$react_project_name_dash" ApplicationDropdown.jsx | cut -d: -f1)
sed -i "$((line_num-1)),$((line_num+1))d" ApplicationDropdown.jsx

cd .. #/project_repo/my_app/dashboard/applications/shared_ui
cd .. #/project_repo/my_app/dashboard/applications
cd .. #/project_repo/my_app/dashboard
cd templates

line_num_dashboard_base=$(grep -n "$react_project_name_dropdown" dashboard_base.html | cut -d: -f1)
sed -i "$((line_num_dashboard_base-1)),$((line_num_dashboard_base+1))d" dashboard_base.html

cd .. #/project_repo/my_app/dashboard
cd .. #/project_repo/my_app

blueprint="${react_project_name_underscore}_blueprint"
mapfile -t line_num_my_app_init_array < <(grep -n "$blueprint" __init__.py | cut -d: -f1)
sed -i "$((${line_num_my_app_init_array[0]})),$((${line_num_my_app_init_array[1]}))d" __init__.py

cd dashboard/applications

mapfile -t react_project_directories < <(find . -maxdepth 1 -type d ! -name "shared_ui" ! -name "." -exec basename {} \;)
#echo "${react_project_directories[@]}"

for dir in "${react_project_directories[@]}"; do
	cd $dir/frontend
	npm run build
	cd ..
	cd ..
done

sudo systemctl restart flaskapp.service
