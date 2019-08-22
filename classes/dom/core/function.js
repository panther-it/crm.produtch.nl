with(Function)
{

    prototype.inherits = function(parent)
    { 
        if ( parent.constructor == Function ) 
        { 
            //Normal Inheritance 
            this.prototype       = new parent();
            this.prototype.constructor   = this;
            this.prototype.base       = parent.prototype;
            if (!this.prototype.parent) 
                this.prototype.parent   = parent;                   //should be overwritten bij real parent
        } 
        else 
        { 
            //Pure Virtual Inheritance 
            this.prototype       = parent;
            //this.prototype.constructor   = this;
            this.prototype.base      = parent;
            if (!this.prototype.parent) 
                this.prototype.parent   = parent;                  //should be overwritten bij real parent
        } 
        return this;
    } 

  
    prototype.clone = function(params)
    {
        var temp = new this.constructor(params); 
        if (!temp.parent) 
            temp.parent = this.parent;

        for(var key in this)
            if (typeof(this[key]) != "function")
                temp[key] = this[key];
  
        return temp;
    }

}
