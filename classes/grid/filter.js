// Constructor
function GridFilter(params)
{
  this.parent   = params.parent;
  this.fields  = {}; 
  this.cookie  = new Cookie({namespace:this.parent.id});
  window.addEventListener('keypress',function(filter) { return function(event) { filter.focus(event); }; }(this),false);
}


// Functions
with (GridFilter)
{

  prototype.focus = function(event)
  {
    var target = event.target  || event.srcElement;
    if (target.nodeName == "HTML" && event.charCode == 102)
    {
      for (var fieldName in this.fields) { this.fields[fieldName].focus(); break; };
      event.cancelBubble = false;
    }
  }


  // Description: get filter.data from cookie    
  prototype.getCookie = function()
  {
    var field;
    for (var fieldName in this.fields)
    {
      field = this.fields[fieldName];
      field.value = this.cookie["filter." + field.name] || "";
    }
  }


  // Description: save filter.data to cookie
  prototype.setCookie = function()
  {
    var field;
    for (var fieldName in this.fields)
    {
      field = fieldName;
      this.cookie.set("filter." + field.name, field.value);
    }
  }


  // Description: Loops over DataRows and show/hides them based on filter.data
  prototype.apply = function()
  {
    var record,row,show,value;
    var oldClassName, changed = false;
    for (var y in this.parent.datasource.data)
    {
      record  = this.parent.datasource.data[y];
      row  = this.parent.data.rows[y];
      show  = true;
      for (var fieldName in this.fields)
      {
        value     = "";
        if (record[fieldName])
          value  += record[fieldName];
        filterField   = this.fields[fieldName];
        if (value.search(new RegExp(filterField.value,"i")) == -1)
        {
          show   = false;
          break;
        }
      }
      oldClassName   = row.className;
      row.className   = row.className.replace(/normal|filtered/g, show ? "normal" : "filtered");
      if (oldClassName != row.className) changed = true;
    }
    if (changed) this.parent.scrollbar.gotoFirstPage(); 
    this.setCookie();
  }

    
  // Description: builds the grid filter-row with input-elements.
  prototype.build = function()
  {  
    var field;
    var group  = document.createElement("thead");
    var row   = document.createElement("tr");
    row.className   = "filter";
    group.appendChild(row);

    for (var fieldName in this.parent.fields)
    {
      field      = this.parent.fields[fieldName];
      cell       = field.cell.cloneNode(true); //this.parent.fields[fieldName].cell.cloneNode(true); //document.createElement("td");
      input      = cell.firstChild; //this.parent.fields[fieldName].input.cloneNode(true);
      input.onchange    = function(filter) { return function() {filter.apply();} }(this); //dropdownlist 
      input.onkeyup    = function(filter) { return function() {filter.apply();} }(this); //textbox
      this.fields[field.name]  = input; //push
      row.appendChild(cell);
    }
    this.getCookie();
    return group;
  }
}
