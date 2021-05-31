import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';
import { Weapon } from '../../models/weapon';
import { WeaponService } from '../../services/weapon.service';
import { Armour } from '../../models/armour';
import { ArmourService } from '../../services/armour.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  weapons: Weapon[] = [];
  armours: Armour[] = [];
  initialHealth = 0;
  heroName = '';

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponService,
    private armourService: ArmourService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getHero();
    this.getWeapons();
    this.getArmours();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => {
      this.heroName = hero.name;
      this.hero = Object.assign({}, hero);
      this.initialHealth = this.hero.health;
    });
  }

  getWeapons(): void {
    this.weaponService.getWeapons().subscribe(weapons => {
      this.weapons = weapons;
    });
  }

  getArmours(): void {
    this.armourService.getArmours().subscribe(armours => {
      this.armours = armours;
    });
  }

  onUpdateHealthHero() {
    if (this.hero) {
      this.hero.health = this.hero.armour ? (this.initialHealth + this.hero.armour?.health) : this.initialHealth;
    }
  }

  imagePreview(files: any) {
    if (files.length === 0) {
      return;
    }
    const file = files[0];
    const reader: FileReader = new FileReader();
    const URL = window.URL || window.webkitURL;
    if (URL) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        this.hero!.imageSrc = URL.createObjectURL(file);
      };
      img.onerror = () => {
        return;
      };
    } else if (reader) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.hero!.imageSrc = reader.result as string;
      };
    }
    file.value = null;
  }

  onRemoveImg(file: any) {
    this.hero!.imageSrc = '';
    if (file) {
      file.value = '';
    }
  }

  onSave(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
