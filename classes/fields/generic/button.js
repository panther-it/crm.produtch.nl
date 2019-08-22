// Constructor
fields.Button  = function(params) 
{
  this.base.constructor.call(this,params);
  this.name("submit");
  this.input.setAttribute("type","image");
  this.input.onclick  = function(){ alert("onClick"); }; //doRow(this);
  this.setAttributes(params);
}




with (fields.Button)
{
  // Hiarchie
  inherits(fields.Generic);

  // Functions
  prototype.setAttributes = function(params)
  {
    if (!params) return;
    this.base.setAttributes.call(this,params);
    if (params.label   ) this.input.value    = params.label;
    if (params.src     ) this.input.src     = params.src;
    if (params.source  ) this.input.src     = params.source;
    if (params.onclick  ) this.input.onclick    = params.onclick;
  }

}
