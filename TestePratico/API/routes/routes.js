const express = require('express');
const { listAllContacts, addContact, listContactByNameOrNumber, updateContact, deleteNumber } = require('../controller/handleDataBase');

const route = express()

route.get('/contact', listAllContacts);
route.get('/contact/:input', listContactByNameOrNumber);
route.post('/contact', addContact);
route.put('/contact/:id', updateContact);
route.delete('/contact/:id', deleteNumber);

module.exports = route;