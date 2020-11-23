<!doctype html><html class="no-js" lang="en"><head> <?php
		$title = "Say hi!";
		include_once "part_metacss.php";
	?> </head><body data-barba="wrapper"> <?php include_once "part_head.php" ?> <main data-barba="container" data-barba-namespace="hi" class="hi"><section class="middle"><div class="main-text"><h1><a href="mailto:me@dwaan.com?subject=Hi%20Dwan" data-barba-prevent class="email"><span><small>My email</small>me</span></a> <a href="https://duckduckgo.com/?q=%40dwaan" data-barba-prevent target="BLANK" class="social"><span><small>My social media</small>@</span><span><small>You're here</small>dwaan</span></a> <a href="#" class="website"><span>.com</span></a></h1></div></section><section class="footer"><div class="location"><span>Jakarta</span> <svg id="airplane" width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M4.79998 1.59998L6.25415 6.93331H2.88019L1.59998 4.79998H1.06665V7.46664V9.06664V11.2H1.59998L2.88019 9.06664H6.25415L4.79998 14.4H5.86665L9.74582 9.06664H13.8666C14.456 9.06664 14.9333 8.58931 14.9333 7.99998C14.9333 7.41064 14.456 6.93331 13.8666 6.93331H9.74582L5.86665 1.59998H4.79998Z"/></svg> <span>Tel Aviv-Yafo</span></div></section><section class="flares"> <?php
				for ($j = 1; $j <= 3; $j++) {
					for ($i = 1; $i <= 5; $i++) {
						if($i % 5 == 0) $class = "green";
						else if($i % 4 == 0) $class = "yellow";
						else if($i % 3 == 0) $class = "purple";
						else if($i % 2 == 0) $class = "red";
						else $class = "blue";
						echo '<img src="img/flares/flare' . $i. '.png" width="" height="" alt="" class="flare' . $j . ' ' . $class . '" />';
					}
				}
			?> </section></main> <?php include_once "part_script.php"; ?> </body></html>