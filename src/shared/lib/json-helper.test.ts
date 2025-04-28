import { describe, expect, test } from 'vitest';

import checkJsonValid from './json-helper.js';

describe('checkJsonValid', () => {
  const validJsonList = [
    '{"name": "John", "age": 30}',
    '[1,2,3,4,5]',
    '{}',
    '[]',
    '{"age": 30}',
    '{"nested": {"key": "value"}}',
    '{"booleans": [true, false]}',
    '{"nullValue": null}',
    '[{"id": 1}, {"id": 2}]',
    '{"numbers": [1, 2.5, -3.14]}',
    '{"unicode": "한글 테스트 😊"}',
  ];

  const invalidJsonList = [
    '{"name": "John", "age": 30',
    '',
    'not a json',
    '{name: "John"}',
    '{"name": "John", "age": }',
    '[1, 2, 3',
    '{"a": 1,}',
    '{"a": undefined}',
    undefined,
    null,
    NaN,
    Infinity,
    true,
    false,
    1,
  ];

  test.each(validJsonList)('should return true for input: %p', input => {
    expect(checkJsonValid(input)).toBe(true);
  });

  test.each(invalidJsonList)('should return false for input: %p', input => {
    expect(checkJsonValid(input as string)).toBe(false);
  });
});
