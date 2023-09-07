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
        <img src="/img/qr/musiku.svg" width="64" height="64" alt="Dwan - Musiku Concept and Design" class="print qr" hidden />
        <hr />

        <section class="middle full snap">
            <div class="padding">
                <span><img src="/img/logo/musiku.svg" width="160" height="55" class="logo" alt="Logo Musiku" /></span>
            </div>
            <h4 class="year">/2021</h4>
            <div class="arrow-big">
                <a href="#more" class="arrow scrollto">
                    <span>read more</span>
                </a>
            </div>
        </section>

        <hr />

        <section id="more" class="middle auto style-plain style-plain-sticky snap">
            <div class="middle">
                <div class="text">
                    <div class="titles">
                        <h4>Concept and Design</h4>
                        <h1>Music&nbsp;<br hidden />Royalty</h1>
                    </div>
                    <p>Musiku was an internal codename for this design concept of music royalty system. As a new concept in Indonesia, it need to teach visitors about the system itself. The project launched at of 2021, but the concept already started since 2019.</p>
                </div>
                <div class="thumbs">
                    <?php for ($i = 1; $i <= 5; $i++) { ?>
                        <picture class="pic-1-<?php echo $i ?>">
                            <source media="(-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 216dpi)" srcset="/img/musiku/musiku-1-<?php echo $i ?>@3x.webp">
                            <source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="/img/musiku/musiku-1-<?php echo $i ?>@2x.webp">
                            <img src="/img/musiku/musiku-1-<?php echo $i ?>.webp" height="150" alt="Musiku Concept and Design - Page 1 - <?php echo $i ?> - by Dwan" />
                        </picture>
                    <?php } ?>
                </div>
            </div>
        </section>

        <hr />

        <section class="middle style-flex auto snap">
            <div class="style-row">
                <div class="style-column big">
                    <div class="meta musiku">
                        <img src="/img/logo/musiku.svg" width="160" height="55" class="logo" alt="Logo Musiku" />
                        <picture>
                            <source media="(-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 216dpi)" srcset="/img/musiku/icon@3x.webp">
                            <source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="/img/musiku/icon@2x.webp">
                            <img src="/img/musiku/icon.webp" width="184" height="106" alt="Musiku Concept and Design - Icon 8 - by Dwan" />
                        </picture>
                    </div>
                    <div class="text">
                        <div class="titles">
                            <h2>Placeholder</h2>
                        </div>
                        <p>Creating design without a product name means that placeholder contents need to be created from scratch that include brand identity that include logo, color schemes, and various content.</p>
                    </div>
                </div>
            </div>
        </section>

        <hr />

        <section class="middle auto style-angled style-angled-individual snap">
            <div class="text">
                <div class="meta color" hidden>
                    <ul class="flat">
                        <li style="background: #F6EF58"></li>
                        <li style="background: #B7FF1C"></li>
                        <li style="background: #4180DF"></li>
                        <li style="background: #A628AC"></li>
                        <li></li>
                    </ul>
                </div>
                <h3>The Contrast</h3>
                <p>As a concept, the vibrant and contrast color system were introduce to make the website look fresh and cheerful. This was also intended to distance itself with other govermental website that sometimes looks dull.</p>
            </div>
            <div class="thumbs">
                <?php for ($i = 2; $i <= 6; $i++) { ?>
                    <picture class="pic-<?php echo $i ?>">
                        <source media="(-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 216dpi)" srcset="/img/musiku/musiku-<?php echo $i ?>@3x.webp">
                        <source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="/img/musiku/musiku-<?php echo $i ?>@2x.webp">
                        <img src="/img/musiku/musiku-<?php echo $i ?>.webp" height="250" alt="Musiku Design and Concept - Page <?php echo $i ?> - by Dwan" />
                    </picture>
                <?php } ?>
            </div>
        </section>

        <hr />

        <section class="middle auto style-plain style-plain-single snap">
            <div class="text">
                <div class="titles">
                    <h2>Stock&nbsp;<br hidden />Vectors</h2>
                </div>
                <p>The usage of stock vectors and icons from <a href="https://icons8.com" target="BLANK">icons8.com</a> speed up the design process. They also give the overal freshness and cheerfulness of the design.</p>
            </div>
            <div class="thumbs">
                <picture class="pic-1 plain">
                    <source media="(-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 216dpi)" srcset="/img/musiku/vector@3x.webp">
                    <source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="/img/musiku/vector@2x.webp">
                    <img src="/img/musiku/vector.webp" height="200" alt="Musiku Concept and Design - Vector - by icons8.com" />
                </picture>
            </div>
        </section>

        <hr />

        <section class="middle auto style-plain style-plain-scroll clip snap-bottom">
            <div class="text">
                <h3>The&nbsp;<br hidden />Simplicity&nbsp;<br hidden />of Complexity</h3>
                <p>While the homepage provide a very simple explanation of the service, the user page provide expansive tools that was made with great consistency to provide easy operation.</p>
            </div>
            <div class="scroll">
                <div class="thumbs">
                    <?php for ($i = 7; $i <= 12; $i++) { ?>
                        <picture class="pic-<?php echo $i ?>">
                            <source media="(-webkit-min-device-pixel-ratio: 2.5), (min-resolution: 216dpi)" srcset="/img/musiku/musiku-<?php echo $i ?>@3x.webp">
                            <source media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" srcset="/img/musiku/musiku-<?php echo $i ?>@2x.webp">
                            <img src="/img/musiku/musiku-<?php echo $i ?>.webp" height="250" alt="Musiku Design and Concept - Page <?php echo $i ?> - by Dwan" />
                        </picture>
                    <?php } ?>
                </div>
            </div>
        </section>

        <hr />

        <div class="links snap-bottom">
            <nav>
                <div class="prototype group">
                    <a href="https://www.figma.com/proto/RINChQyewiFcUftHKn4he7/Sagara---Musiku?page-id=0%3A1&type=design&node-id=1-2&viewport=25%2C278%2C0.03&t=ZUqml7RfXpGs0izm-8&scaling=contain&starting-point-node-id=1%3A2&hotspot-hints=0&hide-ui=1" target="_BLANK" class="title"><span>visit the prototype</span></a>
                    <a href="https://www.figma.com/proto/RINChQyewiFcUftHKn4he7/Sagara---Musiku?page-id=0%3A1&type=design&node-id=1-2&viewport=25%2C278%2C0.03&t=ZUqml7RfXpGs0izm-8&scaling=contain&starting-point-node-id=1%3A2&hotspot-hints=0&hide-ui=1" target="_BLANK"><span>desktop</span></a>
                    <a href="https://www.figma.com/proto/RINChQyewiFcUftHKn4he7/Sagara---Musiku?page-id=605%3A0&type=design&node-id=375-198&viewport=25%2C230%2C0.05&t=2jU3xvz2tHqPSfK1-8&scaling=contain&starting-point-node-id=375%3A198&hotspot-hints=0&hide-ui=1" target="_BLANK"><span>tablet</span></a>
                    <a href="https://www.figma.com/proto/RINChQyewiFcUftHKn4he7/Sagara---Musiku?page-id=605%3A1&type=design&node-id=452-187&viewport=62%2C25%2C0.05&t=MIvAUOVGSheY724h-8&scaling=contain&starting-point-node-id=452%3A187&hotspot-hints=0&hide-ui=1" target="_BLANK"><span>mobile</span></a>
                </div>
                <div class="continue">
                    <a href="./aai" class="title"><span>next case study</span></a>
                    <a href="./aai"><span><i>Asosiasi Antropologi Indonesia</i></span></a>
                </div>
            </nav>
        </div>

        <hr />

        <div class="footer">
            <p class="reading">Reading time: 40 seconds</p>
        </div>
    </main>

    <?php include_once "part_footer.php"; ?>
</body>

<?php include_once "part_script.php"; ?>

</html>