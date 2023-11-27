/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from 'react';

type AnyFunction = (...args: any[]) => any;

interface Options {
  /**
   * Whether to use flushSync or not
   */
  sync?: boolean;
}

/**
 * Returns a memoized callback that will flushSync the callback if sync is true
 */
export function useEvent<T extends AnyFunction>(callback: T | undefined, opts: Options = {}): T {
  const { sync = false } = opts;

  const callbackRef = useLatestRef(callback);

  return useCallback(
    (...args: any[]) => {
      if (sync) return queueMicrotask(() => callbackRef.current?.(...args));
      return callbackRef.current?.(...args);
    },
    [sync, callbackRef],
  ) as T;
}

function useLatestRef<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
