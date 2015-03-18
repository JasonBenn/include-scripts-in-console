(function() {

  var jbQuery = function(element) {
    this.el = element;
  }

  jbQuery.prototype.append = function(element) {
    this.el.appendChild(element)
  }

  var CLASS_SELECTOR = /^\.([\w-]+)$/;
  var TAG_SELECTOR = /^[^\.#]([\w-]+)$/;
  var ID_SELECTOR = /^\#([\w-]+)$/;

  var $ = function(selector) {  
    if (CLASS_SELECTOR.test(selector)) {
      var query = CLASS_SELECTOR.exec(selector)[1];
      var selection = document.getElementsByClassName(query)[0];
    }

    return new jbQuery(selection);
  }

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

  $.create = function(tag, content, options) {
    var el = document.createElement(tag);
    if (options.className) el.className = options.className;
    el.innerHTML = content;
    return el;
  }

  function log(message) {
    var messageEl = $.create('p', message, { className: 'list-item' });
    $('.logger').append(messageEl);
  }

  log('jquery 2.1.2 included.')
  log('underscore 1.1.0 included.')

  function addjQuery() {
    element.innerHTML = 'console.inject = ' + injectFunction.toString();
    document.head.appendChild(element);
  }

  $.get('http://api.cdnjs.com/libraries', function(data) {
    var libraries = JSON.parse(data).results;
    libraries.forEach(function(library) {
      var name = library.name;
      var latestVersion = new RegExp('\/libs\/' + name + '\/(.+?)\/').exec(library.latest)[1];
      log(name + ' ' + latestVersion);
    })
    // LOAD typeahead
    $('.search').el.removeAttribute('disabled');
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
