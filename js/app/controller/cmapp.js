function CmApp() {
    this.initApp();
    this.searchProducts();
    sc.initShoppingCart();
}

CmApp.prototype = new BaseController;

CmApp.prototype.eventOnBtnClick = function(btn) {
    switch (btn.id) {
    case 'b_search':
        this.searchProducts();
        break;
    /* ---------- shopping cart ----------- */
    case 'add_to_cart':
        sc.addItem();
        break;
    /* ------------------------------------ */
    default:
        // do nothing
        break;
    }
}

CmApp.prototype.searchProducts = function() {
    var cnt = Util.getFieldsContent();
    var me = this;

    var cb = function(ret) {
        me.displayData(ret);
    };

    Util.doRequest({service: 'search_prod', search: cnt.t_search}, cb);
}

CmApp.prototype.displayData = function(data) {
    var grid = new Grid;

    var colConfig = [
        {key: 'productName', desc: 'Name', width: 350},
        {key: 'productScale', desc: 'Scale', width: 40},
        {key: 'buyPrice', desc: 'Price', width: 70}
    ];

    grid.create(colConfig, 'result-grid-cnt', data);

    grid.eventOnRowSelect = function(row) {
        Util.setFieldsContent(row.data);
    };

    document.getElementById('count').innerHTML = 'results: ' + data.length;
}
