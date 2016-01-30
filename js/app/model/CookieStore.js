/* ------------------ Shopping Cart --------------------- */
function CookieStore(mylocation){
  var path = mylocation;
}

CookieStore.prototype.CART = 'cart';

CookieStore.prototype.__store = function(key, val, expDays){
  var date = new Date;
  date.setTime( date.getTime() + expDays * 86400000 );
  document.cookie = key + '=' + val + '; expires=' + date.toUTCString() + '; path=' + this.path;
}

CookieStore.prototype.__getCookie = function(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

CookieStore.prototype.storeSC = function(){
  var cart = JSON.stringify(sc);
  this.__store(this.CART, cart, 5);
}

CookieStore.prototype.restoreShoppingCart = function(cart){
  var c = this.__getCookie(this.CART);
  if (c !== '')
  {
    var cart = JSON.parse(c);
    if (cart !== 'undefined' && cart.items.length != 0)
    {
        sc.items = cart.items;
    }
  }
}

/* ------------------------------------------------------ */

var cook = new CookieStore('78.47.118.198');
