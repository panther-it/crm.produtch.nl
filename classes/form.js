

function Form(params)
{
        this.id					= params.id;
	this.parent				= params.parent;
	this.readonly   			= false;
	this.placeholder			= params.placeholder || "form_container";
	this.placeholder			= typeof(this.placeholder) == "string" ? document.getElementById(this.placeholder) : this.placeholder;
	this.stylesheet				= document.createElement("link");
	this.stylesheet.setAttributes({rel:"stylesheet",type:"text/css",href:"/style/form/produtch.css"});
	this.table 				= document.createElement("table");
	this.form				= document.createElement("form");
	this.style				= this.table.style;
	if (params.datasource)
		this.datasource 		= params.datasource;
	else
	{
        	this.datasource 		= new DataSources.Hubble();
		this.datasource.command     	= this.id + ".query";
		this.datasource.onCollected 	= function(caller){ return function(){caller.build()  ;}; }(this);
	}

	if (params.fields)
		this.fields			= params.fields;
	else
		this.fields			= new FieldsCollection({parent:this});

	this.scrollbar				= new FormScrollBar({parent:this});
	this.data				= new FormData({parent:this});
	this.footer				= new FormFooter({parent:this});

	this.form.appendChild(this.table);
	document.getElementsByTagName("head")[0].appendChild(this.stylesheet);
	window.addEventListener('keypress',function(form) { return function(event) { form.onkeypress(event); }; }(this),false);	
	this.form.addEventListener('submit'    ,function(form) { return function(event) { form.data.save();       }; }(this),false);	
}


with (Form)
{

	// Functions
	prototype.run = function()
	{
		this.datasource.collect();
	}

	prototype.build = function()
	{
		this.table.className = "form " + this.id;
		this.fields.build();
		this.table.appendChild(this.data.build());
		this.table.appendChild(this.footer.build());
		this.placeholder.appendChild(this.form);
	}

	prototype.show	= function(event)
	{
		var firstField 			= this.data.rows[0].children[1].children[0];
		this.placeholder.className 	= "show"; //style.display = "block";
		this.placeholder.style.top 	= (event.pageY+20) + "px";
		if (firstField.select)
			firstField.select();
		else
			firstField.focus();
	}

	prototype.hide	= function()
	{
		this.placeholder.className = "hide"; 
	}

	prototype.onkeypress = function(event)
	{
		switch(event.keyCode)
		{
			case 27: //escape
				this.hide();
				break;
			case 13: //enter
				this.data.save();
				break;
		}
	}
}
