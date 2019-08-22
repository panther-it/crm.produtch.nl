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
        case "accessdevices":
        case "accessdevice":
                $class = "AccessDevices";          
                break;
        case "subTasks":
                $class = "Tasks";
        case "productgroups":
        case "productgroup":
        case "productfeatures":
        case "featurevalue":
        case "featurevalues":
        case "productfeature":
        case "productfeaturelink":
             $class = "products";
             break;
        case "suborder":
        case "suborders":
                $class = "orders";
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
}
  
  
if (file_exists(__DIR__ . "/classes/processors/" . $class . "s.php" )) $class .= "s"; 
if (file_exists(__DIR__ . "/classes/processors/" . $class . ".php")) 
    require_once(__DIR__ . "/classes/processors/" . $class . ".php");
$class = "Proc" . ucfirst($class);
if (class_exists($class))
    {
        switch($action)
        {
            case "list"  : $status = $class::listing($values); break;
            default      : 
                if (method_exists($class, $action))
                    $status = $class::$action($values);
                else
                    $status = "Unknown action \"$action\"";
        }
    }
    else
        if (empty($status))
            $status = "Unknown class \"$class\"";


//echo "\n";
print(Ajax::encode($status));
//error_log(Ajax::encode($status));

?>
