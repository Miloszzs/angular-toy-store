import { Component, signal } from '@angular/core';
import { Toy } from '../../models/toy.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToyService } from '../services/toy.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { Loading } from '../loading/loading';
import { Utils } from '../utils';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { OrderModel } from '../../models/order.model';
import { AuthService } from '../services/auth.service';
import { Alerts } from '../alerts';

@Component({
  selector: 'app-order',
  imports: [
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      FormsModule,
      MatSelectModule,
      MatButtonModule,
      MatListModule,
      MatInputModule,
      FormsModule,
      Loading],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  toy = signal<Toy | null>(null)
  order : Partial<OrderModel> = {
    count: 1
  }
  constructor (public router: Router, private route: ActivatedRoute, public utils: Utils){
    if(!AuthService.getActiveUser()) {
      this.router.navigate(['/login'])
      return
    }
    route.params.subscribe(params => {
    const id = Number(params['id'])
    ToyService.getToyById(id)
    .then(rsp => {
      this.toy.set(rsp.data)
    })
  })
}
  calculateTotal() {
    return (this.order.count! * this.toy()!.price)
  }

  placeOrder() {
    Alerts.confirm('Jeste li sigurni da zelite da obavite kupovinu?', ()=> {
    AuthService.createOrder(this.order, this.toy()!)
    Alerts.success('Vasa narudzbina se nalazi u rezervacijama')
    this.router.navigate(['/cart'])
    })
  }
}
