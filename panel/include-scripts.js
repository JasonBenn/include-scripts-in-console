// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

(function() {

// // This function is converted to a string and becomes the preprocessor
// function preprocessor(source, url, listenerName) {
//   url = url ? url : '(eval)';
//   url += listenerName ? '_' + listenerName : '';
//   var prefix = 'window.__preprocessed = window.__preprocessed || [];\n';
//   prefix += 'window.__preprocessed.push(\'' + url +'\');\n';
//   var postfix = '\n//# sourceURL=' + url + '.js\n';
//   return prefix + source + postfix;
// }

// function extractPreprocessedFiles(onExtracted) {
//   var expr = 'window.__preprocessed';
//   function onEval(files, isException) {
//     if (isException)
//       throw new Error('Eval failed for ' + expr, isException.value);
//     onExtracted(files);
//   }
//   chrome.devtools.inspectedWindow.eval(expr, onEval);
// }

// function reloadWithPreprocessor(injectedScript) {
//   var options = {
//     ignoreCache: true,
//     userAgent: undefined,
//     injectedScript: '(' + injectedScript  + ')()',
//     preprocessingScript: '(' + preprocessor + ')'
//   };
//   chrome.devtools.inspectedWindow.reload(options);
// }

  var jbQuery = function(element) {
    this.el = element;
  }

  jbQuery.prototype.get = function(url) { 
    return url; 
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

  $.create = function(tag, content) {
    var el = document.createElement(tag);
    el.innerHTML = content;
    return el;
  }

  function log(message) {
    var test = $.create('p', message);
    $('.logger').append(test);
  }

  log('testing class?!')

  function addjQuery() {
    element.innerHTML = 'console.inject = ' + injectFunction.toString();
    document.head.appendChild(element);
  }

  // function listen() {
  //   var loadButton = document.querySelector('.add-button');
  //   loadButton.addEventListener('click', addjQuery);
  // }

  // window.addEventListener('load', listen);

// function createRow(url) {
//   var li = document.createElement('li');
//   li.textContent = url;
//   return li;
// }

// function updateUI(preprocessedFiles) {
//   var rowContainer = document.querySelector('.js-preprocessed-urls');
//   rowContainer.innerHTML = '';
//   preprocessedFiles.forEach(function(url) {
//     rowContainer.appendChild(createRow(url));
//   });
// }

})();
