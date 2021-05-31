import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Weapon } from '../models/weapon';
import { WEAPONS } from '../mock-data/mock-weapons';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class WeaponService {

  constructor(private messageService: MessageService) { }

  getWeapons(): Observable<Weapon[]> {
    this.messageService.add('WeaponService: fetched weapons');
    return of(WEAPONS);
  }
}
