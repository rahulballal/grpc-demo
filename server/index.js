const gRPC = require('grpc')
const { list, add, remove, edit, get } = require('./todo-repository')

const proto = gRPC.load('../proto/todos.proto')

const makeServer = implementation => proto => {
  const server = new gRPC.Server()
  server.addService(proto.todos.TodoService.service, implementation)
  return server
}

const startServer = gRPCServer =>
  gRPCServer
    .bind(
      `0.0.0.0:${process.env.PORT}`,
      gRPC.ServerCredentials.createInsecure()
    )
    .start()


try {
  startServer(
    makeServer({
      List: list,
      Get: ({ request: { todo_id } }) => get(todo_id),
      Add: ({ request: { todo_id, what, rank } }) => add({ todo_id, what, rank }),
      Remove: ({ request: { todo_id } }) => remove(todo_id),
      Edit: ({ request: { todo_id, what, rank } }) =>
        edit({ todo_id, what, rank })
    })(proto)
  )

  console.info(
    'gRPC server started',
    { port: process.env.PORT, ip: '0.0.0.0'}
  )
} catch (error) {
  console.error(
    'gRPC server failed to start',
    error
  )
  process.exit(1)
}

