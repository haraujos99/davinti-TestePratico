const knex = require('../database/connection');


const addContact = async(req, res)=>{
    const {name, age, phoneNumbers}= req.body;

    const nameAlreadyRegistered = await knex('contatos').where('nome', name);

    if (nameAlreadyRegistered.length > 0){
        return res.status(400).json({"message": "Já existe um contato com este nome"});
    }

    if(phoneNumbers.length > 0){
        phoneNumbers.forEach(async (number)=>{
            const numberAlreadyRegistered = await knex('telefones').where('numero', number);

            if(numberAlreadyRegistered.length > 0){
                return res.status(400).json({"message": `O número (${number}) já se encontra vinculado a um contato`});
            }
        })
    } else{
        return res.status(400).json({"message": "Nehum telefone inserido"});
    }

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
                    return res.status(500).json({"message": "Não foi possível cadastrar o numero"});
                }
            });
            return res.status(201).json({"message": "Registro realizado com sucesso!"});
        } else {
            return res.status(500).json({"message": "Não foi possível cadastrar o contato"});
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }

}

const listAllContactsAndNumbers = async (req, res) =>{
    try {
        const list = await knex('contatos')
        .join('telefones', 'contatos.id', 'telefones.id_contato')
        .select('contatos.id', 'contatos.nome', 'telefones.numero');
        
        if(list.length > 0) {
            return res.status(200).json(list);
        } else{
            return res.status(500).json({"message": "Não foi possivel listar os contatos"});
        }

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const listContactByNameOrNumber = async (req, res)=>{
    const {input} = req.params;
    try {
        const selectByName = await knex('contatos')
        .join('telefones', 'contatos.id', 'telefones.id_contato')
        .select('contatos.id', 'contatos.nome', 'telefones.numero')
        .where('contatos.nome', input);

        if(selectByName.length > 0){
            return res.status(200).json(selectByName);
        } else{
            const selectByNumber = await knex('contatos')
            .join('telefones', 'contatos.id', 'telefones.id_contato')
            .select('contatos.id', 'contatos.nome', 'telefones.numero')
            .where('telefones.numero', input);

            if(selectByNumber.length > 0) {
                return res.status(200).json(selectByNumber);
            } else{
                return res.status(404).json({"message": "Nenhum contato encontrado"});
            }

        }

    } catch (error) {
        return res.status(500).json(error.message);
    }

}


module.exports ={
    addContact,
    listAllContactsAndNumbers
}