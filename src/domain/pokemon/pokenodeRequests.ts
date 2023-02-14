const base_evo = [
    'bulbasaur', 'charmander', 'squirtle', 'caterpie', 'weedle', 'pidgey', 'rattata',
    'spearow', 'ekans', 'pikachu', 'sandshrew', 'nidoran♀', 'nidoran♂', 'clefairy', 'vulpix', 'jigglypuff',
    'zubat', 'oddish', 'paras', 'venonat', 'diglett', 'meowth', 'psyduck', 'mankey', 'growlithe', 'poliwag',
    'abra', 'machop', 'bellsprout', 'tentacool', 'geodude', 'ponyta', 'slowpoke', 'magnemite', "farfetch'd",
    'seel', 'grimer', 'shellder', 'gastly', 'onix', 'drowzee', 'krabby', 'voltorb', 'exeggcute', 'cubone',
    'hitmonlee', 'lickitung', 'koffing', 'rhyhorn', 'chansey', 'tangela', 'kangaskahn', 'horsea', 'goldeen',
    'staryu', 'mr. mime', 'scyther', 'jynx', 'electabuzz', 'magmar', 'pinsir', 'tauros', 'magikarp', 'lapras',
    'ditto', 'eevee', 'porygon', 'omanyte', 'kabuto', 'aerodactyl', 'snorlax', 'articuno', 'zapdos', 'moltres', 'dratini',
    'mewtwo', 'mew'
];

const pickRandomBase = () => {
    return Math.floor(Math.random() * ((base_evo.length) - 1) + 1);
};

const grabRandomPokemon = () => {
    const num = pickRandomBase();
    const selection = base_evo[num]
    // from here, we'll check the current user's userPokemon array
    // if `selection` exists in the array, we'll draw again!

    // otherwise, this selection will be passed to the relevant calls
}
