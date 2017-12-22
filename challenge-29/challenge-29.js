(function() {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  var app = (function () {
    return {
      init: function() {
        this.initEvents();
        this.getCompanyInfo();
      },

      initEvents: function initEvents() {
        var $formNewCar = document.querySelector('[data-js="form"]');
        $formNewCar.addEventListener('submit', this.handleFormSubmit, false);
      },

      handleFormSubmit: function handleFormSubmit(e) {
        e.preventDefault();
        var $resultsTable = document.querySelector('[data-js="results-table"]');
        $resultsTable.appendChild(app.createNewCar());
        app.clearInputs();
        app.setFocusInFirstInput();
      },

      createNewCar: function createNewCar() {
        var $fragment = document.createDocumentFragment();
        var $tr = document.createElement('tr');
        var $tdImage = document.createElement('td');
        var $tdModel = document.createElement('td');
        var $tdYear = document.createElement('td');
        var $tdPlate = document.createElement('td');
        var $tdColor = document.createElement('td');
        var $image = document.createElement('img');

        $image.src = document.querySelector('[data-js="image-input"]').value;
        $tdModel.textContent = document.querySelector('[data-js="model-input"]').value;
        $tdYear.textContent = document.querySelector('[data-js="year-input"]').value;
        $tdPlate.textContent = document.querySelector('[data-js="plate-input"]').value;
        $tdColor.textContent = document.querySelector('[data-js="color-input"]').value;

        $tdImage.appendChild($image);
        $tr.appendChild($tdImage);
        $tr.appendChild($tdModel);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        return $fragment.appendChild($tr);
      },

      clearInputs: function clearInputs() {
        document.querySelector('[data-js="image-input"]').value = '';
        document.querySelector('[data-js="model-input"]').value = '';
        document.querySelector('[data-js="year-input"]').value = '';
        document.querySelector('[data-js="plate-input"]').value = '';
        document.querySelector('[data-js="color-input"]').value = '';
      },

      setFocusInFirstInput() {
        var $firstInput = document.querySelector('input');
        $firstInput.focus();
      },
      
      getCompanyInfo: function getCompanyInfo() {
        var ajax = new XMLHttpRequest;
        ajax.open('GET', './company.json', true);
        ajax.send();

        ajax.addEventListener('readystatechange', this.handleCompanyInfo, false);
      },

      handleCompanyInfo: function handleCompanyInfo() {
        if (app.isRequestOK.call(this)) {
          var data = JSON.parse(this.responseText);
          var $companyName = document.querySelector('[data-js="name"]');
          var $companyPhone = document.querySelector('[data-js="phone"]');

          $companyName.textContent = data.name;
          $companyPhone.textContent = data.phone;
        } else {
        }
      },

      isRequestOK: function isRequestOK() {
        return this.readyState === 4 && this.status === 200;
      }
    }
  })();

  app.init();
})();
