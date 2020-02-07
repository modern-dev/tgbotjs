/*!
 * tgbotjs - Telegram Bot API for Node.js and browsers.
 * https://github.com/modern-dev/tgbotjs
 *
 * Copyright (c) 2020 Bohdan Shtepan
 * Licensed under the MIT license.
 */

const isObject = (obj: any): boolean => Object.prototype.toString.call(obj) === '[object Object]';
const isString = (obj: any): boolean => Object.prototype.toString.call(obj) === '[object String]';
const snakeCased = (str: string): string =>
  str.replace(/([A-Z])/g, (g) => `_${g.toLocaleLowerCase()}`);
const camelCased = (str: string): string =>
  str.replace(/_([a-z])/g, (g) => g[1].toLocaleUpperCase());

export {
  isObject,
  isString,
  snakeCased,
  camelCased
};
