<!doctype html>
<html class="no-js" lang="en">

<head>
	<?php
		$title = "Yes";
		include_once "part_metacss.php";
	?>
</head>

<body data-barba="wrapper">
	<?php include_once "part_head.php" ?>

	<div id="barba-wrapper">
		<div class="barba-container" data-barba="container" data-barba-namespace="me">
			<main class="block__clear">
				<div class="me">
					<div id="firstscene">
						<div class="imuiux block__full">
							<div class="block__middle">
								<h1>I'm a UI/UX Designer and Strategist</h1>
								<p>...mostly for website and mobile application. But I like to call myself a web designer. I studied in computer science but decide to follow my dream and becoming <strike>fabulous</strike> web designer.</p>
								<img src="/img/roll-eyes-up.webp" width="" height="" alt="Dwan rolling his eyes up" />
							</div>
						</div>

						<div class="about us block__full">
							<div class="block__middle">
								<h2>me, my partner and <strong>mr. goat</strong> live in tel aviv-yafo</h2>
								<p>I'm one of the few Indonesian who live in Israel, it's very rare indeed. I haven't seen any Indonesian who live in here, yet. So hit me up if you know anyone.</p>
								<img src="/img/roll-eyes-up.webp" width="" height="" alt="Dwan rolling his eyes up" />
							</div>
						</div>

						<div class="know us block__full">
							<div class="block__middle">
								<h2><a href="/say-hi">so send me a message</a></h2>
								<p>if you happened to know any Indonesian living in Tel Aviv-Yafo, <strong>Mr. Goat wants to meet them</strong>. Also if you want to asked something to me.</p>
								<img src="/img/roll-eyes-up.webp" width="" height="" alt="Dwan rolling his eyes up" />
							</div>
						</div>

						<div class="who us block__full">
							<div class="block__middle">
								<h2>and who is this Mr. Goat you asked?</h2>
								<img src="/img/roll-eyes-up.webp" width="" height="" alt="Dwan rolling his eyes up" />
							</div>
						</div>
					</div>

					<div class="mrgoat block__full">
						<div class="mrgate block__full">
							<div class="h2"><h2 class="h21">this is <b>mr. goat</b></h2></div>
							<div class="h2"><h3 class="h22">he's a vietnamese</h3></div>
							<div class="h2"><h3 class="h23">he likes to travel</h3></div>
							<div class="h2"><h4 class="h24">and here's his instagram post to prove</h4></div>
							<div class="h4"><h4>and he have his own instagram account, <a href="https://instagram.com/mrgoatofficial" target="_blank" class="no-barba">click here check out his instagram account</a></h4></div>
							<div class="img">
								<?php for ($x = 1; $x <= 26; $x++) { ?>
								<img class="mrgoat<?php echo $x; ?>" src="/img/mrgoat/mrgoat<?php echo $x; ?>.webp" width="" height="" alt="Mr. Goat" />
								<?php } ?>
							</div>
						</div>
					</div>

					<div class="capabilities block__full">
						<div class="anyway">
							<div class="block block__clear">
								<div class="block__left">
									<h3>anyway...</h3>
									<p>I like to call myself a web designer, UI/UX stuff sounds too sophisticated for some people. I do lots of things in the past, like becoming Flash <strike>R.I.P</strike> Designer and Programmer, Database Programmer, Creative Director, Chief Creative Officer, and Chief Information Officer.</p>
									<p>But right now, I mostly do freelance web design.</p>
									<p>My design philosophy has always been bringing the most important information front and foremost, it's based on a hierarchial concept, where important information needs to be more visible. I also incorporate user-centric design and strive for simplicity while keeping the brand identity prominent as the basis of my design.</p>
								</div>
								<div class="block__right">
									<h4>my skills summary</h4>
									<ul class="plain">
										<li><span>UI/UX Research, Design and Development</span></li>
										<li><span>Concepting and Strategazing Design and Content</span></li>
										<li><span>Directing Design Art Style and Creating Design System</span></li>
										<li><span>Analyzing Business Processes as Part of UI/UX Research</span></li>
										<li><span>Strategazing and Developing Business as Part of previous C-Position</span></li>
									</ul>
								</div>
							</div>
						</div>

						<div class="work__list">
							<h5><small>if you haven’t seen</small> my latest works</h5>
							<ul class="block block__clear flat">
								<li><a href="/tiket-apa-saja"><span><img src="/img/ss-tiketapasaja/tiket-apa-saja.webp" width="" height="" alt="PPATK - E-Learning for Banking Frontliner" /></span><span>Melon - Tiket Apa Saja</span></a></li>
								<li><a href="/ppatk-e-learning-for-bank-frontliner"><span><img src="/img/ss1.webp" width="" height="" alt="PPATK - E-Learning for Banking Frontliner" /></span><span>PPATK - E-Learning for Banking Frontliner</span></a></li>
								<li><a href="/angkasa-pura-services"><span><img src="/img/ss3.webp" width="" height="" alt="Angkasa Pura 1 - Airports of Indonesia" /></span><span>Angkasa Pura 1 - Airports of Indonesia</span></a></li>
								<li><a href="/loket-point-of-sales"><span><img src="/img/ss4.webp" width="" height="" alt="Loket - Point of Sales System" /></span><span>Loket - Point of Sales System</span></a></li>
							</ul>
						</div>
					</div>

					<div class="cofound block__full">
						<div class="block__middle">
							<h3>I’m also one of the owner and cofounder of <a href="http://sagara.id" class="no-barba" target="_blank" rel="noopener noreferrer">Sagara</a></h3>
							<h5>an IT Solutions company based in Jakarta, Indonesia.</h5>
							<hr />
							<h4>but I don't work there anymore</h4>
							<p>as I resigned from my positions few years ago to persue my other personal life goals</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	</div>

<?php include_once "part_script.php"; ?>
</body>
</html>