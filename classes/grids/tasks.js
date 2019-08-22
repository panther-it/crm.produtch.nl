Grids.tasks = function(params)
{ 
	params 				= params || {};
	if (!params.id)
		params.id		= "tasks";

	var grid 			= new Grid(params);
	grid.fields["id"] 		= fields.hidden(); 
	grid.fields["subject"] 		= new fields.Textbox(); 
	grid.fields["category"] 	= new fields.Textbox(); 
	grid.fields["date_end"]		= new fields.Textbox();
	grid.fields["customer"]		= fields.customers();
	grid.fields["manager"]		= fields.contacts();
	grid.fields["executor"]		= fields.contacts();
	grid.fields["device"]		= fields.devices();
	grid.fields["priority"]		= new fields.Textbox();
	grid.fields["status"]		= new fields.Textbox();

	if (params.run)
		grid.run();

	return grid;
}

