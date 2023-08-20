import { createModel } from '@rematch/core';
import { IRootModel } from '.';
import { IMedicalDictionary, IMedicalTest } from '../types/medical-test';
import { DocumentPickerAsset } from 'expo-document-picker';
import MedicalService from '../services/MedicalService';
import { resetState, setState } from '../redux/utils';
import { ImagePickerAsset } from 'expo-image-picker';

type IDictionary = Record<string, IMedicalDictionary>;

interface IState {
  result: IMedicalTest;
  dictionary: IDictionary | null;
  error: string | null;
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

// const initialResult: IMedicalTest = {
//   soe: 0,
//   eritrocity: 0,
//   gemaglobin: 0,
//   gematokrit: 0,
//   mcv: 0,
//   mchc: 0,
//   mch: 0,
//   rel_width_eritrocity_deviation: 0,
//   rel_width_eritrocity_variation: 0,
//   trombocity: 0,
//   mpv: 0,
//   pct: 0,
//   pdw: 0,
//   lejkocity: 0,
//   nejtrofily: 0,
//   nejtrofily_percent: 0,
//   eozinofily: 0,
//   eozinofily_percent: 0,
//   bazofily: 0,
//   bazofily_percent: 0,
//   monocity: 0,
//   monocity_percent: 0,
//   limfocity: 0,
//   limfocity_percent: 0,
// };

const initialState: IState = {
  result: mock,
  dictionary: null,
  error: null,
};

export const medicalTest = createModel<IRootModel>()({
  state: initialState,
  reducers: {
    setState,
    resetState: resetState(initialState),
  },
  effects: (d) => ({
    async getResults(data: DocumentPickerAsset | ImagePickerAsset) {
      try {
        const response = await MedicalService.uploadMedicalTest(data);
        const result = JSON.parse(response.body) as IMedicalTest;

        d.medicalTest.setState({ result });

        return true;
      } catch (error) {
        console.error('getResults', error);
        d.medicalTest.setState({
          error: 'При попытке распознания результатов произошла ошибка',
        });

        return false;
      }
    },
    async getDictionary() {
      try {
        const response = await MedicalService.getMedicalTestDictionary();
        d.medicalTest.setState({
          dictionary: response.data.reduce((acc, item) => {
            acc[item.name] = item;
            return acc;
          }, {} as IDictionary),
        });

        return true;
      } catch (error) {
        console.error('getResults', error);

        return false;
      }
    },
  }),
});
