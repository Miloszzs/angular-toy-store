import { Component, signal } from '@angular/core';
import axios from 'axios';
import { Toy } from '../../models/toy.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  toys = signal<Toy[]>([])

  constructor() {
    axios.get('https://toy.pequla.com/api/toy')
    .then(rsp=>this.toys.set(rsp.data))
  }

}
