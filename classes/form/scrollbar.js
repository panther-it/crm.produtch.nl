//Constructor
function FormScrollBar(params)
{
	this.base.constructor.call(this,params);
	
	//remove "| Rijen: [__]"
	this.container.removeChild(this.rows.previousSibling);
	this.rows.style.display	= "none";
	this.rows.value		= 1;
	this.rows.setAttribute("oldValue",1);
}

with (FormScrollBar)
{
	// Hiarchie
	inherits(ScrollBar);

	// Functions
	prototype.getCookie = function()
	{
		this.page.value = this.cookie["form.scrollbar.page"] || this.page.value;
		this.page.setAttribute("oldValue", this.page.value);
	}	

	prototype.setCookie = function()
	{
		this.cookie.set("form.scrollbar.page",this.page.value);
	}	



}


