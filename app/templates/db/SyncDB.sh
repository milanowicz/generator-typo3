#!/bin/bash
####################################
####################################
##                                ##
##  MySQL Database Sync Script    ##
##                                ##
##  Script Version 0.8.9          ##
##                                ##
####################################
####################################


# Check the MySQL application binary
function GetBashPrompt () {

	# MySQL Kommando ermitteln
	Prompt=
	ls $PathBin""$1> /dev/null 2> /dev/null
	
	# Pruefen ob Kommando vorhanden war
	if [ $? != 0 ]; then
		
		ls $PathBin"/"$1> /dev/null 2> /dev/null
		
		if [ $? != 0 ]; then

            Prompt=`which $1`

            ls $Prompt > /dev/null 2> /dev/null

            if [ $? != 0 ]; then

                # Wenn das Kommando nicht gefunden wird,
                # dann Shell Skript abbrechen
                echo "Don't found the MySQL "$1" binary ! ! !"
                exit 1

            fi

		else
			
			Prompt=$PathBin"/"$1
			
		fi
		
	else
	
		Prompt=$PathBin""$1
		
	fi
	
}


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


# User Daten Tabellen aus der Datei auslesen
UserTableNames=
IgnoreUserDataTable=

ls $DBPath"/"$DBNames"_UserTable" > /dev/null 2> /dev/null
if [ $? == 0 ]; then

    while read Line
    do
        UserTableNames="$UserTableNames $Line"
    done < $DBPath"/"$DBNames"_UserTable"

    # UserTableNames String mit --ignore-table verschachteln
    for Elem in $UserTableNames ; do
        IgnoreUserDataTable="$IgnoreUserDataTable --ignore-table=$MySQLDB.$Elem"
    done

fi


Fehler=0

