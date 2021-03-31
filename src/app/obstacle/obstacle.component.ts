import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {AdComponent} from '../ad.component';


@Component({
  template: `
      <div  class="car green"  [style.left]="data.left" [style.top]="data.top.toString()+'rem'">
          <img src=" {{imgUrl}}">
      </div>
  `
})

export class ObstacleComponent{
  @Input() data: any;
  imgUrl:string = './assets/kisspng-pixel-car-racer-pixel-art-clip-art-pixel-5acdc58abecb07.9818341315234348907815.png';
}
