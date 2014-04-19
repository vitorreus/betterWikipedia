// ==UserScript==
// @name       Better Wikipedia
// @namespace  http://use.i.E.your.homepage/
// @version    0.4
// @description  enter something useful
// @match      http://*.wikipedia.org/*
// @match      https://*.wikipedia.org/*
// @copyright  2012+, Vitor
// ==/UserScript==


//ugly stuff
var protocol =   window.location.href.split("://")[0]

//load jquery ui
var js = document.createElement("script");
js.type = "text/javascript";
js.src = protocol + "://code.jquery.com/ui/1.10.4/jquery-ui.min.js";
document.body.appendChild(js);



function hashchanged(){
    
    var hash = window.location.hash.split("/");
    if (hash[1] == "wiki"){
        debugLog("load" + window.location.hash ); 
        loadContent(hash[2]);
    }
}
$(window).bind('hashchange', hashchanged);
 

function handleAjaxResponse(content){

}


var debug = false; 
var debugLog = debug?function(m){console.log(m)}:function(){};

function parseAjaxResponse(content,windowId){
    //put it on the mouse pos haha.
     debugLog(content);
    var pageId = 0;
    for(pageId in content.query.pages){}
    
    debugLog(content.query.pages[pageId].extract);
    
    $("#" +windowId).html(content.query.pages[pageId].extract);
}

//gah
var mouse = {x:0,y:0};
$("body").mousemove(function(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    //debugLog(mouse);
})


openwindows = [];
$("body").click(function(){
    debugLog("close window")
    for (var i in openwindows){
        $(openwindows[i]).remove();
    }
    window.location.hash = "/";

});

var windowContainers = $("<div id='windowContainers'>");

$("body").append(windowContainers);

windowContainers.css({
    position:"absolute",top:0,left:0
})
function createWindow(){
    //create a new div and return its id to put the ajax content in here afterwards. Also put a link and stuff.
    
    var div = $("<div>");
    windowContainers.append(div);
    
    $(div).click(function(e){e.stopPropagation();debugLog("dont close windos")});
    
    var id = "_w"+ Math.floor(Math.random() * 100000);
    
    div.attr("id",id);
    openwindows.push(div);
    div.css({
        position:"absolute",
        width:"400px",
        height:"130px",
        top:mouse.y+20,
        left:mouse.x-180, 
         
        background:"rgba(255,255,255,1)",
        border:"1px solid rgba(0,0,0,0.5)",
        padding:"5px",
        "font-size":"12px",
        cursor:"move", 
        "border-radius":3,
        "box-shadow":"0 0 20px rgba(0,0,0,0.7)"
        
        
    });
    
    div.draggable({  stack:  '#windowContainers div' })//.resizable()
    return id;
}


function loadContent(title){
     
    //var url = "/w/api.php?action=parse&page="+title+"&format=json&prop=text&section=1";
    
    
    title = title.split("#")[0] //ignore # on the link :/ try to get this part using the api
    //var url = protocol + "://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=300&titles="+title+"&format=json";
    
    var url = window.location.origin + "/w/api.php?action=query&prop=extracts&exchars=300&titles="+title+"&format=json";
    
    
    
    
    
    //open a window
    var windowId = createWindow()
    
    $.ajax({
        url:url,
        success:function (wid){
            debugLog("returning function for wid="+wid)
            return function(d){
                parseAjaxResponse(d,wid)
            }
        }(windowId)
    });
                      
                       
}






$("#bodyContent").find("a").each(function(){
    var href = $(this).attr("href");
    if (href.charAt(0) != "#"){
        //$(this).attr("href","#" + href);
        $(this).click(function(evnt){
            //prevent the script to run when oppening the link i new tab
            if (evnt.ctrlKey || evnt.shiftKey || evnt.metaKey || (evnt.which == 2)) {   
                evnt.stopPropagation(); //dont close the opened windows and..
                return; //do nothing else
            }
            
            window.location.hash = $(this).attr("href");
           return false;
            
        });
        //also change the onmidle mouse button maybe...
    }
})
