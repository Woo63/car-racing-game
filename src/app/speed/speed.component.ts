import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-speed',
  template:`
    <div class="speedWindow">
      <h2>SPEED</h2>
      <p>{{speed}}</p>
    </div>
  `,
  styles: [`
    .speedWindow{
        text-align: center;
    }
  `]
})
export class SpeedComponent {
  @Input() speed;
}
