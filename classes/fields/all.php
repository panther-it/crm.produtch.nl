<?
$dir = __DIR__ . "/"; 
foreach(scandir($dir) as $file)  
	if($file != "all.php" && $file != "all.js.php" && substr($file,0,1) != "." && is_file($dir . $file) && pathinfo($file,PATHINFO_EXTENSION) == "php") 
		require_once($dir . $file);
?>
