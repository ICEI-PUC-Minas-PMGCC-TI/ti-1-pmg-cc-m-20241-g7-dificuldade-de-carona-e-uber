// Define o ponto central do mapa como a cidade de Belo Horizonte - MG
const centralLatLong= [-43.9397233,-19.9332786]

// ----------------------------------------------
// Variável global para o mapa
let map;

// ----------------------------------------------
// Carrega os dados das unidades da PUC Minas ao carregar a página 
window.onload = () => {
    carregaDados();
}

// ----------------------------------------------
// Cria uma estrutura de dados com informações das unidades da PUC Minas 
function carregaDados () {
    fetch ('/locais')
        .then (response => response.json())
        .then (data => {
            montarMapa (data);
        })
        .catch (error => {
            alert ('Erro ao obter dados do servidor:' + error.message);
        })
}

// ----------------------------------------------
// Cria um mapa com a API do Mapbox para a div map e 
// adiciona marcadores para cada um dos locais obtidos via JSONServer
function montarMapa (dadosLocais) {
    // ----------------------------------------------
    // IMPORTANTE: Crie uma conta no Mapbox e obtenha uma accessToken, 
    // em seguida, coloque na linha abaixo
    // ----------------------------------------------
    // mapboxgl.accessToken = 'COLOQUE_SUA_TOKEN_DO_MAPBOX_AQUI';
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2VzdHBhc3Npb24iLCJhIjoiY2x4eHgwdjluMWUwZTJpb2NzdzhhejI5eCJ9.TWWNNPA7KX9E29PdJa-B4g';
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: centralLatLong,
        zoom: 9
    });

    // ----------------------------------------------
    // Adiciona marcadores para os locais obtidos via JSONServer
    dadosLocais.forEach ((uni) => {
        let popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3><a href="${uni.url}" target="_blank">${uni.descricao}</a></h3><br>
                      ${uni.endereco} <br> ${uni.cidade}`);
        const marker = new mapboxgl.Marker({ color: uni.cor })
            .setLngLat(uni.latlong)
            .setPopup(popup)
            .addTo(map);     
    }) 

    // obtem a localização do usuário e adiciona um marcador no mapa
    navigator.geolocation.getCurrentPosition (processarGetCurrentPosition, () => { alert ('Erro ao obter localização.') })
}

// ----------------------------------------------
// Adiciona um marcador com nossa posição no mapa
function processarGetCurrentPosition (local) {
  let popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h3> Estou aqui!!! </h3>`);
  const marker = new mapboxgl.Marker({ color: 'yellow' })
      .setLngLat([local.coords.longitude, local.coords.latitude])
      .setPopup(popup)
      .addTo(map);  
}