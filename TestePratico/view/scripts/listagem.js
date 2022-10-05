const listView = document.querySelector('#lista-contatos');


async function fillListView(){
    let listaDeContatos = await axios.get('/contacts');
    console.log(listaDeContatos);
    // listaDeContatos.forEach(contato => {
    //     const option = document.createElement('option');

    //     option.value = contato.id;
    //     option.textContent = `ID: ${contato.id} Nome: ${contato.nome} Telefone: ${contato.numero}`;

    //     listView.appendChild(option);
    // });
}

const btnPesquisar = document.querySelector('#btn-pesquisar');

btnPesquisar.addEventListener('click', (e) => {
    e.preventDefault();

    fillListView();
});