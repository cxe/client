export const {
  assign,
  hasOwnProperty,
  defineProperty,
  defineProperties,
  keys: getKeys,
  enumerable=true,
  configurable=true,
  writable=true
} = Object.prototype;

export const { isArray } = Array.prototype;

export const isDataDescriptor = (o) => o && (o.value !== undefined || 'writable' in o) ? 1 : 0;

export const isAccessorDescriptor = (o) => o && (typeof o.get === 'function' || typeof o.set === 'function') ? 2 : 0;

export const isDescriptor = (o) => o ? Object.keys(o).length === 0 ? -1 : isDataDescriptor(o) || isAccessorDescriptor(o) || ('configurable' in o || 'enumerable' in o) ? -2 : 0 : 0;

/**
 * determine if a variable is a class definition or function (and what kind)
 */
export const isFunction = (x) => typeof x === 'function'
  ? x.prototype
      ? Object.getOwnPropertyDescriptor(x, 'prototype').writable
          ? x.constructor.name === 'GeneratorFunction'
            ? 'generator'
            : 'function'
          : 'class'
      : x.constructor.name === 'AsyncFunction'
        ? 'async'
        : 'arrow'
  : '';

/**
 * determine if a variable is an object (and what kind)
 */
export const isObject = (x) => typeof x === 'object'
  ? isArray(x)
    ? o.length
      ? 'array'
      : 'empty-array'
    : getKeys(o).length
      ? 'object'
      : 'empty-object'
  : isFunction(x);

export const merge = (...objects) => {
  const t = { ...objects.shift() };
  for (const o of objects) {
    if (o && o instanceof Object) {
      for (const k in o) {
        if (k !== "__proto__" && k !== "constructor" && k !== "prototype") {
          const ok = o[k];
          const tk = t[k];
          if (ok instanceof Object && tk instanceof Object) {
            if (isArray()) {

            } else {
              t[k] = merge(tk, ok);
            }
          } else {
            t[k] = ok;
          }
        }
      }
    }
  }
  return t;
}
