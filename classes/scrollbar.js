//Constructor
function ScrollBar(params)
{
  this.recordOffset  = 0;

  this.first   = function()
               {
        var a = document.createElement("a");
        a.setAttributes({"class":"first",href:"#"});
        a.innerHTML   = " &lt;&lt; "; 
        a.onclick  = function(scrollbar) { return function() {scrollbar.gotoFirstPage(); return false;} }(this);
        return a;
        }.call(this);
  this.previous   = function()
               {
        var a = document.createElement("a");
        a.setAttributes({"class":"previous",href:"#"});
        a.innerHTML   = " &lt; "; 
        a.onclick  = function(scrollbar) { return function() {scrollbar.gotoPreviousPage(); return false;} }(this);
        return a;
        }.call(this);
  this.next  = function()
               {
        var a = document.createElement("a");
        a.setAttributes({"class":"next",href:"#"});
        a.innerHTML   = " &gt; "; 
        a.onclick  = function(scrollbar) { return function() {scrollbar.gotoNextPage(); return false;} }(this);
        return a;
        }.call(this);
  this.last  = function()
               {
        var a = document.createElement("a");
        a.setAttributes({"class":"last",href:"#"});
        a.innerHTML   = " &gt;&gt; "; 
        a.onclick  = function(scrollbar) { return function() {scrollbar.gotoLastPage(); return false;} }(this);
        return a;
        }.call(this);
  this.rows  = function()
               {
        var a = document.createElement("input");
        a.setAttributes({"class":"rows",type:"text",oldValue:10});
        a.value   = "10"; 
        a.onchange    = function(scrollbar) { return function() {scrollbar.onChange();} }(this);
        return a;
        }.call(this);
  this.page  = function()
               {
        var a = document.createElement("input");
        a.setAttributes({"class":"page",type:"text",oldValue:1});
        a.value    = "1"; 
        a.onchange    = function(scrollbar) { return function() {scrollbar.onChange();} }(this);
        return a;
        }.call(this);
  this.pages  = function()
               {
        var a = document.createElement("input");
        a.setAttributes({"class":"pages",type:"text"});
        a.readOnly  = true;
        a.value    = "1"; 
        return a;
        }.call(this);
  this.container  = function()
               {
        var a = document.createElement("div");
        a.setAttributes({"class":"scrollbar"});
        return a;
          }.call(this);

  this.container.appendChild(this.first);
  this.container.appendChild(this.previous);
  this.container.appendChild(this.page);
  this.container.appendChild(document.createTextNode("van"));
  this.container.appendChild(this.pages);
  this.container.appendChild(this.next);
  this.container.appendChild(this.last);
  this.container.appendChild(document.createTextNode(" | Rijen:"));
  this.container.appendChild(this.rows);

  if (params && params.parent) 
  {
    this.parent   = params.parent;
    this.cookie  = new Cookie({namespace:this.parent.id});
    window.addEventListener("keydown"       ,function(pager) { return function(event) { pager.scroll(event); }; }(this), false); 
    window.addEventListener("DOMMouseScroll",function(pager) { return function(event) { pager.scroll(event); }; }(this), false); 
    this.getCookie();
  }
}


