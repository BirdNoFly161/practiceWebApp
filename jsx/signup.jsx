const React = require('react')
const axios= require ('axios')

module.exports = class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value_username: "test user",
            value_password: "test_password"
        }
        this.handleChange_Username = this.handleChange_Username.bind(this)
        this.handleChange_Password = this.handleChange_Password.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange_Username(event) {
        this.setState({ value_username: event.target.value })
    }

    handleChange_Password(event) {
        this.setState({ value_password: event.target.value })
    }

    handleSubmit(event) {
        // todo
        // send the data to backend and check if the username is available
        event.preventDefault()
        axios.post('/newUser',{
            username: this.state.value_username,
            password: this.state.value_password
        })
        .then(function(response){
            if(response.status===200){
                this.props.history.push('/login')
            }
        }.bind(this))
        .catch(function(err){
            this.props.history.push("/")
        }.bind(this));
    }

    render() {
        return (
            <div>

                <h1>Sign up</h1>
                <form   >
                    <input id="username" type='text' value={this.state.value_username} onChange={this.handleChange_Username} placeholder="Username"></input>
                    <input id="password" type='password' value={this.state.value_password} onChange={this.handleChange_Password} placeholder="Password"></input>
                    <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>Sign up</button>
                    <h1>{this.state.value_password}</h1>
                </form>
            </div>
        )
    }
}