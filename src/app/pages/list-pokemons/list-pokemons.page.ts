import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: false
})
export class ListPokemonsPage implements OnInit {

  public pokemons: Pokemon[] = [];
  public pokemonsFiltrados: Pokemon[] = [];
  public filtro: string = 'todos';

  // Tipos que aparecerán como categorías en el segmento con scroll
  public tipos: string[] = [
    'grass', 'poison', 'fire', 'water', 'bug', 'normal',
    'electric', 'ground', 'fairy', 'flying', 'fighting', 'psychic'
  ];

  constructor(
    private pokemonService: PokemonService,
    private loadingController: LoadingController,
    private navController: NavController,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.morePokemon();
  }

  async morePokemon($event: any = null) {
    const promise = this.pokemonService.getPokemons();
    if (promise) {

      let loading: HTMLIonLoadingElement | null = null;
      if (!$event) {
        loading = await this.loadingController.create({
          message: 'Cargando...'
        });
        await loading.present();
      }

      promise.then((result: Pokemon[]) => {
        this.pokemons = this.pokemons.concat(result);
        this.aplicarFiltro(); // refresca la lista visible

        if ($event) {
          $event.target.complete();
        }
        setTimeout(() => {
          if (loading) { loading.dismiss(); }
        }, 1000);

      }).catch((err) => {
        console.error(err);
        if ($event) {
          $event.target.complete();
        }
        setTimeout(() => {
          if (loading) { loading.dismiss(); }
        }, 1000);
      });
    }
  }

  // Se dispara cada que el usuario toca un chip del segmento
  async cambiarFiltro(event: any) {
    this.filtro = event.detail.value;

    if (this.filtro === 'favoritos') {
      this.pokemonsFiltrados = await this.favoritesService.getFavorites();
    } else {
      this.aplicarFiltro();
    }
  }

  // Aplica el filtro por tipo sobre los Pokémon ya cargados
  aplicarFiltro() {
    if (this.filtro === 'todos') {
      this.pokemonsFiltrados = this.pokemons;
    } else if (this.filtro !== 'favoritos') {
      this.pokemonsFiltrados = this.pokemons.filter(
        p => p.type1 === this.filtro || p.type2 === this.filtro
      );
    }
  }

  goToDetail(pokemon: Pokemon) {
    this.navController.navigateForward('detail-pokemon', {
      state: { pokemon }
    });
  }

}
