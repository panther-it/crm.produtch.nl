function grid_load()
{
	grid 	= Grids.orders({run:true, constraint:"parent=0"});
	suborder= Grids.orders({run:true, constraint:"parent=0"});
}
window.onload = grid_load;

