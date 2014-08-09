#!/usr/bin/env bash
#########################
##  Personal Settings  ##
#########################

# Timezone for the system
TimeZone="Europe/Berlin"

# Path to repo db path
DBPath="/var/www/db"

# File DB Name at repo
DBNames="<%= _.slugify(websiteDirectory) %>"

# Real MySQL Databasename
MySQLDB="<%= _.slugify(websiteDirectory) %>"


########################################################################################################################
##                                      Vagrant Bootstrap BASH Shell Script                                           ##
########################################################################################################################

# MySQL Settings
Username="root"
Password="123456"
Hostname="127.0.0.1"
# Path to mysql binary
PathBin="/usr/bin/"

######################
##  Install System  ##
######################

# Set new timezone
rm /etc/timezone
echo $TimeZone > /etc/timezone
dpkg-reconfigure -f noninteractive tzdata

# Set a MySQL Password
debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password password 123456'
debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password_again password 123456'

# Update Packet Management System
apt-get update

# Install software into the system
apt-get install -y apache2 curl mysql-server-5.5 mysql-client php5 openssl graphicsmagick \
                   libapache2-mod-auth-mysql php5-mysql libapache2-mod-php5 php5-xdebug \
                   php5-gd php5-imagick php5-cli php-pear php5-xmlrpc libdbd-mysql php5-common


##########################
##  Webserver Settings  ##
##########################

rm -rf /var/www/
ln -fs /vagrant /var/www

sed -i '/ServerAdmin webmaster@localhost/c ServerAlias *.<%= _.slugify(websiteName) %>.localhost' /etc/apache2/sites-available/default
sed -i '/Options Indexes FollowSymLinks MultiViews/c Options -Indexes +FollowSymLinks' /etc/apache2/sites-available/default
sed -i '/AllowOverride None/c AllowOverride FileInfo Indexes' /etc/apache2/sites-available/default

# XDebug Settings for Remote Debugging
echo '[Xdebug]' >> /etc/php5/apache2/php.ini
echo 'zend_extension="/usr/lib/php5/20090626/xdebug.so"' >> /etc/php5/apache2/php.ini
echo 'xdebug.profiler_output_dir = "/tmp/xdebug"' >> /etc/php5/apache2/php.ini
echo 'xdebug.trace_output_dir = "/tmp/xdebug"' >> /etc/php5/apache2/php.ini
echo 'xdebug.idekey = PHPSTORM' >> /etc/php5/apache2/php.ini
echo 'xdebug.remote_enable = 1' >> /etc/php5/apache2/php.ini
echo 'xdebug.max_nesting_level = 500' >> /etc/php5/apache2/php.ini
echo 'xdebug.remote_port = "9001"' >> /etc/php5/apache2/php.ini
echo 'xdebug.remote_host = 10.0.2.2' >> /etc/php5/apache2/php.ini
echo 'xdebug.remote_connect_back = 1' >> /etc/php5/apache2/php.ini

# Active URL Rewrite
a2enmod rewrite
service apache2 restart


######################
##  MySQL Settings  ##
######################

# Uncomment bind-address to connect from main host on it
sed -i '/bind-address/c #bind-address' /etc/mysql/my.cnf

# Set rights to get access from anywhere
/usr/bin/mysql -u $Username -p$Password -h $Hostname -e "UPDATE mysql.user SET Password = PASSWORD('123456') WHERE User = 'root';"
/usr/bin/mysql -u $Username -p$Password -h $Hostname -e "GRANT ALL ON *.* TO 'root'@'%';"
/usr/bin/mysql -u $Username -p$Password -h $Hostname -e "FLUSH PRIVILEGES;"

# ReadOnly Tabellen aus der Datei auslesen
ReadTableNames=
IgnoreTable=

ls $DBPath"/"$DBNames"_ReadTable" > /dev/null 2> /dev/null
if [ $? == 0 ]; then

    while read Line
    do
        ReadTableNames="$ReadTableNames $Line"
    done < $DBPath"/"$DBNames"_ReadTable"

    # ReadTableNames String mit --ignore-table verschachteln
    for Elem in $ReadTableNames ; do
        IgnoreTable="$IgnoreTable --ignore-table=$MySQLDB.$Elem"
    done

fi



# Pruefen ob Datenbank vorhanden ist ?
/usr/bin/mysql -u $Username -p$Password -h $Hostname -e "CREATE DATABASE IF NOT EXISTS \`"$MySQLDB"\`;"


# Datenbank ReadOnly Tabellen importieren,
# falls ReadOnly Tabellen vorhanden sind
if [ -n "$IgnoreTable" ]; then

	ls $DBPath"/"$DBNames"_ReadOnly.sql" > /dev/null 2> /dev/null

	if [ $? == 0 ]; then
		echo "Import of readonly table structure . . ."
		# Wenn etwas fehlschaegt, bedeutet es das die Tabelle schon erstellt ist
		/usr/bin/mysql -u $Username -p$Password -h $Hostname --database=$MySQLDB < $DBPath"/"$DBNames"_ReadOnly.sql"

	else
		echo "Error: $DBPath/$Datenbanl_ReadOnly.sql not found !"

	fi
fi


# Datenbank Struktur importieren
ls $DBPath/$DBNames"_Structure.sql" > /dev/null 2> /dev/null
if [ $? == 0 ]; then
	echo "Import of table structure . . ."
	/usr/bin/mysql -u $Username -p$Password -h $Hostname --database=$MySQLDB < $DBPath"/"$DBNames"_Structure.sql" || exit

else
	echo "Error: $DBPath/$DBName_Structure.sql not found !"

fi


# Datenbank Daten importieren
ls $DBPath/$DBNames"_Data.sql" > /dev/null 2> /dev/null
if [ $? == 0 ]; then
	echo "Import of data . . ."
	/usr/bin/mysql -u $Username -p$Password -h $Hostname --database=$MySQLDB < $DBPath"/"$DBNames"_Data.sql" || exit

else
	echo "Error: $DBPath/$DBName_Data.sql not found !"

fi


service mysql restart