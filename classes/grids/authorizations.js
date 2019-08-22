Grids.authorizations = function(params)
{
	params 			= params || {};
	if (!params.id)
		params.id	= "authorization";

	var grid 		= new Grid(params);
	grid.fields["id"] 	= fields.hidden(); 
	grid.fields["customer"] = fields.customers(); 
	grid.fields["contact"] 	= fields.contacts(); 
	grid.fields["level"] 	= fields.authLevels(); 

	if (params.run)
		grid.run();

	return grid;
}

