############################
##  Main Page TypoScript  ##
############################

# AJAX Request
[globalVar = GP:ajax=1]

    page = PAGE
    page {
        typeNum = 1
        config {

           disableAllHeaderCode = 1
           additionalHeaders = Content-type:application/json
           xhtml_cleaning = 0
           
        }

    }

# Normal Request
[else]

    page = PAGE
    page {
    
        # Default Page
        typeNum = 0    
        
        
        # HTML 5 Tag with special options
        config {
            admPanel = 0
            no_cache = 0
            metaCharset = utf-8
            additionalHeaders = Content-Type:text/html;charset=utf-8
            htmlTag_stdWrap {
                cObject  = TEXT
                cObject.value (
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
                )  
            }
        }
        

        # Meta Head informations
        meta {
            
            robots              = index,follow
            viewport            = width=device-width, initial-scale=1.0
            X-UA-Compatible     = IE=edge,chrome=1
            X-UA-Compatible.httpEquivalent = 1
            
            
            description {
                data = TSFE:page|description
                ifEmpty.data = My poor standard description
            }
            
            keywords {
                data = TSFE:page|keywords
                keywords = 1
                ifEmpty.data = My poor standard keywords
            }
            
            
            title.data = page:tx_seo_titletag
            title.stdWrap.stdWrap.append = TEXT
            title.stdWrap.stdWrap.append.data = TSFE:tmpl|sitetitle
            title.stdWrap.stdWrap.append.trim = 1
            title.stdWrap.stdWrap.append.required = 1
            title.stdWrap.stdWrap.append.if.isTrue = 1
            title.stdWrap.stdWrap.append.noTrimWrap = | - ||
     
     
            date.data = page:SYS_LASTCHANGED
            date.date = Y-m-d
            
        }
        
        
        headerData {
            
            # Website Page Title
            5 = TEXT
            5 {
                field = title
                wrap = <title><%= websiteName %>&nbsp;|</title>
            }

            # Favicon
            10 = TEXT
            10.value (
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/system/_shared/Resources/Public/Favicon/apple-touch-icon-114x114-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="/system/_shared/Resources/Public/Favicon/apple-touch-icon-72x72-precomposed.png">
<link rel="apple-touch-icon-precomposed" href="/system/_shared/Resources/Public/Favicon/apple-touch-icon-57x57-precomposed.png">
<link rel="shortcut icon" sizes="196x196" href="/system/_shared/Resources/Public/Favicon/touch-icon-196x196.png">
<link rel="shortcut icon" href="/system/_shared/Resources/Public/Favicon/apple-touch-icon.png">

<meta name="msapplication-TileImage" content="/system/_shared/Resources/Public/Favicon/apple-touch-icon-144x144-precomposed.png">
<meta name="msapplication-TileColor" content="#FFFFFF">
<link rel="shortcut icon" href="/system/_shared/Resources/Public/Favicon/favicon.ico">
            )

            <% if (includePolyfill) { %>
            # PIE for Internet Explorer 6, 7, 8, 9
            20 = TEXT
            20.value (

<!--[if (gte IE 6)&(lte IE 9)]>
<script type="text/javascript" src="system/_shared/Resources/Public/JS/PIE.min.js"></script>
<![endif]-->

            )
            <% } %>

            # Google Analytics
            #30 = TEXT
            #30.value (
            #)
            
        }
        

        # Header JavaScripts
        includeJS {
            
            # Modernizr JavaScript
            Modernizr = system/_shared/Resources/Public/JS/modernizr.min.js
            Modernizr.disableCompression = 1
            
        }    


        # Second Footer JavaScripts
        includeJSFooter {
            # Your own JavaScript Library with your functions for all websites
            
            
        }

    }

[end]