Better Wikipedia
===============
Better wikipedia reading based on [this]( http://www.gizmodo.co.uk/2014/04/i-wish-i-could-read-wikipedia-like-this/).

This is a work in progress!

Instructions:
--
1. Install a plugin to support userscript in your browser:
 *  Chrome: [Tampermonkey](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
 *  Firefox: [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
2. Install the Better Wikipedia script from [here](https://raw.github.com/vitorreus/betterWikipedia/master/betterWikipedia.user.js)


Screenshot:
--
![preview](https://raw.github.com/vitorreus/betterWikipedia/master/screen.png)

 
TODO: 
--
* Do a better query of the wikipedia API:
 * Retrieve subsection content when link has a hash, (for instance wiki/title#subsection)
* Expand current content retrieving more content when clicking on the 3 dots (...)
* Nested queries
* Use fancy inlining of content instead of windows
* Make opened links be persistent across browsers restart (Use the hash to save an array of open sections)