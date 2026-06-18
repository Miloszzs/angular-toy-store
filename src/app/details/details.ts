import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Toy } from '../../models/toy.model';
import { Utils } from '../utils';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { Loading } from '../loading/loading';
import axios from 'axios';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [MatCardModule, MatListModule, MatIconModule, RouterLink, MatButtonModule, Loading, MatInputModule, MatFormField, FormsModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  public authService = AuthService
  toys = signal<Toy | null> (null)
  toyId!: string;
  canRate = false;
  averageRating = 0;
  userRating = 0;
  userComment = '';
  reviews: {rating: number, comment: string}[] = []
  constructor(route: ActivatedRoute, public utils: Utils){
    route.params.subscribe(params=>{
      this.toyId = params['id'];
      this.canRate = AuthService.canUserRateToy(this.toyId);
      this.averageRating = AuthService.getAverageRating(this.toyId);
      this.reviews = AuthService.getToyReviews(this.toyId);
      axios.get(`https://toy.pequla.com/api/toy/${this.toyId}`)
      .then(rsp=>this.toys.set(rsp.data))
    })
  }

  selectStars(stars: number) {
    this.userRating = stars;
  }

  submitReview() {
    if (this.userRating === 0) {
      alert('Molimo Vas da izaberete ocenu (zvezdice) pre slanja.');
      return;
    }

    AuthService.rateToy(this.toyId, this.userRating, this.userComment);
    alert('Uspešno ste poslali Vaš utisak! Hvala Vam.');

    this.averageRating = AuthService.getAverageRating(this.toyId);
    this.reviews = AuthService.getToyReviews(this.toyId);
    this.userRating = 0;
    this.userComment = '';
  }

}
