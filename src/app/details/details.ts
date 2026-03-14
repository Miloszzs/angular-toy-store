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

@Component({
  selector: 'app-details',
  imports: [MatCardModule, MatListModule, MatIconModule, RouterLink, MatButtonModule, Loading],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  public authService = AuthService
  toys = signal<Toy | null> (null)
  constructor(route: ActivatedRoute, public utils: Utils){
    route.params.subscribe(params=>{
      const id = params['id']
      axios.get(`https://toy.pequla.com/api/toy/${id}`)
      .then(rsp=>this.toys.set(rsp.data))
    })
  }
}
