// Class ShoppingCart

function ShoppingCart()
{
	this.sid;
  this.items = [];
  this.userId;
}

ShoppingCart.prototype.getItemById = function(itemId)
{
  gotFound = false;
	var rTuple = [];

  for(i=0, l=this.items.length; i<l && !gotFound; i++)
	{
		if (this.items[i]['productCode'] == itemId)
		{
			rTuple[0] = i;
			rTuple[1] = this.items[i];
			gotFound = true;
		}
	}
  return rTuple;
}

ShoppingCart.prototype.getItems = function(userId, sessionId)  // avoid session hijack by getting stored cookie and using userId
{
	Session.getLastSession(userId);
	var cookie = Utils.getCookie();
	var isValid = ShoppingCart.validateCookieAgainstSession(cookieSessionId, lastSessionId);
  var items;

  if (isValid){
      items = cookie.items;
  }

	return items;
}

ShoppingCart.prototype.addItem = function(cb)
{
	var fields = Util.getFieldsContent();
	var item = this.getItemById(fields.productCode);

	if (typeof item[1] !== 'undefined') {
		 item[1].count += 1;
		 this.items[item[0]] = item[1];
	 }
	else {
		item = fields;
		item['count'] = 1;
		this.items.push(fields);
	}
	Util.displayShoppingCart(this.items);
	//Cookie.appendItemToSessionCookie(productCode, sessionId);
}

ShoppingCart.prototype.removeItem = function(productCode)
{
	var elementfound = false;
	for(i=0,l = this.items.length; i<l && !elementfound; i++){
		if(this.items[i]['productCode'] == productCode){
			elementfound = true;
			this.items.splice(i, 1);
		}
	}
	//Cookie.removeItemFromSessionCookie(sessionId, itemId)
	return false;
}

var sc = new ShoppingCart;
