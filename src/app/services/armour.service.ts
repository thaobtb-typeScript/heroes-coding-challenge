import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Armour } from '../models/armour';
import { ARMOURS } from '../mock-data/mock-armour';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class ArmourService {

  constructor(private messageService: MessageService) { }

  getArmours(): Observable<Armour[]> {
    this.messageService.add('ArmourService: fetched armours');
    return of(ARMOURS);
  }
}
