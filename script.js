// Referenciando o input
let input = document.querySelector('input[name=tarefa]'); 

// Referenciando o button
let btn = document.querySelector('#botao');

// Referenciando a lista
let lista = document.querySelector('#lista');

// Card global 
let card = document.querySelector('.card');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizarTarefas(){

    // Limpar a listagem de itens antes de renderizar novamente a tela
    lista.innerHTML = '';

    for(tarefa of tarefas){
        
    // Criar o item da lista
    let itemLista = document.createElement('li');

    // Adicionar classes no item da lista
    itemLista.setAttribute('class', 'list-group-item list-group-item-action');


    // Adicionar evento de clique no item da lista
        itemLista.onclick = function(){
            deletarTarefa(this);
        }

    // Criar um texxto 
    let itemTexto = document.createTextNode(tarefa);

    // Adiciona o texto no item da lista
    itemLista.appendChild(itemTexto);
    
    // Adicionar o item da lista na lista
    lista.appendChild(itemLista);
    }  
}

renderizarTarefas();

// Evento clique no botão

btn.onclick = function(){
    // Capturar valor do input
    let novaTarefa = input.value;

    if(novaTarefa !== ""){
        // Atualizara lista a tarefas
        tarefas.push(novaTarefa);

        renderizarTarefas();

        // Limpar input
        input.value = '';

        // Limpar mensagens de erro spans
        removerSpans();

        // Salva os novos dados do Storage
        salvarDadosStorage();
    }else{
        removerSpans();

        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Você precisa informar a tarefa!');

        span.appendChild(msg);

        card.appendChild(span);
    }

}

function removerSpans(){
    let spans = document.querySelectorAll('span');

    for(let i = 0; i < spans.length; i++){
        card.removeChild(spans[i]); 
    }
}   

function deletarTarefa(tar){
    // Remove a Tarefa do Array
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    // Renderiza novamente a tela
    renderizarTarefas(); 

    // Salva os novos dados do Storage
    salvarDadosStorage();
}

function salvarDadosStorage(){
    // Navegadores WEB armazenam 
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}