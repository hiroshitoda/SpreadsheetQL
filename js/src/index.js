var _visibleData = [{'a':'', 'b':'', 'c':'', 'd':'', 'e':'', 'f':'', 'g':'', 'h':'', 'i':'', 'j':'', 'k':'', 'l':'', 'm':'', 'n':'', 'o':'', 'p':'', 'q':'', 'r':'', 's':'', 't':'', 'u':'', 'v':'', 'w':'', 'x':'', 'y':'', 'z':''}];
var _fullData = [{'a':'', 'b':'', 'c':'', 'd':'', 'e':'', 'f':'', 'g':'', 'h':'', 'i':'', 'j':'', 'k':'', 'l':'', 'm':'', 'n':'', 'o':'', 'p':'', 'q':'', 'r':'', 's':'', 't':'', 'u':'', 'v':'', 'w':'', 'x':'', 'y':'', 'z':''}];

var _container = document.getElementById('spreadsheet');
var _colHeaders = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var _hotOptions = {
    data: _visibleData,
    rowHeaders: true,
    colHeaders: _colHeaders,
    manualColumnResize: true,
    manualRowResize: true,
    minSpareRows: 1,
    minSpareCols: 1,
    contextMenu: true,
    columnSorting: true,
    sortIndicator: true,
    fillHandle: true,
    outsideClickDeselects: true,
    autoRowSize: true,
    copyPaste: true,
    copyRowsLimit: 10000,
    afterPaste: function(){
        _fullData = JSON.parse(JSON.stringify(_visibleData));
    }
};
var _hot = new Handsontable(_container, _hotOptions);

var ViewModelClass = function ViewModelClass(){
    var self = this,
        defaultSQL = 'SELECT * FROM _BELOW_TABLE';
    
    self.sql = ko.observable(defaultSQL);
    
    self.executeSQL = function executeSQL(){
        var sql = self.sql();
        if (sql === '') {
            return;
        }

        _visibleData = alasql(sql.replace('_BELOW_TABLE', '?'), [_fullData]);  
        _hot.loadData(_visibleData);
        _hot.render();
    };
    
    self.clearSQL = function clearSQL(){
        self.sql(defaultSQL);
        _visibleData = JSON.parse(JSON.stringify(_fullData));
        _hot.loadData(_visibleData);
        _hot.render();
    };
};
var ViewModel = new ViewModelClass();
ko.applyBindings(ViewModel);