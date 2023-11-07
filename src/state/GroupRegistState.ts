import { atom } from 'recoil';

export interface PlaceObjectModel {
  id: string;
  placeName: string;
  address: string;
  category: string;
  lat: number;
  lng: number;
  place_url?: string;
}
export interface SelectedPlaceModel {
  selectedPlace: PlaceObjectModel[];
}

export interface GroupRegistModel {
  groupArea: string;
  groupThumbnail: File | null;
}

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
