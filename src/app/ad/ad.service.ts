import {Injectable} from '@angular/core';

import {AdItem} from './ad.item';
import {ObstacleComponent} from '../obstacle/obstacle.component';


@Injectable()
export class AdService {
  getAds(race, top) {
    return new AdItem(ObstacleComponent, {left: race, top: top})
  }
}
