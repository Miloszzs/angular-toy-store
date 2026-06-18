import { Component, computed, signal } from '@angular/core';
import { Toy } from '../../models/toy.model';
import { RouterLink } from "@angular/router";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Utils } from '../utils';
import { MatIconModule } from '@angular/material/icon';
import { ToyService } from '../services/toy.service';
import { Loading } from '../loading/loading';
import { MatFormField, MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, Loading, MatInputModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  search = signal<string>('')
  toys = signal<Toy[]>([])
  isLoading = signal<boolean>(true)
  filteredToys = computed(() => {
    const currentSearch = this.search().toLowerCase().trim();
    const allToys = this.toys();
    if(!currentSearch) {
      return allToys;
    }
    return allToys.filter(t => {
    const nameMatches = t.name.toLowerCase().includes(currentSearch);
    const typeMatches = t.type.name ? t.type.name.toLowerCase().includes(currentSearch) : false;
    return nameMatches || typeMatches;
  });
  })

  getRating(toyId: string | number): number {
    return AuthService.getAverageRating(toyId);
  }

  ;

  constructor(public utils: Utils) {
    ToyService.getAllToys()
    .then(rsp=> {
      this.toys.set(rsp.data);
      this.isLoading.set(false);
    })
    .catch(() => {
      this.isLoading.set(false);
    });
  }
}
