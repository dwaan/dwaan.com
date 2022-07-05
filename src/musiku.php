<!doctype html>
<html class="no-js" lang="en">

<head>
    <?php
		$title = "Musiku Concept and Design";
		$description = "A short study case of website design for Musiku";
		include_once "part_metacss.php";
	?>
</head>

<body data-barba="wrapper">
    <?php include_once "part_head.php" ?>

    <main data-barba="container" data-barba-namespace="detail" class="detail musiku">
        <section class="middle full snap">
            <div class="padding">
                <span><img src="/dwaan/img/logo/musiku.svg" width="160" height="55" class="logo"
                        alt="Logo Musiku" /></span>
            </div>
            <h4 class="year">/2021</h4>
            <div class="arrow-big">
                <a href="#more" class="arrow scrollto">
                    <span>read more</span>
                </a>
            </div>
        </section>

        <section id="more" class="middle style-plain clip snap">
            <div class="text">
                <div class="titles">
                    <h4>Concept and Design</h4>
                    <h1>Music Royalty</h1>
                </div>
                <p>Musiku was an internal codename for this design concept of music royalty system. As a new concept in
                    Indonesia, it need to teach visitors about the system itself. The project launched at of 2021, but
                    the concept already started since 2019.</p>
            </div>
            <div class="thumbs">
                <picture class="pic-1">
                    <source media="(-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 216dpi)"
                        srcset="/dwaan/img/musiku/musiku-1@3x.webp">
                    <source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)"
                        srcset="/dwaan/img/musiku/musiku-1@2x.webp">
                    <img src="/dwaan/img/musiku/musiku-1.webp" width="" height=""
                        alt="Musiku Concept and Design - Page 1 - by Dwan" />
                </picture>
            </div>
        </section>

        <section class="footer">
            <a class="reading">Reading time: 40 seconds</a>
        </section>
    </main>

    <?php include_once "part_script.php"; ?>
</body>

</html>