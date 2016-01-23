function Grid() {
}

Grid.prototype.create = function(colConfig, cnt, data) {
    this.colConfig = colConfig;
    this.container = cnt;
    this.data      = data;
    
    this.createTable();
}

Grid.prototype.createTable = function() {
    var baseNode = document.getElementById(this.container);
    var me = this;
    
    var table = document.createElement('table');
    var th    = document.createElement('thead');
    var tb    = document.createElement('tbody');
    
    for (var i in this.colConfig) {
        var col = this.colConfig[i];
        var thcell = document.createElement('th');

        thcell.setAttribute('width', col.width);
        thcell.setAttribute('align', 'left');
        thcell.innerHTML = col.desc;
        
        th.appendChild(thcell);
    }

    for (var j = 0, l = this.data.length; j < l; j++) {
        var row = document.createElement('tr');
        
        for (i in this.colConfig) {
            col = this.colConfig[i];
            var trcell = document.createElement('td');

            trcell.setAttribute('width', col.width);
            trcell.setAttribute('align', 'left');
            trcell.innerHTML = this.data[j][col.key];

            row.appendChild(trcell);
        }
        
        row.setAttribute('class', 'grid-row');
        
        row.data = this.data[j];
        
        row.addEventListener('click', function() {
            me.__eventOnRowSelectWrapper(this);
        }, true);
        
        tb.appendChild(row);
    }
    
    table.appendChild(th);
    table.appendChild(tb);
    
    baseNode.removeChild(baseNode.firstChild);
    baseNode.appendChild(table);
}

Grid.prototype.__eventOnRowSelectWrapper = function(row) {
    if (this.selectedRow) {
        this.selectedRow.style.backgroundColor = '';
        this.selectedRow.style.color = '#3d3644';
    }
    
    this.selectedRow = row;
    
    this.selectedRow.style.backgroundColor = '#3d3644';
    this.selectedRow.style.color = 'white';
    
    this.eventOnRowSelect(row);
}

Grid.prototype.eventOnRowSelect = function(row) {
    
}
