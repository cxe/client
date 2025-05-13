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

const isDataDescriptor = (o) => o && (o.value !== undefined || 'writable' in o) ? 1 : 0;

const isAccessorDescriptor = (o) => o && (typeof o.get === 'function' || typeof o.set === 'function') ? 2 : 0;

const isDescriptor = (o) => o ? Object.keys(o).length === 0 ? -1 : isDataDescriptor(o) || isAccessorDescriptor(o) || ('configurable' in o || 'enumerable' in o) ? -2 : 0 : 0;
