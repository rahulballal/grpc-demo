module.exports = (data = []) => {
  return {
    list() {
      return data
    },
    get(todo_id) {
      const idx = data.map(item => item.todo_id).indexOf(todo_id);
      return data[idx] || {};
    },
    add({ todo_id, what, rank }) {
      data.push({ todo_id, what, rank })
      return { todo_id, what, rank }
    },
    remove(todo_id) {
      const idx = data.map(item => item.todo_id).indexOf(todo_id)
      data.splice(idx, 1)
    },
    edit({ todo_id, what, rank }) {
      const idx = data.map(item => item.todo_id).indexOf(todo_id)
      data.splice(idx, 0, { todo_id, what, rank })
      return { todo_id, what, rank }
    }
  }
}