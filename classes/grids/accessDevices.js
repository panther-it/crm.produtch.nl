Grids.accessDevices = function(params)
{
	params 				= params || {};
	if (!params.id)
		params.id		= "accessDevices";

	var grid 			= new Grid(params);
	grid.fields["id"] 		= fields.hidden(); 
	grid.fields["accesstype"] 	= fields.accessTypes(); 
	grid.fields["accessid"] 	= new fields.Textbox({label:"Access-ID"}); 
	grid.fields["suite"] 		= fields.suites(); 

	if (params.run)
		grid.run();

	return grid;
}

