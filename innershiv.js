// http://jdbartlett.github.com/innershiv | WTFPL License
window.innerShiv = (function() {
	var div, frag,
		inaTable = /^<(tbody|tr|td|col|colgroup|thead|tfoot)/i,
		remptyTag = /(<([\w:]+)[^>]*?)\/>/g,
		rselfClosing = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,
		fcloseTag = function (all, front, tag) {
			return rselfClosing.test(tag) ? all : front + '></' + tag + '>';
		};

	return function(html, returnFrag) {
		if (!div) {
			div = document.createElement('div');
			frag = document.createDocumentFragment();
			/*@cc_on div.style.display = 'none';@*/
		}

		html = html.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

		var tabled = html.match(inaTable), myDiv = div.cloneNode(true);
		if (tabled) html = '<table>' + html + '</table>';

		/*@cc_on document.body.appendChild(myDiv);@*/
		myDiv.innerHTML = html.replace(remptyTag, fcloseTag);
		/*@cc_on document.body.removeChild(myDiv);@*/

		if (tabled) myDiv = myDiv.getElementsByTagName(tabled[1])[0].parentNode;

		if (returnFrag === false) return myDiv.childNodes;

		var myFrag = frag.cloneNode(true), i = myDiv.childNodes.length;
		while (i--) myFrag.appendChild(myDiv.firstChild);

		return myFrag;
	}
}());