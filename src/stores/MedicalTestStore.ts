import { makeAutoObservable, runInAction } from 'mobx';
import { DocumentPickerAsset } from 'expo-document-picker';
import { ImagePickerAsset } from 'expo-image-picker';
import { IStoreStatus } from '../types/root';
import { IDictionary, IMedicalTest } from '../types/medical-test';
import MedicalService from '../services/MedicalService';

export interface IMedicalTestStore {
  result: IMedicalTest;
  dictionary: IDictionary | null;
  error: string | null;
  status: IStoreStatus;
}

const mock: IMedicalTest = {
  soe: 2,
  eritrocity: 3.75,
  gemaglobin: 116.0,
  gematokrit: 35.3,
  mcv: 94.2,
  mchc: 32.8,
  mch: 30.9,
  rel_width_eritrocity_deviation: 44.0,
  rel_width_eritrocity_variation: 13.0,
  trombocity: 145,
  mpv: 12.3,
  pct: 0.18,
  pdw: 14.6,
  lejkocity: 5.7,
  nejtrofily: 2.14,
  nejtrofily_percent: 37.5,
  eozinofily: 0.09,
  eozinofily_percent: 1.6,
  bazofily: 0.02,
  bazofily_percent: 0.3,
  monocity: 0.4,
  monocity_percent: 7.0,
  limfocity: 3.06,
  limfocity_percent: 53.6,
};

export class MedicalTestStore implements IMedicalTestStore {
  result: IMedicalTest = mock;
  dictionary: IDictionary | null = null;
  error: string | null = null;
  status: IStoreStatus = 'init';

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get isLoading() {
    return this.status === 'pending';
  }

  async getResults(data: DocumentPickerAsset | ImagePickerAsset) {
    this.status = 'pending';
    try {
      const response = await MedicalService.uploadMedicalTest(data);
      const result = JSON.parse(response.body) as IMedicalTest;

      runInAction(() => {
        this.status = 'done';
        this.result = result;
      });

      return true;
    } catch (error) {
      console.error('MedicalTestStore.getResults', error);
      runInAction(() => {
        this.status = 'error';
        this.error = 'При попытке распознания результатов произошла ошибка';
      });

      return false;
    }
  }

  async getDictionary() {
    this.status = 'pending';

    try {
      const response = await MedicalService.getMedicalTestDictionary();

      runInAction(() => {
        this.status = 'done';
        this.dictionary = response.data.reduce((acc, item) => {
          acc[item.name] = item;
          return acc;
        }, {} as IDictionary);
      });

      return true;
    } catch (error) {
      console.error('MedicalTestStore.getDictionary', error);
      runInAction(() => {
        this.status = 'error';
      });

      return false;
    }
  }
}
