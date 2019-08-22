Grids.cables = function(params)
{
	params 				= params || {};
	if (!params.id)
		params.id		= "cables";

	var grid 			= new Grid(params);
	grid.fields["id"] 		= fields.hidden(); 
	grid.fields["deviceA_id"] 	= fields.devices(); 
	grid.fields["deviceA_port"] 	= new fields.Textbox(); 
	grid.fields["deviceB_id"] 	= fields.devices(); 
	grid.fields["deviceB_port"] 	= new fields.Textbox(); 
	grid.fields["cableType"] 	= fields.cableTypes(); 

	if (params.run)
		grid.run();

	return grid;
}

