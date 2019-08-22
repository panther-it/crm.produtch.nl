function Cookie(params)
{
	this.namespace = params.namespace ? params.namespace : "";
	this.load();
}


with (Cookie)
{

	//Functions
	prototype.load = function()
	{
		var cookies = document.cookie.split(";");
		for (var i in cookies)
		{
			cookie = cookies[i].split("=");
			cookie[0] = cookie[0].replace(window.location.pathname + this.namespace,"");
			cookie[0] = cookie[0].trim();
			cookie[1] = cookie[1].trim();
                 if (cookie[1] == "true"      ) cookie[1] = true;
            else if (cookie[1] == "false"     ) cookie[1] = false;
            else if (!isNaN(Number(cookie[1]))) cookie[1] = Number(cookie[1]);
			this[cookie[0]] = cookie[1];
		}
	}

	prototype.save = function()
	{
		var cookie = "";
		for (var name in this)
		{
			if (name.search(/load|save|get|set/) != -1) continue;
			this.set(name,this[name]);
		}
	}

	prototype.get = function(name)
	{
		if (!this[name]) this.load();
		return this[name];
	}

/*
	function setLocal(name,value)
	{
		this.set(window.location.pathname + name, value);
	}
*/

	prototype.set = function(name,value)
	{
		this[name] = value;
		document.cookie = window.location.pathname + this.namespace + name + "=" + value + "; expires=Fri, 1 Jan 2100 12:01:01 UTC;";
	}
}
