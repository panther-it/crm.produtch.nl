Grids.nameservers = function(params)
{
	params 				= params || {};
	if (!params.id)
		params.id		= "nameservers";

	var grid 			= new Grid(params);
	grid.fields["id"] 		= fields.hidden(); 
	grid.fields["customer"] 	= fields.customers(); 
	grid.fields["ns1"] 		= new fields.Textbox(); 
	grid.fields["ns2"] 		= new fields.Textbox(); 
	grid.fields["ns3"] 		= new fields.Textbox(); 

	if (params.run)
		grid.run();

	return grid;
}

