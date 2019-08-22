<?php
  
header("Cache-Control: no-cache");
header("Content-Type: text/plain; charset=ISO-8859-1");
//header("Connection: close");
require_once(__DIR__ . "/classes/authorization.php");
require_once(__DIR__ . "/classes/tools/ajax.php");

$command= isset($_POST["command"] ) ? $_POST["command" ] : $_GET["command" ];
list($class,$action) = explode(".",$command);
$action = strtolower($action);
$class  = strtolower($class);
$value  = isset($_POST["value"] ) ? $_POST["value" ] : addslashes($_GET["value" ]);
$values = isset($_POST["values"]) ? $_POST["values"] : $_GET["values"];
$values = str_replace("\\\"","\"",$values); //ST: TODO: why?
$values = json_decode($values,true);
$status = "Unknown class \"$class\"  and unknown action \"$action\"";

@error_log($class . "." . $action . "=" . var_export($values,true));
/*
@error_log(@var_export(@http_get_request_headers(),true));
@error_log(@var_export(@headers_list(),true));
@error_log(@var_export(@session_get_cookie_params(),true) . "; " . session_name() . "=" . session_id());
@error_log(@var_export($_COOKIE,true));
@error_log(@var_export($_SESSION,true));
*/
/*
error_log("Mutate: ");
@error_log(@mb_http_input("P"));
@error_log(@var_export(@http_get_request_body(),true));
*/

if (file_exists(__DIR__ . "/classes/processors/" . $class . ".php" )) require_once(__DIR__ . "/classes/processors/" . $class . ".php");
if (file_exists(__DIR__ . "/classes/processors/" . $class . "s.php")) require_once(__DIR__ . "/classes/processors/" . $class . "s.php");


