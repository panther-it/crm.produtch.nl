Grids.orders = function(params)
{
	params 				= params || {};
	if (!params.id)
		params.id		= "orders";

	var grid 			= new Grid(params);
	grid.fields["id"] 		= fields.hidden(); 
	grid.fields["customer"] 	= fields.customers(); 
	grid.fields["product"] 		= fields.products(); 
	grid.fields["enabled"] 		= new fields.Checkbox(); 
	grid.fields["label"] 		= new fields.Textbox(); 
	grid.fields["price"] 		= new fields.Textbox(); 
	grid.fields["recurring"] 	= fields.Recurring(); 
	grid.fields["date_start"] 	= new fields.Textbox(); 
	grid.fields["date_end"] 	= new fields.Textbox(); 

	if (params.run)
		grid.run();

	return grid;
}


