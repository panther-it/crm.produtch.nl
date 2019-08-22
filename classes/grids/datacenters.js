Grids.datacenters = function(params)
{
	params 				= params || {};
	if (!params.id)
		params.id		= "datacenters";

	var grid 			= new Grid(params);
	grid.fields["id"] 		= fields.hidden(); 
	grid.fields["name"] 		= new fields.Textbox(); 
	grid.fields["address"] 		= new fields.Textbox(); 
	grid.fields["contact"] 		= new fields.Textbox();
	grid.fields["coords"]		= new fields.Textbox();
	grid.fields["accesstype"]	= field.accessTypes();

	if (params.run)
		grid.run();

	return grid;
}

