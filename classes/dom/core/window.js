with (window)
{

    load = function()
    {
        new Logging();
        var HTML = document.childNodes[1];
        logging.info("initializing objects...");
        HTML.init();           //instantiate enriched Classes
        logging.info("loading objects...");
        HTML.load();           //page lifecycle
    }

}
