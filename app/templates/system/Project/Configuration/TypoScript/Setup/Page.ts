###############################
##  Website Page TypoScript  ##
###############################

# AJAX Request
[globalVar = GP:ajax=1]

# Normal Request
[else]

    page = PAGE
    page {

        # Head Page CSS Styles
        includeCSS {

            # Your own CSS Styles for this Website
            MainCSS = system/<%= websiteProject %>/Resources/Public/CSS/Style.min.css
            Main.disableCompression = 1
            
        }

        # First Footer JavaScripts
        includeJSFooterlibs {

            MainJS = system/<%= websiteProject %>/Resources/Public/JS/Script.min.js
            MainJS.disableCompression = 1
            
        }
        
        
        # Second Footer JavaScripts
        includeJSFooter {
            # Your own JavaScript Library with your functions for the Website
            
            
        }


        # TYPO3 PAGE    
        10 = FLUIDTEMPLATE
        10 {
            
            # Fluid Template Engine
            file.cObject = CASE
            file.cObject { 
            
                key {
                    field           = backend_layout
                    data            = levelfield: -1 , backend_layout_next_level, slide
                    override.data   = TTFSE:page|backend_layout
                }
                # Default fallback page
                default = TEXT
                default.value = {$page.FluidDefaultTemplate}
                
                # Default and main template
                1 < .default
                
                # Footer Partial for all sites
                2 = TEXT
                2.value = {$page.FluidPartialPath}Footer.html
                
            }
            
            # Templates Paths
            partialRootPath = {$page.FluidPartialPath}
            layoutRootPath = {$page.FluidLayoutPath}
            
            
            # Fluid Variables
            variables {
            
                ProjectLogo = TEXT
                ProjectLogo.value = <a class="brand" href="/">{$page.WebsiteName}</a>
                
                ProjectCopyright = TEXT
                ProjectCopyright {
                    value = Copyright © {$page.CompanyName} {date:Y}
                    insertData = 1
                }
                
                # Page Title            
                PageTitle = TEXT
                PageTitle.field = title
                
                # Page Navigation
                MainNavigation =< lib.MainNavigation
                SubNavigationOne =< lib.SubNavigationOne        
                
                # Page Breadcrumb
                Breadcrumb =< lib.Breadcrumb
                
                # Page Content
                Content_0 < styles.content.get
                Content_1 < styles.content.getLeft
                Content_2 < styles.content.getRight
                Content_3 < styles.content.getBorder
                
                # Your own content columns
                Content_5 < styles.content.get
                Content_5.select.where = colPos=5


                Disclaimer = CONTENT
                Disclaimer.table = tt_content
                Disclaimer.select {
                    orderBy = sorting
                    languageField = sys_language_uid
                    where = colPos = 1
                    pidInList = 8
                }

                Privacy = CONTENT
                Privacy.table = tt_content
                Privacy.select {
                    orderBy = sorting
                    languageField = sys_language_uid
                    where = colPos = 2
                    pidInList = 8
                }

            }

        }

    }

[end]