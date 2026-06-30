/* PORTFÓLIO JOAO GUILHERME — main.js
   Funcionalidades:
   1. Menu hambúrguer (mobile)
   2. Filtro de projetos por categoria
   3. Barras de habilidades animadas
   4. Animação de entrada dos elementos ao rolar a página
   5. Validação do formulário de contato*/

document.addEventListener('DOMContentLoaded', function () {

  /*1. MENU HAMBÚRGUER */

  var hamburger = document.getElementById('hamburger');
  var navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('mostrar');
    });

    // fecha o menu ao clicar em um link (mobile)
    var linksMenu = navMenu.querySelectorAll('a');
    linksMenu.forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('mostrar');
      });
    });
  }

  /*2. FILTRO DE PROJETOS  */

  var botoesFiltro = document.querySelectorAll('.filtro-btn');
  var projetos = document.querySelectorAll('.projeto');

  botoesFiltro.forEach(function (botao) {
    botao.addEventListener('click', function () {
      var categoria = botao.getAttribute('data-filtro');

      // atualiza botão ativo
      botoesFiltro.forEach(function (b) {
        b.classList.remove('active');
      });
      botao.classList.add('active');

      // mostra ou esconde os projetos
      projetos.forEach(function (projeto) {
        if (categoria === 'todos' || projeto.getAttribute('data-categoria') === categoria) {
          projeto.classList.remove('escondido');
        } else {
          projeto.classList.add('escondido');
        }
      });
    });
  });

  /*3. BARRAS DE HABILIDADES ANIMADAS */

  var barras = document.querySelectorAll('.barra-preenchida');

  function animarBarras() {
    barras.forEach(function (barra) {
      var largura = barra.getAttribute('data-largura');
      barra.style.width = largura + '%';
    });
  }

  // se a página tiver barras de habilidade, observa quando elas aparecem na tela
  if (barras.length > 0 && 'IntersectionObserver' in window) {
    var observadorBarras = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          animarBarras();
          observadorBarras.disconnect();
        }
      });
    }, { threshold: 0.3 });

    var secaoHabilidades = document.querySelector('.habilidades');
    if (secaoHabilidades) {
      observadorBarras.observe(secaoHabilidades);
    }
  } else {
    // caso o navegador não suporte IntersectionObserver
    setTimeout(animarBarras, 300);
  }

  /*4. ANIMAÇÃO DE ENTRADA AO ROLAR A PÁGINA  */

  var elementosAnimados = document.querySelectorAll('[data-anim]');

  if (elementosAnimados.length > 0 && 'IntersectionObserver' in window) {
    var observadorAnim = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observadorAnim.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15 });

    elementosAnimados.forEach(function (elemento) {
      observadorAnim.observe(elemento);
    });
  } else {
    // caso o navegador não suporte, mostra tudo direto, sem animação
    elementosAnimados.forEach(function (elemento) {
      elemento.classList.add('visivel');
    });
  }

  /*5. VALIDAÇÃO DO FORMULÁRIO DE CONTATO */

  var formulario = document.getElementById('form-contato');

  if (formulario) {
    var campoNome = document.getElementById('nome');
    var campoEmail = document.getElementById('email');
    var campoAssunto = document.getElementById('assunto');
    var campoMensagem = document.getElementById('mensagem');
    var mensagemSucesso = document.getElementById('sucesso');

    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();

      var valido = true;

      // ---- validação do nome ----
      if (campoNome.value.trim().length < 3) {
        mostrarErro(campoNome, 'erro-nome', 'Informe um nome com pelo menos 3 letras.');
        valido = false;
      } else {
        limparErro(campoNome, 'erro-nome');
      }

      // ---- validação do e-mail ----
      var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(campoEmail.value.trim())) {
        mostrarErro(campoEmail, 'erro-email', 'Informe um e-mail válido.');
        valido = false;
      } else {
        limparErro(campoEmail, 'erro-email');
      }

      // ---- validação do assunto ----
      if (campoAssunto.value.trim() === '') {
        mostrarErro(campoAssunto, 'erro-assunto', 'Informe o assunto da mensagem.');
        valido = false;
      } else {
        limparErro(campoAssunto, 'erro-assunto');
      }

      // ---- validação da mensagem ----
      if (campoMensagem.value.trim().length < 10) {
        mostrarErro(campoMensagem, 'erro-mensagem', 'A mensagem deve ter pelo menos 10 caracteres.');
        valido = false;
      } else {
        limparErro(campoMensagem, 'erro-mensagem');
      }

      // ---- se tudo estiver válido ----
      if (valido) {
        mensagemSucesso.classList.add('mostrar');
        mensagemSucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });
        formulario.reset();

        // esconde a mensagem de sucesso depois de alguns segundos
        setTimeout(function () {
          mensagemSucesso.classList.remove('mostrar');
        }, 5000);
      }
    });

    // função para mostrar erro em um campo
    function mostrarErro(campo, idErro, texto) {
      campo.classList.add('invalido');
      document.getElementById(idErro).textContent = texto;
    }

    // função para limpar erro de um campo
    function limparErro(campo, idErro) {
      campo.classList.remove('invalido');
      document.getElementById(idErro).textContent = '';
    }
  }

});
