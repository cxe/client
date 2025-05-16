import { isArray, getKeys, isObject } from '../lib/Object.js';

describe('Object', ()=>{
  it('isArray', () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray(new Array(5))).toBe(true);
    expect(isArray({})).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
  });

  it('getKeys', () => {
    class Entity{ static type='Entity'; #id=42; name=''; }
    class Person extends Entity{ arms=2; constructor(){super();} }
    const kid = new Person();
    const obj = { a: 1, b: 2 };
    expect(getKeys(obj)).toEqual(['a', 'b']);
    expect(getKeys([])).toEqual([]);
    expect(getKeys(null)).toEqual([]);
    expect(getKeys(undefined)).toEqual([]);
    expect(getKeys(kid)).toEqual(['name', 'arms']);
  });

  it('isObject', () => {
    expect(isObject({})).toBe('empty-object');
    expect(isObject({ a: 1 })).toBe('object');
    expect(isObject([])).toBe('empty-array');
    expect(isObject(null)).toBe('null');
    expect(isObject(undefined)).toBe('');
    expect(isObject(function() {})).toBe('function');
    expect(isObject(class C {})).toBe('class');
    expect(isObject(async function() {})).toBe('async');
  });
});
