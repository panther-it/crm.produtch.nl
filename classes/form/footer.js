// Constructor
function FormFooter(params)
{
  this.parent  = params.parent;
  this.buttons    = [ new fields.Button({ name   : "update"
                  , src    : "/style/form/img/save.png"
                , onclick : function(data) { return function() {data.save(); return false;} }(this.parent.data)
                })
        , new fields.Button({ name : "delete"
                  , src  : "/style/form/img/delete.png"
                , onclick : function(data) { return function() {data.remove(); return false;} }(this.parent.data)
                })
        ];
  this.scrollbar  = this.parent.scrollbar;
}


// Functions
with (FormFooter)
{
  // Description: builds the form footer. 
  prototype.build = function()
  {
    var group  = document.createElement("tfoot");
    var row   = document.createElement("tr");
    var cell  = document.createElement("td");
    row.className   = "footer";
    cell.colSpan   = 100;
    cell.appendChild(this.scrollbar.build());
    cell.appendChild(document.createElement("br"));
    cell.appendFields(this.buttons);
    row.appendChild(cell);
    group.appendChild(row);
    return group;
  }
}
