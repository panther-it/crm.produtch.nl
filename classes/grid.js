function Grid(params)
{
        this.id				= params.id;
	this.formUrl			= "/tables/" + this.id.replace(/$/,".php");
        this.datasource 		= new DataSources.Hubble();
	this.datasource.command     	= this.id + ".query";
	this.datasource.onCollected 	= function(caller){ return function(){caller.build()  ;}; }(this);
        this.filter     		= null;
	this.readonly   		= false;
	this.placeholder		= params.placeholder || "grid_container";
	this.stylesheet			= document.createElement("link");
	this.stylesheet.setAttributes({rel:"stylesheet",type:"text/css",href:"/style/grid/produtch.css"});
	this.table			= document.createElement("table");
	
	this.header			= new GridHeader({parent:this});
	this.scrollbar			= new ScrollBar({parent:this});
	this.filter			= new GridFilter({parent:this});
	this.data			= new GridData({parent:this});
	this.footer			= new GridFooter({parent:this});
	this.fields			= new FieldsCollection({parent:this});

	params.parent			= this;
	params.datasource		= this.datasource;
	params.fields			= this.fields;
	params.placeholder		= "form_container";
	params.id			= "form." + params.id;
	this.form			= new Form(params);

	document.getElementsByTagName("head")[0].appendChild(this.stylesheet);
}


with (Grid)
{

	// Functions
	prototype.run = function()
	{
		try
		{
			this.fields.run();
			this.datasource.collect();
		}
		catch(ex)
		{
			info("grid.run() failed: " + ex );
			info(ex.fileName + ": "+ex.lineNumber);
		}
	}


	prototype.build = function()
	{
		try
		{
			this.table.className = "grid " + this.id;
			this.fields.build();
			this.table.appendChild(this.header.build());
			this.table.appendChild(this.filter.build());
			this.table.appendChild(this.data.build());
			this.table.appendChild(this.footer.build());
			document.getElementById(this.placeholder).appendChild(this.table);

			this.form.build();
		}
		catch(ex)
		{
			info("grid.build() failed: " + ex );
			info(ex.fileName + ": "+ex.lineNumber);
		}
	}
}
