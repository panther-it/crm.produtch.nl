function grid_load()
{
	grid 	= Grids.nameservers({run:true});
	domains	= Grids.domains({run:true});
}
window.onload = grid_load;

