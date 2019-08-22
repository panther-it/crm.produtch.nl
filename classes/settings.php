<?php
  
//set_include_path(get_include_path() . PATH_SEPARATOR . $_SERVER['DOCUMENT_ROOT'] . Settings::INCLUDE_DIRS["fields"]);

/** Cookie settings **/
session_name("CRMSESSID");
session_set_cookie_params(0,"/",".produtch.nl",false,false); //all subdomains: www|crm.produtch.nl
session_start();

/** CRM Backend settings **/
class Settings
{
        const DB_HOST_CRM     = 'localhost';
        const DB_NAME_CRM     = 'crm';
        const DB_USER_CRM     = 'crm';
        const DB_PWD_CRM      = 'tijgernootje';

        const DB_HOST_Cacti   = 'joey.servers.redunix.net';
        const DB_NAME_Cacti   = 'cacti';
        const DB_USER_Cacti   = 'cacti';
        const DB_PWD_Cacti    = 'banaan';

        const DB_HOST_REDUNIX = 'web06.shared.redunix.net';
        const DB_NAME_REDUNIX = 'redunixnet_mb';
        const DB_USER_REDUNIX = 'root';
        const DB_PWD_REDUNIX  = 'bla';

        const DB_HOST_Unit4   = 'http://unit4';
        const DB_NAME_Unit4   = '/';
        const DB_USER_Unit4   = 'sterburg';
        const DB_PWD_Unit4    = 'bla';

        const ASGRID          = 0;
        const ASFORM          = 1;
        const ASLIST          = 2;
        const ASCREATELIST    = 3;
        const ASSEARCH        = 4;
        const ASIDS           = 5;
        const ASSEARCHLIST    = 6;
  
        const ALWAYS          = 2;
}

?>
