'use client';

import { useSyncExternalStore } from 'react';

let isPreloaderComplete = false;
const listeners = new Set<() => void>();

export function setPreloaderCompleteState(complete: boolean) {
  isPreloaderComplete = complete;
  listeners.forEach((listener) => listener());
}

export function usePreloaderStatus() {
  return useSyncExternalStore(
    (onStoreChange) => {
      listeners.add(onStoreChange);
      return () => {
        listeners.delete(onStoreChange);
      };
    },
    () => isPreloaderComplete,
    () => false
  );
}
