import { Models } from '@rematch/core';
import { medicalTest } from './medical-test';
import { profile } from './profile';

export interface IRootModel extends Models<IRootModel> {
  medicalTest: typeof medicalTest;
  profile: typeof profile;
}

export const models: IRootModel = { medicalTest, profile };
