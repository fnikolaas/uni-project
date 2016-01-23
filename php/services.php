<?php

error_reporting(E_ALL ^ E_DEPRECATED);
ini_set("display_errors", 1);

include_once 'db.php';
include_once 'product_search.php';

class Services {

	var $db;

	function Services() {
		$this->db = new DB();
		self::getService($_REQUEST);
	}

	function getService($req) {       
		$service = $req['service'];
		switch ($service) {
			case 'search_prod':
				$searchFor = $req['params'];
				$ps = new ProductSearch($this->db, $searchFor);
				$ret = $ps->getList();
				break;
		}

		echo json_encode($ret);
	}
}

new Services();