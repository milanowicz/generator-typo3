# <%= websiteName %>

That's a TYPO3 Basic Installation Package with a Database Dump to really get started fast. 
It's like an Intruction Package but here are the basic settings in TYPO3 are configure 
and the new project can be versioning by Git in a repository.


*   Software Package Version 0.0.0
*   Recommended TYPO3 CMS Framework Version 6.2


## TYPO3 Extension

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


## TYPO3 Project Installation

Copy or create symlinks from the TYPO3 sourcecode

    <%= websiteDirectory %>/typo3/typo3
    <%= websiteDirectory %>/typo3/index.php

or execute a GruntJS task.

    $ grunt bgShell:symlinks
	
Have you access problems with TYPO3, then check this folder

    chmod 777 <%= websiteName %>/typo3/typo3temp/
    chmod 777 <%= websiteName %>/typo3/fileadmin

or GruntJS task.

    $ grunt bgShell:setRights

Copy htaccess file

    $ cp <%= _.slugify(websiteName) %>/typo3/_.htaccess <%= websiteName %>/typo3/.htaccess


### Database Settings

    <%= websiteName %>/typo3/typo3conf/LocalDevelopment.php

        <% if (supportVagrant === 'Yes') { %>$GLOBALS['TYPO3_CONF_VARS']['DB']['username'] = '';
        $GLOBALS['TYPO3_CONF_VARS']['DB']['password'] = '';<% } else { %>$GLOBALS['TYPO3_CONF_VARS']['DB']['username'] = 'root';
        $GLOBALS['TYPO3_CONF_VARS']['DB']['password'] = '123456';<% } %>
		$GLOBALS['TYPO3_CONF_VARS']['DB']['database'] = '<%= _.slugify(websiteName) %>';
		$GLOBALS['TYPO3_CONF_VARS']['DB']['host']     = '127.0.0.1';
	
	
### TypoScript Settings

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
        }<% if (supportVagrant === 'Yes') { %>


### Vagrant

Init and config develop environment

    $ vagrant up

Stop VM machine

    $ vagrant halt

Destory develop environment

    $ vagrant destroy


#### Development URLs

MySQL Server

    127.0.0.1:33060

Apache Server

    *.<%= _.slugify(websiteName) %>.localhost:8000<% } else { %>


### Apache Vhost Settings

    your/apache/vhost.conf

        # <%= websiteName %>
        <VirtualHost *:80>

            DocumentRoot "/path/to/<%= _.slugify(websiteName) %>/typo3"
            ServerName <%= _.slugify(websiteName) %>.localhost

            <Directory /path/to/typo3/<%= _.slugify(websiteName) %>/typo3>
                DirectoryIndex index.php
				Options -Indexes +FollowSymLinks
				AllowOverride FileInfo Indexes
                Order allow,deny
                allow from all
                # Only by local development
                Require all granted
            </Directory>

            ErrorLog "logs/<%= _.slugify(websiteName) %>-error.log"
            CustomLog "logs/<%= _.slugify(websiteName) %>-access.log" common

        </VirtualHost><% } %>


## Project Handling


### TYPO3 Backend

    <% if (supportVagrant === 'Yes') { %>http://<%= _.slugify(websiteDirectory) %>.localhost:8000/typo3<% } else [ %>http://<%= _.slugify(websiteDirectory) %>.localhost/typo3<% } %>

*   Username: admin
*   Password: 12345678


### TYPO3 Install Tool

    <% if (supportVagrant === 'Yes') { %>http://<%= _.slugify(websiteDirectory) %>.localhost:8000/typo3/install<% } else [ %>http://<%= _.slugify(websiteDirectory) %>.localhost/typo3/install<% } %>

*   Password: 123456


### Database Sync Script Settings

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
        export MySQLDB="<%= _.slugify(websiteName) %>"
        # run script
        bash $DBPath/SyncDB.sh $1

    $ bash local.sh sync
	$ grunt sync-db


## GruntJS


### Install

    $ npm install -g grunt-cli

### Usage

Generate and watch the files while you develop

    $ grunt serve

TYPO3 install

    $ grunt install

Build all files

    $ grunt build

Build a Release

    $ grunt

Download content

    $ grunt content


## Bower

Software Packet Managemnt System for the Frontend Software like JavaScript and Styles files.


### Install

    $ npm install -g bower

### Usage

    $ bower install

    $ bower install <Package Name>

    $ bower search <Package Name>


## Composer

Software Packet Managemnt System to handle the TYPO3 CMS Framework.


### Install

    $ curl -sS https://getcomposer.org/installer | php


### Usage

    $ composer install
    $ php composer.phar install

    $ composer update
    $ php composer.phar update