# Shell Uebergabe Parameter pruefen
if [ $# -eq 0 ]; then

	Fehler=1

	
# SQL Dumps in die MySQL Datenbank einspielen
elif [ "$1" == "sync" ]; then
	
	# MySQLDump Kommando ermitteln
	GetBashPrompt "mysql"
	

	# Pruefen ob Datenbank vorhanden ist ?
	$Prompt -u $Username -p$Password -h $Hostname -e "CREATE DATABASE IF NOT EXISTS \`"$MySQLDB"\`;"


	# Datenbank ReadOnly Tabellen importieren, 
	# falls ReadOnly Tabellen vorhanden sind
	if [ -n "$IgnoreTable" ]; then
		
		ls $DBPath"/"$DBNames"_ReadOnly.sql" > /dev/null 2> /dev/null
		
		if [ $? == 0 ]; then
			echo "Import of readonly table structure . . ."
			# Wenn etwas fehlschaegt, bedeutet es das die Tabelle schon erstellt ist
			$Prompt -u $Username -p$Password -h $Hostname --database=$MySQLDB < $DBPath"/"$DBNames"_ReadOnly.sql"
	
		else
			echo "Error: $DBPath/$Datenbanl_ReadOnly.sql not found !"
	
		fi
	fi


    # Benutzer Daten importieren bei Angabe des Parameters
    if [ "$2" == "user" ]; then

        # Tabellen Struktur vom Benutzer importieren
        ls $DBPath/$DBNames"_UserStructure.sql" > /dev/null 2> /dev/null
        if [ $? == 0 ]; then
            echo "Import of user table structure . . ."
            $Prompt -u $Username -p$Password -h $Hostname --database=$MySQLDB < $DBPath"/"$DBNames"_UserStructure.sql" || exit
        fi

        # Daten vom Benutzer importieren
        ls $DBPath/$DBNames"_UserData.sql" > /dev/null 2> /dev/null
        if [ $? == 0 ]; then
            echo "Import of user data . . ."
            $Prompt -u $Username -p$Password -h $Hostname --database=$MySQLDB < $DBPath"/"$DBNames"_UserData.sql" || exit
        fi
    fi


	# Datenbank Struktur importieren
	ls $DBPath/$DBNames"_Structure.sql" > /dev/null 2> /dev/null
	if [ $? == 0 ]; then
		echo "Import of table structure . . ."
		$Prompt -u $Username -p$Password -h $Hostname --database=$MySQLDB < $DBPath"/"$DBNames"_Structure.sql" || exit

	else
		echo "Error: $DBPath/$DBName_Structure.sql not found !"

	fi


	# Datenbank Daten importieren
	ls $DBPath/$DBNames"_Data.sql" > /dev/null 2> /dev/null
	if [ $? == 0 ]; then
		echo "Import of data . . ."
		$Prompt -u $Username -p$Password -h $Hostname --database=$MySQLDB < $DBPath"/"$DBNames"_Data.sql" || exit

	else
		echo "Error: $DBPath/$DBName_Data.sql not found !"

	fi


# Datenbank in SQL Dumps sichern
elif [ "$1" == "dump" ]; then

	# MySQLDump Kommando ermitteln
	GetBashPrompt "mysqldump"

	
	# Datenbank ReadOnly Tabellen exportieren
	if [ -n "$IgnoreTable" ]; then

		# Sichere die ReadOnly Tabellen Struktur
		# - ohne Daten
		# - ohne Kommentare
		# - Ersetze keine Tabellen die schon vorhanden sind (Wichtig !)
		# - ohne Trigger Tabellen
		# | Entferne die AUTO_INCREMENTs von der ReadOnly Struktur
		echo "Dump of readonly table structure . . ."
		$Prompt -u $Username -p$Password -h $Hostname \
	    	--no-data \
	    	--comments=FALSE \
	    	--add-drop-table=FALSE \
	    	--skip-triggers \
	    	$IgnoreUserDataTable $MySQLDB $ReadTableNames | sed -e 's/ AUTO_INCREMENT=[0-9]*//' > $DBPath"/"$DBNames"_ReadOnly.sql" || exit

	fi


	# Datenbank ReadOnly Tabellen exportieren
	if [ "$2" == "user" ] && [ -n "$IgnoreUserDataTable" ]; then

		# Sichere die ReadOnly Tabellen Struktur von den Benutzer Daten
		# - ohne Daten
		# - ohne Kommentare
		# - Ersetze keine Tabellen die schon vorhanden sind (Wichtig !)
		# - ohne Trigger Tabellen
		# | Entferne die AUTO_INCREMENTs von der ReadOnly Struktur
		echo "Dump of user table structure . . ."
		$Prompt -u $Username -p$Password -h $Hostname \
	    	--no-data \
	    	--comments=FALSE \
	    	--skip-triggers \
	    	$MySQLDB $UserTableNames | sed -e 's/ AUTO_INCREMENT=[0-9]*//' > $DBPath"/"$DBNames"_UserStructure.sql" || exit

        # Sichern der Benutzer Daten von der Datenbank
        # - ohne Tabellen Struktur
        # - ohne Kommentare
        # - Sortiert nach Primary Keys (wegen Git Diffs)
        # - Eine Zeile pro INSERT (wegen Git Diffs)
        # - Komplette INSERT Syntax mit Spaltennamen
        # - Ohne ReadOnly Tabellen
        echo "Dump of user data . . ."
        $Prompt -u $Username -p$Password -h $Hostname \
            --no-create-info \
            --comments=FALSE \
            --order-by-primary \
            --extended-insert=FALSE \
            --complete-insert \
            $IgnoreTable $MySQLDB $UserTableNames > $DBPath"/"$DBNames"_UserData.sql" || exit

	fi


	# Exportieren der Tabellen Struktur fuer die Daten
	# - ohne Daten
	# - ohne Kommentare
	# - ohne Trigger Tabellen
	# - ohne ReadOnly Tabellen sichern
	# | Entferne die AUTO_INCREMENTs von der Struktur
	echo "Dump of table structure . . ."
	$Prompt -u $Username -p$Password -h $Hostname \
	    --no-data \
	    --comments=FALSE \
	    --skip-triggers \
	    $IgnoreTable $IgnoreUserDataTable $MySQLDB | sed -e 's/ AUTO_INCREMENT=[0-9]*//' > $DBPath"/"$DBNames"_Structure.sql" || exit


	# Sichern der Daten von der Datenbank
	# - ohne Tabellen Struktur
	# - ohne Kommentare
	# - Sortiert nach Primary Keys (wegen Git Diffs)
	# - Eine Zeile pro INSERT (wegen Git Diffs)
	# - Komplette INSERT Syntax mit Spaltennamen
	# - Ohne ReadOnly Tabellen	
	echo "Dump of data . . ."
	$Prompt -u $Username -p$Password -h $Hostname \
	    --no-create-info \
	    --comments=FALSE \
	    --order-by-primary \
	    --extended-insert=FALSE \
	    --complete-insert \
	    $IgnoreTable $IgnoreUserDataTable $MySQLDB > $DBPath"/"$DBNames"_Data.sql" || exit


# Komplette Datenbank in SQL Dumps sichern
elif [ "$1" == "dumpfull" ]; then
		
	# MySQLDump Kommando ermitteln
	GetBashPrompt "mysqldump"
		
	# Datenbank ReadOnly Tabellen exportieren
	if [ -n "$IgnoreTable" ]; then

		# Sichere die ReadOnly Tabellen Struktur
		# - ohne Daten
		# - ohne Kommentare
		# - Ersetze keine Tabellen die schon vorhanden sind (Wichtig !)
		# - ohne Trigger Tabellen
		echo "Dump of readonly table structure . . ."
		$Prompt -u $Username -p$Password -h $Hostname \
	    	--no-data \
	    	--comments=FALSE \
	    	--add-drop-table=FALSE \
	    	--skip-triggers \
	    	$MySQLDB $ReadTableNames > $DBPath"/"$DBNames"_Full.sql" || exit

	fi
	

	# Sichern der Daten von der Datenbank	
	# - Sortiert nach Primary Keys (wegen Git Diffs)
	# - Eine Zeile pro INSERT (wegen Git Diffs)
	# - Komplette INSERT Syntax mit Spaltennamen
	# - Ohne ReadOnly Tabellen
	# | Entferne die AUTO_INCREMENTs von der ReadOnly Struktur
	echo "Dump of all data with user data . . ."
	$Prompt -u $Username -p$Password -h $Hostname \
	    --order-by-primary \
	    --extended-insert=FALSE \
	    --complete-insert \
	    $IgnoreTable $MySQLDB | sed -e 's/ AUTO_INCREMENT=[0-9]*//' >> $DBPath"/"$DBNames"_Full.sql" || exit


# Komplette Datenbank in SQL Dumps sichern
elif [ "$1" == "dumpcomplete" ]; then

	# MySQLDump Kommando ermitteln
	GetBashPrompt "mysqldump"


	# Sichern der Daten von der Datenbank
	# - Sortiert nach Primary Keys (wegen Git Diffs)
	echo "Dump complete database with all in it . . ."
	$Prompt -u $Username -p$Password -h $Hostname \
	    --order-by-primary \
	    $MySQLDB > $DBPath"/"$DBNames"_Complete.sql" || exit


# Komplette Datenbank zurueck in die MySQL Datenbank spielen
elif [ "$1" == "full" ]; then

    SqlFileName=""

    if [ "$2" == "sync" ]; then
        SqlFileName="Full"
    elif [ "$2" == "complete" ]; then
        SqlFileName="Complete"
    fi


    if [ "$SqlFileName" == "" ]; then

        Fehler=1

    else

        # MySQLDump Kommando ermitteln
        GetBashPrompt "mysql"

        # Pruefen ob Datenbank vorhanden ist, wenn ja drop and create
        $Prompt -u $Username -p$Password -h $Hostname -e "DROP DATABASE IF EXISTS \`"$MySQLDB"\`;"
        $Prompt -u $Username -p$Password -h $Hostname -e "CREATE DATABASE IF NOT EXISTS \`"$MySQLDB"\`;"


        # Datenbank importieren
        ls $DBPath/$DBNames"_"$SqlFileName".sql" > /dev/null 2> /dev/null
        if [ $? == 0 ]; then
            echo "Import of "$SqlFileName" sql file ..."
            $Prompt -u $Username -p$Password -h $Hostname --database=$MySQLDB < $DBPath"/"$DBNames"_"$SqlFileName".sql" || exit

        else
            echo "Error: $DBPath/$DBName_$SqlFileName.sql not found !"

        fi

	fi

else
	
	# Es wurde nich der richtige Parameter angegeben
	Fehler=1
	
fi


# Hilfe Ausgabe der Skript Parameter
if [ $Fehler -eq 1 ]; then

    echo -e "\n###############################################################################"
    echo -e "#"
    echo -e "#\t\tMySQL synchronisation and dumping BASH shell script"
    echo -e "#"
	echo -e "###############################################################################"
	echo -e "#"
	echo -e "#   Param\t\tDescription"
	echo -e "#"
	echo -e "#------------------------------------------------------------------------------"
	echo -e "#"
	echo -e "#   sync\t\tDatabase sync"
	echo -e "#   sync user\t\tDatabase sync with User Data"
	echo -e "#"
	echo -e "#   dump\t\tDatabase dump"
	echo -e "#   dump user\t\tDatabase dump with User Data"
	echo -e "#"
	echo -e "#------------------------------------------------------------------------------"
	echo -e "#"
	echo -e "#   full sync\t\tInsert SQL Backup file into the Database back"
	echo -e "#   dumpfull\t\tGenerate one file from five files"
	echo -e "#"
	echo -e "#   full complete\tInsert a Complete SQL Backup file into the Database"
	echo -e "#   dumpcomplete\tComplete SQL Database Backup file"
	echo -e "#"
	echo -e "###############################################################################\n"

fi