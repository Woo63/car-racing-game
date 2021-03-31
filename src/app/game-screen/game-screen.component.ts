import {Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy} from '@angular/core';
import {AdDirective} from '../ad.directive';
import {AdComponent} from '../ad.component';
import {AdService} from '../ad.service';

enum CarRace {
  '5rem',
  '15rem'
}

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})

export class GameScreenComponent implements OnInit, OnDestroy{
  @Input() value:number;
  count:number=0;
  carPos:number;
  startTop:number=-22;
  topPosition:number;
  bottomPosition:number=32;
  carWeight:number=6;
  carHeight:number=10;
  speed:number=20;
  speedNumber:number=1;
  leftPosition:number[]=[5,15]

  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private adService: AdService) { }

  ngOnInit() {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  creatComponent(carPos, top){
    const adItem = this.adService.getAds(carPos, top);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<AdComponent>(componentFactory);
    componentRef.instance.data = adItem.data;
  }

  loadComponent() {
    this.carPos = Math.floor(Math.random() * Math.floor(2));
    if (((this.count+1) % 3 == 0) && (this.speed>4)){
    this.speed-=2;
    this.speedNumber++;
    }
    this.creatComponent(CarRace[this.carPos], this.startTop)
    this.topPosition=this.startTop;
    setTimeout(()=>{
      this.count++}
      , ((this.bottomPosition-this.topPosition)/0.3)*this.speed);
  }
  moveComponent(){
    this.topPosition+=0.3;
    this.creatComponent(CarRace[this.carPos], this.topPosition)
    this.detectedCrash();
    if (this.topPosition>=this.bottomPosition){
      clearInterval(this.interval)
      this.loadComponent()
      this.getAds()
    }
  }
  detectedCrash(){
    if ((this.topPosition+this.carHeight>=18)&&(
      ((this.leftPosition[this.carPos]>=this.value)&&(this.leftPosition[this.carPos]<=this.value+this.carWeight)) ||
      ((this.leftPosition[this.carPos]+this.carWeight>=this.value)&&(this.leftPosition[this.carPos]+this.carWeight<=this.value+this.carWeight))
  )){
      this.count--;
      clearInterval(this.interval);
      if (Number(window.localStorage.getItem('highScore'))<this.count*10){
        window.localStorage.setItem('highScore', (this.count*10).toString())
      }
      alert('game over');
      window.location.reload();
    }
  }

  getAds() {
    this.interval = setInterval(() => {
      this.moveComponent();
    }, this.speed);
  }
}
