import { Models } from '@rematch/core';
import { medicalTest } from './medical-test';

export interface IRootModel extends Models<IRootModel> {
  medicalTest: typeof medicalTest;
}

export const models: IRootModel = { medicalTest };
