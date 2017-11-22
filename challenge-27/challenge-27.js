(function() {
  'use strict';
  /*
  Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
  métodos semelhantes aos que existem no array, mas que sirvam para os
  elementos do DOM selecionados.
  Crie os seguintes métodos:
  - forEach, map, filter, reduce, reduceRight, every e some.

  Crie também métodos que verificam o tipo do objeto passado por parâmetro.
  Esses métodos não precisam depender de criar um novo elmento do DOM, podem
  ser métodos estáticos.

  Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
  no objeto, como nos exemplos abaixo:
  DOM.isArray([1, 2, 3]); // true
  DOM.isFunction(function() {}); // true
  DOM.isNumber('numero'); // false

  Crie os seguintes métodos para verificação de tipo:
  - isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
  O método isNull deve retornar `true` se o valor for null ou undefined.
  */

  function DOM(elements) {
    this.elements = document.querySelectorAll(elements);
  }

  DOM.prototype.on = function on(event, callback) {
    Array.prototype.forEach.call(this.elements, function(element) {
      element.addEventListener(event, callback, false);
    })
  }
  
  DOM.prototype.off = function off(event, callback) {
    Array.prototype.forEach.call(this.elements, function(element) {
      element.removeEventListener(event, callback, false);
    })
  }
  
  DOM.prototype.get = function get() {
      return this.elements;
  }
  
  DOM.prototype.forEach = function forEach(callback) {
    Array.prototype.forEach.call(this.elements, callback);
  }
  
  DOM.prototype.map = function map(callback) {
    Array.prototype.map.call(this.elements, callback);
  }

  DOM.isArray = function(element) {
    return Object.prototype.toString.call(element) === '[object Array]';
  }

  DOM.isObject = function(element) {
    return Object.prototype.toString.call(element) === '[object Object]';
  }

  DOM.isFunction = function(element) {
    return Object.prototype.toString.call(element) === '[object Function]';
  }

  DOM.isNumber = function(element) {
    return Object.prototype.toString.call(element) === '[object Number]';
  }

  DOM.isString = function(element) {
    return Object.prototype.toString.call(element) === '[object String]';
  }

  DOM.isBoolean = function(element) {
    return Object.prototype.toString.call(element) === '[object Boolean]';
  }

  DOM.isNull = function(element) {
    return Object.prototype.toString.call(element) === '[object Null]';
  }  

  var $items = new DOM('[data-js="list-item"]');
  console.log(DOM.isArray([1, 2, 3]));
  console.log(DOM.isObject({}));
  console.log(DOM.isFunction(function(){}));
  console.log(DOM.isNumber(1));
  console.log(DOM.isString('str'));
  console.log(DOM.isBoolean(true));
  console.log(DOM.isNull(null));
})();