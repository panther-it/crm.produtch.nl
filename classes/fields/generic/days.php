<?
require_once __DIR__ . "/dropdownlist.php";
require_once __DIR__ . "/../../sql/sqlstaticvalues.php";

class DaysField extends DropDownList 
{
        function __construct($param1 = NULL)
        {
                parent::__construct($param1);
		$this->datasource = new SqlStaticValues(  "01=01"
                                                       . ",02=02"
                                                       . ",03=03"
                                                       . ",04=04"
                                                       . ",05=05"
                                                       . ",06=06"
                                                       . ",07=07"
                                                       . ",08=08"
                                                       . ",09=09"
                                                       . ",10=10"
                                                       . ",11=11"
                                                       . ",12=12"
                                                       . ",13=13"
                                                       . ",14=14"
                                                       . ",15=15"
                                                       . ",16=16"
                                                       . ",17=17"
                                                       . ",18=18"
                                                       . ",19=19"
                                                       . ",20=20"
                                                       . ",20=20"
                                                       . ",21=21"
                                                       . ",22=22"
                                                       . ",23=23"
                                                       . ",24=24"
                                                       . ",25=25"
                                                       . ",26=26"
                                                       . ",27=27"
                                                       . ",28=28"
                                                       . ",29=29"
                                                       . ",30=30"
                                                       . ",31=31"
						       );

        }

}


?>
