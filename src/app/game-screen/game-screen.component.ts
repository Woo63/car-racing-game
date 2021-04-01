import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {AdDirective} from '../ad/ad.directive';
import {GameService} from "../game.service";

@Component({
  selector: 'app-game-screen',
  template: `
    <div class="board" style="overflow: hidden">
      <app-main-car class="main" [style.left]="playerPosition.toString()+'rem'"></app-main-car>
      <ng-template adHost></ng-template>
    </div>
  `,
  providers: [GameService]
})

export class GameScreenComponent implements OnInit {
  playerPosition: number = 10;
  score: number = 0;
  speedNumber: number = 1;

  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.startGame(this.playerPosition, this.adHost);
    this.gameService.speedNumber.subscribe(value => {
      this.speedNumber = value
    });
    this.gameService.score.subscribe(value => {
      this.score = value
    })
  }

  @HostListener('window:keydown', ['$event'])
  moveRect(e: KeyboardEvent): void {
    switch (e.key) {
      case "ArrowLeft":
        if (this.playerPosition > 2) {
          this.gameService.movePlayer('left');
          this.playerPosition -= 2;
        }
        break;
      case "ArrowRight":
        if (this.playerPosition < 18) {
          this.playerPosition += 2;
          this.gameService.movePlayer('right')
        }
        break;
    }
  }
}
