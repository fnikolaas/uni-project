<?php

class ProductSearch {
    
    function ProductSearch($db, $params) {
        $this->db = $db;
        $this->params = $params;
    }
    
    public function getList() {
        $query = array(
            'select * from products where productName like "',
            $this->params['search'] ? '%'.$this->params['search'].'%' : '%',
            '" order by productLine, buyPrice;'
        );
        
        $ret = $this->db->executeQuery(implode('', $query));
        
        return $ret;
    }
}