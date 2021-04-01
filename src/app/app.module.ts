import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {ObstacleComponent} from './obstacle/obstacle.component';
import {ScoreComponent} from './score/score.component';
import {GameScreenComponent} from './game-screen/game-screen.component';
import {SpeedComponent} from './speed/speed.component';
import {AdDirective} from './ad/ad.directive';
import {AdService} from './ad/ad.service';
import {MainCarComponent} from './main-car/main-car.component';


@NgModule({
  declarations: [
    AppComponent,
    ObstacleComponent,
    ScoreComponent,
    GameScreenComponent,
    SpeedComponent,
    AdDirective,
    MainCarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [AdService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
