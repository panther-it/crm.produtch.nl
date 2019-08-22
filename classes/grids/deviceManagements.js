Grids.deviceManagements = function(params)
{
	params 				= params || {};
	if (!params.id)
		params.id		= "deviceManagements";

	var grid 			= new Grid(params);
	grid.fields["id"] 		= fields.hidden(); 
	grid.fields["device"] 		= fields.devices(); 
	grid.fields["type"] 		= fields.deviceManagementTypes(); 
	grid.fields["ip"] 		= new fields.Textbox();
	grid.fields["username"]		= new fields.Textbox();
	grid.fields["password"]		= new fields.Textbox(); 

	if (params.run)
		grid.run();

	return grid;
}

