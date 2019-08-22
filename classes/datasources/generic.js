// NameSpace
var DataSources = {};

// Constructor
DataSources.Generic =  function(params)
{
  this.fields    = [];
  this.data     = [];
  this.error    = false;
  this.connectionString   = null; 
  this.query    = null;
  this.command    = null;
  this.parameters    = {};
  this.onCollected  = function(datasource){}(this);
  this.setParameters(params);
}

with (DataSources.Generic)
{
  // Functions
  prototype.setParameters = function(params)
  {
    if (!params) return;
    if (params.data) this.data = params.data;
  }


  prototype.collect = function()
  {
    this.onCollected();
  }
}

