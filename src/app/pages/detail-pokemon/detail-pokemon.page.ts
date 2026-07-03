import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Pokemon } from '../../models/pokemon';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: false
})
export class DetailPokemonPage implements OnInit {

  public pokemon: Pokemon;
  public esFavorito: boolean = false;

  constructor(
    private navController: NavController,
    private toastController: ToastController,
    private favoritesService: FavoritesService
  ) {
    this.pokemon = history.state.pokemon;
  }

  async ngOnInit() {
    await this.favoritesService.getFavorites(); // asegura que el storage esté listo
    this.esFavorito = this.favoritesService.isFavorite(this.pokemon.name);
  }

  async toggleFavorito() {
    const agregado = await this.favoritesService.toggleFavorite(this.pokemon);
    this.esFavorito = agregado;

    await this.mostrarToast(
      agregado
        ? this.pokemon.name + ' se añadió a favoritos'
        : this.pokemon.name + ' se eliminó de favoritos'
    );
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    await toast.present();
  }

  goBack() {
    this.navController.pop();
  }

}
