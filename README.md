# Hapi + Bun API Example

This service provides an API with swagger UI for documentation and testing.

Start the service and visit http://localhost:3000/documentation to test

See config/index.ts for supported ENV variables.

### Building and Running locally

```sh
bun install
bun start
```

### configuring the mongo replica set for local tests

Issue the following command using mongosh (which can be installed for Mac with homebrew)

```sh
rs.initiate({_id: "rs1", members: [{_id: 0, host: "localhost:27017"}]})
```

This project was created using `bun init` in bun v1.2.15. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
