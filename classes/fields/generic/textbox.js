// Constructor
fields.Textbox  = function(params) 
{
  this.base.constructor.call(this,params);
  this.input.setAttribute("type","text");
  this.length     = 80;
  this.setAttributes(params);
}



with (fields.Textbox)
{
  // Hiarchie
  inherits(fields.Generic);

  // Functions
  prototype.setAttributes = function(params)
  {
    if (!params) return;
    this.base.setAttributes.call(this,params);
    if (params.length) this.length     = params.length;
  }
}
