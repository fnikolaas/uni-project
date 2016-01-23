<?php

class DB {
    
    var $dbHost;
    
    var $db;
    
    var $us;
    
    var $pw;
    
    function DB() {
        $this->dbHost = '127.0.0.1';
        $this->db = 'classicmodels';
        $this->us = 'root';
        $this->pw = 'VPndxSf4IbW1SxNi';
    }
    
    protected function getDbConnection() {
        $conn = mysql_connect($this->dbHost, $this->us, $this->pw);
        $db   = mysql_select_db($this->db);
        
        $dbconn = array(
            'connection' => $conn,
            'database'   => $db,
        );
        
        return $dbconn;
    }
    
    public function executeQuery($query) {
        $conn = self::getDbConnection();
        $ret  = array();
        
        if ($conn['connection'] != null) {
            $res = mysql_query($query, $conn['connection']);
            
            if ($res) {
                while ($row = mysql_fetch_object($res)) {
                    $row = get_object_vars($row);
                    
                    while (list($key, $val) = each($row)) {
                        $row[$key] = utf8_encode($row[$key]);
                    }
                    
                    array_push($ret, $row);
                }
            }
        }
  
        return $ret;
    }
    
}