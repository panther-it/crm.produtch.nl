Grids.coloAccesses = function(params)
{
  params         = params || {};
  if (!params.id)
    params.id    = "coloAccesses";

  var grid       = new Grid(params);
  grid.fields["id"]     = fields.hidden(); 
  grid.fields["rack"]     = fields.racks(); 
  grid.fields["customer"]   = fields.customers(); 
  grid.fields["customer"].input.onchange = function(grid,field) { return function(event) { Grids.coloAccesses.prototype.changeContact(grid,field,event); }; }(grid,grid.fields["customer"]); 
  grid.fields["contact"]     = fields.contacts(); 
  grid.fields["accessdevice"]   = fields.accessDevices(); 

  if (params.run)
    grid.run();

  return grid;
}


Grids.coloAccesses.prototype.changeContact = function(grid,customer,event)
{
  var option;
  var customerId   = customer.input.options[customer.input.selectedIndex].value;
  var contact   = grid.fields["contact"].value.input; 

  for (var i in contact.options)
  {
    option = contact.options[i];
    option.style.display = (option.customer == customerId) ? "" : "none";
  }
}

