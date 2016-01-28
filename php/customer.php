<?php
/*
* Die Customerklasse beinhaltet alle Kundendatenspezifischen Operationen,
* die in der App durchgefuehrt werden.
* @author Martin Lux
*
*/


class Customer {

	//Konstruktor
    function Customer($db, $params) {
        $this->db = $db;
        $this->params = $params;
    }

	//Methode zum Einfuegen von Kundenstammdaten in die Datenbank
	public function setCustomer() {
		//Umwandlung der Kundennummer in Int
		$customerNumber = intval ( this->params['customerNumber'], $base = 10);

		//Bau der Query
		$query = array(
			'insert into customers values (',
			$customerNumber ',',
			this->params['customerName'] ',',
			this->params['contactLastName'] ',',
			this->params['contactFirstName'] ',',
			this->params['phone'] ',',
			this->params['addressLine1'] ',',
			this->params['addressLine2'] ',',
			this->params['city'] ',',
			'NULL,',
			this->params['postalCode'] ',',
			this->params['country'] ',',
			'NULL,',
			'NULL,',
			this->params['email'] ',',
			this->params['password'] ');' ,
			'commit;'
		);
		//Ausfuehrung der Query
		$ret = $this->db->executeQuery(implode('', $query));

		//Rueckgabe von True oder False
		return $ret;
	}

	//Methode zum Updaten der Kundenstammdaten in der Datenbank
	public function updateCustomer() {
		//Umwandlung der Kundennummer in Int
		$customerNumber = intval ( this->params['customerNumber'], $base = 10  );

		$query = array(
			'update customers set',
			'customerName = ' this->params['customerName'] ',',
			'contactLastName = ' this->params['contactLastName'] ',',
			'contactFirstName = ' this->params['contactFirstName'] ',',
			'phone = ' this->params['phone'] ',',
			'addressLine1 = ' this->params['addressLine1'] ',',
			'addressLine2 = ' this->params['addressLine2'] ',',
			'city = ' this->params['city'] ',',
			'postalCode = ' this->params['postalCode'] ',',
			'country = ' this->params['country'] ',',
			'email = ' this->params['email'] ',',
			'password = ' this->params['password'] ',',
			'where customerNumber = ' $customerNumber ';'
			'commit;'
			);

		//Ausfuehrung der Query
		$ret = $this->db->executeQuery(implode('', $query));

		//Rueckgabe von True oder False
		return $ret;
	}


	//Methode zum Abruf der Kundenstammdaten aus der Datenbank mittels Kundennummer
	public function getCustomer() {
		//Umwandlung der Kundennummer in Int
		$customerNumber = intval ( this->params['customerNumber'], $base = 10  );

		//Bau der Query
		$query = array(
			'select * from customer ',
			'where customerNumber = ' $customerNumber,
			';'
			);

		//Ausfuehrung der Query
		$ret = $this->db->executeQuery(implode('', $query));

		//Rueckgabe von True oder False
		return $ret;
	}

	//Methode zum Abruf des Passworts mittels Kundennummer aus der Datenbank
	public function getCustomerPassword() {
		//Umwandlung der Kundennummer in Int
		$customerNumber = intval ( this->params['customerNumber'], $base = 10  );

		//Bau der Query
		$query = array(
			'select password from customer ',
			'where customerNumber = ' $customerNumber,
			';'
			);

		//Ausfuehrung der Query
		$ret = $this->db->executeQuery(implode('', $query));

		//Rueckgabe von True oder False
		return $ret;
	}

}
