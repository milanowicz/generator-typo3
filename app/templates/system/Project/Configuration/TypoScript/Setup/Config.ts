# Set default
config.baseURL        = {$config.Protocol}://{$config.wwwURL}

# Set local Development
[globalString = ENV:HTTP_HOST = *{$config.devURL}]
	config.baseURL    = {$config.Protocol}://{$config.devURL}
[end]
# Set Stage system
[globalString = ENV:HTTP_HOST = *{$config.stageURL}]
    config.baseURL    = {$config.Protocol}://{$config.stageURL}
[end]