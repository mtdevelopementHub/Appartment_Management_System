import {PERMISSIONS, check} from 'react-native-permissions';
import { PermissionsAndroid, Platform } from 'react-native';

export const helper ={
    async ImageUploadService(params) {
        const form = new FormData();
        form.append('image', params);
        try {
          let result = await fetch('https://amberstore.pk/upload.php', {
            method: 'POST',
            body: form,
          });
          return result;
        } catch (error) {
          return 'err';
        }
      },
    
}



