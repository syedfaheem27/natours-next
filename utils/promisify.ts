interface callback {
  (err: Error | null, data?: any): void;
}

interface func<T> {
  (...args: [...T[], callback]): Promise<any>;
}

export function ownPromisfy<T>(fn: func<T>) {
  return function (...args: T[]): Promise<any> {
    return new Promise((res, rej) => {
      fn(...args, (err, data) => {
        if (err) rej(err);
        else res(data);
      });
    });
  };
}
