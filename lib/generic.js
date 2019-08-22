var IE = true;
var FF = false;
var browser = navigator.userAgent.indexOf("IE") != -1;


function getParentByTagName(child, tagName)
{
        if (child.parentNode == undefined) return undefined;
        if (child.parentNode.tagName != tagName)
                return getParentByTagName(child.parentNode, tagName);
        else
                return child.parentNode;
}


function getChildByClassName(parentNode, className)
{
        for (i=0; i < parentNode.childNodes.length; i++)
        {
    if (parentNode.childNodes[i].className != undefined)
                if (parentNode.childNodes[i].className == className)
      return parentNode.childNodes[i];
        }
        return undefined;
}

function getChildByTagName(parentNode, tagName)
{
        for (i=0; i < parentNode.childNodes.length; i++)
        {
                if (parentNode.childNodes[i].tagName == tagName) return parentNode.childNodes[i];
        }
        return undefined;
}

function escapeFrame()
{  //force frame if not yet
  if (top == window)
  {
    top.location.href = "/index.php?body=" + escape(location.pathname + location.search);
  }
}

function focusFirst()
{
  var inputs = document.getElementsByTagName("input");
  var input;
  info(inputs.length);
  for (i=0; i < inputs.length; i++)
  {
    input = inputs[i];
    info(input.name);
    if (!input.readOnly 
    && !input.disabled 
    &&  input.style.display != "none"
    &&  input.className.search(/hidden|filter/) == -1)
    {
      input.focus();
      info(input.name);
      return true;
    }
  }
}
   
function include(url,eventHandler)
{
  var script   = document.createElement("script");
  script.type   = "text/javascript";
  script.language = "javascript"; 
  script.onreadystatechange = function () 
            {
                if (this.readyState == 'complete') eventHandler();
               }
  script.onload  = eventHandler; 
  script.src  = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

window.onload = function() 
{
  window.load();
}
