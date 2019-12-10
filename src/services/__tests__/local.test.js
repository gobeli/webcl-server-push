import LocalService from '../local';

describe('local service', () => {
  it('should intitiate todos', () => {
    expect(LocalService.todos).toBeDefined();
  });

  it('should update todos periodically on connect', done => {
    // given
    LocalService.todos.subscribe(todos => {
      if (todos.length === 1) {
        expect(todos[0].text).toBe('bla');
        done();
      }
    });

    // when
    LocalService.connect();
  });
});
