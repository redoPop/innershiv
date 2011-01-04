// http://jdbartlett.github.com/innershiv | WTFPL License
window.innerShiv = (function() {
	var d, r;
    var rxhtmlTag = /(<([\w:]+)[^>]*?)\/>/g; // from jQuery, add the ability to interpret xhtml style tags
	var tableFix = /^<(tbody|tr|td|col|colgroup|thead|tfoot)/i;
    var rselfClosing = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i;
    var fcloseTag = function(all, front, tag) {
        return rselfClosing.test(tag) ?
			all :
			front + "></" + tag + ">";
    };
	
	return function(h, u) {
		if (!d) {
			d = document.createElement('div');
			r = document.createDocumentFragment();
			/*@cc_on d.style.display = 'none';@*/
		}
		
		h = h.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		
		var matches = h.match(tableFix);
		if (matches) {
			h = '<table>' + h + '</table>';
		}
		
		var e = d.cloneNode(true);
		/*@cc_on document.body.appendChild(e);@*/
		e.innerHTML = h.replace(rxhtmlTag, fcloseTag); // from jQuery, add the ability to interpret xhtml style tags
		/*@cc_on document.body.removeChild(e);@*/
		
		if (matches) {
			e = e.getElementsByTagName(matches[1])[0].parentNode;
		}
		
		if (u === false) return e.childNodes;
		
		var f = r.cloneNode(true), i = e.childNodes.length;
		while (i--) f.appendChild(e.firstChild);
		
		return f;
	}
}());