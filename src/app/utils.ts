import { Injectable } from '@angular/core';
import { Toy } from '../models/toy.model';

@Injectable({
  providedIn: 'root',
})
export class Utils {
    formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
}
    getImageUrl(toy: Toy) {
      return `https://toy.pequla.com${toy.imageUrl}`
    }
}
