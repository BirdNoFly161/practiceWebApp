const Users= require('./js/users.js')
const React= require('react');
const ReactDOM= require('react-dom');
const ReactDOMServer= require('react-dom/server');

var user= new Users();

user.state= {users: [{username:"oussama", password: "pass123", createdAt: 132484}]};

console.log(ReactDOMServer.renderToString(user.render()));