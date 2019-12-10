import { writable } from 'svelte/store';

import PollingService from '../polling';

describe('polling service', () => {
  it('should start polling on connect', done => {
    // given
    const todos$ = writable([]);
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ ok: true, json: () => [] }))

    // when
    PollingService.connect(todos$);

    // then
    expect(global.fetch).toBeCalledTimes(1);
    setTimeout(() => {
      expect(global.fetch).toBeCalledTimes(2);
      done();
    }, 1100);
  });

  afterEach(() => {
    PollingService.disconnect();
  })
})