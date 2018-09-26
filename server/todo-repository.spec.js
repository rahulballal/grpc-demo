const createRepo = require('./todo-repository')

test('list', () => {
  const repo = createRepo([{ todo_id: 1, what: 'buy miik', rank: 1 }])
  const actual = repo.list()
  expect(Array.isArray(actual)).toBe(true)
  expect(actual.length).toBe(1)
})

test('add', () => {
  const repo = createRepo();
  const actual = repo.add({ todo_id: 1, what: 'buy miik', rank: 1 });
  expect(actual).toEqual({ todo_id: 1, what: 'buy miik', rank: 1 })
})

test('remove', () => {
  const repo = createRepo([{ todo_id: 1, what: 'buy miik', rank: 1 }])
  repo.remove(1)
  expect(repo.list()).toHaveLength(0);
})

test('edit', () => {
  const repo = createRepo([{ todo_id: 1, what: 'buy miik', rank: 1 }])
  const actual = repo.edit({ todo_id: 1, what: 'buy miik', rank: 2 });
  expect(actual).toEqual({ todo_id: 1, what: 'buy miik', rank: 2 })
})

test('get', () => {
  const repo = createRepo([{ todo_id: 1, what: 'buy miik', rank: 1 }])
  const actual = repo.get(1)
  expect(actual).toEqual({ todo_id: 1, what: 'buy miik', rank: 1 });
})