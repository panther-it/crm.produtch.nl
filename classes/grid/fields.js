// Constructor
function FieldsCollection(params)
{
  if (params)
    this.parent = params.parent;
}


// Functions
with (FieldsCollection)
{

  prototype.run = function()
  {
    var field;
    for (var fieldName in this)
    {
      field = this[fieldName];;
      field.name(fieldName);
      if (field.run) field.run();
    }
  }


  // Description: builds the grid header with labels.
  prototype.build = function(reset)
  {
    var field;
    for (var fieldName in this.parent.datasource.fields)
    {
      var field = this.parent.datasource.fields[fieldName];
      if(!this[field.name]) 
        this[fieldName] = Convert.field(field);
      else 
        this[fieldName].setAttributes(field);
    }
  }


  prototype.__iterator__ = function()
  {
    return new FieldIterator(this);
  }


  prototype.clone = function(params)
  {
    var field;
    var temp = new this.constructor(params); 
    if (!temp.parent) 
      temp.parent = this.parent;

    for(var fieldName in this)
    {
      field = this[fieldName];
      temp[fieldName] = field;
    } 
    return temp;
  }
}


function FieldIterator(parent)
{
  //this.parent    = parent;
  this.values    = [];
  this.keys   = [];
  this.current   = 0;

  parent.__iterator__ = undefined;
  for(var key in parent) 
    if (typeof(parent[key]) != "function" && key != "parent" && parent[key] != undefined)
    {
      this.keys.push(key);
      this.values.push(parent[key]);
    }
  delete parent.__iterator__;
}

FieldIterator.prototype.next = function()
{
  if (this.current == this.keys.length) throw StopIteration;
  return [this.keys[this.current],this.values[this.current++]];
}
