const React= require('react')
const axios= require('axios')

module.exports= class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state={user: {}}
    }

    componentDidMount(){
        axios.get("/user/"+this.props.match.params.username)
        .then(function(response){
            console.log(response.data)
            this.setState({user: response.data})
        }.bind(this))
        .catch(function(err){
            console.log(err)
        })
        .then(function(){})
    }
    render(){
        return(
            <div>
                <h1>{this.state.user.username}</h1>
                <h3>{this.state.user.createdAt}</h3>
                {this.props.params}
            </div>
        )
    }
}