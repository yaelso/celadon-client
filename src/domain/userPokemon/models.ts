import { CeladonPokemon } from "../pokemon/models";

export type UserPokemon = {
    user_id: number;
    pokemon_id: number;
    exp: number;
    pokemon:  CeladonPokemon;
}
