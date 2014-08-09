'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

/**
 * Init TYPO3 Yeoman Generator
 * @type {Typo3generator}
 */
var Typo3Generator = module.exports = function Typo3generator(args, options, config) {

    yeoman.generators.Base.apply(this, arguments);
    this.options = options;
    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

    this.on('end', function () {
        if (!this.options['skip-install']) {
            this.installDependencies({
                skipInstall: this.options['skip-install'],
                callback: function () {
                    if (this.gruntTask === 'gruntRelease') {

                        this.spawnCommand('grunt', ['build'])
                            .on('exit', function () {

                                console.log('\n\n\t\tA new TYPO3 Project is served by Yeoman\n\n');

                            });

                    } else if (this.gruntTask === 'gruntBuild') {

                        this.spawnCommand('grunt', ['install'])
                            .on('exit', function () {

                                if (this.supportVagrant === 'Yes') {

                                    this.spawnCommand('vagrant', ['up'])
                                        .on('exit', function () {

                                            console.log('\n\n\t\tA new TYPO3 Project is served by Yeoman\n\n');
                                            console.log('\thttp://' + this.websiteName + '.localhost:8000/typo3/install/');
                                            console.log('\tPassword: 123456\n');
                                            console.log('\thttp://' + this.websiteName + '.localhost:8000/typo3/');
                                            console.log('\tUsername: admin');
                                            console.log('\tPassword: 12345678\n');
                                            console.log('\tMySQL Server');
                                            console.log('\tUsername: root');
                                            console.log('\tPassword: 123456');
                                            console.log('\tPort: 33060');

                                        }.bind(this));

                                } else {

                                    console.log('\n\n\t\tA new TYPO3 Project is served by Yeoman\n\n');
                                    console.log('\thttp://' + this.websiteName + '.localhost/typo3/install/');
                                    console.log('\tPassword: 123456\n');
                                    console.log('\thttp://' + this.websiteName + '.localhost/typo3/');
                                    console.log('\tUsername: admin');
                                    console.log('\tPassword: 12345678\n\n');
                                    console.log('Example Apache Configuration:\n');
                                    console.log('<VirtualHost *:80>\n\n' +
                                        '\tDocumentRoot "/path/to/' + this.websiteName + '/typo3"\n'+
                                        '\tServerName ' + this.websiteName + '.local\n\n' +
                                        '\t<Directory /path/to/' + this.websiteName + '/typo3>\n' +
                                        '\t\tDirectoryIndex index.php\n' +
                                        '\t\tOptions -Indexes +FollowSymLinks\n' +
                                        '\t\tAllowOverride FileInfo Indexes\n' +
                                        '\t\tOrder allow,deny\n' +
                                        '\t\tallow from all\n' +
                                        '\t\t# Only by local development\n' +
                                        '\t\tRequire all granted\n' +
                                        '\t</Directory>\n\n' +
                                        '\tErrorLog "logs/' + this.websiteName + '-error_log"\n' +
                                        '\tCustomLog "logs/' + this.websiteName + '-access_log" common\n' +
                                        '</VirtualHost>\n');
                                }

                            }.bind(this));

                    } else if (this.gruntTask === 'gruntNothing') {

                        console.log('\n\n\t\tA new TYPO3 Project is served by Yeoman\n\n');

                    }
                }.bind(this)
            });
        }
    });
};

util.inherits(Typo3Generator, yeoman.generators.Base);


/**
 * User Prompt for the installation for the new Project
 */
