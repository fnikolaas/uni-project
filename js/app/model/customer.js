//class customer

function Customer()
{
  this.customerID;
  this.name;
  this.lastname;
  this.password;
  this.phone;
  this.addressLine1;
  this.addressLine2;
  this.city;
  this.postalCode;
  this.country;

}

//Store Customer (check availability)
Customer.prototype.setCustomer = function() {
//if available, update

//Util.doRequest({service: 'create_customer', search: }, cb);

}


//validate password --> normalerweise mit Hashwert
Customer.prototype.validatePassword = function() {

}

//check if customer account created
Customer.prototype.checkCustomer = function() {

}

var cust = new Customer;


//Util.prototype.doRequest = function(params, cb)
