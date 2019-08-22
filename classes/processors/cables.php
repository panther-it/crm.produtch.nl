<?php
  
require_once(__DIR__ . "/common.php");
                //require_once(__DIR__ . "/classes/processors/devices.php");
                //require_once(__DIR__ . "/classes/processors/customers.php");
                //require_once(__DIR__ . "/classes/cacti.php");
                //require_once(__DIR__ . "/classes/apc.php");
                //require_once(__DIR__ . "/classes/cisco.php");
 
           //$cable  = $database->getObject("cables",$values);
    //if ($deviceA->type == "powerswitch" || $deviceA->type == "switch") { $sw = "A"; $srv = "B"; } else { $sw = "B"; $srv = "A"; }; 
    //$server   = ProcDevices::find("id=" . $values["device" . $srv . "_id"]);
    //$switch   = ProcDevices::find("id=" . $values["device" . $sw  . "_id"]);
    //$switch->port = $values["device" . $sw . "_port"];
    //$contacts = $database->query(SqlContacts::query(Settings::ASFORM,"owner=" . $server->customer)); 
 
  /*
  if ($switch->type == "powerswitch" && stripos($switch->brand,"APC"  ) !== FALSE)
    {
      $status .= Power::setLabel($switch,$server) . "\n";
      while($contact = mysql_fetch_object($contacts))
        $status .= Power::addUser($switch,$contact) . "\n";
    }
    if ($switch->type == "switch"      && stripos($switch->brand,"Cisco") !== FALSE)
    {
      $status .= Cisco::setLabel($switch,$server) . "\n";
      $status .= ProcCacti::updateInterface($switch,$server) . "\n";
      while($contact = mysql_fetch_object($contacts))
      {
        $status .= ProcCacti::insertUser($contact) . "\n";
        $status .= ProcCacti::insertPermission($contact,$switch) . "\n";
      }
  */
  
class ProcCables extends ProcCommon
{
}

?>
