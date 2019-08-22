// Constructor
function GridHeader(params)
{
  this.parent = params.parent;
  window.addEventListener("mousedown"       ,function(grid) { return function(event) { grid.resize(  event); }; }(this), false); 
  window.addEventListener("mouseup"         ,function(grid) { return function(event) { grid.resized( event); }; }(this), false); 
  window.addEventListener("mousemove"       ,function(grid) { return function(event) { grid.resizing(event); }; }(this), false); 
  this.mouseSession = null;
}


// Functions
with (GridHeader)
{
  prototype.resize = function(event)
  {
    event        = event   || window.event;
    var target      = event.target  || event.srcElement;

    if (target.parentNode.parentNode.tagName != "THEAD") return;

    this.mouseSession    = 
    {
       rightCol    : target
      ,leftCol    : target.previousSibling 
      ,orgX      : event.clientX
      ,orgRightWidth    : target.offsetWidth
      ,orgLeftWidth    : target.previousSibling.offsetWidth
    }

  }
  

  prototype.resized = function(event)
  {
    this.mouseSession = null;
    this.setCookie();
  }


  prototype.resizing = function(event)
  {
    if (this.mouseSession)
    with(this.mouseSession)
    {
      var diff  = event.clientX - this.mouseSession.orgX;
      leftCol.style.width  = (orgLeftWidth  + diff) + "px";
      rightCol.style.width  = (orgRightWidth - diff) + "px";
    }
  }


  // Description: builds the grid header with labels.
  prototype.build = function()
  {
    var field;
    var header;
    var group  = document.createElement("thead");
    var row   = document.createElement("tr");
    row.className   = "header";
    group.appendChild(row);

    for (var fieldName in this.parent.fields)
    {
      field     = this.parent.fields[fieldName];
      header    = field.header.cloneNode(true); //this.parent.fields[fieldName].header.cloneNode(true);
      header.onclick  = function(header,fieldName) { return function() { header.parent.data.sort(fieldName); }; }(this,field.name);
      row.appendChild(header);
    }

    return group;
  }


  prototype.setCookie = function()
  {
    var field;
    for (var fieldName in this.parent.fields)
    {
      field = this.parent.fields[fieldName];
      field.setCookie();
    }
  }  

}
