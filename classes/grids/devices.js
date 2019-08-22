Grids.devices = function(params)
{
	params 				= params || {};
	if (!params.id)
		params.id		= "devices";

	var grid 			= new Grid(params);
	grid.fields["id"] 		= fields.hidden(); 
	grid.fields["rack"] 		= fields.racks(); 
	grid.fields["customer"] 	= fields.customers(); 
	grid.fields["type"] 		= fields.deviceTypes(); 

	if (params.run)
		grid.run();

	return grid;
}

