// Namespace
var fields = {};

// Constructor
fields.Generic = function(params)
{
	this.input 		= document.createElement("input");
	this.input.setAttribute("type","text");
	this.header		= document.createElement("th");
	this.cell		= document.createElement("td");
	this._name  		= null;
	this._label		= null;
	this.type		= "string";
	this.readOnly 		= false;
	this.visible  		= true;
	this.required 		= false;
	this.defaultValue 	= null;
	this.parent		= null;
	this.setAttributes(params);
	this.input.field	= this;
	this.cookie		= new Cookie({namespace:this.name()});
	this.cell.appendChild(this.input);
	this.getCookie();
}

// Functions
with (fields.Generic)
{

	prototype.setAttributes = function(params)
	{
		if (!params) return;
		if (typeof params === "string") params = eval('(' + params + ')'); //decode(json)
		if (params.name		) this.name(params.name);
		if (params.def 		) this.defaultValue	= params.def;
		if (params.not_null	) this.required		= true;
		if (params.primary_key	) this.required		= true;
		if (params.required	) this.required		= true;
		if (params.style	) this.input.setAttribute( "style",params.style);
		if (params.style	) this.header.setAttribute("style",params.style);
		if (params.style	) this.cell.setAttribute(  "style",params.style);
		if (params.input_style  ) this.input.setAttribute( "style",params.input_style);
		if (params.header_style	) this.header.setAttribute("style",params.header_style);
		if (params.cell_style	) this.cell.setAttribute(  "style",params.cell_style);
		if (params.label	) this.label(params.label);
		if (params.readOnly	) this.readOnly		= params.readOnly;
		if (params.readonly	) this.readOnly		= params.readonly;
		if (params.type		) this.type		= params.type;
		if (params.input	) this.input		= params.input;
		if (params.cell		) this.cell		= params.cell;
		if (params.parent	) this.parent		= params.parent;
	}


	prototype.setContent = function(record,index)
	{
		var value		= record[this.name()] || "";
		this.input.record	= record;
		this.input.index	= index;
		this.input.value	= value;
		this.input.oldValue	= value;
	}


	prototype.name = function(value)
	{
		if (!value)
		{ //get
			return this._name;
		}
		else
		{ //set
			this._name		= value;
			this.input.name		= value;
			this.header.className	= value;
			this.cell.className	= value;
			if (!this._label)
				this.label(value);
		}
	}


	prototype.value = function(value)
	{
		if (!value)
		{ //get
			if (this.input.value == "") 
					return null; 
				else 
					return this.input.value;
		}
		else
		{ //set
			this.input.value = value;
		}
	}


	prototype.textValue = function(value)
	{
		if (!value)
		{ //get
			return this.value();
		}
		else
		{ //set
			return this.value(value);
			//loop thru select to get value from text
		}
	}


	prototype.label = function(value)
	{
		if (!value)
		{ //get
			if (!this._label) 
					return this.name();
				else 
					return this._label;
		}
		else
		{ //set
			this._label 		= value;
			this.header.innerHTML	= value; 
		}
	}


	prototype.getCookie = function()
	{
		if (this.cookie["width"])
			this.header.style.width = this.cookie["width"];
	}


	prototype.setCookie = function()
	{
		this.cookie.set("width",this.header.style.width);
	}

}
