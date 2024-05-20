fetch('assets/js_json_pagina_caronas/pagina_caronas.json')
.then(response => response.json())
.then(data => {
    const container = document.getElementById('cards_container');
    data.forEach(person => {
        const cardHTML = `
            <div class="card">
                <img class ="card_img" src="assets/imagens_pagina_caronas/${person.pic}" width="50" height="50">
                <div class="details">
                    <h2>${person.name} - ${person.type}</h4>
                    <p>${person.description}</p>
                    <p>Zona: ${person.zone}</p>
                    <p>Endereço: ${person.address}</p>
                </div>
                <button>Contatar</button>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
})
.catch(error => console.error('Error loading the data: ' + error));

document.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const maxScroll = 300; 
    const scrollDistance = window.scrollY;

    if (scrollDistance < maxScroll) {
        header.style.opacity = 1 - scrollDistance / maxScroll;
    } else {
        header.style.opacity = 0;
    }
});
