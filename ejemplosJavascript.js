const data = [{
    title: 'Aprendiendo Javascript',
    year: '2021',
    isbn: '979-8700179263',
    author: 'Carlos Azaustre'
}, {
    title: 'Aprendiendo Javascript',
    year: '2021',
    isbn: '979-8700179263',
    author: 'Carlos Azaustre'
}, {
    title: 'Aprendiendo Javascript',
    year: '2021',
    isbn: '979-8700179263',
    author: 'Carlos Azaustre'
}];
// EJEMPLO SINCRONO
// function getData() {
//     setTimeout(() => {
//         console.log(data);
//     }, 7000)
// }
// getData()

// EJEMPLIO ASÍNCRONO devuelve undefined
// function getData(){
//     setTimeout(() => {
//         return data;
//     }, 5000);
// }
// console.log(getData())

// CON PROMESAS de por si no hace nada
function getData() {
    return new Promise((resolve, reject) => {
        if (data.length === 0) {
            reject(new Error('No hay Datos'))
        }
        setTimeout(() => {
            resolve(data);
        }, 4000)
    })
}
// SE LLAMA A LA FUNCION
getData()
    .then((response) => console.log(response))
    .catch((err) => console.log(err.message))