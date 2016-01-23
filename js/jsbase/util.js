function Util() {
}

Util.prototype.getElementsByClassName = function(className) {
    var nodeList = {'DIV': 1, 'SPAN': 1, 'INPUT': 1};
    var ret = [];
    
    for (var j in nodeList) {
        var nodes = document.getElementsByTagName(j);
        var node  = null;

        for (var i = 0, l = nodes.length; i < l; i++) {
            node = nodes[i];
            
            var cls = node.className.split(' ');
            var classes = this.arrayToHash(cls);
            
            if (className in classes) {
                ret.push(node);
            }
        }
    }
    
    return ret;
}

Util.prototype.arrayToHash = function(arr) {
    var o = {};
    
    for (var i = 0, l = arr.length; i < l; i++) {
        o[arr[i]] = 1;
    }
    
    return o;
}

Util.prototype.getFieldsContent = function() {
    var fields = document.getElementsByTagName('INPUT');
    var ret = {};
    
    for (var i = 0, n; n = fields[i]; i++) {
        if (n.type == 'text') {
            ret[n.id] = n.value;
        }
    }
    
    return ret;
}

Util.prototype.setFieldsContent = function(data) {
    for (var i in data) {
        var n = document.getElementById(i);
        
        if (n) {
            n.value = data[i];
        }
    }
}

Util.prototype.doRequest = function(params, cb) {
    var request = new XMLHttpRequest;
    var baseUrl = 'php/services.php';
    var reqParams = this.addParams(params);

    request.open('POST', baseUrl, true);
    
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status === 200) {
            cb(eval(request.responseText));
        }
    };

    request.send(reqParams);
}

Util.prototype.addParams = function(params) {
    var paramsStrg = '';
    
    for (var i in params) {
        paramsStrg += paramsStrg == '' ? '' : '&';
        
        if (i == 'service') {
            paramsStrg += i + '=' + params[i];
        } else {
            paramsStrg += 'params[' + i + ']=' + params[i];
        }
        
    }
    
    return encodeURI(paramsStrg);
}


var Util = new Util;