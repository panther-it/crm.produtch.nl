// Constructor
fields.DropDownList  = function(params) 
{
  this.input      = document.createElement("SELECT");
  this.input.options[0]    = new Option("","");
  params.input      = this.input;
  this.base.constructor.call(this,params);

  if (!this.datasource)
  {
    this.datasource   = new DataSources.Hubble();
    this.datasource.command = this.name() + ".list";
  }
  this.datasource.onCollected   = function(field){ return function(){field.build()  ;}; }(this);
}



with (fields.DropDownList)
{
  // Hiarchie
  inherits(fields.Generic);


  // Functions
  prototype.setAttributes = function(params)
  {
    if (!params) return;
    this.base.setAttributes.call(this,params);
    if (params.datasource)  this.datasource = params.datasource;
  }


  prototype.name = function(value)
  {
    if (!value)
      return this.base.name.call(this,value);
    else
    {
      this.base.name.call(this,value);
      this.datasource.command = value + ".list";
    }
  }


  prototype.run = function()
  {
    if (!this.datasource) return
    if (this.datasource.data.length > 0)
      this.build();
    else
      this.datasource.collect();
  }


  prototype.textValue = function(value)
  {
    if (!value)
    { //get
      return this.input.options[this.input.selectedIndex].innerHTML;
    }
    else
    { //set
      return this.value(value);
      //loop thru select to get value from text
    }
  }


  prototype.setContent = function(record,index)
  {
    var option;
    var value     = record[this.name()];

    this.base.setContent.call(this,record,index);
    //this.input.selectedIndex= index;

    /*
    for(var i in this.input.options)
    {
      option     = this.input.options[i];
      option.selected = (option.value == ""+value);
    }*/
  }


  prototype.build = function()
  {
    var record, records = this.datasource.data;
    for(var i=0; i < records.length; i++)
    {
      record = records[i];
      if (i+1 == this.input.options.length)
        this.input.options[i+1]     = new Option(record.name,record.id); 
      else
      { //overwrite existing option (maintain selectedIndex)
        this.input.options[i+1].value     = record.id;
        this.input.options[i+1].innerHTML  = record.name;
      }
    }
  }

}