with (ScrollBar)
{

  //Functions
  prototype.build = function()
  {
    this.onChange();
    return this.container;
  }


  prototype.onChange = function()
  {
    var rows   = parseInt(this.rows.value);
    var oldRows  = parseInt(this.rows.getAttribute("oldValue"));
    var oldPage  = parseInt(this.page.getAttribute("oldValue"))-1;  //Change from 1-based to 0-based beginning
    var records  = this.parent.datasource.data.length;
    var pages   = Math.floor(records / rows); 
    var page   = parseInt(this.page.value) - 1;                      //Change page from 1-based to 0-based beginning
        page       += Math.ground(this.recordOffset / rows);              //#2: Add/Subtract 1 page when recordOffset > rows/page
        page  = Math.floor(page * oldRows / rows);       //Recalculate pagenr of nr of rows changed
        page  = (page > pages  ) ? pages   : page;      //Don't go beyond last page
    this.recordOffset      %= rows;            //Subtract a whole page from offset if offset > rows/page (see #2)
    this.recordOffset  = (page*rows + this.recordOffset < 0 ) ? 0 : this.recordOffset; //Don't go beyond first page/record
        page  = (page < 0      ) ? 0       : page;      //Don't go beyond first page
    var from   = page * rows + this.recordOffset;
        from   = (from > records-rows) ? records-rows : from;    //Don't go beyond first row of last page 
    var to     = from + rows - 1; 
        to          = (to   < rows   -   1) ? rows   -   1 : to  ;    //Don't go beyond last record

    this.pages.value  = pages +1;          //Change from 0-based to 1-based beginning 
    this.page.value    = page  +1;          //Change from 0-based to 1-based beginning

    if (this.parent && this.parent.data && this.parent.data.show)
      this.parent.data.show(from,to);
    else
      info("Scrollbar: unable to handle parent");

    this.rows.setAttribute("oldValue",rows);
    this.page.setAttribute("oldValue",this.page.value);
    this.setCookie();
  }


  prototype.onResize = function()
  {
    var height = this.parent.table.offsetHeight;
           this.rows.value = Math.floor((height-63) / 18);
    this.onChange();
  }

  prototype.scroll = function(event)
  {
    var target = event.target  || event.srcElement;
    switch(event.keyCode)
    {
      case 34: this.gotoNextPage();     break; //pageDown
      case 33: this.gotoPreviousPage();  break; //pageUp
      case 38: if (target.nodeName != "SELECT")
           this.gotoPreviousRecord();  break; //arrowUp
      case 40: if (target.nodeName != "SELECT")
           this.gotoNextRecord();    break; //arrowDown
      default:               //unkown key or no key at all
        if (event.detail != 0) //mouseWheel
        {
          this.recordOffset += event.detail; 
          this.onChange();
        }
        else
          return;
    }
  }


  prototype.goto = function(index)
  {
    var rows    = parseInt(this.rows.value);
    this.page.value   = Math.floor(index/rows)+1;
    this.recordOffset  = index % rows;
    if (rows == 1) //todo: ugly 
      this.recordOffset = 0;
    this.onChange();
  }


  prototype.gotoNextRecord = function()
  {
    this.recordOffset++;
    this.onChange();
  }


  prototype.gotoPreviousRecord = function()
  {
    this.recordOffset--;
    this.onChange();
  }

  prototype.gotoFirstPage = function()
  {
    this.page.value   = 1;
    this.recordOffset   = 0;
    this.onChange();
  }


  prototype.gotoPreviousPage = function()
  {
    var rows    = 1;
    var page     = parseInt(this.page.value);
    var oldPage     = parseInt(this.page.getAttribute("oldValue"));
    
    if (page == 1 && this.recordOffset <= 0) return;
    if (page == 1 && oldPage == 1) this.recordOffset = 0; 

    //Form scrolls amount of Grid.rows equally  
    if (this.parent.parent && this.parent.parent.scrollbar)
      rows  = parseInt(this.parent.parent.scrollbar.rows.value);

    this.page.value = page - rows;
    this.onChange();
  }


  prototype.gotoNewPage = function(event)
  {
    this.parent.data.clear();
    this.hide();
    this.parent.show(event);
  }


  prototype.gotoLastPage = function()
  {
    this.page.value = this.pages.value;
    this.onChange();
  }


  prototype.gotoNextPage = function()
  {
    var rows  = 1;
    var page   = parseInt(this.page.value);
    var pages  = parseInt(this.pages.value);

    if (page == pages) return;

    //Form scrolls amount of Grid.rows equally  
    if (this.parent.parent && this.parent.parent.scrollbar)
      rows  = parseInt(this.parent.parent.scrollbar.rows.value);

    this.page.value = page + rows;
    this.onChange();
  }


  prototype.hide = function()
  {
    this.container.style.display = "none";
  }

  prototype.show = function()
  {
    this.container.style.display = "block";
  }


  prototype.getCookie = function()
  {
    this.page.value     = this.cookie["scrollbar.page"]     || this.page.value;
    this.rows.value     = this.cookie["scrollbar.rows"]     || this.rows.value;
    this.recordOffset    = parseInt(this.cookie["scrollbar.offset"])   || this.recordOffset;
    this.parent.table.style.width   = this.cookie["grid.width"];
    this.rows.setAttribute("oldValue",this.rows.value);
    this.page.setAttribute("oldValue",this.page.value);
  }  

  prototype.setCookie = function()
  {
    if (!isNaN(parseInt(this.page.value))) this.cookie.set("scrollbar.page"  ,this.page.value);
    if (!isNaN(parseInt(this.rows.value))) this.cookie.set("scrollbar.rows"  ,this.rows.value);
    if (!isNaN(this.recordOffset        )) this.cookie.set("scrollbar.offset",this.recordOffset);
    this.cookie.set("grid.width", this.parent.table.style.width);
  }  



}


