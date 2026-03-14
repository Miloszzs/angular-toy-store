import { Component, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Loading } from '../loading/loading';
import { ToyService } from '../services/toy.service';
import { Alerts } from '../alerts';
import {MatSelectModule} from '@angular/material/select';
import { Utils } from '../utils';

@Component({
  selector: 'app-user',
  imports: [MatCardModule, MatSelectModule, MatInputModule, MatAnchor, MatButtonModule, MatIcon, FormsModule, Loading],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  public activeUser = AuthService.getActiveUser()
  toy = signal<string[]>([])
  oldPassword = ''
  newPassword = ''
  passRepeat = ''
  constructor(private router: Router, public utils: Utils) {
    if(!AuthService.getActiveUser()) {
      router.navigate(['/login'])
      return
    }
    ToyService.getToyType()
    .then(rsp=> {
      const types = rsp.data.map((t: any) => t.name)
      this.toy.set(types)
    })
  }

  getAvatarUrl() {
    return `https://ui-avatars.com/api/?name=${this.activeUser?.firstName}+${this.activeUser?.lastName}`
  }
  
  updateUser() {
    Alerts.confirm('Da li ste sigurni da zelite da sacuvate promene', () => {
    AuthService.updateActiveUser(this.activeUser!)
    Alerts.success('Uspesno promenjen sadrzaj!')
    })
  }
  
  updatePassword() {
    Alerts.confirm('Are you sure you want to change the password?',
      () => {
        if (this.oldPassword != this.activeUser?.password) {
          Alerts.error('Invalid old password')
          return
        }

        if (this.newPassword.length < 6) {
          Alerts.error('Password must be at least 6 characters long')
          return
        }

        if (this.newPassword != this.passRepeat) {
          Alerts.error('Passwords dont match')
          return
        }

        if (this.newPassword == this.activeUser?.password) {
          Alerts.error('New password cant be the same as the old one')
          return
        }

        AuthService.updateActiveUserPassword(this.newPassword)
        Alerts.success('Password updated successfuly')
        AuthService.logout()
        this.router.navigate(['/login'])
      })
  }
}

