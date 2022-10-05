const fs = require('fs');

const handleLogsDelete =  (id)=>{
    const actualLog =  fs.readFileSync('./TestePratico/API/logs/DeleteLogs.txt');
    const deleteLog = fs.writeFileSync('./TestePratico/API/logs/DeleteLogs.txt', `${actualLog.toString()}LOG: Numero do contato com o id ${id} excluido\n`);
}

module.exports = {
    handleLogsDelete
}