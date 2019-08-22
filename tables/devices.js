//import("/classes/grid.js.php",grid_load);

function grid_load()
{
	grid = Grids.devices({run:true});
}
window.onload = grid_load;

/* OLD */
function changeRack(newRack)
{
	switchField = document.forms["Device"].elements["switch"];
	pwrswField  = document.forms["Device"].elements["powerswitch"];
	getFieldValues(switchField,"Devices",newRack);
	getFieldValues(pwrswField ,"Devices",newRack);
}

