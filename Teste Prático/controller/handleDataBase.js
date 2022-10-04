const knex = require('../database/connection');


const addContact = async(name, age, phoneNumbers)=>{
    
    const nameAlreadyRegistered = await knex('contatos').where('nome', name);

    if (nameAlreadyRegistered.length > 0){
        return 'Já existe um contato com este nome';
    }

    phoneNumbers.forEach(async (number)=>{
        const numberAlreadyRegistered = await knex('telefones').where('numero', number);

        if(numberAlreadyRegistered.length > 0){
            return `O número (${number}) já se encontra vinculado a um contato`;
        }
    })

    try {
        const newContact = {
            nome: name,
            idade: age
        }

        const contactRegister = await knex('contatos').insert(newContact).returning('*');
        
        if(contactRegister.length > 0){
            phoneNumbers.forEach(async (number)=>{
                const newPhoneNumber = {
                    id_contato: contactRegister[0].id,
                    numero: number
                }

                const numberRegister = await knex('telefones').insert(newPhoneNumber).returning('*');

                if(numberRegister.length == 0){
                    return 'Não foi possível cadastrar o numero';
                }
            });
            return "Registro realizado com sucesso!";
        } else {
            return 'Não foi possível cadastrar o contato'
        }
    } catch (error) {
        return error.message;
    }

}


