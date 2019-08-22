Grids.products = function(params)
{
	params 				= params || {};
	if (!params.id)
		params.id		= "products";

	var grid 			= new Grid(params);
	grid.fields["id"] 		= fields.hidden(); 
	grid.fields["label"] 		= new fields.Textbox();
	grid.fields["info_uri"] 	= new fields.Textbox()
	grid.fields["recap_uri"] 	= new fields.Textbox(); 
	grid.fields["enabled"] 		= new fields.Checkbox(); 
	grid.fields["recurring"]	= new fields.Checkbox(); 
	grid.fields["price_1"]	 	= new fields.Textbox(); 
	grid.fields["price_3"]	 	= new fields.Textbox(); 
	grid.fields["price_6"]	 	= new fields.Textbox(); 
	grid.fields["price_12"] 	= new fields.Textbox(); 

	if (params.run)
		grid.run();

	return grid;
}


