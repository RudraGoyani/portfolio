// async function datafetch() {
//     const responce = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
//     const data=await responce.json();
//     console.log(data.name);
// }
// datafetch();
// var buton= document.getElementById('Fetch data');
// buton.addEventListener('click',datafetch);
async function loadPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  const data = await response.json();
    const dataElement = document.getElementById("data");
    dataElement.textContent = data.name;
  console.log(data.name);
}

loadPokemon();
