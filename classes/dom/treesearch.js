function TreeSearch()
{ //Constructor
  this.load();
}


with (TreeSearch) //HTMLFormElement
{
  
    prototype.load = function()
    {
        logging.info("Loading "+this.className);
        this.trees        = this.parentNode.trees;
        this.search_btn   = document.getElementById("search_btn");
        this.search_txt   = document.getElementById("search_txt");
        this.onsubmit     = function(form) { return function() { return form.onSubmit.call(form); }; }(this);
        this.loadChildren();
    }
    
    
    prototype.onSubmit = function()
    {
        var i,j,tree,leafs,leaf;
        for(i=0; i < this.trees.length; i++)
        {
            tree  = this.trees[i];
            leafs = tree.getChildren({tagName: "li"});
            for(j=0; j < leafs.length; j++)
            {
                leaf = leafs[j];
                leaf.id = this.search_txt.value;
                tree.expand(leaf);
            }
        }
        return false; //cancel event bubble
    }
}