Typo3Generator.prototype.askFor = function askFor () {

    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);
    this.log(chalk.magenta('Welcome to the TYPO3 Generator!'));

    var prompts = [{
        type: 'input',
        name: 'websiteName',
        message: 'What do you want to call your TYPO3 Website?',
        default: 'My Website'
    },{
        type: 'input',
        name: 'websiteDirectory',
        message: 'What is main Project Directory called?',
        default: 'Website'
    },{
        type: 'input',
        name: 'websiteDescription',
        message: 'What is your description for it?'
    },{
        type: 'input',
        name: 'websiteProject',
        message: 'What name should have your first project directory?',
        default: 'Project'
    },{
        type: 'input',
        name: 'bowerDirectory',
        message: 'Enter your Bower Resource Directory',
        default: 'bower_components'
    },{
        type: 'list',
        name: 'AdaptiveImages - http://adaptive-images.com/',
        message: 'Should Adaptive Images for Responsive Images be install?',
        choices: [{
            name: 'Yes install it.',
            value: 'Yes'
        },{
            name: 'Doen\'t install it!',
            value: 'No'
        }]
    },{
        type: 'checkbox',
        name: 'cssLang',
        message: 'Which CSS extension language should be GruntJS supported?',
        choices: [{
            name: 'LESS - http://lesscss.org/',
            value: 'less',
            checked: true
        },{
            name: 'SASS - http://sass-lang.com/',
            value: 'sass',
            checked: false
        },{
            name: 'Compass - http://compass-style.org/',
            value: 'compass',
            checked: false
        }]
    },{
        type: 'list',
        name: 'jQueryVersion',
        message: 'Which jQuery Version should it be?',
        choices: [{
            name: 'Version 1.11.x',
            value: 'One'
        },{
            name: 'Version 2.1.x',
            value: 'Two'
        }]
    },{
        type: 'checkbox',
        name: 'features',
        message: 'What Software would you like to have for your new project?',
        choices: [{
            name: 'Buttons - http://alexwolfe.github.io/Buttons/',
            value: 'includeButtons',
            checked: false
        },{
            name: 'BrowserDetection.js - https://github.com/Milanowicz/BrowserDetection.js',
            value: 'includeBrowserDetection',
            checked: true
        },{
            name: 'CreateJS Framework - http://www.createjs.com/',
            value: 'includeCreate',
            checked: false
        },{
            name: 'Font Awesome - http://fortawesome.github.io/Font-Awesome/',
            value: 'includeFontAwesome',
            checked: false
        },{
            name: 'FitText.js - https://github.com/Milanowicz/FitText.js',
            value: 'includeFitText',
            checked: true
        },{
            name: 'Include Project description, example libraries, files and pictures',
            value: 'includeExample',
            checked: false
        },{
            name: 'Internet Explorer Polyfill libraries',
            value: 'includePolyfill',
            checked: true
        },{
            name: 'jQuery UserInterface Framework - http://jqueryui.com/',
            value: 'includeJqueryUi',
            checked: false
        },{
            name: 'Masonry and Imagesloaded Plug-In - http://masonry.desandro.com/',
            value: 'includeMasonry',
            checked: false
        },{
            name: 'Modernizr - http://modernizr.com/',
            value: 'includeModernizr',
            checked: true
        }]
    },{
        type: 'input',
        name: 'DbUsername',
        message: 'Your Username from your local database?',
        default: 'root'
    },{
        type: 'input',
        name: 'DbPasswort',
        message: 'What is Passwort for your local database?',
        default: '123456'
    },{
        type: 'input',
        name: 'DbHostname',
        message: 'What is Passwort for your local database?',
        default: '127.0.0.1'
    },{
        type: 'list',
        name: 'DbPath',
        message: 'Where is your MySQL bin path?',
        choices: [{
            name: 'Mac OS X MySQL Binary Path: /Application/xampp/mysql/bin/',
            value: '/Application/xampp/mysql/bin/'
        },{
            name: 'Linux MySQL Binary Path: /usr/local/bin/',
            value: '/usr/local/bin/'
        },{
            name: 'Windows MySQL Binary Path: C:/xampp/mysql/bin/',
            value: 'C:/xampp/mysql/bin/'
        }]
    },{
        type: 'list',
        name: 'gruntTask',
        message: 'What could or should do GruntJS for you do?',
        choices: [{
            name: 'Download TYPO3, create Database and build CSS, JS files',
            value: 'gruntBuild'
        },{
            name: 'Build CSS, JS and Documentation files',
            value: 'gruntRelease'
        },{
            name: 'Do nothing',
            value: 'gruntNothing'
        }]
    },{
        type: 'list',
        name: 'vagrantMachine',
        message: 'Would you like to have a Vagrant VM machine for your project?',
        choices: [{
            name: 'I take it :)',
            value: 'Yes'
        },{
            name: 'Nope',
            value: 'No'
        }]
    }];

    this.prompt(prompts, function (answers) {

        var features = answers.features;
        var cssLang     = answers.cssLang;
        var today = new Date();

        function hasFeature (feat) {
            return features.indexOf(feat) !== -1;
        }
        function hasLang (lang) {
            return cssLang.indexOf(lang) !== -1;
        }

        this.websiteName            = answers.websiteName;
        this.websiteDirectory       = this._.slugify(answers.websiteDirectory);
        this.websiteDescription     = answers.websiteDescription;
        this.websiteProject         = this._.slugify(answers.websiteProject);

        if (answers.bowerDirectory === 'bower_components') {
            this.bowerDirectory     = 'bower_components';
        } else {
            this.bowerDirectory     = this._.slugify(answers.bowerDirectory);
        }

        this.DbUsername             = answers.DbUsername;
        this.DbPasswort             = answers.DbPasswort;
        this.DbHostname             = answers.DbHostname;
        this.DbPath                 = answers.DbPath;

        this.AdaptiveImages         = answers.AdaptiveImages;
        this.jQueryVersion          = answers.jQueryVersion;
        this.gruntTask              = answers.gruntTask;

        this.includeButtons         = hasFeature('includeButtons');
        this.includeBrowserDetection= hasFeature('includeBrowserDetection');
        this.includeCreate          = hasFeature('includeCreate');
        this.includeExample         = hasFeature('includeExample');
        this.includeFontAwesome     = hasFeature('includeFontAwesome');
        this.includeFitText         = hasFeature('includeFitText');
        this.includeJqueryUi        = hasFeature('includeJqueryUi');
        this.includeMasonry         = hasFeature('includeMasonry');
        this.includeModernizr       = hasFeature('includeModernizr');
        this.includePolyfill        = hasFeature('includePolyfill');

        this.supportLess            = hasLang('less');
        this.supportSass            = hasLang('sass');
        this.supportCompass         = hasLang('compass');
        this.supportVagrant         = answers.vagrantMachine;

        this.year                   = today.getFullYear();

        done();
    }.bind(this));
};


