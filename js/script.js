const pokemonName = document.querySelector('.pokemon_name')
const pokemonNum = document.querySelector('.pokemon_number')
const pokemonImg = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async (pokemon) => { //await só pode ser utilizado em funções async
    
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //só continuará após receber a resposta

    if (APIResponse.status == 200){ //somente irá processar dados de um pokemon existente (status = 200)
        const data = await APIResponse.json(); //guardar em data o json da response
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNum.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data){ //somente irá coletar as informações caso a data exista
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNum.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '' //Limpa o input após pesquisar
        searchPokemon = data.id
    } else {
        pokemonName.innerHTML = 'Not Found'; //Retira a imagem ao não encontrar pokemon
        pokemonNum.innerHTML = '';
        pokemonImg.style.display = 'none';

        input.value = '' //Limpa o input após pesquisar
    }

}

form.addEventListener('submit', (event) => {

    event.preventDefault() //evita que a página seja recarregada (evento padrao do formulario)
    renderPokemon(input.value)
});

buttonPrev.addEventListener('click', (event) => {

    if (searchPokemon > 1){
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    } else {
        searchPokemon = 649
        renderPokemon(searchPokemon)
    }
    
});

buttonNext.addEventListener('click', (event) => {

    if (searchPokemon < 649){
        searchPokemon += 1
        renderPokemon(searchPokemon)
    } else {
        searchPokemon = 1
        renderPokemon(searchPokemon)
    }

});

renderPokemon(searchPokemon) //renderizar sempre o 1 quando iniciar a aplicação