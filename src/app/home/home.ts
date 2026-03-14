import { Component, signal } from '@angular/core';
import { Toy } from '../../models/toy.model';
import { RouterLink } from "@angular/router";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Utils } from '../utils';
import { MatIconModule } from '@angular/material/icon';
import { ToyService } from '../services/toy.service';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, Loading],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  toys = signal<Toy[]>([])

  constructor(public utils: Utils) {
    ToyService.getAllToys()
    .then(rsp=>this.toys.set(rsp.data))
  }

}
