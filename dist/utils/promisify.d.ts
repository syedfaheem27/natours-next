interface callback {
    (err: Error | null, data?: any): void;
}
interface func<T> {
    (...args: [...T[], callback]): Promise<any>;
}
export declare function ownPromisfy<T>(fn: func<T>): (...args: T[]) => Promise<any>;
export {};
//# sourceMappingURL=promisify.d.ts.map