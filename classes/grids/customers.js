Grids.customers = function(params)
{
	params 				= params || {};
	if (!params.id)
		params.id		= "customers";

	var grid 			= new Grid(params);
	grid.fields["id"] 		= fields.hidden(); 
	grid.fields["name"]	 	= new fields.Textbox({label:"Klant naam"}); 
	grid.fields["organization"] 	= fields.organizations(); 
	grid.fields["state"]	 	= fields.customerStates(); 
	grid.fields["bank_account"] 	= new fields.Textbox({label:"Bankrekening"}); 

	if (params.run)
		grid.run();

	return grid;
}

