// Constructor
function GridFooter(params)
{
	this.parent	= params.parent;
	this.buttons    = [ new fields.Button({label 	: "Add"
					      ,onclick	: function(grid) { return function(event) { grid.form.scrollbar.gotoNewPage(event); }; }(this.parent)
				              })
			  ];
	this.scrollbar	= this.parent.scrollbar;
	this.resizer	= document.createElement("div");
	this.resizer.id = "resizer";
	window.addEventListener("mousedown"       ,function(grid) { return function(event) { grid.resize(  event); }; }(this), false); 
	window.addEventListener("mouseup"         ,function(grid) { return function(event) { grid.resized( event); }; }(this), false); 
	window.addEventListener("mousemove"       ,function(grid) { return function(event) { grid.resizing(event); }; }(this), false); 
	this.mouseSession = null;
}


// Functions
with (GridFooter)
{
	// Description: builds the grid footer with labels.
	prototype.build = function()
	{
		var group	= document.createElement("tfoot");
		var row 	= document.createElement("tr");
		var cell	= document.createElement("td");
		row.className 	= "footer";
		cell.colSpan 	= 100;
		cell.appendFields(this.buttons);
		cell.appendChild(this.scrollbar.build());
		cell.appendChild(this.resizer);
		row.appendChild(cell);
		group.appendChild(row);
		return group;
	}


	prototype.resize = function(event)
	{
		event				= event 	|| window.event;
		var target			= event.target	|| event.srcElement;

		if (target.id != "resizer") return;

		this.mouseSession		= 
		{
			 orgX			: event.clientX
			,orgY			: event.clientY
			,orgWidth		: this.parent.table.offsetWidth
			,orgRows		: parseInt(this.parent.scrollbar.rows.value) //this.parent.table.offsetHeight
		}
	}
	

	prototype.resized = function(event)
	{
		this.mouseSession = null;
		this.setCookie();
	}


	prototype.resizing = function(event)
	{
		if (this.mouseSession)
		with(this.mouseSession)
		{
			var diffX	= event.clientX - this.mouseSession.orgX;
			var diffY	= event.clientY - this.mouseSession.orgY;
			this.parent.table.style.width	= (orgWidth  + diffX) + "px";
			this.parent.scrollbar.rows.value = Math.round(orgRows + diffY/18);
			this.parent.scrollbar.onChange();
			event.cancelBubble=true;
		}
	}

	prototype.setCookie = function()
	{
	}

}
