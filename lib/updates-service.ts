import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { unstable_noStore as noStore } from 'next/cache';

// Define the structure of an article
interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    authorBio: string;
    authorImage: string;
    date: string;
    category: string;
    tags: string[];
    featuredImage: string;
    readTime: string;
    published: boolean;
    featured: boolean;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
}

// Define the structure of the updates config
interface UpdatesConfig {
    settings: {
        articlesPerPage: number;
        showExcerpts: boolean;
        showAuthor: boolean;
        showDate: boolean;
        showCategory: boolean;
        enableComments: boolean;
        featuredArticleId: string;
    };
    articles: Article[];
}

const UPDATES_DOC_ID = 'main';

export async function getUpdatesData(): Promise<UpdatesConfig | null> {
  noStore();
  
  if (!db) {
    console.error('Firebase not configured');
    return null;
  }

  try {
    // First, try fetching from 'updatesConfig'
    let docRef = doc(db, 'updatesConfig', UPDATES_DOC_ID);
    let docSnap = await getDoc(docRef);
    
    // If not found, try fetching from the legacy 'blogConfig'
    if (!docSnap.exists()) {
      console.warn("'updatesConfig' not found, falling back to 'blogConfig'.");
      docRef = doc(db, 'blogConfig', UPDATES_DOC_ID);
      docSnap = await getDoc(docRef);
    }

    if (!docSnap.exists()) {
      console.error('Updates config not found in either "updatesConfig" or "blogConfig".');
      throw new Error('Updates config not found');
    }
    
    return docSnap.data() as UpdatesConfig;
  } catch (error) {
    console.error('Failed to fetch updates data from Firestore:', error);
    // Re-throwing the error to be caught by Next.js error boundaries
    throw error;
  }
} 