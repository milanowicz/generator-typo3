lib.Breadcrumb = COA
lib.Breadcrumb {

    wrap = <ul class="breadcrumb">|</ul>
    
    10 = TEXT
    10 {
        value = {$page.WebsiteName}
        wrap = <li>| <span class="divider">/</span></li>        
        
        typolink {
            parameter.data = getIndpEnv:TYPO3_SITE_URL            
            title.wrap = {$page.WebsiteName}            
        }
    }

    20 = HMENU
    20 {
        special = rootline
        special.range = 1|-1
        
        1 = TMENU
        1 {
            NO = 1
            NO {
                linkWrap = |*||<span class="divider">/</span>|*||
                wrapItemAndSub = <li>|</li>
                ATagTitle = abstract // description // title                
                stdWrap.htmlSpecialChars = 1
            }
            
            CUR < .NO
            CUR {
                wrapItemAndSub = <li class="active">|</li>
                doNotLinkIt = 1
            }
        }
    }
}