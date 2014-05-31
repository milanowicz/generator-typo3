###############################
##  Clean TYPO3 source code  ##
###############################

lib {

  stdheader {
    stdWrap {      
      dataWrap > 
      prefixComment >
    }
    10.stdWrap.wrap >
  }
  
  parseFunc_RTE.nonTypoTagStdWrap {
    encapsLines {
      addAttributes.P.class >
      innerStdWrap_all.ifEmpty =
    }
  }
}

tt_content {  
  stdWrap.prefixComment >
  text.20.prefixComment >  
  bullets.20.stdWrap.prefixComment >
  table.20.stdWrap.prefixComment >
  stdWrap.dataWrap >
  stdWrap.prepend.dataWrap >
}

# Remove Plug-In CSS StyleSheets 
plugin.tx_felogin_pi1._CSS_DEFAULT_STYLE >
plugin.tx_cssstyledcontent._CSS_DEFAULT_STYLE >

# Delete JavaScripts you didn't include
page.includeJSlibs >
page.jsInline >
page.jsFooterInline >