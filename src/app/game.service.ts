import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {AdDirective} from "./ad/ad.directive";
import {AdService} from "./ad/ad.service";
import {AdComponent} from "./ad/ad.component";
import {BehaviorSubject} from "rxjs";

import * as CONF from "./config"

@Injectable()
export class GameService {
  playerPositionLeft: number;
  score: BehaviorSubject<number> = new BehaviorSubject(0);
  speedNumber: BehaviorSubject<number> = new BehaviorSubject(1);
  randomCarLeftPosition: number;
  currentCarPosition: number;
  currentSpeed: number = 20;
  adHost: AdDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private adService: AdService) {
  }

  startGame(value: number, host: AdDirective) {
    this.adHost = host;
    this.playerPositionLeft = value;
    this.loadComponent();
    this.getAds();
  }

  creatComponent(carPositionLeft: string, carPositionTop: number) {
    const adItem = this.adService.getAds(carPositionLeft, carPositionTop);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<AdComponent>(componentFactory);
    componentRef.instance.data = adItem.data;
  }

  loadComponent() {
    this.randomCarLeftPosition = Math.floor(Math.random() * Math.floor(2));
    if (((this.score.value + 1) % 3 === 0) && (this.currentSpeed > CONF.minSpeedValue)) {
      this.currentSpeed -= CONF.diffSpeed;
      this.speedNumber.next(this.speedNumber.value + 1);
    }
    this.creatComponent(CONF.CarRace[this.randomCarLeftPosition], CONF.startCarPosition)
    this.currentCarPosition = CONF.startCarPosition;
  }

  moveComponent() {
    this.currentCarPosition += CONF.diffTopCarPosition;
    this.creatComponent(CONF.CarRace[this.randomCarLeftPosition], this.currentCarPosition)
    this.detectedCrash();
    if (this.currentCarPosition >= CONF.finishCarPosition) {
      clearInterval(this.interval)
      this.score.next(this.score.value + 1)
      this.loadComponent()
      this.getAds()
    }
  }

  detectedCrash() {
    const carLeftOffset = CONF.leftCarPositions[this.randomCarLeftPosition]
    const carRightOffset = carLeftOffset + CONF.carWidth
    if ((this.currentCarPosition + CONF.carHeight >= CONF.topPlayerPosition) && (
      ((carLeftOffset >= this.playerPositionLeft) && (carLeftOffset <= this.playerPositionLeft + CONF.carWidth)) ||
      ((carRightOffset >= this.playerPositionLeft) && (carRightOffset <= this.playerPositionLeft + CONF.carWidth))
    )) {
      clearInterval(this.interval);
      if (Number(window.localStorage.getItem('highScore')) < this.score.value * 10) {
        window.localStorage.setItem('highScore', (this.score.value * 10).toString())
      }
      alert('Game over.');
      window.location.reload();
    }
  }

  getAds() {
    this.interval = setInterval(() => {
      this.moveComponent();
    }, this.currentSpeed);
  }
}
