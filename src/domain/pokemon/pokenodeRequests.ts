import { PokemonClient } from "pokenode-ts";

const base_evo = [
    'Bulbasaur', 'Charmander', 'Squirtle', 'Caterpie', 'Weedle', 'Pidgey', 'Rattata',
    'Spearow', 'Ekans', 'Pikachu', 'Sandshrew', 'Nidoran♀', 'Nidoran♂', 'Clefairy', 'Vulpix', 'Jigglypuff',
    'Zubat', 'Oddish', 'Paras', 'Venonat', 'Diglett', 'Meowth', 'Psyduck', 'Mankey', 'Growlithe', 'Poliwag',
    'Abra', 'Machop', 'Bellsprout', 'Tentacool', 'Geodude', 'Ponyta', 'Slowpoke', 'Magnemite', "Farfetch'd",
    'Seel', 'Grimer', 'Shellder', 'Gastly', 'Onix', 'Drowzee', 'Krabby', 'Voltorb', 'Exeggcute', 'Cubone',
    'Hitmonlee', 'Lickitung', 'Koffing', 'Rhyhorn', 'Chansey', 'Tangela', 'Kangaskahn', 'Horsea', 'Goldeen',
    'Staryu', 'Mr. Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', ' Pinsir', 'Tauros', 'Magikarp', 'Lapras',
    'Ditto', 'Eevee', 'Porygon', 'Omanyte', 'Kabuto', 'Aerodactyl', 'Snorlax', 'Articuno', 'Zapdos', 'Moltres', 'Dratini',
    'Mewtwo', 'Mew'
];

const pickRandomBase = () => {
    return Math.floor(Math.random() * ((base_evo.length) - 1) + 1);
};

const queryPokemonData = async (pokemon) => {
    const api = new PokemonClient();

    await api
        .getPokemonByName(pokemon)
        .then((data) => console.log(data))
        .catch((e) => console.error(e))
};
