const fs = require('fs');
const path = require('path');
const { buildCacheKey } = require('./snapshotService');

describe('snapshotService cache key', () => {
  it('generates consistent cache keys for the same input', () => {
    const key1 = buildCacheKey('tech-orbit', { theme: 'dark' });
    const key2 = buildCacheKey('tech-orbit', { theme: 'dark' });
    expect(key1).toBe(key2);
  });

  it('generates different cache keys for different scene configs', () => {
    const key1 = buildCacheKey('tech-orbit', { theme: 'dark' });
    const key2 = buildCacheKey('tech-orbit', { theme: 'light' });
    expect(key1).not.toBe(key2);
  });
});
