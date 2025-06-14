// context/globalErrorRef.ts
let _setError: ((error: Error | null) => void) | null = null;

export const setGlobalErrorRef = {
  set(fn: (error: Error | null) => void) {
    _setError = fn;
  },
  get() {
    return _setError;
  },
};
