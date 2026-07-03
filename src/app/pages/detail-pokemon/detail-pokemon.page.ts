import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: false
})
export class DetailPokemonPage {

  public pokemon: Pokemon;

  constructor(
    private navController: NavController
  ) {
    this.pokemon = history.state.pokemon;
  }

  goBack() {
    this.navController.pop();
  }

}
