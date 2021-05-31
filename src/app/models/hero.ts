import { Weapon } from './weapon';
import { Armour } from './armour';

export interface Hero {
  id: number;
  name: string;
  health: number;
  imageSrc?: string;
  weapon?: Weapon;
  armour?: Armour;
}
