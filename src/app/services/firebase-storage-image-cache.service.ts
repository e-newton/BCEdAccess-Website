import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {ListResult, Reference} from '@angular/fire/storage/interfaces';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageImageCacheService {

  coverImages = {};

  constructor(public as: AngularFireStorage) { }

  async updateBlogImages(id: string|number, images: string[]): Promise<void> {
    const currentImagesRefs: ListResult = await this.as.ref(`blogs/${id}`).listAll().toPromise();
    const toDelete: Reference[] = [];
    currentImagesRefs.items.forEach((ref) => {
      if (!images.includes(ref.name) && !ref.name.includes('cover_image')){
        toDelete.push(ref);
      }
    });
    for (const ref of toDelete) {
      await ref.delete();
    }

  }

  async uploadBlogCoverImage(id: string|number, file: File): Promise<void> {
    const files = await this.as.ref(`blogs/${id}/`).listAll().toPromise();
    for (const file1 of files.items) {
      if (file1.name.includes('cover_image.')){
        await file1.delete();
        break;
      }
    }
    const ext = file.name.substr(file.name.lastIndexOf('.') + 1);
    const storageRef = await this.as.ref(`blogs/${id}/cover_image.${ext}`);
    await storageRef.put(file);
  }

  async deleteBlogImageCache(id: string|number): Promise<void> {
    await this.as.ref(`blog/${id}`).delete().toPromise();
  }

  async getBlogCoverImage(id: string|number): Promise<string> {
    if (this.coverImages[id]){
      return this.coverImages[id];
    }
    return await this.as.ref(`blogs/${id}/`).listAll().pipe(
      shareReplay(1)
    ).toPromise().then(async (images) => {
      let coverRef: Reference;
      for (const ref of images.items) {
        console.log(id, ref.name);
        if (ref.name.includes('cover_image.')) {
          coverRef = ref;
          break;
        }
      }
      if (!coverRef) {
        return 'assets/bcedaccess_logo.png';
      }
      console.log('Running Update');
      const url = await coverRef.getDownloadURL();
      this.coverImages[id] = url;
      return url;
    });
  }
}
