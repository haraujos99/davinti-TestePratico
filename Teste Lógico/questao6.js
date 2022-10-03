function imprmirEmOrdemCrescente (numeros){
    const numerosOrdenados = numeros.sort((a, b)=>{
        return a - b;
    })

    numerosOrdenados.forEach((numero)=>{
        console.log(numero);
    })
}