switch($class)
{
      case "devicemanagements":
      case "devicemanagement":
      case "device_managements":
      case "device_management":
                require_once(__DIR__ . "/classes/apc.php");
                require_once(__DIR__ . "/classes/processors/devicemanagement.php");
                switch($action)
                {
                        case "search": $status = ProcDeviceManagement::search($values); break;
                        case "list"  : $status = ProcDeviceManagement::listing($values); break;
                        case "query" : $status = ProcDeviceManagement::query( $values); break;
                        case "insert": $status = ProcDeviceManagement::insert($values); break;
                        case "update": $status = ProcDeviceManagement::update($values); break;
                        case "delete": $status = ProcDeviceManagement::delete($values); break;
                        case "test"  : $status = Power::test($values); break; 
                        default      : $status = "Unknown action \"$action\"";
                }
                break;
        case "ipmi":
                require_once(__DIR__ . "/classes/ipmi.php");
                switch(strtolower($action))
                {
                        case "off"   : $status  = Power::shutdown($values); break;
                        case "on"    : $status  = Power::poweron($values) ; break;
                        case "reboot": $status  = Power::reboot($values)  ; break;
                        case "status": $status  = Power::status($values)  ; break;
                        default      : $status  = "Unknown action \"$action\"";
                }
                break;
         case "apc":
                require_once(__DIR__ . "/classes/apc.php");
                switch(strtolower($action))
                {
                        case "off"   : $status  = Power::shutdown($values); break;
                        case "on"    : $status  = Power::poweron($values) ; break;
                        case "reboot": $status  = Power::reboot($values)  ; break;
                        case "status": $status  = Power::status($values)  ; break;
                        default      : $status  = "Unknown action \"$action\"";
                }
                break;
        case "authorizations":
        case "authorization":
                require_once(__DIR__ . "/classes/processors/authorization.php");
                switch($action)
                {
                        case "search": $status = ProcAuthorization::search($values); break;
                        case "list"  : $status = ProcAuthorization::listing($values); break;
                        case "query" : $status = ProcAuthorization::query( $values); break;
                        case "insert": $status = ProcAuthorization::insert($values); break;
                        case "update": $status = ProcAuthorization::update($values); break;
                        case "delete": $status = ProcAuthorization::delete($values); break;
                        default      : $status  = "Unknown action \"$action\"";
                }
                break;
        case "coloaccesses":
        case "coloaccess":
        case "colo_access":
                require_once(__DIR__ . "/classes/processors/coloaccess.php");
                require_once(__DIR__ . "/classes/processors/authorization.php");
                require_once(__DIR__ . "/classes/grafix.php");
                $auth    = Array("customer" => $values["customer"]
                                ,"contact"  => $values["contact"]
                                ,"section"  => "coloaccess"
                                ,"level"    => "1");
                switch($action)
                {
                        case "search": $status  = ProcColoAccess::search($values ); break;
                        case "query" : $status  = ProcColoAccess::query($values  ); break;
                        case "list"  : $status  = ProcColoAccess::listing($values); break;
                        case "insert": $status  = ProcColoAccess::insert($values ); 
                                       $status .= ProcAuthorization::insert($auth);
                                       $status .= Grafix::CreateContact($values["contact"]); break; //TODO: if dc=grafix inbouwen; verplaatsen naar sqlcoloaccess::insert
                        case "update": $status  = ProcColoAccess::update($values); 
                                       $status .= ProcAuthorization::update($auth); break;
                        case "delete": $status  = ProcColoAccess::delete($values); 
                                       $status .= ProcAuthorization::delete($auth); //TODO: wat als meerdere colo_accesses? delete alleen bij laatste
                               $status .= Grafix::DeleteContact($values["contact"]); break;
                        default      : $status  = "Unknown action \"$action\"";
                }
                break;
        case "cables":
        case "cable":
                require_once(__DIR__ . "/classes/processors/devices.php");
                require_once(__DIR__ . "/classes/processors/customers.php");
                //require_once(__DIR__ . "/classes/cacti.php");
                require_once(__DIR__ . "/classes/apc.php");
                require_once(__DIR__ . "/classes/cisco.php");
           //$cable  = $database->getObject("cables",$values);
    if ($deviceA->type == "powerswitch" || $deviceA->type == "switch") { $sw = "A"; $srv = "B"; } else { $sw = "B"; $srv = "A"; }; 
    $server   = ProcDevices::find("id=" . $values["device" . $srv . "_id"]);
    $switch   = ProcDevices::find("id=" . $values["device" . $sw  . "_id"]);
    $switch->port = $values["device" . $sw . "_port"];
    $contacts = $database->query(SqlContacts::query(Settings::ASFORM,"owner=" . $server->customer)); 
          switch($action)
                {
                        case "list"  : $status = ProcCables::listing($values); break;
                        case "search": $status = ProcCables::search($values); break;
                        case "query" : $status = ProcCables::query( $values); break;
                        case "insert": $status = ProcCables::insert($values); break;
                        case "update": $status = ProcCables::update($values); break;
                        case "delete": $status = ProcCables::delete($values); 
               $server = Array("label" => "FREE"
                                                      ,"name"  => "FREE");
               //$status .= ProcCacti::deleteUser($customer);
               break;
                         default      : $status = "Unknown action \"$action\"";
                }
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
    }
          break;
        case "accessdevices":
        case "accessdevice":
                switch($action)
                {
                        case "list"  : $status = ProcAccessDevices::listing($values); break;
                        case "search": $status = ProcAccessDevices::search($values); break;
                        case "query" : $status = ProcAccessDevices::query( $values); break;
                        case "insert": $status = ProcAccessDevices::insert($values); break;
                        case "update": $status = ProcAccessDevices::update($values); break;
                        case "delete": $status = ProcAccessDevices::delete($values); break;
                        default      : $status = "Unknown action \"$action\"";
                }
                break;
        case "customer":
        case "customers":
                switch($action)
                {
                        case "search": $status = ProcCustomers::search($values); break;
                        case "list"  : $status = ProcCustomers::listing($values); break;
                        case "query" : $status = ProcCustomers::query( $values); break;
                        case "insert": $status = ProcCustomers::insert($values); break;
                        case "update": $status = ProcCustomers::update($values); break;
                        case "delete": $status = ProcCustomers::delete($values); break;
                        default      : $status = "Unknown action \"$action\"";
                }
                break;
        case "contact":
        case "contacts":
                switch($action)
                {
                        case "list"  : $status = ProcContacts::listing($values); break;
                        case "search": $status = ProcContacts::search($values); break;
                        case "query" : $status = ProcContacts::query( $values); break;
                        case "insert": $status = ProcContacts::insert($values); break;
                        case "update": $status = ProcContacts::update($values); break;
                        case "delete": $status = ProcContacts::delete($values); break;
                        default      : $status = "Unknown action \"$action\"";
                }
                break;
        case "organization":
        case "organizations":
                switch($action)
                {
                        case "list"  : $status = ProcOrganizations::listing($values); break;
                        case "search": $status = ProcOrganizations::search($values); break;
                        case "query" : $status = ProcOrganizations::query( $values); break;
                        //case "query" : $status = DropDownList::updateValues($values,SqlOrganizations::query(Settings::ASLIST,"owner='" . $value . "'")); break;
                        case "insert": $status = ProcOrganizations::insert($values); break;
                        case "update": $status = ProcOrganizations::update($values); break;
                        case "delete": $status = ProcOrganizations::delete($values); break;
                        default      : $status = "Unknown action \"$action\"";
                }
                break;
        case "device":
        case "devices":
                require_once(__DIR__ . "/classes/processors/devices.php");
                switch($action)
                {
                        case "list"  : $status = ProcDevices::listing($values); break;
                        case "search": $status = ProcDevices::search($values); break;
                        case "query" : $status = ProcDevices::query( $values); break;
                        case "insert": $status = ProcDevices::insert($values); break;
                        case "update": $status = ProcDevices::update($values); break;
                        case "delete": $status = ProcDevices::delete($values); break;
                        default      : $status = "Unknown action \"$action\"";
                }
                break;
        case "task":
        case "tasks":
        case "subTasks":
                switch($action)
                {
                        case "list"  : $status = ProcTasks::listing($values); break;
                        case "search": $status = ProcTasks::search($values); break;
                        case "query" : $status = ProcTasks::query( $values); break;
                        case "insert": $status = ProcTasks::insert($values); break;
                        case "update": $status = ProcTasks::update($values); break;
                        case "delete": $status = ProcTasks::delete($values); break;
                        default      : $status = "Unknown action \"$action\"";
                }
                break;
         case "domain":
        case "domains":
                require_once(__DIR__ . "/classes/domaincontroller.php");
                switch($action)
                {
                        case "list"  : $status = ProcDomains::listing($values); break;
                        case "search": $status = ProcDomains::search($values); break;
                        case "query" : $status = ProcDomains::query( $values); break;
                        case "insert": if ($status = DomainController::create($values)) $status = ProcDomains::insert($values); break;
                        case "update": if ($status = DomainController::update($values)) $status = ProcDomains::update($values); break;
                        case "delete": if ($status = DomainController::cancel($values)) $status = ProcDomains::delete($values); break;
                        default      : $status = "Unknown action \"$action\"";
                }
                break;
        case "nameserver":
        case "nameservers":
                switch($action)
                {
                        case "list"  : $status = ProcNameservers::listing($values); break;
                        case "search": $status = ProcNameservers::search($values); break;
                        case "query" : $status = ProcNameservers::query( $values); break;
                        case "insert": $status = ProcNameservers::insert($values); break;
                        case "update": $status = ProcNameservers::update($values); break;
                        case "delete": $status = ProcNameservers::delete($values); break;
                        default      : $status = "Unknown action \"$action\"";
                }
                break;
        case "productgroups":
        case "productgroup":
        case "productfeatures":
        case "featurevalue":
        case "featurevalues":
        case "productfeature":
        case "product":
        case "products":
                require_once(__DIR__ . "/classes/processors/products.php");
          if (!isset($values["type"]) && $class == "ProductGroups"     ) $values["type"] = "GROUP"  ;
          if (!isset($values["type"]) && $class == "Products"          ) $values["type"] = "PRODUCT";
          if (!isset($values["type"]) && $class == "ProductFeatures"   ) $values["type"] = "FEATURE";
          if (!isset($values["type"]) && $class == "ProductFeatureLink") $values["type"] = "FEATURE";
          if (!isset($values["type"]) && $class == "FeatureValues"     ) $values["type"] = "VALUE"  ;
                switch($action)
                {
                        case "list"  : $status = ProcProducts::listing($values); break;
                        case "search": $status = ProcProducts::search($values); break;
                        case "query" : $status = ProcProducts::query( $values); break;
                        case "insert": $status = ProcProducts::insert($values); break;
                        case "update": $status = ProcProducts::update($values); break;
                        case "delete": $status = ProcProducts::delete($values); break;
                        default      : $status = "Unknown action \"$action\"";
                }
                break;
        case "productfeaturelink":
                require_once(__DIR__ . "/classes/processors/products.php");
          if (!isset($values["type"]) && $class == "ProductFeatureLink") $values["type"] = "FEATURE";
                switch($action)
                {
                        case "insert": $status = ProcProducts::insertProductsProducts($values); break;
                        case "update": $status = ProcProducts::updateProductsProducts($values); break;
                        default      : $status = "Unknown action \"$action\"";
                }
                break;
        case "suborder":
        case "suborders":
        case "order":
        case "orders":
                switch($action)
                {
                        case "list"  : $status = ProcOrders::listing($values); break;
                        case "search": $status = ProcOrders::search($values); break;
                        case "query" : $status = ProcOrders::query( $values); break;
                        case "insert": $status = ProcOrders::insert($values); break;
                        case "update": $status = ProcOrders::update($values); break;
                        case "delete": $status = ProcOrders::delete($values); break;
                        default      : $status = "Unknown action \"$action\"";
                }
                break;
        case "suite":
        case "suites":
                switch($action)
                {
                        case "list"  : $status = ProcSuites::listing($values); break;
                        case "search": $status = ProcSuites::search($values); break;
                        case "query" : $status = ProcSuites::query( $values); break;
                        case "insert": $status = ProcSuites::insert($values); break;
                        case "update": $status = ProcSuites::update($values); break;
                        case "delete": $status = ProcSuites::delete($values); break;
                        default      : $status = "Unknown action \"$action\"";
                }
                break;
        case "datacenter":
        case "datacenters":
                switch($action)
                {
                        case "list"  : $status = ProcDataCenters::listing($values); break;
                        case "search": $status = ProcDataCenters::search($values); break;
                        case "query" : $status = ProcDataCenters::query( $values); break;
                        case "insert": $status = ProcDataCenters::insert($values); break;
                        case "update": $status = ProcDataCenters::update($values); break;
                        case "delete": $status = ProcDataCenters::delete($values); break;
                        default      : $status = "Unknown action \"$action\"";
                }
                break;
        case "rack":
        case "racks":
                switch($action)
                {
                        case "list"  : $status = ProcRacks::listing($values); break;
                        case "search": $status = ProcRacks::search($values); break;
                        case "query" : $status = ProcRacks::query( $values); break;
                        case "insert": $status = ProcRacks::insert($values); break;
                        case "update": $status = ProcRacks::update($values); break;
                        case "delete": $status = ProcRacks::delete($values); break;
                        default      : $status = "Unknown action \"$action\"";
                }
                break;
        case "Field":
        case "DropDownListField":
                require_once(__DIR__ . "/classes/fields/generic/dropdownlist.php");
                switch($action)
                {
                        case "query": $status = DropDownList::getValues($values); break;
                        default     : $status = "Unknown action \"$action\"";
                }
                break;
        default:
                $status = "Unknown class \"$class\"";
}

//echo "\n";
print(Ajax::encode($status));
//error_log(Ajax::encode($status));

?>
