<?php
/**
 * TYPO3 Module configuration for the tx_phpmyadmin Extension
 *
 * @author		mehrwert <typo3@mehrwert.de>
 * @package		TYPO3
 * @subpackage	tx_phpmyadmin
 * @license		GPL
 * @version		$Id: conf.php 83449 2014-01-31 22:22:56Z mehrwert $
 */

	// Configuration
$MCONF['name'] = 'tools_txphpmyadmin';
$MCONF['script'] = '_DISPATCH';
$MCONF['access'] = 'admin';
$MCONF['PMA_subdir'] = 'res/phpMyAdmin-4.0.10-all-languages/';
$MCONF['PMA_script'] = 'index.php';
$MLANG['default']['tabs_images']['tab'] = 'thirdparty_db.gif';
$MLANG['default']['ll_ref'] = 'LLL:EXT:phpmyadmin/modsub/locallang_mod.php';

?>