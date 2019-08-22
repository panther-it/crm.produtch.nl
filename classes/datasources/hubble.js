// Constructor
DataSources.Hubble = function()
{
	this.connectionString  += "/processor.php";
	this.className		= "";
	this.action		= "";
	this.parameters		= {};
}


with (DataSources.Hubble)
{
	// Hiarchie
	inherits(DataSources.Ajax);

	// Functions
	prototype.collect = function(parameters)
	{
		if (parameters) this.parameters = parameters;
		if (this.data && this.data.length > 0) 
			this.onCollected(this);

		var command     = this.command.split(".");
		var queryString = "class="   + escape(command[0]  ) + "&"
	       			+ "action="  + escape(command[1]  ) + "&"
	       			+ "command=" + escape(this.command) + "&"
	       			+ "values="  + encodeURI(JSON.stringify(this.parameters));
		logging.info(this.command + "?values=" + JSON.stringify(this.parameters));

		this.send(queryString);
	}


}

