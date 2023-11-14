import classes from '../components/Details/Details.module.scss';
import { PlatformsSlug } from '../types';

const platformsSlugData: PlatformsSlug = {
  playstation5: classes.ps5,
  playstation4: classes.ps4,
  playstation3: classes.ps3,
  playstation2: classes.ps2,
  playstation: classes.ps1,
  psp: classes.psp,
  'ps-vita': classes.vita,
  'xbox-old': classes.xbox_old,
  'xbox-one': classes.xbox_one,
  'xbox-series-x': classes.xbox_x,
  xbox360: classes.xbox_360,
  ios: classes.ios,
  android: classes.android,
  wii: classes.wii,
  'nintendo-switch': classes.switch,
  macos: classes.macos,
  pc: classes.pc
};

export default platformsSlugData;
