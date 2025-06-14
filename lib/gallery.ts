import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const GALLERY_DOC_ID = 'main';

export async function getGalleryConfig() {
  try {
    const docRef = doc(db, 'galleryConfig', GALLERY_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Gallery config not found');
    }
    return docSnap.data();
  } catch (error) {
    throw error;
  }
}

export async function updateGalleryConfig(data: any) {
  try {
    const docRef = doc(db, 'galleryConfig', GALLERY_DOC_ID);
    await setDoc(docRef, data, { merge: true });
    return { success: true };
  } catch (error) {
    throw error;
  }
} 