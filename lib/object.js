/*
Function.prototype.inherits = function(parent)
{
	this.parent = parent;
	//var parentName = parent.toString().match( /\s*function (.*)\(/ )[1];  
	//this.prototype[parentName] = parent;
	
	for (var i in parent.prototype) 
		this.prototype[i] = parent.prototype[i];  
}
*/


