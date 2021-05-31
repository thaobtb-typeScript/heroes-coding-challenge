import { Component, OnInit } from '@angular/core';
import { Weapon } from '../../models/weapon';
import { WeaponService } from '../../services/weapon.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html'
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[] = [];
  selectedWeapon: Weapon | undefined;

  constructor(private weaponService: WeaponService) { }

  ngOnInit() {
    this.getWeaponsList();
  }

  getWeaponsList(): void {
    this.weaponService.getWeapons().subscribe(weapons => this.weapons = weapons);
  }
}