/**
 * Generate all project files and directories
 */
Typo3Generator.prototype.app = function app () {

    /**
     * Database Directory
     */
    this.mkdir('db');
    this.copy('db/SyncDb.sh',       'db/SyncDb.sh');
    this.copy('db/_ReadTable',      'db/' + this.websiteDirectory + '_ReadTable');
    this.copy('db/_Data.sql',       'db/' + this.websiteDirectory + '_Data.sql');
    this.copy('db/_ReadOnly.sql',   'db/' + this.websiteDirectory + '_ReadOnly.sql');
    this.copy('db/_Structure.sql',  'db/' + this.websiteDirectory + '_Structure.sql');
    this.copy('denyhtaccess',       'db/.htaccess');


    /**
     * Vagrant files
     */
    if (this.supportVagrant === 'yes') {
        this.template('bootstrap.sh','bootstrap.sh');
        this.template('Vagrantfile', 'Vagrantfile');
    }


    /**
     * TYPO3 Main Project directory
     */
    this.mkdir('typo3');
    this.template('_bower.json',    'bower.json');
    this.template('_bowerrc',       '.bowerrc');
    this.template('_composer.json', 'typo3/composer.json');
    this.template('_package.json',  'package.json');
    this.template('gitignore',      '.gitignore');
    this.template('Gruntfile.js',   'Gruntfile.js');
    this.template('local.sh',       'local.sh');
    this.template('README.md',      'README.md');
    this.copy('composer.phar',      'typo3/composer.phar');
    this.copy('editorconfig',       '.editorconfig');
    this.copy('local.json',         'local.json');
    this.copy('robots.txt',         'typo3/robots.txt');
    this.template('htaccess',       'typo3/_.htaccess');
    this.template('htaccess',       'typo3/.htaccess');

    if (this.AdaptiveImages === 'Yes') {
        this.copy('AdaptiveImages.md',  'AdaptiveImages.md');
        this.copy('adaptive-images.php','typo3/adaptive-images.php');
        this.copy('ai-cookie.php',      'typo3/ai-cookie.php');
    }


    /**
     * TYPO3 Fileadmin Directory
     */
    this.mkdir('typo3/fileadmin');
    this.mkdir('typo3/fileadmin/' + this.websiteProject);
    this.mkdir('typo3/fileadmin/_temp_');
    this.mkdir('typo3/fileadmin/user_upload');
    this.mkdir('typo3/fileadmin/user_upload/_temp_');
    this.mkdir('typo3/fileadmin/user_upload/_temp_/importexport');
    this.copy('fileadmin/README.md',    'typo3/fileadmin/README.md');
    this.copy('dirindex.html',          'typo3/fileadmin/_temp_/index.html');
    this.copy('denyhtaccess',           'typo3/fileadmin/_temp_/.htaccess');
    this.copy('dirindex.html',          'typo3/fileadmin/user_upload/index.html');
    this.copy('dirindex.html',          'typo3/fileadmin/user_upload/_temp_/index.html');
    this.copy('denyhtaccess',           'typo3/fileadmin/user_upload/_temp_/importexport/.htaccess');
    this.copy('dirindex.html',          'typo3/fileadmin/user_upload/_temp_/importexport/index.html');


    /**
     * Development Directories
     *   typo3/system/_shared/
     *   typo3/system/this.websiteProject/
     */
    this.mkdir('typo3/system');
    this.mkdir('typo3/system/' + this.websiteProject);
    this.mkdir('typo3/system/' + this.websiteProject + '/Resources/Private/JavaScript');
    this.mkdir('typo3/system/' + this.websiteProject + '/Resources/Public');
    this.mkdir('typo3/system/' + this.websiteProject + '/Resources/Public/CSS');
    this.mkdir('typo3/system/' + this.websiteProject + '/Resources/Public/Images');
    this.mkdir('typo3/system/' + this.websiteProject + '/Resources/Public/JS');
    this.copy('system/README.md', 'typo3/system/README.md');
    this.directory('system/Project', 'typo3/system/' + this.websiteProject);
    this.template('LocalDevelopment.ts', 'typo3/system/' + this.websiteProject + '/Configuration/TypoScript/Setup/LocalDevelopment.ts');
    this.template('system/Project/Configuration/TypoScript/Constants.ts', 'typo3/system/' + this.websiteProject + '/Configuration/TypoScript/Constants.ts');
    this.template('system/Project/Configuration/TypoScript/Setup.ts', 'typo3/system/' + this.websiteProject + '/Configuration/TypoScript/Setup.ts');
    this.template('system/Project/Configuration/TypoScript/Constants/Config.ts', 'typo3/system/' + this.websiteProject + '/Configuration/TypoScript/Constants/Config.ts');
    this.template('system/Project/Configuration/TypoScript/Constants/Page.ts', 'typo3/system/' + this.websiteProject + '/Configuration/TypoScript/Constants/Page.ts');
    this.template('system/Scripts/Main.js', 'typo3/system/' + this.websiteProject + '/Resources/Private/JavaScript/' + this.websiteProject + '.js');

    if (this.supportLess) {
        this.mkdir('typo3/system/' + this.websiteProject + '/Resources/Private/Less');
        this.template('system/Styles/PageStyle.less', 'typo3/system/' + this.websiteProject + '/Resources/Private/Less/PageStyle.less');
        this.template('system/Styles/MainStyle.less', 'typo3/system/' + this.websiteProject + '/Resources/Private/Less/MainStyle.less');
    }
    if (this.supportSass) {
        this.mkdir('typo3/system/' + this.websiteProject + '/Resources/Private/Sass');
        this.template('system/Styles/PageStyle.scss', 'typo3/system/' + this.websiteProject + '/Resources/Private/Sass/PageStyle.scss');
        this.template('system/Styles/MainStyle.scss', 'typo3/system/' + this.websiteProject + '/Resources/Private/Sass/MainStyle.scss');
    }

    this.copy('denyhtaccess', 'typo3/system/' + this.websiteProject + '/Configuration/.htaccess');
    this.copy('denyhtaccess', 'typo3/system/' + this.websiteProject + '/Resources/Private/.htaccess');


    // _shared Directory
    this.mkdir('typo3/system/_shared');
    this.directory('system/_shared', 'typo3/system/_shared');

    this.template('system/_shared/Configuration/TypoScript/Setup/Page.ts', 'typo3/system/_shared/Configuration/TypoScript/Setup/Page.ts');
    this.template('_LocalDevelopment.ts', 'typo3/system/_shared/Configuration/TypoScript/Setup/LocalDevelopment.ts');

    this.mkdir('typo3/system/_shared/Resources/Public');
    this.mkdir('typo3/system/_shared/Resources/Public/CSS');
    this.mkdir('typo3/system/_shared/Resources/Public/Favicon');
    this.mkdir('typo3/system/_shared/Resources/Public/Flash');
    this.mkdir('typo3/system/_shared/Resources/Public/Fonts');
    this.mkdir('typo3/system/_shared/Resources/Public/Images');
    this.mkdir('typo3/system/_shared/Resources/Public/JS');
    this.mkdir('typo3/system/_shared/Resources/Private/JavaScript');

    this.copy('jshintrc', 'typo3/system/_shared/Resources/Private/JavaScript/.jshintrc');
    this.copy('system/Scripts/_Typo3.js' , 'typo3/system/_shared/Resources/Private/JavaScript/Typo3.js');
    this.copy('system/Scripts/_Main.js' , 'typo3/system/_shared/Resources/Private/JavaScript/Main.js');
    if (this.includeExample) {
        this.copy('system/Scripts/_MainTools.js' , 'typo3/system/_shared/Resources/Private/JavaScript/MainTools.js');
    }

    if (this.supportLess) {
        this.mkdir('typo3/system/_shared/Resources/Private/Less');
        this.template('system/Styles/_PageStyle.less', 'typo3/system/_shared/Resources/Private/Less/PageStyle.less');
    }
    if (this.supportSass) {
        this.mkdir('typo3/system/_shared/Resources/Private/Sass');
        this.template('system/Styles/_PageStyle.scss', 'typo3/system/_shared/Resources/Private/Sass/PageStyle.scss');
    }

    this.copy('denyhtaccess', 'typo3/system/_shared/Configuration/.htaccess');
    this.copy('denyhtaccess', 'typo3/system/_shared/Resources/Private/.htaccess');


    /**
     * TYPO3 Conf Directory
     */
    this.mkdir('typo3/typo3conf');
    this.directory('typo3conf', 'typo3/typo3conf');
    this.template('typo3conf/LocalConfiguration.php', 'typo3/typo3conf/LocalConfiguration.php');
    this.template('LocalDevelopment.php', 'typo3/typo3conf/LocalDevelopment.php');


    /**
     * TYPO3 Temp Directory
     */
    this.mkdir('typo3/typo3temp');
    this.mkdir('typo3/typo3temp/cs');
    this.mkdir('typo3/typo3temp/compressor');
    this.mkdir('typo3/typo3temp/GB');
    this.mkdir('typo3/typo3temp/llxml');
    this.mkdir('typo3/typo3temp/pics');
    this.mkdir('typo3/typo3temp/sprites');
    this.mkdir('typo3/typo3temp/temp');
    if (this.AdaptiveImages === 'Yes') {
        this.mkdir('typo3/typo3temp/ai-cache');
    }
    this.copy('dirindex.html', 'typo3/typo3temp/index.html');


    /**
     * TYPO3 Upload Directory
     */
    this.mkdir('typo3/uploads');
    this.mkdir('typo3/uploads/media');
    this.mkdir('typo3/uploads/pics');
    this.mkdir('typo3/uploads/tf');
    this.copy('dirindex.html', 'typo3/uploads/index.html');
    this.copy('dirindex.html', 'typo3/uploads/media/index.html');
    this.copy('dirindex.html', 'typo3/uploads/pics/index.html');
    this.copy('dirindex.html', 'typo3/uploads/tf/index.html');

};