function grid_load()
{
	grid = Grids.coloAccesses({run:true});
}
window.onload = grid_load;



// OLD
/*
	function changeContact(newCustomer)
	{
		contactField = document.forms["ColoAccess"].elements["contact"];
		getFieldValues(contactField,"Contacts"   ,newCustomer);
	}
*/
