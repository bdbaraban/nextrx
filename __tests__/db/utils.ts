import { connectClient, getDB, closeClient } from '../../db/utils';

describe('db', (): void => {
  it('Connects MongoDB client and loads database', (): void => {
    connectClient((err): void => {
      expect(err).toBeUndefined;
      expect(getDB()).toBeDefined();
      closeClient();
    });
  });
});
