import { atom } from 'recoil';

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
}
export interface SelectedPlaceModel {
  selectedPlace: PlaceObjectModel[];
}

export interface GroupRegistModel {
  groupArea: string;
  groupThumbnail: File | null;
}

export const mapOptionState = atom<MapOptionModel>({
  key: 'mapOptionState',
  default: {
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    level: 3,
    isPanto: true,
  },
});

export const groupRegistState = atom<GroupRegistModel>({
  key: 'groupRegistState',
  default: {
    groupArea: '',
    groupThumbnail: null,
  },
});

export const selectedPlaceState = atom<SelectedPlaceModel>({
  key: 'selectedPlaceState',
  default: {
    selectedPlace: [],
  },
});
