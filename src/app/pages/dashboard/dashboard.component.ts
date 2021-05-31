import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';
import * as $ from 'jquery';
import Konva from 'konva';
import { Subscription, timer } from 'rxjs';
import { WeaponService } from '../../services/weapon.service';
import { Weapon } from '../../models/weapon';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  heroes: Hero[] = [];
  selectedHeroesList: any[] = [];
  weapons: Weapon[] = [];
  defaultStateConfig = {
    container: 'container',
    width: 500,
    height: 500
  };
  configStage!: any;
  layer = new Konva.Layer();
  infoHeroes!: any;
  clickedHero: Hero = {} as Hero;
  private defaultImages = ['/assets/img/img_1.png', '/assets/img/img_2.png'];
  private timerSubscription!: Subscription;

  constructor(
    private heroService: HeroService,
    private weaponService: WeaponService,
    private elementRef: ElementRef
  ) {
  }

  private _unsubscribe(subscription: any) {
    if (subscription) {
      subscription.unsubscribe();
      subscription = null;
    }
  }

  ngOnInit() {
    this.getHeroes();
  }

  ngOnDestroy() {
    $('body').removeClass('modal-open');
    this._unsubscribe(this.timerSubscription);
  }

  ngAfterViewInit() {
    const menuElement = this.elementRef.nativeElement.querySelector('.heroes-menu');
    if (menuElement) {
      this.defaultStateConfig.width = $(menuElement).width()!;
    }
    this.configStage = new Konva.Stage(this.defaultStateConfig);
    this.configStage.add(this.layer);
    this.addText();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(0, 4));
  }

  getWeapons(): void {
    this.weaponService.getWeapons().subscribe(weapons => {
      this.weapons = weapons;
    });
  }

  getDefaultImg() {
    return this.defaultImages[Math.floor(Math.random() * (this.defaultImages.length - 1))];
  }

  drawImage(hero: Hero, imageObj: any) {
    const clonedHero = Object.assign({}, hero);
    const group = new Konva.Group({
      draggable: true,
    });
    const damage = clonedHero.weapon ? clonedHero.weapon.damage : 0;
    const heroImg = new Konva.Image({
      image: imageObj,
      x: (this.configStage.width() - 120) * Math.random(),
      y: (this.configStage.height() - 120) * Math.random(),
      width: 110,
      height: 120,
      name: 'Damage: ' + damage + ', Health: ' + clonedHero.health
    });
    heroImg.id(clonedHero.id.toString());
    const text = new Konva.Text({
      x: heroImg.x() + 25,
      y: heroImg.y(),
      text: clonedHero.name,
      fontSize: 14,
      fontFamily: 'Arial',
      fill: 'green',
    });

    heroImg.on('click', (evt) => {
      this.getWeapons();
      this.clickedHero = Object.assign({}, clonedHero);
      $('body').addClass('modal-open');
    });

    group.add(heroImg);
    group.add(text);
    this.selectedHeroesList.push({heroObject: clonedHero, konvaImg: heroImg, konvaGroup: group});
    this.layer.add(group);
    if (this.selectedHeroesList.length > 1) {
      this.attackAction();
    }
  }

  getText() {
    let textContent = '';
    this.selectedHeroesList.forEach(item => {
      const hero = item.heroObject;
      textContent += hero.name + ': ' + 'Health: ' + hero.health + ', Damage: ' + (hero.weapon?.damage || 0) + '\n\n';
    });
    return textContent;
  }

  updateText() {
    this.infoHeroes.text(this.getText());
  }

  addText() {
    this.infoHeroes = new Konva.Text({
      x: 0,
      y: 0,
      text: this.getText(),
      fontSize: 14,
      fontFamily: 'Arial',
      fill: '#555',
      width: 310,
      padding: 30,
      align: 'left',
    });
    this.layer.add(this.infoHeroes);
  }

  onClickHero(hero: Hero) {
    const index = this.selectedHeroesList.findIndex(h => h.heroObject.id === hero.id);
    if (index > -1) {
      const heroImg = this.selectedHeroesList[index];
      heroImg.konvaGroup.remove();
      this.selectedHeroesList.splice(index, 1);
      this.updateText();
    } else {
      const imageObj = new Image();
      imageObj.onload = () => {
        this.drawImage(hero, imageObj);
      };
      imageObj.src = hero.imageSrc ? hero.imageSrc : this.getDefaultImg();
    }
  }

  attackAction() {
    this._unsubscribe(this.timerSubscription);
    this.timerSubscription = timer(1000, 1000).subscribe(t => {
      this.selectedHeroesList.forEach((hero, index) => {
        const hasDamage = this.selectedHeroesList.filter(h => h.heroObject.id !== hero.heroObject.id && h.heroObject.weapon?.damage);
        const damageTotal = hasDamage.reduce((sum, current) => sum + current.heroObject.weapon.damage, 0);
        if (damageTotal) {
          hero.heroObject.health -= damageTotal;
          if (hero.heroObject.health < 0) {
            hero.konvaGroup.remove();
            this.selectedHeroesList.splice(index, 1);
          } else {
            if (hero.heroObject.health < 50) {
              hero.konvaImg.setAttrs({stroke: 'red', strokeWidth: 5});
            }
          }
        }
      });
      if (this.selectedHeroesList.length < 2) {
        this._unsubscribe(this.timerSubscription);
      }
      this.updateText();
    });
  }

  onClickUpdate() {
    $('body').removeClass('modal-open');
    if (this.clickedHero && this.clickedHero.id) {
      const index = this.selectedHeroesList.findIndex(item => item.heroObject.id === this.clickedHero.id);
      if (index > -1) {
        this.selectedHeroesList[index].heroObject = this.clickedHero;
        this.heroService.updateHero(this.clickedHero);
        this.getHeroes();
      }
      this.updateText();
    }
    this.clickedHero = {} as Hero;
  }

  onCLickCancel() {
    $('body').removeClass('modal-open');
    this.clickedHero = {} as Hero;
  }
}
