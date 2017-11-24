(function() {
  'use strict';
  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela..
  */
  var $form = document.querySelector('[data-js="form"]');
  var $inputSearchCep = document.querySelector('[data-js="cep-input"]');
  var $inputLogradouro = document.querySelector('[data-js="logradouro"]');
  var $inputBairro = document.querySelector('[data-js="bairro"]');
  var $inputEstado = document.querySelector('[data-js="estado"]');
  var $inputCidade = document.querySelector('[data-js="cidade"]');
  var $inputCEP = document.querySelector('[data-js="cep"]');
  var $buttonSearch = document.querySelector('[data-js="action"]');
  var $message = document.querySelector('[data-js="message"]');
  var ajax;

  $form.addEventListener('submit', searchCEP, false);

  function getAddress() {
    var cep = $inputSearchCep.value;
    ajax = new XMLHttpRequest;
    ajax.open('GET', 'https://viacep.com.br/ws/'+ cep +'/json/', true);
    ajax.send();
    ajax.addEventListener('readystatechange', resolveData, true)
  }
  
  function resolveData() {
    var cep = $inputSearchCep.value;
    var message;

    if (ajax.readyState === 3) {
      message = 'Buscando informações para o CEP ' + cep + '...';
    } else if (ajax.readyState === 4) {
      message = '';
    }

    if (ajax.readyState === 4 && ajax.status === 200) {
      var data = JSON.parse(ajax.response);
      $inputLogradouro.value = data.logradouro;
      $inputBairro.value = data.bairro;
      $inputCidade.value = data.localidade;
      $inputEstado.value = data.uf;
      $inputCEP.value = data.cep;
    } else {
      message = 'Não encontramos o endereço para o CEP ' + cep + '.';
      $inputLogradouro.value = '';
      $inputBairro.value = '';
      $inputCidade.value = '';
      $inputEstado.value = '';
      $inputCEP.value = '';
    }
    $message.innerText = message;
  }

  function searchCEP(event) {
    event.preventDefault();
    getAddress();
  }
})();
