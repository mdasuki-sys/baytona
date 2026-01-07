import { CartItem, MenuItem, UserDetails } from './types';
import { GoogleGenAI } from "@google/genai";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getDayName = (date: Date): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

// --- Caching System (Memory + IndexedDB) ---

// 1. Memory Cache (Sync, for fast UI updates during session)
const memoryCache = new Map<string, string>();

export const getMemoryCachedImage = (query: string): string | null => {
  return memoryCache.get(query) || null;
};

// 2. IndexedDB (Async, for persistence across reloads)
const DB_NAME = 'BaytounaImageDB';
const STORE_NAME = 'images';
const DB_VERSION = 1;

const getDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("IndexedDB not supported"));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

// Retrieve from IndexedDB (Async)
export const getCachedImage = async (query: string): Promise<string | null> => {
  // Check memory first (optimization)
  if (memoryCache.has(query)) return memoryCache.get(query)!;

  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(query);
      
      request.onsuccess = () => {
        const result = request.result as string || null;
        if (result) {
          memoryCache.set(query, result); // Populate memory cache
        }
        resolve(result);
      };
      request.onerror = () => {
        console.warn("Failed to read from cache");
        resolve(null);
      };
    });
  } catch (e) {
    console.warn("DB Access Error", e);
    return null;
  }
};

// Save to IndexedDB (Async)
const cacheImage = async (query: string, base64: string) => {
  memoryCache.set(query, base64); // Update memory immediately
  try {
    const db = await getDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.put(base64, query);
  } catch (e) {
    console.error("Cache save error", e);
  }
};

// --- Singleton Queue System for Rate Limiting ---

interface QueueTask {
  query: string;
  resolve: (value: string | null) => void;
}

const requestQueue: QueueTask[] = [];
let isProcessingQueue = false;

// Track in-flight requests to prevent duplicates
const pendingRequests = new Map<string, Promise<string | null>>();

const processQueue = async () => {
  if (isProcessingQueue) return;
  isProcessingQueue = true;

  while (requestQueue.length > 0) {
    const task = requestQueue[0];
    if (!task) break;

    const { query, resolve } = task;

    try {
      const result = await generateImageApi(query);
      resolve(result);
    } catch (e) {
      console.error(`Failed to generate image for ${query}:`, e);
      resolve(null);
    }

    // Remove the processed task
    requestQueue.shift();

    // Rate Limiting: 10 seconds between requests
    if (requestQueue.length > 0) {
      await new Promise(r => setTimeout(r, 10000));
    }
  }

  isProcessingQueue = false;
};

// Actual API Call using gemini-2.5-flash-image
const generateImageApi = async (query: string): Promise<string | null> => {
  if (!process.env.API_KEY) {
    console.warn("No API Key found for image generation");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { 
            text: `High-end professional food photography of ${query}. The dish is plated elegantly on a rustic ceramic plate, soft natural lighting, warm tones, 4k resolution, cinematic depth of field, appetizing, delicious, overhead or 45-degree angle, magazine quality.` 
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const base64EncodeString = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          const imageUrl = `data:${mimeType};base64,${base64EncodeString}`;
          
          // Store in DB asynchronously
          await cacheImage(query, imageUrl);
          
          return imageUrl;
        }
      }
    }
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    return null;
  }
  return null;
};

// Public function that pushes to queue with deduplication
export const generateFoodImage = async (query: string): Promise<string | null> => {
  // 1. Check Caches (Memory & DB)
  const cached = await getCachedImage(query);
  if (cached) return cached;

  // 2. Check if already requested (Deduplication)
  if (pendingRequests.has(query)) {
    return pendingRequests.get(query)!;
  }

  // 3. Create new request promise
  const requestPromise = new Promise<string | null>((resolve) => {
    requestQueue.push({ query, resolve });
    processQueue();
  }).then(result => {
    pendingRequests.delete(query);
    return result;
  });

  pendingRequests.set(query, requestPromise);
  return requestPromise;
};

export const generateWhatsAppLink = (cart: CartItem[], user: UserDetails): string => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal; 

  let message = `ORDER — Baytouna Resto & Express\n`;
  message += `Date: ${new Date().toLocaleString('en-GB', { hour12: false })}\n\n`;
  
  message += `Customer:\n`;
  message += `- Name: ${user.name}\n`;
  message += `- Phone: ${user.phone}\n`;
  message += `- Type: ${user.orderType}\n`;
  
  if (user.orderType === 'Delivery') {
    message += `- Address: ${user.address}\n`;
    if (user.mapsLink) message += `- Maps: ${user.mapsLink}\n`;
  } else {
    if (user.pickupTime) message += `- Pickup Time: ${user.pickupTime}\n`;
  }
  
  if (user.notes) message += `- Order Notes: ${user.notes}\n`;
  
  message += `\nItems:\n`;
  
  cart.forEach((item, index) => {
    const variantStr = item.variantName ? `(${item.variantName})` : '';
    const lineTotal = formatCurrency(item.price * item.quantity);
    message += `${index + 1}) ${item.quantity}x ${item.menuItem.name} ${variantStr} — ${lineTotal}\n`;
    if (item.notes) message += `   Note: ${item.notes}\n`;
  });
  
  message += `\nSubtotal: ${formatCurrency(subtotal)}\n`;
  message += `Total: ${formatCurrency(total)}\n`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/96176838000?text=${encodedMessage}`;
};