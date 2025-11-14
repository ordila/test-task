const isBrowser =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export const storage = {
  /**
   * Retrieves an object from localStorage by key and automatically parses it.
   * @param key The localStorage key.
   * @param fallbackValue The value to return in case of an error or missing key.
   * @returns Data of type T or the fallbackValue.
   */
  getJSON<T>(key: string, fallbackValue: T | null = null): T | null {
    if (!isBrowser) {
      return fallbackValue;
    }

    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue === null) {
        return fallbackValue;
      }

      const parsedValue: T = JSON.parse(storedValue);
      return (parsedValue ?? fallbackValue) as T | null;
    } catch (error) {
      console.warn(
        `Failed to read value from localStorage for key "${key}"`,
        error
      );
      return fallbackValue;
    }
  },

  /**
   * Stores an object in localStorage, serializing it to JSON.
   * @param key The localStorage key.
   * @param value The object to store (any serializable type).
   */
  setJSON<T>(key: string, value: T): void {
    if (!isBrowser) {
      return;
    }

    try {
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.warn(
        `Failed to store value in localStorage for key "${key}"`,
        error
      );
    }
  },

  /**
   * Removes a key from localStorage.
   * @param key The localStorage key.
   */
  remove(key: string): void {
    if (!isBrowser) {
      return;
    }

    window.localStorage.removeItem(key);
  },
};
