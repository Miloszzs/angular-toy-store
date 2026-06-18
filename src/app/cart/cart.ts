import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Utils } from '../utils';
import { OrderModel } from '../../models/order.model';
import { Toy } from '../../models/toy.model';
import { Alerts } from '../alerts';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Order } from '../order/order';

@Component({
  selector: 'app-cart',
  imports: [MatCardModule,
            MatTableModule,
            MatButtonModule,
            MatIconModule,
            RouterLink,
            MatFormField,
            MatInputModule,
            FormsModule
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  displayedColumns = ['name', 'type', 'ageGroup', 'createdAt', 'count', 'options']
  toy = signal<Toy | null>(null)
  constructor (public router: Router, public utils: Utils) {
    if(!AuthService.getActiveUser()) {
          this.router.navigate(['/login'])
          return
        }
  }

  reloadComponent() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>{
      this.router.navigate(['/cart'])
    })
  }

  calculateTotal(order: OrderModel) {
    return (order.count! * order.price!)
  }

  calculator(){
    let total = 0;
    for (const order of this.getOrdersSec()) {
      total += this.calculateTotal(order);
    }
    return total;
  }

  removeOrder(order: OrderModel) {
    Alerts.confirm('Jeste li sigurni', () => {AuthService.cancelOrder(order.createdAt)
      this.reloadComponent()
    })}

  payAll() {
    Alerts.confirm('Jeste li sigurni?', () => {AuthService.payOrder()
      this.reloadComponent()
    })}

  getOrdersSec() {
    return AuthService.getOrdersByState('rezervisano')
  }

  getCanceledOrders() {
    return AuthService.getOrdersByState('otkazano')
  }

  getDoneOrders() {
    return AuthService.getOrdersByState('pristiglo')
  }

  updateCount(order: OrderModel, event: any) {
    const newCount = parseInt(event.target.value, 10);
    if (!isNaN(newCount) && newCount > 0) {
      order.count = newCount;
    } if (typeof AuthService.updateOrderCount === 'function') {
      AuthService.updateOrderCount(order.createdAt, newCount);
    }
  }

  deleteDoneOrder(order: OrderModel) {
    Alerts.confirm('Jeste li sigurni da želite trajno obrisati ovu porudžbinu iz istorije?', () => {
      if (typeof AuthService.deleteOrder === 'function') {
        AuthService.deleteOrder(order.createdAt);
      } this.reloadComponent();
    });
  }
}
