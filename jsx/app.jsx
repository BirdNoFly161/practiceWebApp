//# sourceMappingURL=/js/bundle.js.map

const React= require('react')
// you can use something like this , const { render } = require('react-dom')
const ReactDOM= require('react-dom')
const {HashRouter, Route, Switch}= require('react-router-dom') 

// dir import 

const Content= require('./content.jsx')
const Users= require('./users.jsx') 
const Profile= require('./profile.jsx') 


ReactDOM.render((
    <Content>
        <HashRouter>
                <Route exact path='/' component={Users}/>
                <Route path='/user/:username' component={Profile}/>
                <Route path='/random' component={Content}/>
        </HashRouter>        
    </Content>

), document.getElementById('main')) 