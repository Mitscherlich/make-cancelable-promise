import { assert, test } from 'vitest'
import { foo } from './index'

test('simple', () => {
  assert.equal(foo, 'foo')
})
