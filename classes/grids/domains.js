Grids.domains = function(params)
{
	params 				= params || {};
	if (!params.id)
		params.id		= "domains";

	var grid 			= new Grid(params);
	grid.fields["id"] 		= fields.hidden(); 
	grid.fields["domainname"] 	= new fields.Textbox(); 
	grid.fields["customer"]	 	= fields.customers(); 
	grid.fields["adminc"] 		= new fields.Textbox(); 
	grid.fields["techc"] 		= new fields.Textbox(); 
	grid.fields["nameservers"] 	= new fields.DropDownList({label:"NameServers"}); 

	grid.fields["domainname"].input.onchange = Grids.domains.prototype.checkDomainname;
//$form->fields["customer"]->defaultValue = $auth->customer->id;
//$form->fields["adminc"]->defaultValue   = $auth->contact->id;
//$form->fields["techc"]->defaultValue    = $auth->contact->id;

	if (params.run)
		grid.run();

	return grid;
}


Grids.domains.prototype.checkDomainname = function()
	{
		 setError(field,"No subdomains allowed",field.value.split(".").length > 2);
	}


