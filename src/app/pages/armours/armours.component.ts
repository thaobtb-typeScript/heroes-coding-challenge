import { Component, OnInit } from '@angular/core';
import { Armour } from '../../models/armour';
import { ArmourService } from '../../services/armour.service';

@Component({
  selector: 'app-armours',
  templateUrl: './armours.component.html',
  styleUrls: ['./armours.component.css']
})
export class ArmoursComponent implements OnInit {
  armours: Armour[] = [];
  selectedArmour: Armour | undefined;

  constructor(private armourService: ArmourService) { }

  ngOnInit() {
    this.getArmoursList();
  }

  getArmoursList(): void {
    this.armourService.getArmours().subscribe(armours => this.armours = armours);
  }
}
