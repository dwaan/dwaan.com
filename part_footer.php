<?php
// check for the server side x-barba request header
if (!isset($_SERVER['HTTP_X_BARBA'])) {
?> <div id="back"></div><div id="support" class="support"></div> <?php
}
?>