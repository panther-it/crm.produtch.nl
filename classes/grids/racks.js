Grids.racks = function(params)
{
	params 				= params || {};
	if (!params.id)
		params.id		= "racks";

	var grid 			= new Grid(params);
	grid.fields["id"] 		= fields.hidden(); 
	grid.fields["suite"] 		= fields.suites(); 
	grid.fields["name"] 		= new fields.Textbox(); 
	grid.fields["accesstype"]	= fields.accessTypes();
	grid.fields["accesscode"]	= new fields.Textbox();

	if (params.run)
		grid.run();

	return grid;
}

