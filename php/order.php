<?php
/*
* Die Orderklasse beinhaltet alle Bestelldatenspezifischen Operationen,
* die in der App durchgefuehrt werden.
* @author Martin Lux
*
*/


class order {

	//Konstruktor
    function order($db, $params) {
        $this->db = $db;
        $this->params = $params;

    }

	//Abruf der Bestellhistorie eines Kunden
	public function getOrderHistory() {
		//Umwandlung der Kundennummer in Int
		$customerNumber = intval ( $this->params['customerNumber'], $base = 10  );

		//Bau der Query
		$query = array(
			'select o.orderNumber, o.orderDate, o.status, od.quantityOrdered, od.priceEach',
			'from orders o, orderdetails od',
			'where customerNumber = ' ,
      $customerNumber,
			';'
			);

		//Ausführung der Query
		$ret = $this->db->executeQuery(implode('', $query));

		//Rückgabe von True oder False
		return $ret;
	}

}
?>
