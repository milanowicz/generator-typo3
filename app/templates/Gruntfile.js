module.exports = function(grunt) {

    "use strict";

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Read local JSON config into Variable
    var setting = '';
    if (grunt.file.exists('local.json')) {
        setting = grunt.file.readJSON('local.json');
    } else {
        setting = false;
    }

    grunt.initConfig({

        pkg : grunt.file.readJSON('package.json'),

        setting : setting,

        banner: '/*!\n' +
            ' * <%%= pkg.name %> - <%%= grunt.template.today("yyyy") %> \n' +
            ' * Version <%%= pkg.version %>\n' +
            ' */\n',

        bgShell: {
            _defaults: {
                stdout: true,
                stderr: true,
                maxBuffer: false
            },
            build: {
                cmd: 'cd typo3/ && php composer.phar install'
            },
            symlinks: {
                cmd: 'cd typo3/ && ln -sf typo3_src/typo3 typo3 && ln -sf typo3_src/index.php index.php'
            },
            setRights: {
                cmd: 'chmod 777 typo3/ && cd typo3/ && chmod -R 777 typo3conf && chmod -R 777 typo3temp && chmod -R 777 uploads && chmod -R 777 fileadmin'
            },
            enableInstall: {
                cmd: 'cd typo3/typo3conf/ && touch ENABLE_INSTALL_TOOL'
            },
            dump: {
                cmd: 'bash local.sh dump'
            },
            dumpuser: {
                cmd: 'bash local.sh dump user'
            },
            sync: {
                cmd: 'bash local.sh sync'
            },
            syncuser: {
                cmd: 'bash local.sh sync user'
            }
        },

        clean: {
            js: [
                'typo3/system/<%= websiteProject %>/Resources/Public/JS/Script.js',<% if (includeModernizr) { %>
                'typo3/system/_shared/Resources/Public/JS/modernizr.js'<% } %>
            ],
            css: [
                'typo3/system/<%= websiteProject %>/Resources/Public/CSS/Style.css'
            ],
            docu: [
                'doc/JavaScript'
            ]
        },

        concat : {
            options: {
                banner: '<%%= banner %>',
                stripBanners: false
            },
            main : {
                src : [
                    '<%= bowerDirectory %>/jquery/dist/jquery.js',<% if (includeJqueryUi) { %>
                    '<%= bowerDirectory %>/jQueryui/ui/jquery-ui.js',
                    '<%= bowerDirectory %>/jqueryui-touch-punch/jquery.ui.touch-punch.js ',<% } if (includeButtons) { %>
                    '<%= bowerDirectory %>/Buttons/js/buttons.js',<% } if (includeFitText) { %>
                    '<%= bowerDirectory %>/RWD-FitText.js/jquery.fittext.js',<% } if (includeBrowserDetection) { %>
                    '<%= bowerDirectory %>/BrowserDetection.js/BrowserDetection.js',<% } if (includeMasonry) { %>
                    '<%= bowerDirectory %>/masonry/dist/masonry.pkgd.js',
                    '<%= bowerDirectory %>/imagesloaded/imagesloaded.pkgd.js',<% } if (includePolyfill) { %>
                    '<%= bowerDirectory %>/respond/dest/respond.src.js',<% } if (includeCreate) { %>
                    '<%= bowerDirectory %>/easeljs/lib/easeljs-0.7.1.combined.js',
                    '<%= bowerDirectory %>/createjs-tweenjs/lib/tweenjs-0.5.1.combined.js',
                    '<%= bowerDirectory %>/createjs-preloadjs/lib/preloadjs-0.4.1.combined.js',
                    '<%= bowerDirectory %>/createjs-soundjs/lib/soundjs-0.5.2.combined.js',<% } if (includeExample) { %>
                    'typo3/system/<%= websiteProject %>/Resources/Private/JavaScript/Main.js',
                    'typo3/system/_shared/Resources/Private/JavaScript/MainTools.js',<% } %>
                    'typo3/system/_shared/Resources/Private/JavaScript/Typo3.js'
                ],
                dest : 'typo3/system/<%= websiteProject %>/Resources/Public/JS/Script.js'
            }
        },

        copy : {
            dev : {
                files : [<% if (includeModernizr) { %>
                    {
                        expand: true,
                        cwd: '<%= bowerDirectory %>/modernizr/',
                        src : 'modernizr.js',
                        dest : 'typo3/system/_shared/Resources/Public/JS/'
                    }<% } if (includeFontAwesome && includeModernizr) { %>,<% } if (includeFontAwesome) { %>{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/font-awesome/fonts/',
                        src : '*',
                        dest : 'typo3/system/_shared/Resources/Public/Fonts/'
                    }<% } %>
                ]
            },
            dist : {
                files : [
                    <% if (includePolyfill) { %>
                    {
                        expand: true,
                        cwd: '<%= bowerDirectory %>/selectivizr/',
                        src : 'selectivizr.js',
                        dest : 'typo3/system/_shared/Resources/Public/JS/'
                    },{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/css3pie/',
                        src : [
                            'PIE.js',
                            'PIE.htc'
                        ],
                        dest : 'typo3/system/_shared/Resources/Public/JS/'
                    },{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/background-size-polyfill/',
                        src : 'backgroundsize.min.htc',
                        dest : 'typo3/system/_shared/Resources/Public/JS/'
                    },{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/box-sizing-polyfill/',
                        src : 'boxsizing.htc',
                        dest : 'typo3/system/_shared/Resources/Public/JS/'
                    },
                    <% } if (includeModernizr) { %>
                    {
                        expand: true,
                        cwd: '<%= bowerDirectory %>/modernizr/',
                        src : 'modernizr.js',
                        dest : 'typo3/system/_shared/Resources/Public/JS/'
                    }<% } if (includeFontAwesome && includeModernizr) { %>,<% } if (includeFontAwesome) { %>{
                        expand: true,
                        cwd: '<%= bowerDirectory %>/font-awesome/fonts/',
                        src : '*',
                        dest : 'typo3/system/_shared/Resources/Public/Fonts/'
                    }<% } %>
                ]
            }
        },

        devUpdate: {
            show: {
                options: {
                    updateType: 'report',
                    reportUpdated: true,
                    packages: {
                        devDependencies: true,
                        dependencies: true
                    },
                    packageJson: null
                }
            },
            install: {
                options: {
                    updateType: 'force',
                    reportUpdated: false,
                    semver: false,
                    packages: {
                        devDependencies: true,
                        dependencies: false
                    },
                    packageJson: null
                }
            }
        },

        jsdoc : {
            dist : {
                src: [
                    'typo3/system/<%= websiteProject %>/Resources/Private/JavaScript/**/*',
                    'typo3/system/_shared/Resources/Private/JavaScript/**/*'
                ],
                options: {
                    destination: 'doc/jsdoc'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: 'typo3/system/_shared/Resources/Private/JavaScript/.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: [
                    'typo3/system/<%= websiteProject %>/Resources/Private/JavaScript/**/*',
                    'typo3/system/_shared/Resources/Private/JavaScript/**/*'
                ]
            }
        },<% if (supportLess) { %>

        less: {
            options: {
                compress: false,
                clancss: false,
                strictMath: true,
                ieCompat: true
            },
            main: {
                files: {
                    'typo3/system/<%= websiteProject %>/Resources/Public/CSS/Style.css': 'typo3/system/<%= websiteProject %>/Resources/Private/Less/PageStyle.less'
                }
            }
        },<% } %>

        markdown: {
            all: {
                options: {
                    markdownOptions: {
                        gfm: true
                    }
                },
                files: [
                    {
                        src: 'README.md',
                        dest: 'doc/ProjectReadMe.html'
                    },{
                        src: 'typo3/fileadmin/README.md',
                        dest: 'doc/FileadminPath.html'
                    },{
                        src: 'typo3/system/README.md',
                        dest: 'doc/SystemPath.html'
                    }<% if (AdaptiveImages == 'Yes') { %>,{
                        src: 'AdaptiveImages.md',
                        dest: 'doc/AdaptiveImages.html'
                    }<% } %>
                ]
            }
        },

        notify: {
            less: {
                options: {
                    title: '<%%= pkg.name %>',
                    message: 'CSS ready'
                }
            },
            js: {
                options: {
                    title: '<%%= pkg.name %>',
                    message: 'JavaScript ready'
                }
            },
            dev: {
                options: {
                    title: '<%%= pkg.name %>',
                    message: 'Grunt has create development environment'
                }
            },
            db: {
                options: {
                title: '<%= pkg.name %>',
                message: 'Database task finish'
                }
            },
            rsync: {
                options: {
                title: '<%= pkg.name %>',
                message: 'rsync task finish'
                }
            },
            all: {
                options: {
                    title: '<%%= pkg.name %>',
                    message: 'Grunt build all for a Release'
                }
            }
        },
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                title: '<%%= pkg.name %>'
            }
        },

        recess: {
            options: {
                compile: false,
                compress: true,
                banner: '<%%= banner %>'
            },
            main: {
                src: [
                    'typo3/system/<%= websiteProject %>/Resources/Public/CSS/Style.css'
                ],
                dest: 'typo3/system/<%= websiteProject %>/Resources/Public/CSS/Style.min.css'
            }
        },

        rsync: {
            options: {
                args: ['--verbose', '--compress'],
                exclude: [
                    '.git*', 'node_modules', '<%= bowerDirectory %>', 'vendor',
                    '*.mov', '*.mp4', '*.mp3', '*.ogg', '*.ogv', '*.webm',
                    '*.zip', '*.tar', '*.bz2', '*.gz', '*.log'
                ],
                recursive: true,
                ssh: true
            },
            content: {
                options: {
                    src: '<%%= setting.prod.user %>@<%%= setting.prod.host %>/files/TYPO3Content.tar',
                    dest: '.',
                    privateKey: '<%%= setting.prod.key %>'
                }
            },
            fileadmin: {
                options: {
                    src: '<%%= setting.prod.user %>@<%%= setting.prod.host %>/html/typo3/fileadmin',
                    dest: 'typo3/fileadmin',
                    privateKey: '<%%= setting.prod.key %>',
                    syncDestIgnoreExcl: true
                }
            },
            uploads: {
                options: {
                    src: '<%%= setting.prod.user %>@<%%= setting.prod.host %>/html/typo3/uploads',
                    dest: 'typo3/uploads',
                    privateKey: '<%%= setting.prod.key %>',
                    syncDestIgnoreExcl: true
                }
            },
            system: {
                options: {
                    src: '/typo3/system',
                    dest: '<%%= setting.stage.user %>@<%%= setting.stage.host %>/html/typo3/system',
                    syncDestIgnoreExcl: true
                }
            }
        },<% if (supportSass) { %>

        sass_imports: {
            options: {
                inlineCSS: true
            },
            main : {
                src: [
                    '<%= bowerDirectory %>/normalize-css/normalize.css'<% if (includeFontAwesome) { %>,
                    '<%= bowerDirectory %>/font-awesome/css/font-awesome.css'<% } if (includeJqueryUi) { %>,
                    '<%= bowerDirectory %>/jQueryui/themes/base/jquery-ui.css'<% } if (includeButtons) { %>,
                    '<%= bowerDirectory %>/Buttons/css/buttons.css'<% } %>
                ],
                dest: 'typo3/system/<%= websiteProject %>/Resources/Private/Sass/ImportLibrary.scss'
            }
        },

        sass : {
            options : {
                style: 'expanded'
            },
            main : {
                files: {
                    'typo3/system/<%= websiteProject %>/Resources/Public/CSS/Style.css': '<%= projectDirectory %>/Sass/PageStyle.scss'
                }
            }
        },<% } %>

        uglify : {
            options : {
                banner : '<%%= banner %>',
                report : 'min'
            },<% if (includeModernizr) { %>
            Modernizr : {
                src : '<%= bowerDirectory %>/modernizr/modernizr.js',
                dest : 'typo3/system/_shared/Resources/Public/JS/modernizr.min.js'
            },<% } %>
            main : {
                src : 'typo3/system/<%= websiteProject %>/Resources/Public/JS/Script.js',
                dest : 'typo3/system/<%= websiteProject %>/Resources/Public/JS/Script.min.js'
            }
        },

        watch : {
            options: {
                livereload: true,
                interval: 1223
            },

            src: {
                files: '<%%= jshint.src.src %>',
                tasks: ['jshint:src', 'clean:js', 'copy:dev', 'concat', 'notify:js']
            },
            less: {
                files: 'typo3/system/<%= websiteProject %>/Resources/Private/Less/**/*.less',
                tasks: ['clean:css', 'less', 'notify:less']
            }
        }

    });

    grunt.task.run('notify_hooks');

    grunt.registerTask('distribute-js', ['concat', 'uglify']);
    grunt.registerTask('distribute-css', ['less', 'recess']);
    grunt.registerTask('distribute-files', ['distribute-css', 'distribute-js']);
	grunt.registerTask('dbdump', ['bgShell:dump']);
	grunt.registerTask('dbdumpuser', ['bgShell:dumpuser']);
    grunt.registerTask('dbsync', ['bgShell:sync']);
    grunt.registerTask('dbsyncuser', ['bgShell:syncuser']);
	grunt.registerTask('sync-dump', ['bgShell:sync', 'bgShell:dump', 'notify:db']);
	grunt.registerTask('sync-dumpuser', ['bgShell:syncuser', 'bgShell:dumpuser', 'notify:db']);

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('doc', ['jsdoc', 'markdown']);


    grunt.registerTask('content', [
        'rsync:fileadmin',
        'rsync:uploads',
        'notify:rsync'
    ]);

    grunt.registerTask('build', [
        'test',
        'clean',
        'distribute-files',
        'copy:dist',
        'doc',
        'notify:all'
    ]);

    grunt.registerTask('install', [
        'bgShell:build',
        'bgShell:symlinks',
        'bgShell:setRights',
        'bgShell:enableInstall',
        'dbsyncuser',
        'notify:dev',
        'default'
    ]);

    grunt.registerTask('serve', [
        'clean:css',
        'less',
        'clean:js',
        'concat',
        'copy:dev',
        'notify:dev',
        'watch'
    ]);

    grunt.registerTask('default', [
        'build',
        'clean',
        'doc',
        'notify:all'
    ]);

};