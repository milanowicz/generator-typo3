<?php

$GLOBALS['TYPO3_CONF_VARS']['DB']['username'] = '<%= DbUsername %>';
$GLOBALS['TYPO3_CONF_VARS']['DB']['password'] = '<%= DbPasswort %>';
$GLOBALS['TYPO3_CONF_VARS']['DB']['database'] = '<%= _.slugify(websiteDirectory) %>';
$GLOBALS['TYPO3_CONF_VARS']['DB']['host']     = '<%= DbHostname %>';

?>