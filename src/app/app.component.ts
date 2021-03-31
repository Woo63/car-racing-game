import { Component , HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'obstacle-racing-game';
  value:number=10;
  hidden:boolean=true;
  startGame(e: KeyboardEvent) : void{
    if (e.key){
      this.hidden=false;
    }
  }

  @HostListener('window:keydown', ['$event'])
  moveRect(e: KeyboardEvent) : void{
      switch(e.key){
        case "ArrowLeft":
          if(this.value>2)
            this.value-=2;
          break;
        case "ArrowRight":
          if(this.value < 18)
            this.value+=2;
          break;
      }
  }
}
