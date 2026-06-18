import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ToyService } from '../services/toy.service';
import { Router, RouterLink } from "@angular/router";
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
  toyTypes = signal<string[]>([])
  selectedToyType: string = ''
  constructor(public router: Router) {
    ToyService.getToyType()
    .then(rsp=> {
      const types = rsp.data.map((t: any) => t.name)
      this.toyTypes.set(types)
    }) 
  }
  doSignup() {

    if(AuthService.existsByEmail(this.user.email!)){
      Alerts.error('Imejl se vec koristi')
      return
    }
    if(this.user.firstName == '' || this.user.lastName == '' || this.user.address == '' || this.user.phone == '') {
      Alerts.error('Sva polja moraju biti popunjena')
      return
    }

    if(this.user.password!.length < 6) {
      Alerts.error('Sifra mora imati najmanje 6 karaktera')
      return
    }

    if(this.user.password !== this.repeat) {
      Alerts.error('Sifre se ne podudaraju')
      return
    }
    this.user.toyType = this.selectedToyType
    AuthService.createUser(this.user)
    this.router.navigate(['/login'])
  }
}
