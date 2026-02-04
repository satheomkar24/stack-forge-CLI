class StorageService {
  // Local Storage methods
  setLocal(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("📢[storageService.ts:7]: error: ", error);
    }
  }

  getLocal<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("📢[storageService.ts:16]: error: ", error);
      return null;
    }
  }

  removeLocal(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("📢[storageService.ts:25]: error: ", error);
    }
  }

  clearLocal(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("📢[storageService.ts:33]: error: ", error);
    }
  }

  // Session Storage methods
  setSession(key: string, value: unknown): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("📢[storageService.ts:42]: error: ", error);
    }
  }

  getSession<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("📢[storageService.ts:51]: error: ", error);
      return null;
    }
  }

  removeSession(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error("📢[storageService.ts:60]: error: ", error);
    }
  }

  clearSession(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("📢[storageService.ts:68]: error: ", error);
    }
  }
}

export const storageService = new StorageService();
