(function() {

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

  function log(html) {
    $('.logger').append(html);
  }

  function listItemTemplate(primary, secondary) {    
    var p = document.createElement('p')
    p.className = 'list-item'
    p.innerHTML = [
      '<div class="text-primary">',
        primary,
      '</div>',
      '<div class="text-secondary">',
        secondary,
      '</div>',
      ].join('')
    return p;
  }

  function libraryTemplate(library) {
    return listItemTemplate(library.name, library.description);
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

      // Problem: is selectable.
      // matches.unshift({ name: 'Libraries: ' + matches.length });

      callback(matches);
    }
  }

  $.get('http://api.cdnjs.com/libraries?fields=version,description,keywords', function(data) {
    var libraries = JSON.parse(data).results;
    libraries.forEach(function(library) {
      log(libraryTemplate(library));
    });

    $('.search').typeahead(null, {
      name: 'libraries',
      displayKey: 'name',
      source: substringMatcher(libraries),
      templates: {
        empty: listItemTemplate('No libraries match your query.').outerHTML,
        suggestion: libraryTemplate
      }
    });

    $('.search').removeAttr('disabled');
  });

  // As they pop up: yamlcss 2.4.12. Hover: see a heart field. Hearts always show up when you're active in the field, stored in Chrome settings.
  // status of the thing you added: to the right.
  // What happens when $ already exists, or you overwrite something? Hmm. 

})();
