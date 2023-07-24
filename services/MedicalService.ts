import { AxiosInstance } from 'axios';
import instance from '.';
import { DocumentPickerAsset } from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

class MedicalService {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = instance;
  }

  public uploadMedicalTest(file: DocumentPickerAsset) {
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
    return this.instance.get('/medical-tests/dictionary');
  }
}

export default new MedicalService();
