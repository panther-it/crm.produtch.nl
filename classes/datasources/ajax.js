// Constructor
DataSources.Ajax = function()
{
  this.base.constructor.call(this);
  this.xmlhttp      = new XMLHttpRequest();
  this.connectionString  = "http://" + location.host;
  this.method    = "POST";
}


with (DataSources.Ajax)
{
  // Hiarchie
  inherits(DataSources.Generic);

  // Functions
  prototype.collect = function(parameters)
  {
    if (parameters) this.parameters = parameters;
    this.send("command=" + this.command.trim() + "&" + this.parameters);
  }


  prototype.send = function(queryString)
  {
    queryString = queryString.trim();
    if (this.method == "POST")
    {
      this.xmlhttp.open(this.method, this.connectionString, false);
      this.xmlhttp.onreadystatechange = function(caller){ return function(){caller.receive();}; }(this); 
      this.xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      this.xmlhttp.setRequestHeader("Content-Length", queryString.length);
      //this.xmlhttp.setRequestHeader("Connection", "close");
      this.xmlhttp.setRequestHeader("Accept-Encoding", "*");
      this.xmlhttp.send(queryString);
    }
  }


  prototype.receive = function()
  {
    if(this.xmlhttp == undefined) return;
    if(this.xmlhttp.readyState == 4)
    {
      logging.debug("Datasource." + this.command + ": " + this.command + ": " + this.xmlhttp.status + " HTTP " +  this.xmlhttp.statusText + ": " + this.xmlhttp.responseText);
      if (this.xmlhttp.status == 200 && this.xmlhttp.responseText != null)
      {  
        this.result  = eval("(" + this.xmlhttp.responseText + ")");
        this.fields  = this.result.fields;
        this.data    = this.result.data;
        this.error   = this.result.error;
        if (this.error)
          logging.error("DataSource." + this.command + ": " + this.error);
        else
        {
          logging.debug("DataSource." + this.command + ": " + this.data.length + " records.");
          this.onCollected(this);
        }
      }
      else
      {
        logging.warning("Datasource." + this.command + ": " + "empty backend response."); 
      }

      //drop request
      this.xmlhttp.onreadystatechange = function(){}; //undefined;
      this.xmlhttp.abort();
      this.xmlhttp = undefined; 
    }

  }


}

