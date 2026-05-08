/**
 * IndexedDB cache for the loaded dataset (PLY + labels + label-order text).
 *
 * The PLY file is ~2.4 MB which exceeds the practical safe limit for
 * localStorage (~5 MB hard cap, but quota varies by browser and is shared
 * with other origins on the same eTLD+1). IndexedDB has a much larger
 * quota and is the right home for binary-ish blobs of this size.
 *
 * Single object store ("datasets") with out-of-line keys; we always use
 * the key "current" so this acts as a one-slot cache. If we ever want
 * multiple named datasets, swap the key for `d.name`.
 *
 * All operations swallow errors and resolve with a safe value (null /
 * undefined) so that cache problems never break the app — the caller
 * can always fall back to fetching defaults.
 */

const DB_NAME = "di-cache";
const STORE_NAME = "datasets";
const DB_VERSION = 1;
const CURRENT_KEY = "current";

export interface CachedDataset {
  name: string; // user-friendly label (e.g. PLY filename)
  plyText: string;
  labelsText: string;
  orderText: string;
  savedAt: number; // Date.now()
}

/**
 * Open (and if needed, upgrade) the cache database. Resolves with null
 * if IndexedDB is unavailable or the open fails.
 */
function openDB(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof indexedDB === "undefined") {
      resolve(null);
      return;
    }
    let req: IDBOpenDBRequest;
    try {
      req = indexedDB.open(DB_NAME, DB_VERSION);
    } catch (err) {
      console.warn("[datasetCache] indexedDB.open threw:", err);
      resolve(null);
      return;
    }

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // Out-of-line keys: caller supplies the key on put/get.
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => {
      console.warn("[datasetCache] failed to open DB:", req.error);
      resolve(null);
    };
    req.onblocked = () => {
      // Another tab holds an older version open. Don't hang the caller.
      console.warn("[datasetCache] open blocked by another connection");
      resolve(null);
    };
  });
}

/** Persist the current dataset under the "current" slot. */
export async function saveDataset(
  d: Omit<CachedDataset, "savedAt">,
): Promise<void> {
  const db = await openDB();
  if (!db) return;
  try {
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const record: CachedDataset = { ...d, savedAt: Date.now() };
      const putReq = store.put(record, CURRENT_KEY);
      putReq.onerror = () => {
        // Likely QuotaExceededError on very large payloads. Log and move on.
        console.warn("[datasetCache] put failed:", putReq.error);
      };
      tx.oncomplete = () => resolve();
      tx.onerror = () => {
        console.warn("[datasetCache] save tx error:", tx.error);
        resolve();
      };
      tx.onabort = () => {
        console.warn("[datasetCache] save tx aborted:", tx.error);
        resolve();
      };
    });
  } catch (err) {
    console.warn("[datasetCache] saveDataset threw:", err);
  } finally {
    db.close();
  }
}

/** Load the cached dataset, or null if absent / on any failure. */
export async function loadCachedDataset(): Promise<CachedDataset | null> {
  const db = await openDB();
  if (!db) return null;
  try {
    return await new Promise<CachedDataset | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const getReq = store.get(CURRENT_KEY);
      getReq.onsuccess = () => {
        const val = getReq.result as CachedDataset | undefined;
        if (!val) {
          resolve(null);
          return;
        }
        // Light shape check — guard against schema drift / corrupted entries.
        if (
          typeof val.name === "string" &&
          typeof val.plyText === "string" &&
          typeof val.labelsText === "string" &&
          typeof val.orderText === "string" &&
          typeof val.savedAt === "number"
        ) {
          resolve(val);
        } else {
          console.warn("[datasetCache] cached record has unexpected shape; ignoring");
          resolve(null);
        }
      };
      getReq.onerror = () => {
        console.warn("[datasetCache] get failed:", getReq.error);
        resolve(null);
      };
      tx.onerror = () => {
        console.warn("[datasetCache] load tx error:", tx.error);
        resolve(null);
      };
      tx.onabort = () => {
        console.warn("[datasetCache] load tx aborted:", tx.error);
        resolve(null);
      };
    });
  } catch (err) {
    console.warn("[datasetCache] loadCachedDataset threw:", err);
    return null;
  } finally {
    db.close();
  }
}

/** Remove the cached dataset. Safe to call even when nothing is stored. */
export async function clearDataset(): Promise<void> {
  const db = await openDB();
  if (!db) return;
  try {
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const delReq = store.delete(CURRENT_KEY);
      delReq.onerror = () => {
        console.warn("[datasetCache] delete failed:", delReq.error);
      };
      tx.oncomplete = () => resolve();
      tx.onerror = () => {
        console.warn("[datasetCache] clear tx error:", tx.error);
        resolve();
      };
      tx.onabort = () => {
        console.warn("[datasetCache] clear tx aborted:", tx.error);
        resolve();
      };
    });
  } catch (err) {
    console.warn("[datasetCache] clearDataset threw:", err);
  } finally {
    db.close();
  }
}
