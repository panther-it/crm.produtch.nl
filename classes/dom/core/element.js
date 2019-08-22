with(Element)
{

    prototype.appendChildren = function(children)
    {
        for(var i in children)
        {
            this.appendChild(children[i]);
        }
    }

    
    prototype.setAttributes = function(attrs)
    {
        for(var i in attrs)
        {
            if (i == "innerHTML") 
                this.innerHTML = attrs[i]; 
            else if (i == "className")
                this.className = attrs[i];
            else
                this.setAttribute(i,attrs[i]);
        }
    }


    prototype.appendField = function(field)
    {
        this.appendChild(field.input);
    }


    prototype.appendFields = function(fields)
    {
        for(var i in fields)
            this.appendChild(fields[i].input);
    }

    prototype.createChild = function(tagName,attr)
    {
        try
        {
            var child = document.createElement(tagName);
            child.setAttributes(attr);
            this.appendChild(child);
            child.init();
            child.load();
            return child;
        }
        catch(e)
        {
            logging.error(this.className + "." + this.id + ".createChild(): " + e);
            throw e;
        }
    }
    

    prototype.getChildren = function(filter)
    {
        try
        {
            var elements = filter.traverse ? this.getElementsByTagName("*") : this.childNodes;
            var result   = [];
            for(var i=0; i < elements.length; i++) 
                if  ( (filter.className && elements[i].className && elements[i].className.contains(new RegExp("(^| )" + filter.className + "( |$)"))                 )
                    || (filter.id        && elements[i].id        && elements[i].id                    == filter.id                   )
                    || (filter.tagName   && elements[i].tagName   && elements[i].tagName.toLowerCase() == filter.tagName.toLowerCase())
                    )
                        result.push(elements[i]);
            return result;
        }
        catch(e)
        {
            logging.error(this.className + "." + this.id + ".getChildren(): " + e);
            return []; //empty array, so parent action will not fail and continue
        }
    }
    
    
    prototype.index = function()
    {
        for (var k=0,e=this; e = e.previousSibling; ++k);
        return k;
    }

  
    prototype.extend = function(obj)
    {                                            //TODO: s/generic Element.prototype/specific this/
        this.prototype = Element.prototype;        //save old methods to prototype subnamespace

        if (typeof(obj) == "string") 
            obj = eval(obj);
        for(var key in obj.prototype)              //apply prototype to object
            this[key] = obj.prototype[key];
    }

  
    prototype.initChildren = function()
    {
        var child;
        if (this.childNodes)
        for (var i=0; i< this.childNodes.length; i++)
        try
        {
           child = this.childNodes[i];
           if (child instanceof Text         ) continue;
           if (child instanceof HTMLBRElement) continue;
           child.init();         //traverse down
        }
        catch(e)
        {
            if (logging) 
                logging.warning(e);
        }
    }


    prototype.init = function()
    {
        try
        {
            if (this.className)           //eligable to apply Class casting
            {
                var classes = this.className.match(/[A-Z][^ ]+/g);
                if (classes)
                    for (var i=0; i< classes.length; i++)
                        this.extend(classes[i]);       //enrich with the 'in HTML defined' Class
            }

            if (this.init != Element.prototype.init) //if overloaded
                this.init();
            else
                this.initChildren();
        }
        catch(e)
        {
            if (logging)
                logging.error(this.className + "." + this.id + ".init(): " + e);
        }
    }


    prototype.loadChildren = function()
    {
        var child;
        if (this.childNodes)
            for (var i=0; i< this.childNodes.length; i++)
            {
                child = this.childNodes[i];
                if (child instanceof Text         ) continue;
                if (child instanceof HTMLBRElement) continue;
                if (child.load) child.load();         //traverse down (load calls loadChildren)
        }
    }


    prototype.load = function()
    {
        try
        {
            this.loadChildren();
        }
        catch(e)
        {
            logging.error(this.className + "." + this.id + ".load(): " + e);
        }
    }

 
  }
