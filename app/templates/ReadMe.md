<%= websiteName %>
=======================

That's a TYPO3 Basic Installation Package with a Database Dump to really get started fast. 
It's like an Intruction Package but here are the basic settings in TYPO3 are configure 
and the new project can be versioning by Git in a repository.


*   Software Package Version 0.0.0
*   Recommended TYPO3 CMS Framework Version 6.2


TYPO3 Extension
--------------

*   Flux: Fluid FlexForms v6.0.1
*   VHS: ViewHelpers v1.8.2
*   Fluid Widget v1.1.0
*   Fluid Content Engine v3.1.0
*   Fluid Page Template Engine v2.1.0
*   RealURL v1.12.6
*   Extension Builder v2.5.2
*   Tools for Extbase development v1.3.0 (pt_extbase)
*   PHPUnit v3.7.22
*   phpMyadmin v4.16.0



TYPO3 Project Installation
=======================

Copy or create symlinks from the TYPO3 sourcecode

    <%= websiteDirectory %>/typo3/typo3
    <%= websiteDirectory %>/typo3/index.php

or execute a GruntJS task

    $ grunt bgShell:symlinks
	
Have you access problems with TYPO3, then check this folder

    chmod 777 <%= websiteName %>/typo3/typo3temp/
    chmod 777 <%= websiteName %>/typo3/fileadmin

or GruntJS task

    $ grunt bgShell:setRights


Database Settings
--------------

    <%= websiteName %>/typo3/typo3conf/LocalDevelopment.php

        $GLOBALS['TYPO3_CONF_VARS']['DB']['username'] = '';
        $GLOBALS['TYPO3_CONF_VARS']['DB']['password'] = '';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['database'] = '<%= _.slugify(websiteName) %>';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['host']     = '127.0.0.1';
    
		$GLOBALS['TYPO3_CONF_VARS']["GFX"]['im_path']      = 'C:\\Program Files (x86)\\ImageMagick-6.8.6-Q16\\';
		$GLOBALS['TYPO3_CONF_VARS']["GFX"]['im_path_lzw']  = 'C:\\Program Files (x86)\\ImageMagick-6.8.6-Q16\\';
		$GLOBALS['TYPO3_CONF_VARS']["GFX"]['im_version_5'] = 'im6';
	
	
TypoScript Settings
----------------

    <%= websiteName %>/typo3/system/_shared/Configuration/TypoScript/Setup/LocalDevelopment.ts

        config.no_cache = 1
        page.config.no_cache = 1
        page.headerData.30 >
        <% if (includeModernizr) { %>
        page.includeJS.Modernizr = system/_shared/Resources/Public/JS/modernizr.min.js
        <% } %>
        #plugin.NAME.mvc.callDefaultActionIfActionCantBeResolved = 0


    <%= websiteName %>/typo3/system/<%= websiteProject %>/Configuration/TypoScript/Setup/LocalDevelopment.ts

        page.includeCSS {
	        MainCSS = system/<%= websiteProject %>/Resources/Public/CSS/Style.css
        }
        page.includeJSFooter {
	        MainJS = system/<%= websiteProject %>/Resources/Public/JS/Script.js
        }


Database Sync Script Settings
----------------

At this point you can rename the Database Dump to the Project name and get ready to start.

    <%= websiteName %>/local.sh

        #!/bin/bash
        export Username="User"
        export Password="Pass"
		export Hostname="127.0.0.1"
        # Path to mysql binary
        export PathBin="<Path/to/bin>"
        export DBPath="db"
        # File DB Name at repo
        export DBNames="<%= _.slugify(websiteName) %>"
        # Real MySQL Databasename
        export MySQLDB="DatabaseName"
        # run script
        bash $DBPath/SyncDB.sh $1

    $ bash local.sh sync
	$ grunt sync-db


Apache Vhost Settings
---------------

    $ cp <%= _.slugify(websiteName) %>/typo3/_.htaccess <%= websiteName %>/typo3/.htaccess

    your/apache/vhost.conf

        # <%= websiteName %>
        <VirtualHost *:80>

            DocumentRoot "/path/to/<%= _.slugify(websiteName) %>/typo3"
            ServerName dummy.local

            <Directory /path/to/typo3/<%= _.slugify(websiteName) %>/typo3>
                DirectoryIndex index.php
				Options -Indexes +FollowSymLinks
				AllowOverride FileInfo Indexes
                Order allow,deny
                allow from all
                # Only by local development
                Require all granted
            </Directory>

            ErrorLog "logs/t3fs-error_log"
            CustomLog "logs/t3fs-access_log" common

        </VirtualHost>


Project Handling
=======================


TYPO3 Backend
----------------

    http://<%= _.slugify(websiteDirectory) %>.localhost/typo3

*   Username: admin
*   Password: 12345678


TYPO3 Install Tool
----------------

    http://<%= _.slugify(websiteDirectory) %>.localhost/typo3/install

*   Password: 123456


GruntJS
=======================

Install

    $ npm install -g grunt-cli

TYPO3 install

    $ grunt install

Usage

    $ grunt serve

Build all files

    $ grunt build

Build a Release

    $ grunt

Download content

    $ grunt content



Bower
=======================

Software Packet Managemnt System for the Frontend Software like JavaScript and Styles files.

Install

    $ npm install -g bower

Usage

    $ bower install

    $ bower install <Package Name>

    $ bower search <Package Name>


Composer
=======================

Software Packet Managemnt System to handle the TYPO3 CMS Framework.


Install

    $ curl -sS https://getcomposer.org/installer | php


Usage

    $ composer install
    $ php composer.phar install

    $ composer update
    $ php composer.phar update