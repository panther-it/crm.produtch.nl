function Panel(params)
{ //Constructor
  //this.load();
}


with (Panel)
{

  prototype.init = function()
  {
    try
    {
        this.createLabel();
        this.initChildren();
    }
    catch(e)
    {
        logging.error(this.className + "." + this.id + ".init(): " + e);
    }
  }


  prototype.load = function()
  {
    try
    {
        logging.info("Loading Panel." + this.id);
        this.cookie       = new Cookie({namespace:this.id});
        this.workspace    = document.getElementById("workspace");
        this.search_btn   = document.getElementById("search_btn");
        this.search_txt   = document.getElementById("search_txt");
        this.workspace.onchange = function(caller) { return function(){caller.onWorkspaceChange();}; }(this);
        this.trees        = this.getChildren({className:"Tree"});
        this.getCookie(); 
        this.loadChildren();
    }
    catch(e)
    {
        logging.error(this.className + "." + this.id + ".load(): " + e);
    }
  }


  prototype.createLabel = function()
  {
    try
    {
        this.label = this.createChild("div",{innerHTML: this.id.ucfirst()
                                            ,className: "panellabel "
                                            });
        this.label.onclick     = function(panel) { return function(){ panel.pin();    }; }(this);
        this.label.onmouseover = function(panel) { return function(){ panel.expand(); }; }(this);
        this.onmouseover = function(panel) { return function(){ panel.expand();       }; }(this);
        this.onmouseout  = function(panel) { return function(){ panel.collapse();     }; }(this);
    }
    catch(e)
    {
        logging.error(this.className + "." + this.id + ".createLabel : " + e);
        throw e;
    }
  }
   

  prototype.pin    = function()
  {
    try
    {
        this.onmouseout    = undefined;
        this.className    += " pinned ";
        this.label.onclick = function(panel) { return function(){ panel.unpin();    }; }(this);;
        this.cookie.set("pinned",true);
    }
    catch(e)
    {
        logging.warning(this.className + "." + this.id + ".pin(): " + e);
    }
  }
  

  prototype.unpin  = function()
  {
    try
    {
        this.onmouseout    = function(panel) { return function(){ panel.collapse();     }; }(this);
        this.className     = this.className.replace(/pinned/,"");
        this.cookie.set("pinned",false);
        this.collapse();
    }
    catch(e)
    {
        logging.warning(this.className + "." + this.id + ".unpin(): " + e);
    }
  }
  

  prototype.expand = function()
  {
    this.style.marginLeft = "";
  }  
    

  prototype.collapse = function()
  {
    this.label.onclick    = function(panel) { return function(){ panel.pin(); }; }(this);
    this.style.marginLeft = "-" + this.offsetWidth + "px";
  }    
      
    
  prototype.onWorkspaceChange = function()
  {
    try
    {
        //hide all
        for (var i=0; i < this.trees.length; i++)
            this.trees[i].style.display = "none";
        //show new active
        this.activeWorkspace = this.workspace.selectedIndex;
        this.trees[this.activeWorkspace].style.display = "block";
        this.setCookie();
    }
    catch(e)
    {
        logging.error(this.className + "." + this.id + ".onWorkspaceChange(): " + e);
    }
  }


    prototype.getCookie = function()
    {
      try
      {
          this.workspace.selectedIndex = this.cookie["workspace.active"] || 0; this.onWorkspaceChange();
          if (this.cookie["pinned"]) this.pin(); else this.unpin();
      }
      catch(e)
      {
          logging.warning(this.className + "." + this.id + ".getCookie(): " + e);
      }
    }
    

    prototype.setCookie = function()
    {
      try
      {
          this.cookie.set("workspace.active", this.activeWorkspace);
      }
      catch(e)
      {
          logging.warning(this.className + "." + this.id + ".setCookie(): " + e);
      }

    }
}
