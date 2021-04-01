import {Component} from '@angular/core';

@Component({
  selector: 'app-main-car',
  template: `
    <div class="car">
      <img src=" {{imgUrl}}">
    </div>
  `,
  styles: [`
    img {
      transform: rotate(0.5turn);
    }
  `]
})
export class MainCarComponent {
  imgUrl = './assets/kisspng-pixel-car-racer-pixel-art-8-bit-5ac868c3e0a972.4414301715230834599202.png'
}
