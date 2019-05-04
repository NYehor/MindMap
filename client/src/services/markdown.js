import hljs from 'highlight.js';
import markdown from 'markdown-it';

hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
hljs.registerLanguage('less', require('highlight.js/lib/languages/less'));
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));
hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));
hljs.registerLanguage('yaml', require('highlight.js/lib/languages/yaml'));

const mdHtml = require('markdown-it')({
	html: false,
	xhtmlOut: false,
	breaks: true,
	langPrefix: 'language-',
	linkify: true,
    typographer: true,
    highlight(str, lang) {

        var esc = mdHtml.utils.escapeHtml;
        console.log(esc);
      
        try {
            if (lang && lang !== 'auto' && hljs.getLanguage(lang)) {  
                return '<pre class="hljs language-' + esc(lang.toLowerCase()) + '"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';  
            } 
            else if (lang === 'auto') {  
                var result = hljs.highlightAuto(str);  
                console.log('highlight language: ' + result.language + ', relevance: ' + result.relevance);  
                return '<pre class="hljs language-' + esc(result.language) + '"><code>' + result.value + '</code></pre>';
            }
        } 
        catch (__) {/**/
        }
      
        return '<pre class="hljs"><code>' + esc(str) + '</code></pre>';    
    }
});


export default mdHtml;
  