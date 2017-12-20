(function() {
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

  const $inputSearch = document.querySelector('[data-js="input"]');
  const $action = document.querySelector('[data-js="action"]');
  const $form = document.querySelector('[data-js="form"]');
  const $status = document.querySelector('[data-js="status"]');
  const $cep = document.querySelector('[data-js="cep"]');
  const $address = document.querySelector('[data-js="address"]');
  const $district = document.querySelector('[data-js="district"]');
  const $state = document.querySelector('[data-js="state"]');
  const $city = document.querySelector('[data-js="city"]');

  const ajax = new XMLHttpRequest;

  $form.addEventListener('submit', formSubmit, false);

  
  function formSubmit(event) {
    event.preventDefault();
    let cep = $inputSearch.value;
    getAddress(cep);
  }
  
  function getAddress(cep) {
    cep = cep.match(/\d+/g).join('');
    ajax.open('GET', 'https://viacep.com.br/ws/' +  cep + '/json/');
    ajax.send();
    ajax.addEventListener('readystatechange', function() {
      let state = ajax.readyState;
      let status = ajax.status;

      $status.innerHTML = 'Buscando informações para o CEP ' + cep + '...';
    
      if (isRequestOk(state, status)) {
        let data = JSON.parse(ajax.responseText);

        $status.innerHTML = 'Endereço referente ao CEP ' + data.cep + ':'

        $address.innerHTML = data.logradouro;
        $district.innerHTML = data.bairro;
        $state.innerHTML = data.uf;
        $city.innerHTML = data.localidade;
      } else {
        $status.innerHTML = 'Não encontramos o endereço para o CEP ' + cep + '.';
      }
    })
  }
  
  function isRequestOk(state, status) {
    if (state === 4) {
      if (status === 200) {
        return true; 
      } else {
        return false;
      }
    }
  }
})();
