// http://jdbartlett.github.com/innershiv | WTFPL License
window.a=function(){function j(b,e,c){return k.test(c)?b:e+"></"+c+">"}function g(d,g){var c;if(!b&&(b=e.createElement("div"),b.innerHTML="<nav></nav>",l=b.childNodes.length!==1)){for(var f=e.createDocumentFragment(),h=i.length;h--;)f.createElement(i[h]);b=f.appendChild(b)}d=d.replace(/^\s\s*/,"").replace(/\s\s*$/,"").replace(m,"").replace(n,j);if(c=d.match(o))d="<table>"+d+"</table>";b.innerHTML=d;c=c?b.getElementsByTagName(c[1])[0].parentNode:b;if(g===!1)return c.childNodes;f=e.createDocumentFragment();for(h=c.childNodes.length;h--;)f.appendChild(c.firstChild);return f}var b,e=document,l,i="abbr article aside audio canvas command datalist details figure figcaption footer header hgroup keygen mark meter nav output progress section source summary time video".split(" "),o=/^<(tbody|tr|td|col|colgroup|thead|tfoot)/i,n=/(<([\w:]+)[^>]*?)\/>/g,k=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,m=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;g.b=1;return g}();