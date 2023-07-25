import { AxiosInstance } from 'axios';
import instance from '.';
import { DocumentPickerAsset } from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { IMedicalDictionary } from '../types/medical-test';
import { ImagePickerAsset } from 'expo-image-picker';

class MedicalService {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = instance;
  }

  public uploadMedicalTest(file: DocumentPickerAsset | ImagePickerAsset) {
    return FileSystem.uploadAsync(
      process.env.EXPO_PUBLIC_API_URL + '/medical-tests',
      file.uri,
      {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file',
      }
    );
  }

  public getMedicalTestDictionary() {
    return this.instance.get<IMedicalDictionary[]>('/medical-tests/dictionary');
  }
}

export default new MedicalService();
