<?php
  
require_once __DIR__ . "/../database.php";
require_once __DIR__ . "/../settings.php";
require_once(__DIR__ . "/../authorization.php");

abstract class SqlCommon
{
  public $constraint; //optionally used by dropdownlist
  public $viewType  ; //toString

        function __construct($viewType = Settings::ASGRID, $constraint = NULL)
        {
        $this->constraint = $constraint;
        $this->viewType   = $viewType;
        }


        public static function query(&$viewType,&$constraint = "")
        {
            global $auth;
            global $database;
           
            if (is_array($constraint))
               $constraint = $database::buildConstraint($constraint);
            $constraint = trim($constraint);
            if (empty($constraint)) $constraint = "1=1";

            $section    = str_replace("sql","",strtolower(get_called_class()));
          error_log($section);
            if ($section != "authorization")
            if ($auth->valid)
            {
                $level      = $auth->getLevel($section);
                if ($level > Authorization::NOAUTH_LEVEL && $level < Authorization::ADMIN_LEVEL) $constraint .= " AND owner = " . $auth->customer->id;
            }

            return "Error: SqlCommon directly accessed";
        }


    public static function references($table=NULL,$column="id")
    {
        global $database;

        if (!$table)
            $table = strtolower(str_replace("Sql","",get_called_class()));

        $sql = "select TABLE_NAME   AS `object`
                     , COLUMN_NAME  AS `key`
                  from INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
                 where REFERENCED_TABLE_SCHEMA = '" . Settings::DB_NAME_CRM . "' 
                   and REFERENCED_TABLE_NAME   = '" . $table                . "' 
                   and REFERENCED_COLUMN_NAME  = '" . $column               . "'";
        return $database->query($sql);
    }


    public static function select($viewType = Settings::ASFORM, $constraint = "1=1")
    {
        global $database;
        //error_log(static::query($viewType, $constraint));
        return $database->query(static::query($viewType, $constraint));
    }


  public static function find($constraint, $viewType = Settings::ASFORM)
  {
    global $database;

    if (is_array($constraint))
      $constraint = $database->buildConstraint($contraint);
    if (strpos($constraint,"=") === false)
      $sql = static::query(Settings::ASSEARCH,$constraint);
    else
      $sql = static::query(Settings::ASFORM  ,$constraint);

    if ($viewType == Settings::ASIDS)
      $rs = $database->fetchIds($sql);
    else
      $rs = $database->fetchObject($sql);
    return $rs;
  }

  public static function access($customerId)
  {
    global $database;
    $sql = self::query(Settings::ASFORM,"owner = $customerId");
    $rs  = $database->query($sql);
    return mysql_num_rows($rs) > 0;
  }

  public static function insert(&$values)
  {
    //if (!isset($values["class"]) || empty($values["class"])) 
    //{
      $values["class"] = str_replace("sql","",strtolower(get_called_class()));
      $values["class"] = preg_replace("/s$/","",$values["class"]);              //enkelvoud 
    //}
    $values["action"] = "insert";
  }

  public static function update(&$values)
  {
    self::insert($values); //same shit
    $values["action"] = "update";
  }



        function __toString()
        {
            $name = get_called_class();
            return $name::query($this->viewType, $this->constraint);
        }
}

?>
