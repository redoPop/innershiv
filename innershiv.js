// http://jdbartlett.github.com/innershiv | WTFPL License
window.innerShiv = (function() {
	var d, r;
	// from jQuery, add the ability to interpret xhtml style tags
    var rxhtmlTag = /(<([\w:]+)[^>]*?)\/>/g;
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
		
		var e = d.cloneNode(true);
		/*@cc_on document.body.appendChild(e);@*/
		e.innerHTML = h.replace(rxhtmlTag, fcloseTag) // from jQuery, add the ability to interpret xhtml style tags
			.replace(/^\s\s*/, '')
			.replace(/\s\s*$/, '');
		/*@cc_on document.body.removeChild(e);@*/
		
		if (u === false) return e.childNodes;
		
		var f = r.cloneNode(true), i = e.childNodes.length;
		while (i--) f.appendChild(e.firstChild);
		
		return f;
	}
}());