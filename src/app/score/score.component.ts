import { Component, Input } from '@angular/core';

@Component({
  selector:'app-score',
  template: `
      <div class="score">
          <h2> SCORE </h2>
          <p>{{score*10}}</p>
          <h2>HI-SCORE</h2>
          <p>{{highScore}}</p>
      </div>
  `,
  styles: [`
    .score{
        text-align: center;
    }`]
})
export class ScoreComponent{
  @Input() score:number;
  highScore: number;
  constructor(){
     this.highScore = Number(window.localStorage.getItem('highScore')) || 0;
}

}
