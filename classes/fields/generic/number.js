// Constructor
fields.Number  = function(params) 
{
  this.base.constructor.call(this,params);
  this.length     = 6;
  this.input.onchange  = function(field) { return function() {field.validate(field.input);} }(this);
  this.setAttributes(params);
}



with (fields.Number)
{
  // Hiarchie
  inherits(fields.Generic);

  // Functions
  prototype.validate = function(input)
  {
    error(input,input.value.match(/^[0-9]+$/),"numeric; syntax=[0-9]; example=32");
  }
}
