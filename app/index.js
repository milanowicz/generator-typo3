'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var Typo3Generator = yeoman.generators.Base.extend({

    init: function () {
        this.pkg = require('../package.json');

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
                                    console.log('\n\n\t\tA new TYPO3 Project is served by Yeoman\n\n');
                                    console.log('\tPassword: 123456');
                                    console.log('\thttp://' + this.websiteName + '.localhost/typo3/install/\n');
                                    console.log('\tUsername: admin');
                                    console.log('\tPassword: 12345678');
                                    console.log('\thttp://' + this.websiteName + '.localhost/typo3/\n\n');
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
                                }.bind(this));
                        } else if (this.gruntTask === 'gruntNothing') {
                            console.log('\n\n\t\tA new TYPO3 Project is served by Yeoman\n\n');
                        }
                    }.bind(this)
                });
            }
        });
    },

    askFor: function () {
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
            name: 'AdaptiveImages',
            message: 'Should Adaptive Images for Responsive Images be install?',
            choices: [{
                name: 'Yes install it.',
                value: 'Yes'
            },{
                name: 'No install it!',
                value: 'No'
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
                name: 'CreateJS Framework',
                value: 'includeCreate',
                checked: false
            },{
                name: 'Include Project description, example libraries, files and pictures',
                value: 'includeExample',
                checked: true
            },{
                name: 'Internet Explorer Polyfill libraries',
                value: 'includePolyfill',
                checked: false
            },{
                name: 'jQuery Plug-Ins - Backstretch and Buttons',
                value: 'includeJqueryPlugins',
                checked: false
            },{
                name: 'jQuery UserInterface Framework',
                value: 'includeJqueryUi',
                checked: false
            },{
                name: 'Masonry and Imagesloaded Plug-In',
                value: 'includeMasonry',
                checked: true
            },{
                name: 'Modernizr',
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
            type: 'input',
            name: 'DbPath',
            message: 'Where is your MySQL bin path?',
            default: '/usr/local/bin'
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
        }];

        this.prompt(prompts, function (answers) {

            var features = answers.features;
            var today = new Date();

            function hasFeature (feat) {
                return features.indexOf(feat) !== -1;
            }

            this.websiteName            = answers.websiteName;
            this.websiteDirectory       = this._.slugify(answers.websiteDirectory);
            this.websiteDescription     = answers.websiteDescription;
            this.websiteProject         = this._.slugify(answers.websiteProject);
            this.bowerDirectory         = this._.slugify(answers.bowerDirectory);

            this.DbUsername             = answers.DbUsername;
            this.DbPasswort             = answers.DbPasswort;
            this.DbHostname             = answers.DbHostname;
            this.DbPath                 = answers.DbPath;

            this.AdaptiveImages         = answers.AdaptiveImages;
            this.jQueryVersion          = answers.jQueryVersion;

            this.includeExample         = hasFeature('includeExample');
            this.includeJqueryUi        = hasFeature('includeJqueryUi');
            this.includeJqueryPlugins   = hasFeature('includeJqueryPlugins');
            this.includeMasonry         = hasFeature('includeMasonry');
            this.includeModernizr       = hasFeature('includeModernizr');
            this.includeCreate          = hasFeature('includeCreate');
            this.includePolyfill        = hasFeature('includePolyfill');

            this.gruntTask              = answers.gruntTask;

            this.year                   = today.getFullYear();

            done();
        }.bind(this));
    },

    app: function () {

        this.mkdir('typo3');

        this.template('_bower.json',    'bower.json');
        this.template('_bowerrc',       '.bowerrc');
        this.template('_composer.json', 'typo3/composer.json');
        this.template('_package.json',  'package.json');
        this.template('Gruntfile.js',   'Gruntfile.js');
        this.template('local.sh',       'local.sh');
        this.template('README.md',      'README.md');
        this.copy('composer.phar',      'typo3/composer.phar');
        this.copy('editorconfig',       '.editorconfig');
        this.copy('gitignore',          '.gitignore');
        this.copy('local.json',         'local.json');


        this.mkdir('db');
        this.copy('db/SyncDb.sh',       'db/SyncDb.sh');
        this.copy('db/_ReadTable',      'db/' + this.websiteDirectory + '_ReadTable');
        this.copy('db/_Data.sql',       'db/' + this.websiteDirectory + '_Data.sql');
        this.copy('db/_ReadOnly.sql',   'db/' + this.websiteDirectory + '_ReadOnly.sql');
        this.copy('db/_Structure.sql',  'db/' + this.websiteDirectory + '_Structure.sql');
        this.copy('denyhtaccess',       'db/.htaccess');


        this.copy('robots.txt',         'typo3/robots.txt');
        this.copy('htaccess',           'typo3/_.htaccess');
        this.copy('htaccess',           'typo3/.htaccess');

        if (this.AdaptiveImages === 'Yes') {
            this.copy('AdaptiveImages.md',  'AdaptiveImages.md');
            this.copy('adaptive-images.php','typo3/adaptive-images.php');
            this.copy('ai-cookie.php',      'typo3/ai-cookie.php');
        }


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


        this.mkdir('typo3/system');
        this.mkdir('typo3/system/_shared');
        this.mkdir('typo3/system/' + this.websiteProject);
        this.directory('system/_shared', 'typo3/system/_shared');
        this.directory('system/Project', 'typo3/system/' + this.websiteProject);
        this.template('LocalDevelopment.ts', 'typo3/system/' + this.websiteProject + '/Configuration/TypoScript/Setup/LocalDevelopment.ts');
        this.template('system/Project/Configuration/TypoScript/Constants.ts', 'typo3/system/' + this.websiteProject + '/Configuration/TypoScript/Constants.ts');
        this.template('system/Project/Configuration/TypoScript/Setup.ts', 'typo3/system/' + this.websiteProject + '/Configuration/TypoScript/Setup.ts');
        this.template('system/Project/Configuration/TypoScript/Constants/Config.ts', 'typo3/system/' + this.websiteProject + '/Configuration/TypoScript/Constants/Config.ts');
        this.template('system/Project/Configuration/TypoScript/Constants/Page.ts', 'typo3/system/' + this.websiteProject + '/Configuration/TypoScript/Constants/Page.ts');
        this.template('system/Project/Configuration/TypoScript/Setup/Page.ts', 'typo3/system/' + this.websiteProject + '/Configuration/TypoScript/Setup/Page.ts');
        this.copy('system/README.md', 'typo3/system/README.md');
        this.copy('jshintrc', 'typo3/system/_shared/Resources/Private/JavaScript/.jshintrc');

        this.mkdir('typo3/system/_shared/Configuration/');
        this.mkdir('typo3/system/_shared/Configuration/TypoScript');
        this.mkdir('typo3/system/_shared/Configuration/TypoScript/Setup');
        this.mkdir('typo3/system/_shared/Configuration/TypoScript/Constants');
        this.mkdir('typo3/system/_shared/Resources/Public');
        this.mkdir('typo3/system/_shared/Resources/Public/CSS');
        this.mkdir('typo3/system/_shared/Resources/Public/Favicon');
        this.mkdir('typo3/system/_shared/Resources/Public/Flash');
        this.mkdir('typo3/system/_shared/Resources/Public/Fonts');
        this.mkdir('typo3/system/_shared/Resources/Public/Images');
        this.mkdir('typo3/system/_shared/Resources/Public/JS');
        this.mkdir('typo3/system/' + this.websiteProject + '/Resources/Public');
        this.mkdir('typo3/system/' + this.websiteProject + '/Resources/Public/CSS');
        this.mkdir('typo3/system/' + this.websiteProject + '/Resources/Public/Images');
        this.mkdir('typo3/system/' + this.websiteProject + '/Resources/Public/JS');

        this.template('_LocalDevelopment.ts', 'typo3/system/_shared/Configuration/TypoScript/Setup/LocalDevelopment.ts');
        this.copy('denyhtaccess', 'typo3/system/_shared/Configuration/.htaccess');
        this.copy('denyhtaccess', 'typo3/system/_shared/Resources/Private/.htaccess');
        this.copy('denyhtaccess', 'typo3/system/' + this.websiteProject + '/Configuration/.htaccess');
        this.copy('denyhtaccess', 'typo3/system/' + this.websiteProject + '/Resources/Private/.htaccess');


        this.mkdir('typo3/typo3conf');
        this.directory('typo3conf', 'typo3/typo3conf');
        this.template('typo3conf/LocalConfiguration.php', 'typo3/typo3conf/LocalConfiguration.php');
        this.template('LocalDevelopment.php', 'typo3/typo3conf/LocalDevelopment.php');


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


        this.mkdir('typo3/uploads');
        this.mkdir('typo3/uploads/media');
        this.mkdir('typo3/uploads/pics');
        this.mkdir('typo3/uploads/tf');
        this.copy('dirindex.html', 'typo3/uploads/index.html');
        this.copy('dirindex.html', 'typo3/uploads/media/index.html');
        this.copy('dirindex.html', 'typo3/uploads/pics/index.html');
        this.copy('dirindex.html', 'typo3/uploads/tf/index.html');

    }

});

module.exports = Typo3Generator;