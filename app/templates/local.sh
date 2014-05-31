#!/bin/bash
export Username="<%= DbUsername %>"
export Password="<%= DbPasswort %>"
export Hostname="<%= DbHostname %>"
# Path to mysql binary
export PathBin="<%= DbPath %>"
export DBPath="db"
# File DB Name at repo
export DBNames="<%= _.slugify(websiteDirectory) %>"
# Real MySQL Databasename
export MySQLDB="<%= _.slugify(websiteDirectory) %>"
# run script
bash $DBPath/SyncDB.sh $1 $2
