//import("/classes/grid.js.php",grid_load);

function grid_load()
{
	grid 		= Grids.domains({run:false});
	form		= grid.form;
	nameservers	= Forms.nameservers({run:true});
	contacts	= Forms.contacts({run:true});

	form.fields["customer"].input.onchange	= "changeCustomer(this.selectedIndex);"
                                                . "changeContact(this.options[this.selectedIndex].value);";

	grid.run();

}
window.onload = grid_load;




	function changeCustomer(newIndex)
	{
		document.forms["NameServer"].elements["customer"].selectedIndex = newIndex;
		document.forms["Domain"].elements["customer"].selectedIndex = newIndex;
		document.forms["Contact"].elements["customer"].selectedIndex = newIndex;
	}

	function changeContact(newCustomer)
	{
		ownerField  = document.forms["Domain"].elements["customer"];
		techcField  = document.forms["Domain"].elements["adminc"];
		admincField = document.forms["Domain"].elements["techc"];
		nsField     = document.forms["Domain"].elements["nameservers"];
		getFieldValues(techcField,"Contacts"   ,newCustomer);
		getFieldValues(nsField   ,"NameServers",newCustomer);
	}

	function checkDomainname(field)
	{
		 setError(field,"No subdomains allowed",field.value.split(".").length > 2);
	}


