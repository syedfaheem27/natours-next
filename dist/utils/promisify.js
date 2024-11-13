"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownPromisfy = ownPromisfy;
function ownPromisfy(fn) {
    return function (...args) {
        return new Promise((res, rej) => {
            fn(...args, (err, data) => {
                if (err)
                    rej(err);
                else
                    res(data);
            });
        });
    };
}
