const btnAddTelefoneExtra = document.querySelector('#btn_addTelefone');
const divTelefonesExtras = document.querySelector('.telefones_extras');

btnAddTelefoneExtra.addEventListener('click', (e)=>{
    e.preventDefault();
    const telefoneExtra = document.createElement('input');
    telefoneExtra.classList.add('input-telefone');
    divTelefonesExtras.appendChild(telefoneExtra);
})