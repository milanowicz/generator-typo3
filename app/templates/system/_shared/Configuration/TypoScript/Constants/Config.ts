# Check if request over http or https
[globalString = IENV:TYPO3_SSL=1]
	config.Protocol 		= https
[else]
	config.Protocol 		= http
[end]