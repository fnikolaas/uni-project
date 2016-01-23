function BaseController() {
}

BaseController.prototype.initApp = function() {
    this.addEvents();
}

BaseController.prototype.addEvents = function() {
    var tabs = Util.getElementsByClassName('tab');
    var me = this;
    
    for (var i = 0, l = tabs.length; i < l; i++) {
        tabs[i].addEventListener('click', function() {
            me.activateTab(this, tabs);
        }, true);
    }
    
    var btns = document.getElementsByTagName('INPUT');
    
    for (i = 0, l = btns.length; i < l; i++) {
        var btn = btns[i];
        
        if (btn.type == 'button') {
            btn.addEventListener('click', function() {
                me.handleBtn(this);
            }, true);
        }
    }
}

BaseController.prototype.showPage = function(tab) {
    var pages = Util.getElementsByClassName('page');
            
    for (var i = 0, l = pages.length; i < l; i++) {
        pages[i].style.display = 'none';
    }
    
    document.getElementById(tab.id + '_page').style.display = 'block';
}

BaseController.prototype.activateTab = function(tab, tabs) {
    for (var i = 0, l = tabs.length; i < l; i++) {
        var t = tabs[i];
        
        t.className = 'tab';
    }
    
    tab.className = 'tab ' + 'active-tab';
    
    this.showPage(tab);
}

BaseController.prototype.handleBtn = function(btn) {
    this.eventOnBtnClick(btn);
}

BaseController.prototype.eventOnBtnClick = function(btn) {
}