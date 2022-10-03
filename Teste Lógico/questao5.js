function lerNumeros (numeros){
    let maiorNumero = numeros[0];
    let menorNumero = numeros[0];
    let somatorio = 0

    numeros.forEach((numero)=>{
        if(numero > maiorNumero){
            maiorNumero = numero;
        }
        if(numero < menorNumero){
            menorNumero = numero;
        }
        somatorio += numero;
    });

    const media = somatorio / numeros.length;

    console.log(`Maior numero: ${maiorNumero}`);
    console.log(`Menor numero: ${menorNumero}`);
    console.log(`Media: ${media}`);

}