<!doctype html>
<html class="no-js" lang="en">

<head>
	<?php
		$title = "Hello!";
		include_once "part_metacss.php";
	?>
</head>

<body>
	<?php include_once "part_head.php" ?>

	<div id="barba-wrapper">
		<div class="barba-container" data-namespace="home">
			<main class="block__clear">
				<div class="stage"></div>

				<div class="hero block">
					<div class="hero__meta">
						<div>
							<div class="hero__text">
								<h1>hello! my name is dwan</h1>
								<p>and I do stuff like concept-ing, designing, producing and also delivering UI and UX. <a href="./me" class="more">read more</a></p>
							</div>

							<div class="stats block">
								<span>Some awesome stats</span>

								<div class="stats__content">
									<p>
										<a href="./say-hi">
											<b id="year__living">36+</b>
											<small>years of experience living on earth</small>
										</a>
									</p>
									<p>
										<a href="./work">
											<b id="year__designer">12+</b>
											<small>years of working as a UX/UI designer</small>
										</a>
									</p>
									<p>
										<a href="./me">
											<b id="year__managerial">9+</b>
											<small>years of working in managerial position</small>
										</a>
									</p>
								</div>
							</div>
						</div>
					</div>

					<div class="hero__image">
						<div class="img">
							<div class="box">
								<img class="dwan" src="/dwaan/img/dwan.png" width="" height="" alt="Dwan" />
								<img class="fruit" src="/dwaan/img/empty.png" width="" height="" alt="Fruit" />
							</div>
						</div>
					</div>

					<div class="hero__image hero__image_poof">
						<div class="img">
							<div class="box">
								<img class="fruit poof" src="/dwaan/img/poof.png" width="" height="" alt="Fruit" />
							</div>
						</div>
					</div>

					<div class="shade"></div>
				</div>

				<div id="trigger__mover"></div>
				<div id="trigger"></div>
				<div id="trigger__padder">
					<div class="work work_float">
						<div class="work__container">
							<div class="scroll">
								<div>
									<div class="icn"><svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="12" height="18" rx="5" stroke="#C3DEE4" stroke-width="2"/><rect x="6" y="4" width="2" height="7" rx="1" fill="#C3DEE4"/></svg></div>
									<p class="scroll__up">Scroll up to see some of my work</p>
									<p class="scroll__down">Scroll down to hide my work</p>
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
													<small>design concepts that I’ve created</small>
												</p>
												<p>
													<b>50+</b>
													<small>designs that I’ve converted to web pages</small>
												</p>
											</div>
										</div>
									</div>
								</div>

								<div class="scroller__trigger"></div>
								<div class="block scroller">
									<div class="block gallery block__clear">
										<a href="./melon-tiket-apa-saja"><span><img src="/dwaan/img/ss-tiketapasaja/tiket-apa-saja.jpg" width="" height="" alt="PPATK - E-Learning for Banking Frontliner" /></span><span>Melon - Tiket Apa Saja</span></a>
										<a href="./ppatk-e-learning-for-banking-frontliner"><span><img src="/dwaan/img/ss1.jpg" width="" height="" alt="PPATK - E-Learning for Banking Frontliner" /></span><span>PPATK - E-Learning for Banking Frontliner</span></a>
										<a href="./angkasa-pura-1-performace-dashboard"><span><img src="/dwaan/img/ss2.jpg" width="" height="" alt="Angkasa Pura 1 - Performance Dashboard" /></span><span>Angkasa Pura 1 - Performance Dashboard</span></a>
										<a href="./work">See All</a>
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