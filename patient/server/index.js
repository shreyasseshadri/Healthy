const WebSocket = require('ws')
class Clients{
  constructor(){
    this.clientlist={};
    this.saveclient= this.saveclient.bind(this);
  }
  saveclient(username,client){
    this.clientlist[username]=client;
  }
}
const clients = new Clients();

const wss = new WebSocket.Server({ port: 7000 })
console.log('hello');
doc_list=[
  {'name':'doc1'},
  {'name':'doc2'}
];
wss.on('connection', (client) => {
  client.on('message', message => {
    const msg = JSON.parse(message);
    console.log(`Received message => ${message}`);
    clients.saveclient(msg.username,client);
    console.log('Clients: ',Object.keys(clients.clientlist));
  })
  client.send(JSON.stringify(doc_list));
  
})
