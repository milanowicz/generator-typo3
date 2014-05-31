lib.MainNavigation = COA
lib.MainNavigation {
	
	10 = HMENU
	10 {
		special = directory
		special.value = 1
		
		1 = TMENU
		1 {
			wrap = <ul class="nav">|</ul>
			
			NO = 1
			NO {
				wrapItemAndSub = <li>|</li>
				stdWrap.htmlSpecialChars = 1
			}
			
			CUR < .NO
			CUR {
				wrapItemAndSub = <li class="active">|</li>
			}
			
		}
	}

}