##############################
##  Main Config TypoScript  ##
##############################

config {

	doctype								= html5
	noPageTitle 						= 2
	xmlprologue 						= none  
	metaCharset 						= utf-8 
	renderCharset 						= utf-8
	xhtml_cleaning 						= all
	disablePrefixComment 				= 0
	spamProtectEmailAddresses 			= 2
	spamProtectEmailAddresses_atSubst 	= (at)
	uniqueLinkVars 						= 1
	disablePrefixComment 				= 1
	inlineStyle2TempFile 				= 1
	removeDefaultJS 					= 1
	tx_realurl_enable 					= 0
	  
	# Language Settings
	sys_language_uid 					= 0
	htmlTag_langKey 					= de
	language 							= de
	locale_all 							= de_DE
	sys_language_mode 					= content_fallback
	sys_language_overlay 				= 1
	#sys_language_overlay 				= hideNonTranslated
	sys_language_softMergeIfNotBlank  	= pages:media
	linkVars 						   := addToList(L)

	##############################################################
	##    Here are options to optimized speed of the Webpage    ##
	##############################################################
	  
	# Compreess CSS + JavaScript files and merge each to one file
	compressCss 						= 0
	concatenateCss    					= 0
	compressJs							= 0
	concatenateJs 						= 0
	  
	# Don't activate this on Production Systems !!!
	no_cache 							= 0
	  
	# TYPO3 Admin Panel
	admPanel 							= 0

}

# Switch doctype by IE 6
[browser = msie6]
    config.doctypeSwitch = 1
[end]