import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToyService } from '../services/toy.service';
import { RouterLink } from "@angular/router";
import { MatSelectModule } from '@angular/material/select';
import { UserModel } from '../../models/user.model';
import { Alerts } from '../alerts';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatIcon, FormsModule, RouterLink, MatSelectModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  user: Partial<UserModel> = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    password: '',
    toyType: ''
  }
  repeat: string = ''
  toy = signal<string[]>([])
  constructor() {
    ToyService.getToyType()
    .then(rsp=> {
      const types = rsp.data.map((t: any) => t.name)
      this.toy.set(types)
    }) 
  }
  doSignup() {
    if(this.user.password !== this.repeat) {
      Alerts.error('Sifre se ne podudaraju')
      return
    }
    if(AuthService.existsByEmail(this.user.email!)){
      Alerts.error('Imejl se vec koristi')
      return
    }
    if(this.user.firstName == '' || this.user.lastName == '' || this.user.address == '' || this.user.toyType == '' || this.user.phone == '') {
      Alerts.error('Sva polja moraju biti popunjena')
      return
    }
  }
}
