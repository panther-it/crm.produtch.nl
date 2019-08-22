Grids.contacts = function(params)
{
	params 				= params || {};
	if (!params.id)
		params.id		= "contacts";

	var grid 			= new Grid(params);
	grid.fields["id"] 		= fields.hidden(); 
	grid.fields["customer"] 	= fields.customers(); 
	grid.fields["customer"].input.onchange 	= function(grid) { return function(event) { Grids.contacts.prototype.changeOrganization(grid,event); }; }(grid); 
	grid.fields["organization"] 	= fields.organizations(); 
	grid.fields["gender"]	 	= new fields.genders(); 
	grid.fields["firstname"] 	= new fields.Textbox(); 
	grid.fields["lastname"] 	= new fields.Textbox(); 
	grid.fields["fax"]	 	= fields.phone(); 
	grid.fields["phone"] 		= fields.phone(); 
	grid.fields["phone_mobile"] 	= fields.phone(); 
	grid.fields["email"]	 	= new fields.Textbox(); 
	grid.fields["language"] 	= fields.countries(); 
	grid.fields["grafix_id"] 	= new fields.Textbox(); 
	grid.fields["username"] 	= new fields.Textbox(); 
	grid.fields["password"] 	= new fields.Textbox(); 
	grid.fields["function"] 	= fields.contactFunctions(); 
	grid.fields["sidn_owner"] 	= new fields.Textbox(); 
	grid.fields["sidn_contact"] 	= new fields.Textbox(); 

	if (params.run)
		grid.run();

	return grid;
}


Grids.contacts.prototype.changeOrganization = function(grid,event)
{
	var customers		= grid.fields["customer"].value.input; 
	var organizations	= grid.fields["organization"].value.input; 
	var customerId 		= customers.input.options[customers.input.selectedIndex].value;

	for (var i in organizations.options)
		organizations.options[i].style.display = (option.customer == customerId) ? "" : "none";
}

