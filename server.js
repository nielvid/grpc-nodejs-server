const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


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
const server = new grpc.Server();

// Add the service
server.addService(book.Book.service,{
  createBook: createBook,
  findABook: findABook,
  fetchAllBooks: fetchAllBooks,
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
	console.log("Server running at http://127.0.0.1:50051");
	server.start();
}); // our sever is insecure, no ssl configuration

//database to store data

const bookStore = []

//methods to call
function createBook(call, callback) {

  const bookObject = {
    id: call.request.id,
    title: call.request.title,
    author: call.request.author
  }
  bookStore.push(bookObject)
  callback(null, bookObject)
}

