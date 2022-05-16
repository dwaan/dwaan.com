<!doctype html>
<html class="no-js" lang="en">

<head>
	<?php
		$title = "About Me";
		$description = "Learn more about me and Mr. Goat";
		include_once "part_metacss.php";
	?>
</head>

<body data-barba="wrapper">
	<?php include_once "part_head.php" ?>

	<main data-barba="container" data-barba-namespace="me" class="me">
		<section id="about" class="about middle">
			<div class="main-text">
				<h1>Hello, my name is <strong>Dwan</strong></h1>
			</div>
			<div class="arrow-big">
				<a href="#usedto" class="arrow scrollto">
					<span>scroll down</span>
				</a>
			</div>
		</section>

		<section id="usedto" class="intro middle">
			<div class="anim middle">
				<div class="text">
					<h2>I'm a UI/UX <br/> Designer and <br/> Strategist</h2>
					<p>a.k.a. Web Designer in Steroid</p>
				</div>
			</div>
			<div class="arrow-big">
				<a href="#now" class="arrow scrollto">
					<span>and now</span>
				</a>
			</div>
		</section>

		<section id="now" class="intro middle">
			<div class="text">
				<span>1 <hr/> 3</span>
				<h3>Now I'm <br/> <strong>a Freelancer</strong> <br/> in Tel Aviv</h3>
				<p>doing mostly interface design consultation and various hobbist <a href="https://github.com/dwaan" data-barba-prevent target="BLANK" rel='noopener noreferrer'>open source projects</a></p>
			</div>
			<div class="thumbs">
				<picture>
					<img src="/dwaan/img/notpictured-dark.webp" class="dark" width="" height="" alt="Dwan" />
					<img src="/dwaan/img/notpictured.webp" class="light" width="" height="" alt="Dwan" />
				</picture>
			</div>
			<div class="arrow-big">
				<a href="#webdesigner" class="arrow scrollto">
					<span>before</span>
				</a>
			</div>
		</section>

		<section id="webdesigner" class="intro middle">
			<div class="text">
				<span>2 <hr/> 3</span>
				<h3>&amp; <br/> Before <br/> <strong>Web Designer</strong></h3>
				<p>I did many of things in the past, like becoming Macromedia Flash Expert, Database Programmer, Creative Director, Chief Creative Officer, and Chief Information Officer among others.</p>
				<p><em>- Not pictured</em></p>
			</div>
			<div class="thumbs">
				<picture>
					<img src="/dwaan/img/notpictured-dark.webp" class="dark" width="" height="" alt="Dwan" />
					<img src="/dwaan/img/notpictured.webp" class="light" width="" height="" alt="Dwan" />
				</picture>
			</div>
			<div class="arrow-big">
				<a href="#sayhi" class="arrow scrollto">
					<span>would you?</span>
				</a>
			</div>
		</section>

		<section id="sayhi" class="intro middle">
			<div class="text">
				<div class="title">
					<span>3 <hr/> 3</span>
					<h3>Would <br/> You <br/> Like To <br/> <strong>Say Hi!</strong>?</h3>
				</div>
				<p>I happen to live in in Tel Aviv-Yafo right now. If you happened to know any Indonesian living in Tel Aviv-Yafo, Mr. Goat wants to meet them. Other then that, if you wanted to work with me feel free to <a href="./say-hi" class="spring big">say hi</a>.</p>
			</div>
			<div class="arrow-big">
				<a href="#startmrgoat" class="arrow scrollto">
					<span>mr. goat?</span>
				</a>
			</div>
		</section>

		<section id="startmrgoat" class="mrgoat middle hidden"></section>
		<section class="mrgoat middle hidden"></section>
		<section class="mrgoat middle hidden"></section>
		<section class="mrgoat middle hidden"></section>
		<section class="mrgoat middle hidden"></section>
		<section id="mrgoat" class="mrgoat middle">
			<div class="text">
				<div class="h2"><h2>This is <b>Mr. Goat</b></h2></div>
			</div>
			<div class="thumbs">
				<?php for ($x = 1; $x <= 26; $x++) { ?>
				<img class="mrgoat<?php echo $x; ?>" src="/dwaan/img/mrgoat/mrgoat<?php echo $x; ?>.webp" width="" height="" alt="Mr. Goat" />
				<?php } ?>
			</div>
			<div class="text textoverlay">
				<div id="viet" class="float"><span class="dot"><hr /><i></i></span><span class="line"><hr /></span><p>He's a vietnamese</p></div>
				<div id="nyc" class="float"><span class="dot"><hr /><i></i></span><span class="line"><hr /></span><p>He got this neckles in NYC</p></div>
				<div id="food" class="float"><span class="dot"><hr /><i></i></span><span class="line"><hr /></span><p>He likes to eat fancy food</p></div>
				<div id="travel" class="float"><span class="dot"><hr /><i></i></span><span class="line"><hr /></span><p>He travel all over the world</p></div>
				<div id="post" class="float">
					<a href="https://www.instagram.com/mrgoatofficial/" data-barba-prevent target="BLANK" rel='noopener noreferrer'>
						<svg width="29" height="48" id="phone" viewBox="0 0 29 48" fill="black" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M28.3636 4.36364C28.3636 1.95367 26.41 0 24 0H4.36364C1.95367 0 0 1.95366 0 4.36363V43.6364C0 46.0463 1.95367 48 4.36364 48H24C26.41 48 28.3636 46.0463 28.3636 43.6364L28.3636 4.36364ZM7.091 3.27271C4.98228 3.27271 3.27282 4.98216 3.27282 7.09089V13.6363C3.27282 15.7451 4.98228 17.4545 7.091 17.4545C9.19973 17.4545 10.9092 15.7451 10.9092 13.6363V7.09089C10.9092 4.98216 9.19973 3.27271 7.091 3.27271ZM9.27282 7.63641C9.27282 8.84139 8.29598 9.81823 7.091 9.81823C5.88601 9.81823 4.90918 8.84139 4.90918 7.63641C4.90918 6.43142 5.88601 5.45459 7.091 5.45459C8.29598 5.45459 9.27282 6.43142 9.27282 7.63641ZM7.09144 15.2727C7.99518 15.2727 8.72781 14.5401 8.72781 13.6364C8.72781 12.7326 7.99518 12 7.09144 12C6.1877 12 5.45508 12.7326 5.45508 13.6364C5.45508 14.5401 6.1877 15.2727 7.09144 15.2727Z"/>
						</svg>
					</a>
					<a href="https://www.instagram.com/mrgoatofficial/" data-barba-prevent target="BLANK" rel='noopener noreferrer'>you can check his instagram here</a>
				</div>
			</div>
		</section>
		<section id="endmrgoat" class="mrgoat middle hidden"></section>

		<section id="cofound" class="cofound middle clip">
			<div class="text">
				<h2>and <?php echo date("Y") - 2010; ?> Years Ago</h2>
				<p>My friend and I decide to create Sagara, an I.T. Solutions company based in Jakarta, where I work there full-time since 2010 until I moved to Tel Aviv. I still own small part of the company and act as their business partner right now.</p>
				<a href="http://sagara.id" class="spring" data-barba-prevent target="BLANK" rel='noopener noreferrer'>More about sagara.id</a>
			</div>
			<div class="thumbs">
				<picture>
					<source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="/dwaan/img/sagara/sagara@2x.webp">
					<img src="/dwaan/img/sagara/sagara.webp" width="" height="" alt="Sagara" />
				</picture>
			</div>
		</section>

		<section class="links">
			<nav>
				<div class="prototype">
					<a href="./say-hi"><span>say hi</span></a>
				</div>
				<div class="continue">
					<a href="./suzuki-website-redesign-pitching"><span><strong>random case study</strong> <i>- Suzuki Indonesia</i></span></a>
				</div>
			</nav>
		</section>

		<section class="footer">
			<a class="reading">Reading time: 120 seconds</a>
		</section>
	</main>

	<?php include_once "part_script.php"; ?>
</body>
</html>