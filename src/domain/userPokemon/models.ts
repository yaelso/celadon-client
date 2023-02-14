import { PokemonType } from "pokenode-ts";
import { CeladonPokemon } from "../pokemon/models";

export type UserPokemon = {
    user_id: number;
    pokemon_id: number;
    exp: number;
    pokemon:  CeladonPokemon;
}

export type PokemonViewModel = {
    id: number;
    exp: number;
    name: string;
    weight: number;
    height: number;
    sprite: string;
    types: PokemonType[];
}
