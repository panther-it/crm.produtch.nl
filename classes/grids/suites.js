Grids.suites = function(params)
{
	params 				= params || {};
	if (!params.id)
		params.id		= "suites";

	var grid 			= new Grid(params);
	grid.fields["id"] 		= fields.hidden(); 
	grid.fields["datacenter"] 	= fields.datacenters(); 
	grid.fields["name"] 		= new fields.Textbox(); 
	grid.fields["floor"]		= new fields.Textbox();

	if (params.run)
		grid.run();

	return grid;
}

