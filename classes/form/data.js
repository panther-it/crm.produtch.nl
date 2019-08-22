// Constructor
function FormData(params)
{
  this.parent     = params.parent;
  this.rows    = [];
  this.recordIndex  = 0;
  this.row     = document.createElement("tr");
}


// Functions
with (FormData)
{
  // Description: builds the grid data-rows with label/input-elements.
  prototype.build = function()
  {
    var group  = document.createElement("tbody");
    var field;
    var row;
    var field;
    var labelCell, inputCell, inputField;
    var records   = this.parent.datasource.data;
    var record   = records[this.recordIndex];
    this.rows   = [];

    for (var fieldName in this.parent.fields)
    {
      field    = this.parent.fields[fieldName];
      row      = this.row.cloneNode(true);
      field.setContent(record,this.recordIndex);
      labelCell    = field.header.cloneNode(true); 
      inputCell    = field.cell; //.cloneNode(true);
      row.className     = field.name();
      row.appendChild(labelCell);
      row.appendChild(inputCell);
      this.rows.push(row);
      group.appendChild(row);
    }
    return group;
  }


  prototype.save = function()
  {
    var field;
    var record  = this.parent.datasource.data[this.recordIndex] || {};
          var ds     = new DataSources.Hubble();
    ds.command  = this.parent.datasource.command.replace(/\..*$/, this.recordIndex ? '.update' : '.insert');
    ds.onCollected   = function(data){ return function(){data.saved()  ;}; }(this);

    for (var fieldName in this.parent.fields)
    {
      field      = this.parent.fields[fieldName];
      oldValue   = record[fieldName];
      if (oldValue != field.value())
        ds.parameters[fieldName] = field.value();
    }
    ds.collect();
  }


  //verify results/response after .save()
  prototype.saved = function()
  {
    var field;
    var fieldIndex  = -1;
    var record  = this.parent.datasource.data[this.recordIndex] || {};

    for (var fieldName in this.parent.fields)
    {
      fieldIndex++;
      field      = this.parent.fields[fieldName];
      oldValue   = record[fieldName];
      if (oldValue != field.value())
      {
        record[fieldName]    = field.value();
        if (this.parent.parent && this.parent.parent.data && this.parent.parent.data.rows[this.recordIndex])
        {
          grid       = this.parent.parent;
          if (cell    = grid.data.rows[this.recordIndex].getChildNodes()[fieldIndex])
            cell.innerHTML   = field.textValue();
        }
      }
    }
    this.parent.hide();
    }


  prototype.remove = function()
  {
    info("dummy remove");
  }

  prototype.show = function(index)
  {
    var record    = this.parent.datasource.data[index] || {};
    this.recordIndex  = index;
    this.parent.scrollbar.page.value = index+1; 

    for (var fieldName in this.parent.fields)
      this.parent.fields[fieldName].setContent(record,index);
  }

  prototype.clear = function()
  {
    this.show(-1);
  }

}
