function grid_load()
{
	grid 	= Grids.organizations({run:true});
	servers	= Grids.devices({run:true});
	access	= Grids.coloAccesses({run:true});
	domains	= Grids.domains({run:true});
	tasks	= Grids.tasks({run:true});
	orders	= Grids.orders({run:true, constraint: "(oo.parent=0 OR oo.parent IS NULL)"});
}
window.onload = grid_load;

