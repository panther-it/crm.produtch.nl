<?
require_once(__DIR__ . "/../modals/ajax.php");

class Ajax 
{
        function __construct() 
        {
	}

	public static function encode($source)
	{
		if (is_resource($source))
          // type: recordset
            $retVal                 = static::encodeResource($source);

        else if (is_array($source ) && array_key_exists("data"      , $source) && is_resource($source["data"]      ))
        { // type: array(data,references)
            $retVal                 = static::encodeResource($source["data"]);

            if (is_array($source ) && array_key_exists("references", $source) && is_resource($source["references"]))
                $retVal->references = static::encodeResource($source["references"])->data;
        }

        else 
        { // type: unknown/other
            $retVal = new ModAjax();

		    if (is_object($source) || is_array($source))
			    $retVal->data       = $source;

		    if (is_string($source))
                $retVal->error = $source;
        }

		return json_encode($retVal);
     }


    public static function encodeResource($rs)
    {
        $retVal  = new ModAjax();

        while($r = mysql_fetch_object($rs))
            array_push($retVal->data,$r);
        $i=0; while($i < mysql_num_fields($rs))
            array_push($retVal->fields, mysql_fetch_field($rs, $i++));

        return $retVal;
    }


        public static function decode($source)
        {
		return json_decode($source);
        }
}
?>
