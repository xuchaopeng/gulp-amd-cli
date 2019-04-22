!function(){var e=function(){var t=[].slice.call(arguments);return t.push(e.options),t[0].match(/^\s*#([\w:\-\.]+)\s*$/gim)&&t[0].replace(/^\s*#([\w:\-\.]+)\s*$/gim,function(e,n){var o=document,i=o&&o.getElementById(n);t[0]=i?i.value||i.innerHTML:e}),e.documentHTML&&(e.compile.call(e,e.documentHTML),e.documentHTML=""),1==arguments.length?e.compile.apply(e,t):arguments.length>=2?e.to_html.apply(e,t):void 0},t={escapehash:{"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#x27;","/":"&#x2f;"},escapereplace:function(e){return t.escapehash[e]},escaping:function(e){return"string"!=typeof e?e:e.replace(/[&<>"']/gim,this.escapereplace)},detection:function(e){return"undefined"==typeof e?"":e}},n=function(e){if("undefined"!=typeof console){if(console.warn)return void console.warn(e);if(console.log)return void console.log(e)}throw e},o=function(e,t){if(e=e!==Object(e)?{}:e,e.__proto__)return e.__proto__=t,e;var n=function(){},o=Object.create?Object.create(t):new(n.prototype=t,n);for(var i in e)e.hasOwnProperty(i)&&(o[i]=e[i]);return o},i=function(e){var t,n,o,i=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,r=/,/,s=/^\s*(_?)(\S+?)\1\s*$/,a=/^function[^{]+{([\s\S]*)}/m,c=[];"function"==typeof e?e.length&&(t=e.toString()):"string"==typeof e&&(t=e),t=t.trim(),o=t.match(i),n=t.match(a)[1].trim();for(var p=0;p<o[1].split(r).length;p++){var l=o[1].split(r)[p];l.replace(s,function(e,t,n){c.push(n)})}return[c,n]};e.__cache={},e.version="0.6.15",e.settings={},e.documentHTML="",e.tags={operationOpen:"{@",operationClose:"}",interpolateOpen:"\\${",interpolateClose:"}",noneencodeOpen:"\\$\\${",noneencodeClose:"}",commentOpen:"\\{#",commentClose:"\\}"},e.options={cache:!0,strip:!0,errorhandling:!0,detection:!0,_method:o({__escapehtml:t,__throw:n,__juicer:e},{})},e.tagInit=function(){var t=e.tags.operationOpen+"each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?"+e.tags.operationClose,n=e.tags.operationOpen+"\\/each"+e.tags.operationClose,o=e.tags.operationOpen+"if\\s*([^}]*?)"+e.tags.operationClose,i=e.tags.operationOpen+"\\/if"+e.tags.operationClose,r=e.tags.operationOpen+"else"+e.tags.operationClose,s=e.tags.operationOpen+"else if\\s*([^}]*?)"+e.tags.operationClose,a=e.tags.interpolateOpen+"([\\s\\S]+?)"+e.tags.interpolateClose,c=e.tags.noneencodeOpen+"([\\s\\S]+?)"+e.tags.noneencodeClose,p=e.tags.commentOpen+"[^}]*?"+e.tags.commentClose,l=e.tags.operationOpen+"each\\s*(\\w*?)\\s*in\\s*range\\(([^}]+?)\\s*,\\s*([^}]+?)\\)"+e.tags.operationClose,u=e.tags.operationOpen+"include\\s*([^}]*?)\\s*,\\s*([^}]*?)"+e.tags.operationClose,g=e.tags.operationOpen+"helper\\s*([^}]*?)\\s*"+e.tags.operationClose,f="([\\s\\S]*?)",h=e.tags.operationOpen+"\\/helper"+e.tags.operationClose;e.settings.forstart=new RegExp(t,"igm"),e.settings.forend=new RegExp(n,"igm"),e.settings.ifstart=new RegExp(o,"igm"),e.settings.ifend=new RegExp(i,"igm"),e.settings.elsestart=new RegExp(r,"igm"),e.settings.elseifstart=new RegExp(s,"igm"),e.settings.interpolate=new RegExp(a,"igm"),e.settings.noneencode=new RegExp(c,"igm"),e.settings.inlinecomment=new RegExp(p,"igm"),e.settings.rangestart=new RegExp(l,"igm"),e.settings.include=new RegExp(u,"igm"),e.settings.helperRegister=new RegExp(g+f+h,"igm")},e.tagInit(),e.set=function(e,t){var n=this,o=function(e){return e.replace(/[\$\(\)\[\]\+\^\{\}\?\*\|\.]/gim,function(e){return"\\"+e})},i=function(e,t){var i=e.match(/^tag::(.*)$/i);return i?(n.tags[i[1]]=o(t),void n.tagInit()):void(n.options[e]=t)};if(2===arguments.length)return void i(e,t);if(e===Object(e))for(var r in e)e.hasOwnProperty(r)&&i(r,e[r])},e.register=function(e,t){var n=this.options._method;return n.hasOwnProperty(e)?!1:n[e]=t},e.unregister=function(e){var t=this.options._method;return t.hasOwnProperty(e)?delete t[e]:void 0},e.template=function(t){var n=this;this.options=t,this.__interpolate=function(e,t,n){var o,i=e.split("|"),r=i[0]||"";return i.length>1&&(e=i.shift(),o=i.shift().split(","),r="_method."+o.shift()+".call(this, "+[e].concat(o)+")"),"<%= "+(t?"_method.__escapehtml.escaping":"")+"("+(n&&n.detection===!1?"":"_method.__escapehtml.detection")+"("+r+")) %>"},this.__removeShell=function(t,o){var r=0;return t=t.replace(e.settings.helperRegister,function(t,n,o){var r=i(o),s=r[0],a=r[1],c=new Function(s.join(","),a);return e.register(n,c),t}).replace(e.settings.forstart,function(e,t,n,o){var n=n||"value",o=o&&o.substr(1),i="i"+r++;return"<% ~function() {for(var "+i+" in "+t+") {if("+t+".hasOwnProperty("+i+")) {var "+n+"="+t+"["+i+"];"+(o?"var "+o+"="+i+";":"")+" %>"}).replace(e.settings.forend,"<% }}}(); %>").replace(e.settings.ifstart,function(e,t){return"<% if("+t+") { %>"}).replace(e.settings.ifend,"<% } %>").replace(e.settings.elsestart,function(){return"<% } else { %>"}).replace(e.settings.elseifstart,function(e,t){return"<% } else if("+t+") { %>"}).replace(e.settings.noneencode,function(e,t){return n.__interpolate(t,!1,o)}).replace(e.settings.interpolate,function(e,t){return n.__interpolate(t,!0,o)}).replace(e.settings.inlinecomment,"").replace(e.settings.rangestart,function(e,t,n,o){var i="j"+r++;return"<% ~function() {for(var "+i+"="+n+";"+i+"<"+o+";"+i+"++) {{var "+t+"="+i+"; %>"}).replace(e.settings.include,function(e,t,n){return t.match(/^file\:\/\//gim)?e:"<%= _method.__juicer("+t+", "+n+"); %>"}),o&&o.errorhandling===!1||(t="<% try { %>"+t,t+='<% } catch(e) {_method.__throw("Juicer Render Exception: "+e.message);} %>'),t},this.__toNative=function(e,t){return this.__convert(e,!t||t.strip)},this.__lexicalAnalyze=function(t){var n=[],o=[],i="",r=["if","each","_","_method","console","break","case","catch","continue","debugger","default","delete","do","finally","for","function","in","instanceof","new","return","switch","this","throw","try","typeof","var","void","while","with","null","typeof","class","enum","export","extends","import","super","implements","interface","let","package","private","protected","public","static","yield","const","arguments","true","false","undefined","NaN"],s=function(e,t){if(Array.prototype.indexOf&&e.indexOf===Array.prototype.indexOf)return e.indexOf(t);for(var n=0;n<e.length;n++)if(e[n]===t)return n;return-1},a=function(t,i){if(i=i.match(/\w+/gim)[0],-1===s(n,i)&&-1===s(r,i)&&-1===s(o,i)){if("undefined"!=typeof window&&"function"==typeof window[i]&&window[i].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i))return t;if("undefined"!=typeof global&&"function"==typeof global[i]&&global[i].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i))return t;if("function"==typeof e.options._method[i]||e.options._method.hasOwnProperty(i))return o.push(i),t;if(i.match(/^\d+/gim))return t;n.push(i)}return t};t.replace(e.settings.forstart,a).replace(e.settings.interpolate,a).replace(e.settings.ifstart,a).replace(e.settings.elseifstart,a).replace(e.settings.include,a).replace(/[\+\-\*\/%!\?\|\^&~<>=,\(\)\[\]]\s*([A-Za-z_0-9]+)/gim,a);for(var c=0;c<n.length;c++)i+="var "+n[c]+"=_."+n[c]+";";for(var c=0;c<o.length;c++)i+="var "+o[c]+"=_method."+o[c]+";";return"<% "+i+" %>"},this.__convert=function(e,t){var n=[].join("");return n+="'use strict';",n+="var _=_||{};",n+="var _out='';_out+='",n+=t!==!1?e.replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").replace(/'(?=[^%]*%>)/g,"	").split("'").join("\\'").split("	").join("'").replace(/<%=(.+?)%>/g,"';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='")+"';return _out;":e.replace(/\\/g,"\\\\").replace(/[\r]/g,"\\r").replace(/[\t]/g,"\\t").replace(/[\n]/g,"\\n").replace(/'(?=[^%]*%>)/g,"	").split("'").join("\\'").split("	").join("'").replace(/<%=(.+?)%>/g,"';_out+=$1;_out+='").split("<%").join("';").split("%>").join("_out+='")+"';return _out.replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');"},this.parse=function(e,t){var i=this;return t&&t.loose===!1||(e=this.__lexicalAnalyze(e)+e),e=this.__removeShell(e,t),e=this.__toNative(e,t),this._render=new Function("_, _method",e),this.render=function(e,t){return t&&t===n.options._method||(t=o(t,n.options._method)),i._render.call(this,e,t)},this}},e.compile=function(e,t){t&&t===this.options||(t=o(t,this.options));var i=this,r={get:function(e){return t.cachestore?t.cachestore.get(e):i.__cache[e]},set:function(e,n){return t.cachestore?t.cachestore.set(e,n):i.__cache[e]=n}};try{var s=r.get(e)?r.get(e):new this.template(this.options).parse(e,t);return t&&t.cache===!1||r.set(e,s),s}catch(a){return n("Juicer Compile Exception: "+a.message),{render:function(){}}}},e.to_html=function(e,t,n){return n&&n===this.options||(n=o(n,this.options)),this.compile(e,n).render(t,n._method)},"undefined"!=typeof global&&"undefined"==typeof window&&e.set("cache",!1),"undefined"!=typeof document&&document.body&&(e.documentHTML=document.body.innerHTML),"undefined"!=typeof module&&module.exports?module.exports=e:this.juicer=e}();
