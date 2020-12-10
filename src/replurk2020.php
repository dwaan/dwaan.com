<!doctype html>
<html class="no-js" lang="en">

<head>
	<?php
		$title = "Plurk 2020";
		include_once "part_metacss.php";
	?>
</head>

<body data-barba="wrapper">
	<?php include_once "part_head.php" ?>

	<main data-barba="container" data-barba-namespace="plurk" class="plurk">
	    <section id="hello" class="grant middle first">
	    	<div class="thumbs"></div>
		    <div class="text">
		    	<p class="loading">Loading your plurk</p>
		    </div>
		    <div class="bgtext"><sup>20</sup><sub>20</sub></div>
		    <div class="arrow-big">
			    <a href="#statistics" class="arrow scrollto">scroll</a>
			</div>
	    </section>

    	<section id="statistics" class="grant middle">
    		<div class="text">
		    	<p class="loading">Loading your plurk</p>
		    </div>
	    </section>

    	<section id="statisticsthisyear" class="grant middle">
    		<div class="text">
		    	<p class="loading">Loading your plurk</p>
		    </div>
	    </section>

		<section class="grant footer">
			<div id="logout" class="logout spring big">
				<svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="5" y="4" width="14" height="24" rx="2" stroke="black" stroke-width="2"/>
					<path d="M29.7071 16.7071C30.0976 16.3166 30.0976 15.6834 29.7071 15.2929L23.3431 8.92893C22.9526 8.53841 22.3195 8.53841 21.9289 8.92893C21.5384 9.31946 21.5384 9.95262 21.9289 10.3431L27.5858 16L21.9289 21.6569C21.5384 22.0474 21.5384 22.6805 21.9289 23.0711C22.3195 23.4616 22.9526 23.4616 23.3431 23.0711L29.7071 16.7071ZM10 17L29 17L29 15L10 15L10 17Z" fill="black"/>
				</svg>
				Logout
			</div>
		</section>

		<!-- Login -->
	    <section id="permission" class="middle first">
		    <div class="text">
			    <form action="" method="GET">
			    	<h1>Replurk<br/><sup>20</sup><sub>20</sub></h1>
			    	<ol>
			    		<li><p>Get your Plurk verification code below <br/><a href="#" id="tokenurl" target="_BLANK">Get Verification Code</a></p></li>
			    		<li>
						    <p>Enter your verification code here:</p>
						    <p class="cuddle">
						    	<input type="text" name="oauth_token" id="oauth_token" placeholder="Code" />
						    	<span id="submit" class="submit">Verify</span>
						    </p>
					    </li>
					    <li>
					    	<p id="login-message">Click the Verify button to verify continue.</p>
					    </li>
					    <li class="small">
					    	<p><strong>IMPORTANT!</strong> Your data will be processed locally in your device. It can take normally up to 5 minutes to download all of your 2020 plurk, please be patient.<p>
					    	<p>Other than session data from Plurk, this website didn't store any of your data in the server.</p>
					    </li>
				   </ol>
			    </form>
		    </div>
		    <div class="bgtext"><sup>20</sup><sub>20</sub></div>
	    </section>

	    <section id="credits" class="middle">
	    	<div class="text">
		    	<p class="loading">1 0f 3. Loading, please wait...</p>
		    	<p class="made">Made with ❤️ in TLV</p>
		    	<p class="like">If you like this web app, you can friend-ed or fan-ed me in <a href="https://plurk.com/dwan" target="_BLANK">Plurk</a> which ever you like. Or even better, send me <a href="https://www.plurk.com/help/en/plurk-coins" target="_BLANK">some coins</a> if you will.</p>
		    	<p class="noaffiliation">This web app doesn't have any affiliation with Plurk HQ. Please feel free to <a href="./say-hi">contact me</a> if there's some copyrighted materials that shouldn't be in this web app.</p>
		    </div>
	    </section>

	    <section id="nojs" class="middle">
	    	<div class="text">
		    	<h3>Javascript</h3>
		    	<p>Hi! you need to enable javascript to run this web app. Thank you.</p>
		    </div>
	    </section>
	</main>

	<?php include_once "part_script.php"; ?>
</body>
</html>