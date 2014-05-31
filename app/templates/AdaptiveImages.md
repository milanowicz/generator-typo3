Adaptive-Images
==============

SourceCode from GitHub.com

[https://github.com/MattWilcox/Adaptive-Images](https://github.com/MattWilcox/Adaptive-Images)
[http://adaptive-images.com/](http://adaptive-images.com/)


Files
-------------------

	~/typo3/adaptive-images.php
	~/typo3/ai-cookie.php
	~/typo3/.htaccess
	    RewriteRule \.(?:jpe?g|gif|png)$ adaptive-images.php


TypoScript
-------------------

Add it to the HTML Page Header

    15 = TEXT
    15.value (
        <script>document.cookie='resolution='+Math.max(screen.width,screen.height)+("devicePixelRatio" in window ? ","+devicePixelRatio : ",1")+'; path=/';</script>
    )


Temp Pictures Directory
-------------------

In dem Verzeichnis legt Adpative Images seine Bilder ab:

    ~/typo3/typo3temp/ai-cache
