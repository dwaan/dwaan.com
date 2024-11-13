<!doctype html>
<html class="no-js" lang="en">

<head>
	<?php
	$title = "Hello!";
	include_once "part_metacss.php";
	?>
</head>

<body data-barba="wrapper">
	<?php include_once "part_head.php" ?>

	<div id="barba-wrapper">
		<div class="barba-container" data-barba="container" data-barba-namespace="home">
			<main class="block__clear">
				<div class="stage"></div>

				<data id="stage">
					<div class="threed block">
						<div class="hero block">
							<div class="hero__meta">
								<div>
									<div class="hero__text">
										<div class="par_h1">
											<h1>hello! my name is dwan</h1>
										</div>
										<div class="par_p">
											<p>and I do stuff like concept-ing, designing, producing and also delivering UI and UX. <a href="/me" class="more">read more</a></p>
										</div>
									</div>

									<div class="stats block">
										<span>Some awesome stats</span>

										<div class="stats__content">
											<p>
												<a href="/say-hi">
													<b id="year__living">36+</b>
													<small>years of experience living on earth</small>
												</a>
											</p>
											<p>
												<a href="/work">
													<b id="year__designer">12+</b>
													<small>years of working as a UX/UI designer</small>
												</a>
											</p>
											<p>
												<a href="/me">
													<b id="year__managerial">9+</b>
													<small>years of working in managerial position</small>
												</a>
											</p>
										</div>
									</div>
								</div>
							</div>

							<div class="hero__image">
								<div class="parallax">
									<div class="img">
										<div class="box">
											<img class="dwan" src="/img/dwan.webp" width="" height="" alt="Dwan" />
											<img class="fruit" src="/img/empty.webp" width="" height="" alt="Fruit" />
										</div>
									</div>
								</div>
							</div>

							<div class="hero__image hero__image_poof">
								<div class="img">
									<div class="box">
										<img class="fruit poof" src="/img/poof.webp" width="" height="" alt="Fruit" />
									</div>
								</div>
							</div>

						</div>
					</div>
				</data>
				<div class="shade"></div>

				<div id="trigger__mover"></div>
				<div id="trigger"></div>
				<div id="trigger__padder">
					<div class="work work__float">
						<div class="work__container">
							<div class="scroll">
								<div>
									<p class="scroll__up"><i class="icn"></i>Scroll up to see some of my work</p>
									<p class="scroll__down"><i class="icn"></i>Scroll down to hide my work</p>
								</div>
							</div>

							<div class="work__list">
								<div class="wording__trigger"></div>
								<div class="block block__clear">
									<div class="block__left">
										<h2>my latest works</h2>
										<p>tap or click on one of the thumbnail to learn more about the work</p>
									</div>
									<div class="block__right">
										<div class="stats block">
											<div class="stats__content">
												<p>
													<b>35+</b>
													<small>designs created and sliced</small>
												</p>
												<p>
													<b>50+</b>
													<small>design concepts created</small>
												</p>
											</div>
										</div>
									</div>
								</div>

								<div class="scroller__trigger"></div>
								<div class="block scroller">
									<div class="block gallery block__clear">
										<a href="/tiket-apa-saja"><span><img src="/img/ss-tiketapasaja/tiket-apa-saja.webp" width="" height="" alt="Melon - Tiket Apa Saja - Online Ticketing System" /></span><span>Melon - Tiket Apa Saja - Online Ticketing System</span></a>
										<a href="/ppatk-e-learning-for-bank-frontliner"><span><img src="/img/ss1.webp" width="" height="" alt="PPATK - E-Learning for Bank Frontliner" /></span><span>PPATK - E-Learning for Bank Frontliner</span></a>
										<a href="/angkasa-pura-1-performace-dashboard"><span><img src="/img/ss2.webp" width="" height="" alt="Angkasa Pura 1 - Performance Dashboard" /></span><span>Angkasa Pura 1 - Performance Dashboard</span></a>
										<a href="/work">See All</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	</div>

	<?php include_once "part_script.php"; ?>
</body>

</html>