import {Injectable} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {ListResult, Reference} from '@angular/fire/storage/interfaces';
import {shareReplay} from 'rxjs/operators';
import {BlogService} from './blog.service';
import {AngularFirestore} from '@angular/fire/firestore';

interface BlogFSObject {
  date: Date;
  title: string;
  author: string;
  body: string;
  views: number;
  featured: boolean;
  draft: boolean;
  coverImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageImageCacheService {


  coverImages = {};

  constructor(public as: AngularFireStorage, public fs: AngularFirestore) {
  }

  async updateBlogImages(id: string | number, images: string[]): Promise<void> {
    const currentImagesRefs: ListResult = await this.as.ref(`blogs/${id}`).listAll().toPromise();
    const toDelete: Reference[] = [];
    currentImagesRefs.items.forEach((ref) => {
      if (!images.includes(ref.name) && !ref.name.includes('cover_image')) {
        toDelete.push(ref);
      }
    });
    for (const ref of toDelete) {
      await ref.delete();
    }

  }

  async uploadBlogCoverImage(id: string | number, file: File): Promise<string> {
    const files = await this.as.ref(`blogs/${id}/`).listAll().toPromise();
    for (const file1 of files.items) {
      if (file1.name.includes('cover_image.')) {
        await file1.delete();
        break;
      }
    }
    const ext = file.name.substr(file.name.lastIndexOf('.') + 1);
    const storageRef = await this.as.ref(`blogs/${id}/cover_image.${ext}`);
    await storageRef.put(file);
    return await storageRef.getDownloadURL().toPromise();
  }

  async deleteBlogImageCache(id: string | number): Promise<void> {
    await this.as.ref(`blog/${id}`).delete().toPromise();
  }

  async getBlogCoverImage(id: string | number): Promise<string> {
    if (this.coverImages[id]) {
      return this.coverImages[id];
    }
    const blog = await this.fs.doc(`blogs/${id}`).get().toPromise();
    const data = blog.data() as BlogFSObject;
    if (data.coverImage) {
      this.coverImages[id] = data.coverImage;
      return data.coverImage;
    } else{
      return './assets/bcedaccess_logo.png';
    }

  }
}
