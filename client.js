const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}
const packageDefinition = protoLoader.loadSync('./proto/books.proto', options)
const book = grpc.loadPackageDefinition(packageDefinition).Book

// Create a server
const client = new book('0.0.0.0:50051', grpc.ServerCredentials.createInsecure()
)
client.createBook({id: 1, title: 'The Lord is good',author: ' Layo Fem'}, (err, response)=>{
    if (err) {
      console.log(err)
    } else {
      console.log(`From server`, JSON.stringify(response))
    }
})


