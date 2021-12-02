/**
 * @jest-environment jsdom
 */

import * as helpers from "./helpers"
import { keys, $, querySelector } from "./helpers"

describe('helpers', () => {
  it('has $', expect($).toBeDefined)
  it('has keys', expect(keys).toBeDefined)
  it('has querySelector', expect(querySelector).toBeDefined)
})

describe('keys', () => {
  const isArray = object => Array.isArray(object)

  it('gets object', expect(keys(helpers)).toBeDefined)
  it('returns array', () => expect(isArray(keys(helpers))).toBe(true))
  it('with object keys', () => expect(keys(helpers)).toEqual(Object.keys(helpers)))
})


// TODO: test $, querySelector
