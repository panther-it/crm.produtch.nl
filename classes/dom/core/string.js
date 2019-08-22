with(String)
{

    prototype.trim = function()
    {
        var  str = this.replace(/^\s\s*/, ''),
             ws  = /\s/,
             i   = str.length;
        while (ws.test(str.charAt(--i)));
        return str.slice(0, i + 1);
    }


    prototype.contains = function(keyword)
    {
        return this.search(keyword) != -1;
    }

    prototype.ucfirst = function()
    {
        return this.toLowerCase().replace(/\b([a-z])/gi,function(c){return c.toUpperCase()});
    }

}
