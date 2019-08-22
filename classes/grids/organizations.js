Grids.organizations = function(params)
{
	params 				= params || {};
	if (!params.id)
		params.id		= "organizations";

	var grid 			= new Grid(params);
	grid.fields["id"] 		= fields.hidden(); 
	grid.fields["customer"]	 	= fields.customers(); 
	grid.fields["name"] 		= new fields.Textbox(); 
	grid.fields["email"] 		= new fields.Textbox(); //grid=link,form=text 
	grid.fields["phone"] 		= new fields.Textbox(); 
	grid.fields["city"] 		= new fields.Textbox(); 

	if (params.run)
		grid.run();

	return grid;
}

