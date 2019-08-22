// Constructor
function GridData(params)
{
  this.sortField    = null;
  this.sortOrder    = 1;
  this.parent     = params.parent;
  this.rows    = [];
  this.row     = document.createElement("tr");
  this.row.className   = "data normal even ";
}


// Functions
with (GridData)
{
  // Description: builds the grid data-rows with label/input-elements.
  prototype.build = function()
  {
    var group  = document.createElement("tbody");
    var field;
    var row;
    var record;
    var records   = this.parent.datasource.data;
    this.rows   = [];

    for(i=0; i<records.length; i++)
    {
      record     = records[i];
      row    = this.row.cloneNode(false);
      row.onclick  = function(data,row) { return function(event){ data.onClick(row,event); }; }(this,row);
      records[i].index = i;

      for (var fieldName in this.parent.fields)
      {
        field     = this.parent.fields[fieldName];
        field.setContent(record,i);
        cell     = field.cell.cloneNode(true); 
        cell.removeChild(cell.firstChild);   //remove input-field
        cell.innerHTML   = field.textValue();   //replace with plain text value
        row.appendChild(cell);
      }
      this.rows.push(row);
      group.appendChild(row);
    }
    this.parent.filter.apply();
    this.show(0,9); //initial default
    return group;
  }

  prototype.show = function(from,to)
  {
    var even = 0;
    for(var i=0; i < this.rows.length; i++)
    {
      if (this.rows[i].className.search(/filtered/) != -1) 
      { 
        if (i <= to  ) to++;
        if (i <= from) from++;
        continue; 
      }
      this.rows[i].style.display   = (i >= from && i <= to) ? "" : "none";
      this.rows[i].className     = this.rows[i].className.replace(/even|odd/, even++%2 ? "even" : "odd");
    } 
  }

  prototype.onClick = function(row,event)
  {
    this.parent.form.scrollbar.goto(row.index()); 
    this.parent.form.show(event); //un-hide
  }

  prototype.sort = function(fieldName)
  {
    var records   = this.parent.datasource.data;
    var table  = this.rows[0].parentNode;
    var sortedRows   = [];
    me    = this;
    this.sortOrder *= (this.sortField == fieldName) ? -1 : 1;
    this.sortField   = fieldName;

    records.sort(this._sort);

    for (i=0; i < records.length; i++)
    {
      oldRow = this.rows[records[i].index];
      records[i].index = i;
      sortedRows.push(oldRow);
      table.removeChild(oldRow);
      //table.insertBefore(oldRow,table.firstChild);
      table.appendChild(oldRow);
    }
    this.rows = sortedRows;
    this.parent.scrollbar.onChange();
  }

  prototype._sort = function(a,b)
  {
    switch(typeof(a[me.sortField]))
    {
      case "string":
        var x = a[me.sortField];
        var y = b[me.sortField];
        if (typeof(x) == "string") x = x.toLowerCase();
        if (typeof(y) == "string") y = y.toLowerCase();
        if (x < y) return  1 * me.sortOrder;
        if (x > y) return -1 * me.sortOrder;
      default:
        if (a[me.sortField] < b[me.sortField]) return  1 * me.sortOrder;
        if (a[me.sortField] > b[me.sortField]) return -1 * me.sortOrder;
    }
    return 0;
  }
}
