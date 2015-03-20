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

  function injectLibrary() {
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

  // bind to selected event, too.

  var selection;

  $('.search').on('keyup', function(e) {
    if (e.which === 13) {
      console.log('enter key pressed in input')
      // should it submit the first time, or the second time?
      // $('.typeahead').typeahead('val'); returns just the name, not the URL.
      // debugger
    }
  })

  $.get('http://api.cdnjs.com/libraries?fields=version,description,keywords', function(data) {
    var libraries = JSON.parse(data).results;

    $('.search').typeahead(null, {
      name: 'libraries',
      displayKey: 'name',
      source: substringMatcher(libraries),
      templates: {
        empty: listItemTemplate('No libraries match your query.').outerHTML,
        suggestion: libraryTemplate
      }
    });

    $('.search').on('typeahead:selected', function(event, library) {
      selection = library;
      console.log('')
      log(libraryTemplate(library));
    })

    $('.search').removeAttr('disabled');
  });



  // SELECTED: if TAB, if next keypress is enter, LOAD
  // SELECTED: if ENTER, LOAD
  // Can also add with a (++)

  // LOAD clears input, logs, and remembers it for the future so that i can display loaded next to it and make it an invalid selection.
  // Undo/subtract: reload the page, load the other libraries first.
  // Favorites: third panel on the right: favorite libraries, with (+) and a filled in <3 that you can deselect.



  // As they pop up: yamlcss 2.4.12. Hover: see a heart field. Hearts always show up when you're active in the field, stored in Chrome settings.
  // status of the thing you added: to the right.
  // What happens when $ already exists, or you overwrite something? Hmm. 

})();
