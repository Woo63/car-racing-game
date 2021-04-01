import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hidden: boolean = true;

  @HostListener('window:keydown', ['$event'])
  startGame(e: KeyboardEvent): void {
    if (e.key) {
      this.hidden = false;
    }
  }
}
