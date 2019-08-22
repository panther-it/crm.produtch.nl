function Tree()
{ //Constructor
  this.load();
}


with (Tree) //HTMLLIElement 
{
  
  prototype.load = function()
  {
    //logging.info("Loading "+this.className);
    this.loadChildren(); 
  }

    
  prototype.expand = function(leaf)
  { 
    try
    {
        var subtrees = leaf.getChildren({tagName:"ul"});  //all subtrees of leaf
        if (subtrees.length > 0) 
            leaf.className = "open ";
        for (var i=0; i<subtrees.length; i++)
        {
            subtrees[i].style.height = "auto";
            subtrees[i].databind.call(subtrees[i]);
        }
        leaf.childNodes[0].onclick = function(tree,leaf) { return function() { tree.collapse.call(tree,leaf); }; }(this,leaf);
    }
    catch(e)
    {
            logging.error(this.className + ".expand(): " + e);
    }
  }


  prototype.collapse = function(leaf)
  {
    try
    {
        leaf.className = "";
        var subtrees = leaf.getChildren({tagName:"ul"});
        for (var i=0; i<subtrees.length; i++)
        {
            subtrees[i].style.height  = "0px";
            subtrees[i].innerHTML     = "";
        }
        leaf.childNodes[0].onclick = function(tree,leaf) { return function() { tree.expand.call(tree,leaf); }; }(this,leaf);
    }
    catch(e)
    {
        logging.error(this.className + ".collapse(): " + e);
    }
  }
  

  prototype.databind = function()
  { //this = <ul Tree switches>
    try
    {
        var dsns    = this.className.match(/(^| )[a-z][^ ]+/g);  //get datasourcename from className

        if (dsns)
        {
            this.parentNode.className += "loading ";
            for (var i=0; i<dsns.length; i++)
            {
                //logging.debug(this.className + ".databind(" + dsns[i] + ")");
              
                this.datasource               = new DataSources.Hubble();
                this.datasource.command       = dsns[i].trim() + (this.parentNode.id && this.parentNode.id != "" & isNaN(parseFloat(this.parentNode.id)) ? ".search" : ".list");
                this.datasource.onCollected   = function(tree) { return function() { tree.onDataBound.call(tree); }; }(this);
                if (this.id && this.parentNode && this.parentNode.id && !isNaN(parseFloat(this.parentNode.id))) //id attribute contains constraint columnname
                    this.datasource.parameters[this.id] = this.parentNode.id;
                if (this.datasource.command.contains(".search"))
                    this.datasource.parameters = this.parentNode.id;  
                this.datasource.collect(); //run
            }
        }
    }
    catch(e)
    {
        logging.error(this.className + ".databind(): " + e);
        throw e;
    }
  }
    
    
  prototype.onDataBound = function()
  {
    try
    {
        //logging.debug(this.className + ".onDataBound");
        var records  = this.datasource.data;
        var children = this.datasource.result.references;
        for(var i=0; i<records.length; i++)
            this.createLeaf(records[i],children)
        this.parentNode.className = this.parentNode.className.replace(/loading/,"");   //deactivate icon_loading
    }
    catch(e)
    {
            logging.error(this.className + ".onDataBound(): " + e);
    }
  }
    
         
    prototype.createLeaf = function(params,children)
    {
        try
        {
            //logging.debug(this.className + ": Creating leaf '" + params.id + "' (" + params.label + ") with Children: " + children);
            if (!params.label) params.label = params.id;

            var leaf        = this.createChild("li", {id       : params.id                   
                                                     ,className: (children && children.length > 0) ? "" : "last "
                                                     }); 
            var label       = leaf.createChild("a" , {className: this.className.replace(/Tree/,"Leaflabel") 
                                                     ,innerHTML: params.label.ucfirst()      });

            if (children && children.length > 0)
            {
                var childClass;
                var subtree     = leaf.createChild("ul", {className: "Tree "                     });
                for(var i=0; i<children.length; i++)
                {
                    childClass = children[i]["object"];
                    childKey   = children[i]["key"   ];
                    leaf       = subtree.createChild("li", {id: params.id});
                    leaf.createChild("a" , {className : "Leaflabel " + childClass          
                                           ,innerHTML : childClass.ucfirst()      });
                    leaf.createChild("ul", {id        : childKey
                                           ,className : "Tree "      + childClass });
                }
            }

            return leaf;
        }
        catch(e)
        {
            logging.error(this.className + ".createLeaf(): " + e);
            throw e;
        }
    }

}


function Leaflabel()
{ //Constructor
  this.load();
}

with(Leaflabel)
{
    prototype.load = function()
    {
          try
          {
              this.leaf           = this.parentNode;
              this.tree           = this.leaf.parentNode;
              this.leaf.labelNode = this;
              if (this.tree && this.tree.className && this.tree.className.contains("Tree"))
                  this.onclick = function(tree,leaf) { return function() { tree.expand.call(tree,leaf); }; }(this.tree,this.leaf); 
          }
          catch(e)
          {
              logging.warning("Leaflabel." + this.innerHTML + ": " + e); //Unable to load, DOM not available.");
              this.onclick = function() { alert("This leaf failed to Load. See Log."); };
          }
          this.loadChildren(); //subtrees
    }
}

