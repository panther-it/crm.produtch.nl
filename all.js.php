<?
header('Content-type: text/javascript');
require_once(__DIR__ . "/classes/all.js.php");
require_once(__DIR__ . "/lib/all.js.php");
if (isset($_GET["table"])) require_once(__DIR__ . "/tables/" . $_GET["table"] . ".js");
?>
