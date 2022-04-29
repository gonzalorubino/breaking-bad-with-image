const API_KEY = "AZCjM68y1GkgBjzTFlISEwbwQGJqPdjZ";
const elementoBoton = document.getElementById('sendButton');
const elementoPhrase = document.getElementById('phrase');
const elementoImg = document.getElementById('image'); 

const buscarFrase = ()=>{
    fetch('https://breaking-bad-quotes-for-vercel.vercel.app/api/quotes')
    .then(function(response){
        // console.log('linea 7', response);
        
        return response.json();
    }).then(function(json){

        // console.log('llegue a linea 12', json);

        elementoPhrase.innerHTML = `<p>Dijo ${json.data[0].author}: ${json.data[0].quote}</p>`;

        return json.data[0].author;
    }).then(function(quienFue){
        // Busco la imagen del autor
        buscarImagen(quienFue);
    })
    .finally(function(){console.log('finalice primer parte')})
    .catch(function(err){
        console.log("Something went wrong", err);
    });
}

const buscarImagen = (author) => {
    fetch("https://api.giphy.com/v1/gifs/search?api_key="+ API_KEY +"&q="+ author +"&limit=1&offset=0&rating=g&lang=en")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log('data img - linea 33: ', data);
        elementoImg.innerHTML = `<img src="${data.data[0].images.downsized.url}" />`;
    })
    .catch(function(err){console.log('error!: ',err)})
}

elementoBoton.addEventListener('click', buscarFrase);

function imprimirResultado(data){
    const resultDiv = document.getElementById('main');
    let images = '';


    // images += `<div><img src="${data.images.downsized.url}" height="${data.images.downsized.height * 2}"/><div>`
    images += `<a href="${data.bitly_gif_url}">${data.id}</a>`
    resultDiv.innerHTML = `<div class='row'>${images}</div>`;
}