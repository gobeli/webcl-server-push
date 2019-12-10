import LocalService from '../local';
import { writable } from 'svelte/store';

describe('local service', () => {
  it('should update todos periodically on connect', done => {
    // given
    const todos = writable([]);
    todos.subscribe(todos => {
      if (todos.length === 1) {
        expect(todos[0].text).toBe('bla');
        done();
      }
    });

    // when
    LocalService.connect(todos);
  });
});
