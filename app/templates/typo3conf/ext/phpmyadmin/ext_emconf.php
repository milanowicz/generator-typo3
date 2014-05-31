<?php

/***************************************************************
 * Extension Manager/Repository config file for ext "phpmyadmin".
 *
 * Auto generated 28-03-2014 22:04
 *
 * Manual updates:
 * Only the data in the array - everything else is removed by next
 * writing. "version" and "dependencies" must not be touched!
 ***************************************************************/

$EM_CONF[$_EXTKEY] = array (
	'title' => 'phpMyAdmin',
	'description' => 'Third party \'phpMyAdmin\' administration module. Access to admin-users only. 4.x releases require PHP 5.2, TYPO3 4.2 and MySQL 5. The 3.x branch is still supported: http://www.mehrwert.de/go/t3x',
	'category' => 'module',
	'shy' => 0,
	'version' => '4.18.1',
	'dependencies' => '',
	'conflicts' => '',
	'priority' => '',
	'loadOrder' => '',
	'module' => 'modsub',
	'state' => 'stable',
	'uploadfolder' => 1,
	'createDirs' => '',
	'modify_tables' => '',
	'clearcacheonload' => 0,
	'lockType' => '',
	'author' => 'Andreas Beutel - mehrwert',
	'author_email' => 'typo3@mehrwert.de',
	'author_company' => 'mehrwert intermediale kommunikation GmbH',
	'CGLcompliance' => NULL,
	'CGLcompliance_note' => NULL,
	'constraints' => 
	array (
		'depends' => 
		array (
			'php' => '5.2.0-0.0.0',
			'typo3' => '4.2.0-6.2.99',
		),
		'conflicts' => 
		array (
		),
		'suggests' => 
		array (
		),
	),
);

?>