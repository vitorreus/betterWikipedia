// ==UserScript==
// @name       Better Wikipedia
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      ://*.wikipedia.org/*
// @copyright  2012+, Vitor
// ==/UserScript==


$(window).hashchange(hashchanged); 
 

function handleAjaxResponse(content){

}


function parseAjaxResponse(content,windowId){
	//put it on the mouse pos haha.
     console.log(content);
    var pageId = 0;
    for(pageId in content.query.pages){}
    
    console.log(content.query.pages[pageId].extract);
    
    $("#" +windowId).html(content.query.pages[pageId].extract);
}

//gah
var mouse = {x:0,y:0};
$("body").mousemove(function(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    //console.log(mouse);
})


openwindows = [];
$("body").click(function(){
    console.log("close window")
    for (var i in openwindows){
    	$(openwindows[i]).remove();
    }

});
function createWindow(){
	//create a new div and return its id to put the ajax content in here afterwards. Also put a link and stuff.
    
    var div = $("<div>");
    $("body").append(div);
    
    $(div).click(function(e){e.stopPropagation();console.log("dont cose windos")});
    
    var id = "_w"+ Math.floor(Math.random() * 100000);
    
    div.attr("id",id);
    openwindows.push(div);
    div.css({
        position:"absolute",
        width:"300px",
        height:"100px",
        top:mouse.y+20,
        left:mouse.x-100,
        background:"white",
        border:"1px solid black",
        padding:"5px",
        "font-size":"12px"
        
        
    })
    return id;
}


function loadContent(title){
     
	//var url = "/w/api.php?action=parse&page="+title+"&format=json&prop=text&section=1";
    
    var url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=200&titles="+title+"&format=json";
    
    
    
    
    //open a window
    var windowId = createWindow()
    
    $.ajax({
        url:url,
        success:function (wid){
            console.log("returning function for wid="+wid)
            return function(d){
                parseAjaxResponse(d,wid)
            }
        }(windowId)
    });
                      
                       
}




function hashchanged(){
    
    var hash = window.location.hash.split("/");
    if (hash[1] == "wiki"){
		console.log("load" + window.location.hash ); 
        loadContent(hash[2]);
    }
}

$("#bodyContent").find("a").each(function(){
    var href = $(this).attr("href");
    if (href.charAt(0) != "#"){
		$(this).attr("href","#" + href);
        //also change the onmidle mouse button maybe...
    }
})