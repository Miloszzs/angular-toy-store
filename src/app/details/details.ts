import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Toy } from '../../models/toy.model';
import { Utils } from '../utils';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-details',
  imports: [MatCardModule, MatListModule, MatIconModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  toys = signal<Toy | null> (null)
  constructor(route: ActivatedRoute, public utils: Utils){
    route.params.subscribe(params=>{
      const id = params['id']
      axios.get(`https://toy.pequla.com/api/toy/${id}`)
      .then(rsp=>this.toys.set(rsp.data))
    })
  }
}
