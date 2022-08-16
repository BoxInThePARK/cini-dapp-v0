import {Dimensions, Platform, ImageSourcePropType} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

export const CONTENT_SPACING = 15;
const BERLIN_ROLL_NFT = require('../assets/img/3d-film-roll/berlin.png');
const LISBON_ROLL_NFT = require('../assets/img/3d-film-roll/lisbon.png');
const SEOUL_ROLL_NFT = require('../assets/img/3d-film-roll/seoul.png');
const TAIPEI_ROLL_NFT = require('../assets/img/3d-film-roll/taipei.png');

const SAFE_BOTTOM =
  Platform.select({
    ios: StaticSafeAreaInsets.safeAreaInsetsBottom,
  }) ?? 0;

export const SAFE_AREA_PADDING = {
  paddingLeft: StaticSafeAreaInsets.safeAreaInsetsLeft + CONTENT_SPACING,
  paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop + CONTENT_SPACING,
  paddingRight: StaticSafeAreaInsets.safeAreaInsetsRight + CONTENT_SPACING,
  paddingBottom: SAFE_BOTTOM + CONTENT_SPACING,
};

// The maximum zoom _factor_ you should be able to zoom in
export const MAX_ZOOM_FACTOR = 20;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Platform.select<number>({
  android:
    Dimensions.get('screen').height - StaticSafeAreaInsets.safeAreaInsetsBottom,
  ios: Dimensions.get('window').height,
}) as number;

// Capture Button
export const CAPTURE_BUTTON_SIZE = 78;

export const ROLL_FILM_SRC: Record<string, ImageSourcePropType> = {
  berlin: BERLIN_ROLL_NFT,
  lisbon: LISBON_ROLL_NFT,
  seoul: SEOUL_ROLL_NFT,
  taipei: TAIPEI_ROLL_NFT,
};

export const ROLL_FILM: Record<string, Record<string, string>> = {
  BERLIN: {
    key: 'berlin',
    display: 'BERLIN 400',
    shots: '36',
    // src: BERLIN_ROLL_NFT,
    backgroundColor: '#000',
    color: '#fff',
  },
  LISBON: {
    key: 'lisbon',
    display: 'LISBON 400',
    shots: '36',
    // src: '../assets/img/3d-film-roll/lisbon.png',
    backgroundColor: '#fff',
    color: '#000',
  },
  SEOUL: {
    key: 'seoul',
    display: 'SEOUL 400',
    shots: '36',
    // src: '../assets/img/3d-film-roll/seoul.png',
    backgroundColor: '#08004E',
    color: '#fff',
  },
  TAIPEI: {
    key: 'taipei',
    display: 'TAIPEI 800',
    shots: '24',
    // src: '../assets/img/3d-film-roll/taipei.png',
    backgroundColor: '#BDEBA0',
    color: '#000',
  },
};

export const MockRollFilm: Record<string, Record<string, string>> = {
  CINI: {
    key: 'cini',
    display: 'CINI 100',
    shots: '10',
  },
  ...ROLL_FILM,
};
