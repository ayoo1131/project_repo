#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$SCRIPT_DIR/../applications" || {
        echo "failed to cd to directory"
        exit 1
}

echo "List of all React Apps:"
ls -d */ | grep -v "^shared_ui/"
echo -e "\n"

read -p "Enter name of React app to delete: " react_project_name_underscore

if [ -d "$react_project_name_underscore" ]; then
	rm -rf "$react_project_name_underscore"

else
	echo "React project not found, it may not exist or spelling might be incorrect"
	#exit 1
fi

cd shared_ui/header

react_project_name_dropdown=$(echo "$react_project_name_underscore" | sed 's/_/ /g; s/\b\(.\)/\u\1/g')

react_project_name_dash="${react_project_name_underscore//_/-}"

grep -v "$react_project_name_dropdown" ApplicationDropdown.jsx > temp.jsx && mv temp.jsx ApplicationDropdown.jsx

line_num=$(grep -n "/$react_project_name_dash" ApplicationDropdown.jsx | cut -d: -f1)
sed -i "$((line_num-1)),$((line_num+1))d" ApplicationDropdown.jsx

cd ..
cd ..
cd ..
cd templates

line_num_dashboard_base=$(grep -n "$react_project_name_dropdown" dashboard_base.html | cut -d: -f1)
sed -i "$((line_num_dashboard_base-1)),$((line_num_dashboard_base+1))d" dashboard_base.html

cd ..
cd .. 

blueprint="${react_project_name_underscore}_blueprint"
mapfile -t line_num_my_app_init_array < <(grep -n "$blueprint" __init__.py | cut -d: -f1)
sed -i "$((${line_num_my_app_init_array[0]})),$((${line_num_my_app_init_array[1]}))d" __init__.py

cd dashboard/applications

mapfile -t react_project_directories < <(find . -maxdepth 1 -type d ! -name "shared_ui" ! -name "." -exec basename {} \;)

for dir in "${react_project_directories[@]}"; do
	cd $dir/frontend
	npm run build
	cd ..
	cd ..
done

sudo systemctl restart flaskapp.service
