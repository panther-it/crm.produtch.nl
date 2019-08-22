function Logging(params)
{ //Constructor
  this.init();
  this.load();
}


with (Logging)
{

    prototype.init = function()
    {
        this.lines = window.logging ? window.logging.lines : [];
        window.logging = this;           //make global
    }

    prototype.load = function()
    {
        this.info("Loading Logging." + this.id);
    }


    prototype.msg = function(msg)
    {
        if (!this.lines)
            this.init();
        if (typeof(msg) == "string") 
            msg = msg.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<BR/>");
        this.lines.push((new Date()).toLocaleTimeString() + "  " + msg); // + "<BR/>");
        if (this.innerHTML != undefined)
            this.innerHTML = this.lines.slice(-100).reverse().join("<BR/>");
        //    this.innerHTML = (new Date()).toLocaleTimeString() + "  " + msg + "<BR/>"
        //      + this.innerHTML.replace(/(([^>]+\>)[1,10]).*/g, "A=$1| B=$2| C=$3"); //10 linex max
    }


    prototype.info    = function(msg)
    {
        this.msg("[INFO   ] " + msg);
    }


    prototype.debug   = function(msg)
    {
        this.msg("[DEBUG  ] "+ msg);
    }


    prototype.warning = function(msg)
    {
        this.msg("[WARNING] " + msg);
    }


    prototype.clear = function()
    {
        this.innerHTML = "";   
    }

    
    prototype.error = function(msg,field,valid)
    {
        var fieldName  = field ? field.name + ": " : "";

        if (!valid)
        { //set error
            if (field) field.className += " error";
            logging.msg("[ERROR  ] " + fieldName + msg);
        }
        else
        { //clear error
            if (field) field.className = field.className.replace(/ error/g,"");
            this.innerHTML = this.innerHTML.replace(fieldName + msg,fieldName + "OK");
        }
    }


    prototype.initChildren = function() {};        //empty = don't traverse down = skip initializing log-lines
    prototype.loadChildren = function() {};        //empty = don't traverse down = skip loading      log-lines

}
