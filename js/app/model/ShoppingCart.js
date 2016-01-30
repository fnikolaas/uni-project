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
	var q;
	if (typeof item[1] !== 'undefined') {
		/*	Type Inferency - JS fuck	*/
		if (fields.quantity == '' || fields.quantity === 'undefined') q = 1;
		else q = fields.quantity;

		if (!/[^0-9]/.test(q))
		{
			item[1].count += parseInt(q);
			this.items[item[0]] = item[1];
		}

	}
	else {
		item = fields;
		if (!/[^0-9]/.test(item.quantity) || (item.quantity == '') )
		{
			item['count'] = (item.quantity !== '') ? parseInt(item.quantity) : parseInt(1);
			this.items.push(fields);
		}
	}
	Util.displayShoppingCart(this.items);
	cook.storeSC();
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
	cook.storeSC();
	return false;
}

ShoppingCart.prototype.calculateShoppingCartWholeCosts = function()
{
	var costs = 0;
	for (var i = 0, l = this.items.length; i <l; i++){
		costs += (this.items[i].buyPrice * this.items[i].count);
	}
	return costs;
}

ShoppingCart.prototype.initShoppingCart = function()
{
	cook.restoreShoppingCart(this);
	Util.displayShoppingCart(this.items);
}

var sc = new ShoppingCart;
