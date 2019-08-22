<?
require_once(__DIR__ . "/classes/authorization.php");
if ($auth->viaProxy)
{
print "<!--#include virtual=\"/footer.shtml\"  -->\n";
#print "<!--#include virtual=\"" . dirname($_SERVER["HTTP_ORIGINAL_URI"] . "dummy") . "/footer.shtml\"  -->\n";
}
else //if (!$auth->viaSSI)
{
require_once(__DIR__ . "/webparts/framework_bottom.shtml");
}
?>
