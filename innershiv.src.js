// http://jdbartlett.github.com/innershiv | WTFPL License

// This source code tries to balance readability with compressor and performance hacks.
// JSHint does not like it. JSLint hates it. It cowers under the couch if anyone even
// threatens a glance from Crockford. If this were not so, innershiv.js would be a bit
// bigger or I'd spend a lot longer fiddling with it after each tweak to the source.

window.innerShiv = (function () {
	var div
	,   doc = document // Mmmm... comma-first style...
	,   needsShiv
	
	// Array of elements that are new in HTML5
	,   html5 = 'abbr article aside audio canvas command datalist details figure figcaption footer header hgroup keygen mark meter nav output progress section source summary time video'.split(' ')
	
	// Regular expressions used for idiot proofing (most of this is stolen from jQuery)
	,   inaTable = /^<(tbody|tr|td|col|colgroup|thead|tfoot)/i
	,   remptyTag = /(<([\w:]+)[^>]*?)\/>/g
	,   rselfClosing = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i
	,   rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
	;
	
	// Used with rselfClosing to idiot-proof self-closing tags
	function fcloseTag (all, front, tag) {
		return rselfClosing.test(tag) ? all : front + '></' + tag + '>';
	}
	
	function innerShiv (
		html /* string */,
		returnFrag /* optional false bool */
	) {
		var tabled, scope;
		
		if (!div) {
			div = doc.createElement('div');
			
			// needsShiv if can't use HTML5 elements with innerHTML outside the DOM
			div.innerHTML = '<nav></nav>';
			needsShiv = div.childNodes.length !== 1;
			
			if (needsShiv) {
				// MSIE allows you to create elements in the context of a document
				// fragment. Jon Neal first discovered this trick and used it in his
				// own shimprove: http://www.iecss.com/shimprove/ <- GIVE HIM LOVE
				var frag = doc.createDocumentFragment(), i = html5.length;
				while (i--) {
					frag.createElement(html5[i]);
				}
				
				div = frag.appendChild(div);
			}
		}
		
		// Trim whitespace to avoid returning text nodes, strip script tags, and fix
		// misuses of self-closing tags.
		html = html
			.replace(/^\s\s*/, '')
			.replace(/\s\s*$/, '')
			.replace(rscript, '')
			.replace(remptyTag, fcloseTag)
			;
		
		// Fix for using innerHTML in a table
		if (tabled = html.match(inaTable)) {
			html = '<table>' + html + '</table>';
		}
		
		div.innerHTML = html;
		
		// Avoid returning the tbody or tr when fixing for table use
		scope = tabled ? div.getElementsByTagName(tabled[1])[0].parentNode : div;
		
		// If not in jQuery return mode, return child nodes array
		if (returnFrag === false) {
			return scope.childNodes;
		}
		
		// ...otherwise, build a fragment to return
		var frag = doc.createDocumentFragment(), i = scope.childNodes.length;
		while (i--) {
			frag.appendChild(scope.firstChild);
		}
		
		return frag;
	}
	
	// innerShiv.returnFrag = false to always use jQuery return mode
	innerShiv.returnFrag = 1;
	
	return innerShiv;
}());