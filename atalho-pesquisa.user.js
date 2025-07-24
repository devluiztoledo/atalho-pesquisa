// ==UserScript==
// @name         Atalhos de pesquisa int6 ALT/GGNET
// @version      1.0
// @description  Adiciona botões de atalho para seleção rápida de Nome | Código | CPF | CNPJ na pesquisa de clientes
// @author       Luiz Toledo
// @match        https://integrator6.gegnet.com.br/*
// @match        https://integrator6.acessoline.net.br/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/devluiztoledo/atalho-pesquisa/main/atalho-pesquisa.user.js
// @downloadURL  https://raw.githubusercontent.com/devluiztoledo/atalho-pesquisa/main/atalho-pesquisa.user.js
// @icon         https://raw.githubusercontent.com/devluiztoledo/copiar-dados-onu-autoisp/main/icon.png

// ==/UserScript==

(function() {
    'use strict';

    console.log('[AtalhosPesquisa] script iniciado');

    const campos = [
        { label: 'Nome',   value: 'nome_cli' },
        { label: 'Código', value: 'codcli'   },
        { label: 'CPF',    value: 'cpf'      },
        { label: 'CNPJ',   value: 'cnpj'     }
    ];

    function inserirBotoes() {

        const selectCampo = document.querySelector('select[formcontrolname="campo"], select#campo');
        if (!selectCampo) return;
        if (document.getElementById('search-shortcuts')) return;
        console.log('[AtalhosPesquisa] inserindo botões');

        const fieldDiv = selectCampo.closest('.col-sm-4') || selectCampo.parentElement;
        const wrapper = document.createElement('div');
        wrapper.id = 'search-shortcuts';
        wrapper.style.display = 'flex';
        wrapper.style.flexWrap = 'wrap';
        wrapper.style.gap = '4px';
        wrapper.style.marginBottom = '4px';

        campos.forEach(({ label, value }) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = label;
            btn.className = 'btn btn-primary';
            btn.style.padding = '2px 6px';
            btn.addEventListener('click', () => {
                selectCampo.value = value;
                selectCampo.dispatchEvent(new Event('change', { bubbles: true }));
                const input = document.querySelector('input[formcontrolname="valor"], input#valor');
                if (input) input.focus();
            });
            wrapper.appendChild(btn);
        });

        fieldDiv.insertBefore(wrapper, fieldDiv.firstChild);
    }


    const observer = new MutationObserver(inserirBotoes);
    observer.observe(document.body, { childList: true, subtree: true });
})();
