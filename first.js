
async function loadPokemon() {
try {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+Math.floor(Math.random() * 100));
  if (!response.ok) {
    console.error("Network response was not ok:", response.statusText);
    return;
  }else {
    const data = await response.json();
      const dataElement = document.getElementById("data");
      dataElement.textContent = data.name;
    console.log(data.name);
  }}
catch (error) {
  console.error("Error fetching data:", error);
  return;
}}

loadPokemon();
