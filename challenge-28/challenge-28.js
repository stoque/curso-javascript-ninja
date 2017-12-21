(function(win, doc) {
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
  'use strict';

  const $inputCEP = document.querySelector('[data-js="input-cep"]');
  const $message = document.querySelector('[data-js="message"]');
  const $inputLogradouro = document.querySelector('[data-js="input-logradouro"]');
  const $inputBairro = document.querySelector('[data-js="input-bairro"]');
  const $inputCidade = document.querySelector('[data-js="input-cidade"]');
  const $inputEstado = document.querySelector('[data-js="input-estado"]');
  const ajax = new XMLHttpRequest;

  $inputCEP.addEventListener('blur', getCEP, false);

  function getCEP(event) {
    const cep = cleanInputCEP();
    const url = cleanCEPString('https://viacep.com.br/ws/[CEP]/json/');
    ajax.open('GET', url);
    if (cep) {
      $message.textContent = getMessages('loading');
      ajax.send();
      ajax.addEventListener('readystatechange', handleAjaxStateChange, false);
    }
  }
  
  function handleAjaxStateChange() {
    if (isRequestOK()) {
      $message.textContent = getMessages('success');
      fillAddressInputs();
    } else {
      $message.textContent = getMessages('error');
      cleanAddressInputs();
    }
  }

  function cleanInputCEP() {
    const regex = /\D/g;
    return $inputCEP.value.replace(regex, '');
  }

  function cleanCEPString(string) {
    return string.replace('[CEP]', cleanInputCEP())
  }

  function fillAddressInputs() {
    const data = JSON.parse(ajax.responseText);
    $inputLogradouro.value = data.logradouro;
    $inputBairro.value = data.bairro;
    $inputCidade.value = data.localidade;
    $inputEstado.value = data.uf;
  }
  
  function cleanAddressInputs() {
    $inputLogradouro.value = '';
    $inputBairro.value = '';
    $inputCidade.value = '';
    $inputEstado.value = '';
  }
  
  function isRequestOK() {
    if (ajax.readyState === 4 && ajax.status === 200) {
      return true;
    }
  }

  function getMessages(type) {
    const messages = {
      loading: 'Buscando informações para o CEP [CEP]...',
      success: 'Endereço referente ao CEP [CEP]:',
      error: 'Não encontramos o endereço para o CEP [CEP].'
    };

    return cleanCEPString(messages[type]);
  }
})(window, document);
