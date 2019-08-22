function grid_load()
{
	groups	= Grids.products({run:true, constraint:"parent=216"});
	products= Grids.products({run:true});
	features= Grids.products({run:true});
	values	= Grids.products({run:true});
}
window.onload = grid_load;

