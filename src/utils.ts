export function promiseResolve<T>(data: T, time: number) {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
}

export function promiseReject<T>(data: T, time: number) {
  return new Promise<T>((_, reject) => {
    setTimeout(() => {
      reject(data);
    }, time);
  });
}

export function promiseSleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}
