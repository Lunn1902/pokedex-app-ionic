import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: false
})
export class ListPokemonsPage implements OnInit {

  public pokemons: Pokemon[];

  constructor(
    private pokemonService: PokemonService,
    private loadingController: LoadingController,
    private navController: NavController
  ) {
    this.pokemons = [];
  }

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

        if ($event) {
          $event.target.complete();
        }
        setTimeout(() => {
          if (loading) {
            loading.dismiss();
          }
        }, 1000);

      }).catch((err) => {
        console.error(err);
        if ($event) {
          $event.target.complete();
        }
        setTimeout(() => {
          if (loading) {
            loading.dismiss();
          }
        }, 1000);
      });
    }
  }

  goToDetail(pokemon: Pokemon) {
    this.navController.navigateForward('detail-pokemon', {
      state: { pokemon }
    });
  }

}
