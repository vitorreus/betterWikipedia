// ==UserScript==
// @name       Better Wikipedia
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      ://*.wikipedia.org/*
// @copyright  2012+, Vitor
// ==/UserScript==


$(window).hashchange(hashchanged); 

function hashchanged(){
    
    var hash = window.location.hash.split("/");
    if (hash[1] == "wiki"){
		console.log("load" + window.location.hash );
    }
}

$("#bodyContent").find("a").each(function(){
    var href = $(this).attr("href");
    if (href.charAt(0) != "#"){
		$(this).attr("href","#" + href);
    }
})