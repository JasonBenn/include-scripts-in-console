(function() {

  // var jbQuery = function(element) {
  //   this.el = element;
  // }

  // jbQuery.prototype.append = function(element) {
  //   this.el.appendChild(element)
  // }

  // var CLASS_SELECTOR = /^\.([\w-]+)$/;
  // var TAG_SELECTOR = /^[^\.#]([\w-]+)$/;
  // var ID_SELECTOR = /^\#([\w-]+)$/;

  // var $ = function(selector) {  
  //   if (CLASS_SELECTOR.test(selector)) {
  //     var query = CLASS_SELECTOR.exec(selector)[1];
  //     var selection = document.getElementsByClassName(query)[0];
  //   }

  //   return new jbQuery(selection);
  // }

  $.get = function(url, successCallback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          successCallback(xhr.responseText);
        } else {
          log('Error in request to ' + url + '. ' + JSON.stringify(arguments))
        }
      }
    }
    xhr.open("GET", url, true);
    // xhr.open("GET", chrome.extension.getURL(url), true);
    xhr.send();
  }

  // $.create = function(tag, content, options) {
  //   var el = document.createElement(tag);
  //   if (options.className) el.className = options.className;
  //   el.innerHTML = content;
  //   return el;
  // }

  function log(html) {
    $('.logger').append(html);
  }

  function libraryTemplate(library) {
    var p = document.createElement('p')
    p.className = 'list-item'
    p.innerHTML = [
      '<div class="text-primary">',
        library.name,
      '</div>',
      '<div class="text-secondary">',
        library.description,
      '</div>',
      ].join('')
    return p;
  }

  function addjQuery() {
    element.innerHTML = 'console.inject = ' + injectFunction.toString();
    document.head.appendChild(element);
  }

  function substringMatcher(strings) {
    return function findMatches(query, callback) {
      var matches = [];
      var substringFinder = new RegExp(query, 'i');

      strings.forEach(function(library) {
        if (substringFinder.test(library.name)) {
          matches.push(library);
        }
      });

      callback(matches);
    }
  }

  $.get('http://api.cdnjs.com/libraries?fields=version,description', function(data) {
    var libraries = JSON.parse(data).results;
    libraries.forEach(function(library) {
      log(libraryTemplate(library));
    });

    $('.search').typeahead(null, {
      name: 'libraries',
      displayKey: 'name',
      source: substringMatcher(libraries),
      templates: {
        empty: [
          '<p class="list-item">',
          '<div class="text-primary">',
          'No libraries match current query.',
          '</div>',
          '</p>'
        ].join('\n'),
        suggestion: libraryTemplate
      }
    });

    $('.search').removeAttr('disabled');
  });

  // As they pop up: yamlcss 2.4.12. Hover: see a heart field. Hearts always show up when you're active in the field, stored in Chrome settings.
  // status of the thing you added: to the right.
  // What happens when $ already exists, or you overwrite something? Hmm. 


  // ADDING EVENT LISTENERS

  // function listen() {
  //   var loadButton = document.querySelector('.add-button');
  //   loadButton.addEventListener('click', addjQuery);
  // }

  // window.addEventListener('load', listen);

})();
