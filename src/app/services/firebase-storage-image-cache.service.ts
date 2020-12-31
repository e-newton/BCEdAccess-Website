import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {ListResult, Reference} from '@angular/fire/storage/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageImageCacheService {

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
    const ext = file.name.substr(file.name.lastIndexOf('.') + 1);
    const storageRef = await this.as.ref(`blogs/${id}/cover_image.${ext}`);
    await storageRef.put(file);
  }
}
