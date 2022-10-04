import listAllContactsAndNumbers from"../../controller/handleDataBase";

listAllContactsAndNumbers();

const listView = document.querySelector('#lista-contatos');

async function fillListView(){
    let listaDeContatos = await listAllContactsAndNumbers();

    listaDeContatos.forEach(contato => {
        const option = document.createElement('option');

        option.value = contato.id;
        option.textContent = `ID: ${contato.id} Nome: ${contato.nome} Telefone: ${contato.numero}`;

        listView.appendChild(option);
    });
}

const btnPesquisar = document.querySelector('#btnPesquisar');

btnPesquisar.addEventListener('click', (e) => {
    e.preventDefault();

    fillListView();
});