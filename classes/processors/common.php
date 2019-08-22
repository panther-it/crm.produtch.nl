<?php
  
require_once(__DIR__ . "/../settings.php");

class ProcCommon 
{

  public static function action($action, $values = FALSE, $viewType = FALSE)
  {
        $sqlClass = str_replace("Proc", "Sql", get_called_class());
        require_once(__DIR__ . "/../sql/" . strtolower($sqlClass) . ".php");

        if ($viewType)
            return $sqlClass::$action($viewType, $values);
        else if ($values)
            return $sqlClass::$action($values);
        else
            return $sqlClass::$action();
    }


    public static function query($values, $viewType = Settings::ASFORM)
    {
        return static::action("select", $values, $viewType);
    }


    public static function search($values)
    {
        return static::action("select", $values, Settings::ASSEARCHLIST);
    }

  
    public static function find($values, $viewType = Settings::ASLIST)
    {
        return static::action("find", $values, $viewType);
    }

  
    public static function listing($values)
    {
        return array("data"       => static::action("select", $values, Settings::ASLIST)
                    ,"references" => static::action("references")
                    );
     }


  public static function insert($values)
  {
    return static::action("insert", $values); 
  }


  public static function update($values)
  {
    return static::action("update", $values); 
  }


  public static function delete($values)
  {
    return static::action("delete", $values); 
  }
}
?>
