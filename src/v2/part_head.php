<?php
// check for the server side x-barba request header
if (!isset($_SERVER['HTTP_X_BARBA'])) {
?>
	<div id="corner">
		<div class="tl"></div>
		<div class="tr"></div>
		<div class="br"></div>
		<div class="bl"></div>
	</div>

	<div id="loader"></div>
	<div id="log"></div>

	<header>
		<div class="left">
			<a href="/" class="logo" id="logo" aria-label="Dwan">
				<object data="/img/dwan-logo.svg#logo" class="dwan-logo" type="image/svg+xml"></object>
			</a>
		</div>

		<div class="right">
			<a id="textsize" class="size" aria-label="Text Size" href="#textsize" hidden>Aa</a>
			<a id="mode" class="lamp" aria-label="Dark or light mode" href="#mode" hidden>
				<svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
					<g id="sun" stroke="#fff" stroke-width="2">
						<circle cx="22" cy="22.2218" r="5.5" fill="#FFD700" />
					</g>
					<g id="moon">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M16.0001 24.2218C19.8661 24.2218 23.0001 21.0878 23.0001 17.2218C23.0001 16.1509 22.7596 15.1361 22.3296 14.2285C26.5951 14.4014 30 17.914 30 22.2218C30 26.6401 26.4183 30.2218 22 30.2218C18.1883 30.2218 14.9992 27.556 14.1954 23.987C14.7712 24.1402 15.3761 24.2218 16.0001 24.2218Z" fill="#FFD700" />
					</g>
					<g id="ray" opacity="1" stroke="#000000" stroke-width="2">
						<line x1="22" y1="31.2218" x2="22" y2="35.2218" />
						<line x1="14.5355" y1="28.9289" x2="11.707" y2="31.7574" />
						<line x1="32.1213" y1="31.7574" x2="29.2928" y2="28.9289" />
						<line x1="22" y1="9.22183" x2="22" y2="13.2218" />
						<line x1="31.5355" y1="12.9289" x2="28.707" y2="15.7574" />
						<line x1="15.1213" y1="15.7574" x2="12.2928" y2="12.9289" />
						<line x1="13" y1="22.2218" x2="9" y2="22.2218" />
						<line x1="35" y1="22.2218" x2="31" y2="22.2218" />
					</g>
				</svg>
			</a>

			<nav class="menu">
				<div class="overlay">
					<div id="menu-items" class="items">
						<noscript>
							<?php include "part_menu.php"; ?>
						</noscript>
					</div>
					<script>
						document.getElementById("menu-items").innerHTML = `<a href="#" data-barba-prevent class="close spring"><span>x</span>close</a>`;
						document.getElementById("menu-items").innerHTML += `<?php include "part_menu.php"; ?>`;
					</script>
				</div>
				<a class="switch" href="/menu" data-barba-prevent aria-label="Menu" hidden>
					<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
						<line class="menu-1" x1="26" y1="8.25" x2="6" y2="8.25" />
						<line class="menu-2" x1="20" y1="16.25" x2="6" y2="16.25" />
						<line class="menu-3" x1="26" y1="24.25" x2="6" y2="24.25" />
					</svg>
					<span>menu</span>
				</a>
			</nav>
		</div>
	</header>
<?php
}
?>