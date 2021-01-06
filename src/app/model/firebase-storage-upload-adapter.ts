import {AngularFireStorage} from '@angular/fire/storage';

export class FirebaseStorageUploadAdapter {
  as: AngularFireStorage;
  id: number;
  constructor(public loader: any) {
    this.loader = loader;
  }

  upload(): any {
    console.log('upload called');
    return this.loader.file.then(file => new Promise(((resolve, reject) => {
      const storage = this.as.ref(`blogs/${this.id}/${file.name}`);
      const uploadTask = storage.put(file);
      const progress = uploadTask.percentageChanges();
      progress.subscribe(p => {
        console.log('progress: ', p);
      });

      uploadTask.then((snapshot) => {
        snapshot.ref.getDownloadURL().then(url => {
          resolve(
            {default: url}
          );
        });
      }).catch(err => {
        console.log('An error occurred', err);
        reject('An error occurred');
      });

    })));
  }
}