//# sourceMappingURL=/js/bundle.js.map

const React= require('react')
// you can use something like this , const { render } = require('react-dom')
const ReactDOM= require('react-dom')
const {HashRouter, Route, Switch}= require('react-router-dom') 

// dir import 

const Content= require('./content.jsx')
const Users= require('./users.jsx') 
const Profile= require('./profile.jsx') 
const Signup= require('./signup.jsx')
const Login= require('./login.jsx')

ReactDOM.render((
    <Content>
        <HashRouter>
                <Route exact path='/' component={Users}/>
                <Route path='/user/:username' component={Profile}/>
                <Route path='/signup' component={Signup}/>
                <Route path='/login' component={Login}/>
        </HashRouter>        
    </Content>

), document.getElementById('main')) 