// http://jdbartlett.github.com/innershiv | WTFPL License
window.innerShiv = (function () {
	var div;
	var needsShiv;
	
	var inaTable = /^<(tbody|tr|td|col|colgroup|thead|tfoot)/i;
	var remptyTag = /(<([\w:]+)[^>]*?)\/>/g;
	var rselfClosing = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i;
	
	function fcloseTag (all, front, tag) {
		return rselfClosing.test(tag) ? all : front + '></' + tag + '>';
	};
	
	function innerShiv (html /* string */, returnFrag /* optional false bool */) {
		if (!div) {
			div = document.createElement('div');
			
			// needsShiv if can't use HTML5 elements with innerHTML outside the DOM
			var testEl = div.cloneNode(false);
			testEl.innerHTML = '<nav></nav>';
			needsShiv = testEl.childNodes.length !== 1;
			
			if (needsShiv) {
				div.style.display = 'none';
			}
		}
		
		// Trim whitespace to avoid returning text nodes
		html = html.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		
		// Fix for using innerHTML in a table
		var tabled = html.match(inaTable);
		if (tabled) {
			html = '<table>' + html + '</table>';
		}
		
		// The crux: HTML5 works when innerHTML is used on elements already attached to
		// the DOM. innerShiv works by attaching a hidden element to the DOM, then
		// using innerHTML on it. Sneaky, no?
		if (needsShiv) {
			document.body.appendChild(div);
		}
		
		// Apply innerHTML, fixing any misuses of self-closing tags
		div.innerHTML = html.replace(remptyTag, fcloseTag);
		
		// We must remove the div from the DOM to build return values.
		if (needsShiv) {
			document.body.removeChild(div);
		}
		
		// If fixing for tables
		if (tabled) {
			var scope = div.getElementsByTagName(tabled[1])[0].parentNode;
		} else {
			var scope = div;
		}
		
		// If not in jQuery return mode, return child nodes array
		if (returnFrag === false) {
			return scope.childNodes;
		}
		
		// ...otherwise, build a fragment to return
		var frag = document.createDocumentFragment();
		var i = scope.childNodes.length;
		while (i--) {
			frag.appendChild(scope.firstChild);
		}
		
		return frag;
	}
	
	// innerShiv.returnFrag = false to always use jQuery return mode
	innerShiv.returnFrag = true;
	
	return innerShiv;
}());