import { MedicalTestStore } from './MedicalTestStore';
import { ProfileStore } from './ProfileStore';

export class RootStore {
  profileStore: ProfileStore;
  medicalTestStore: MedicalTestStore;

  constructor() {
    this.profileStore = new ProfileStore();
    this.medicalTestStore = new MedicalTestStore();
  }
}
