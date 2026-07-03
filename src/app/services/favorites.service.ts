import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private _storage: Storage | null = null;
  private favorites: Pokemon[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializa el almacenamiento nativo y carga lo que ya estaba guardado
  async init() {
    this._storage = await this.storage.create();
    const guardados = await this._storage.get('favorites');
    this.favorites = guardados || [];
  }

  // Devuelve la lista de favoritos
  async getFavorites(): Promise<Pokemon[]> {
    if (!this._storage) { await this.init(); }
    return this.favorites;
  }

  // Verifica si un Pokémon ya es favorito (por nombre, que es único)
  isFavorite(name: string): boolean {
    return this.favorites.some(p => p.name === name);
  }

  // Agrega o quita un favorito y lo persiste. Retorna true si quedó como favorito.
  async toggleFavorite(pokemon: Pokemon): Promise<boolean> {
    if (!this._storage) { await this.init(); }

    const existe = this.isFavorite(pokemon.name);
    if (existe) {
      this.favorites = this.favorites.filter(p => p.name !== pokemon.name);
    } else {
      this.favorites.push(pokemon);
    }

    await this._storage!.set('favorites', this.favorites);
    return !existe;
  }
}
