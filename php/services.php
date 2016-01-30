<?php

error_reporting(E_ALL ^ E_DEPRECATED);
ini_set("display_errors", 1);

include_once 'db.php';
include_once 'product_search.php';
include_once 'customer.php';
include_once 'order.php';

class Services {

	var $db;

	function Services() {
		$this->db = new DB();
		self::getService($_REQUEST);
	}

	function getService($req) {
		$service = $req['service'];
		switch ($service) {
			//Produktsuche ausführen
			case 'search_prod':
				$searchFor = $req['params'];
				$ps = new ProductSearch($this->db, $searchFor);
				$ret = $ps->getList();
				break;

			//Abruf Order History eines Kunden
			case 'order_history':
				$customerID = $req['params'];
				$oh = new order($this->db, $customerID);
				$ret = $oh->getOrderHistory();
				break;

			//Anlegen von Kunden
			case 'create_customer':
				$customerRecord = $req['params'];
				$cc = new customer($this->db, $customerRecord);
				$ret = $cc->setCustomer();
				break;

			//Aktualisierung Kundenstammdaten
			case 'update_customer':
				$customerRecord = $req['params'];
				$uc = new customer($this->db, $customerRecord);
				$ret = $uc->updateCustomer();
				break;

			//Kundendatensatz holen
			case 'get_customer':
				$customerID = $req['params'];
				$gc = new customer($this->db, $customerID);
				$ret = $uc->getCustomer();

			//Passwort holen
			case 'get_password':
				$customerID = $req['params'];
				$gp = new customer($this->db, $customerID);
				$ret = $uc->getCustomerPassword();
		}

		echo json_encode($ret);
	}
}

new Services();
