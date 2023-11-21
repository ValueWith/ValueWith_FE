import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface MapOptionModel {
  center: {
    lat: number;
    lng: number;
  };
  level: number;
  isPanto: boolean;
}
export interface PlaceObjectModel {
  placeCode: string;
  name: string;
  address: string;
  category: string;
  x: number;
  y: number;
  place_url?: string;
  orders?: number;
}
export interface SelectedPlaceModel {
  selectedPlace: PlaceObjectModel[];
}

export interface GroupRegistModel {
  groupThumbnail: File | null;
}

export const mapOptionState = atom<MapOptionModel>({
  key: 'mapOptionState',
  default: {
    center: {
      lat: 37.577613288258206,
      lng: 126.97689786832184,
    },
    level: 3,
    isPanto: true,
  },
});

export const groupRegistState = atom<GroupRegistModel>({
  key: 'groupRegistState',
  default: {
    groupThumbnail: null,
  },
});

export const selectedPlaceState = atom<SelectedPlaceModel>({
  key: 'selectedPlaceState',
  default: {
    selectedPlace: [],
  },
});

export const tempFormState = atom({
  key: 'tempFormState',
  default: {},
  effects_UNSTABLE: [persistAtom],
});
