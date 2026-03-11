import { Component, signal } from '@angular/core';
import axios from 'axios';
import { Toy } from '../../models/toy.model';
import { RouterLink } from "@angular/router";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Utils } from '../utils';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  toys = signal<Toy[]>([])

  constructor(public utils: Utils) {
    axios.get('https://toy.pequla.com/api/toy')
    .then(rsp=>this.toys.set(rsp.data))
  }

}
