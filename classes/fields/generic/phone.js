// Constructor
fields.Phone  = function(params) 
{
  this.base.constructor.call(this,params);
  this.required    = true;
  this.length     = 13;
  this.label("Telefoon");
  this.input.onchange  = function(field) { return function() {field.validate(field.input);} }(this);
  this.setAttributes(params);
}



with (fields.Phone)
{
  // Hiarchie
  inherits(fields.Generic);

  // Functions
  prototype.validate = function(input)
  {
    input.value = input.value.replace(/[+]/g,"00");
    input.value = input.value.replace(/[ .-]/g,"");
    error(input,input.value.match(/[0-9]{6,20}/),"numeric; min=6; max=20; syntax=00[country][area][number]; example=0031.6.12345678");
  }
}
