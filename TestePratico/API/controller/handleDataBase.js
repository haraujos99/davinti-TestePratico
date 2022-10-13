const { fstat } = require('fs');
const knex = require('../database/connection');
const { handleLogsDelete } = require('../utils/handleLogDelete');


const addContact = async(req, res)=>{
    const {nome, idade, numero}= req.body;

    if(!nome){
        return res.status(400).json({"message": "Insira um nome"});
    }

    if(!numero){
        return res.status(400).json({"message": "Nenhum telefone inserido"});
        
    } 
    const numberAlreadyRegistered = await knex('telefones').where('numero', numero);

        if(numberAlreadyRegistered.length > 0){
            return res.status(400).json({"message": `O número (${numero}) já se encontra vinculado ao contato de ${numberAlreadyRegistered[0].nome}`});
        }

    try {
        const newContact = {
            nome,
            idade
        }

        const contactRegister = await knex('contatos').insert(newContact).returning('*');
        
        if(contactRegister.length > 0){
            const newPhoneNumber = {
                id_contato: contactRegister[0].id,
                numero
            }

            const numberRegister = await knex('telefones').insert(newPhoneNumber).returning('*');

            if(numberRegister.length == 0){
                return res.status(500).json({"message": "Não foi possível cadastrar o numero"});
            }
            
            return res.status(201).json({"message": "Registro realizado com sucesso!"});
        } else {
            return res.status(500).json({"message": "Não foi possível cadastrar o contato"});
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }

}

const listAllContacts = async (req, res) =>{
    try {
        const list = await knex('contatos')
        .join('telefones', 'contatos.id', 'telefones.id_contato')
        .select('contatos.id', 'contatos.nome','contatos.idade', 'telefones.numero');
        
        if(list.length > 0) {
            return res.status(200).json(list);
        } else{
            return res.status(500).json({"message": "Nenhum contato cadastrado"});
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

const updateContact = async (req, res) => {
    const {id} = req.params;
    const {nome, idade, numero}= req.body;

    if(!nome){
        return res.status(400).json({"message": "O nome precisa estar preenchido"});
    }

    if(!numero){
        return res.status(400).json({"message": "O telefone precisa estar preenchido"});
        
    } 

    const contact = await knex('contatos').where('id', +id).first();

        if(!contact) {
            return res.status(404).json({ "mensagem": "Contato não encontrado" });
        }

    try {
        const contactUpdate = await knex('contatos').update({
            nome,
            idade,
        }).where('id', +id);

        const phoneUpdate = await knex('telefones').update({
            numero
        }).where('id_contato', +id);

        if (contactUpdate.length === 0) {
            return res.status(500).json({ "mensagem ": "Não foi possível editar o contato" });
        }
        if (phoneUpdate.length === 0) {
            return res.status(500).json({ "mensagem ": "Não foi possível editar o numero" });
        }
        return res.status(201).json({"message": "Alteração realizada com sucesso!"});
    } catch (error) {
        return res.status(500).json(error.message);        
    }
}

const deleteNumber = async (req, res) => {
    const {id} = req.params;
    
    const contact = await knex('telefones').where('id_contato', +id).first();
    
    if(!contact) {
        return res.status(404).json({ "mensagem": "Contato não encontrado" });
    }
    
    try {
        const numberDelete = await knex('telefones').delete().where('id_contato', +id);
        
        if (numberDelete.length === 0) {
            return res.status(500).json({ "mensagem": "Não foi possível deletar o contato" });
        }
        
        handleLogsDelete(id);
        return res.status(200).json({ "mensagem": "Contato excluido" });
    } catch (error) {
        return res.status(500).json(error.message);           
    }
}

module.exports ={
    addContact,
    listAllContacts,
    listContactByNameOrNumber,
    updateContact,
    deleteNumber
}