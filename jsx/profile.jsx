const React= require('react')
const axios= require('axios')

module.exports= class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user: {},
            currentUser:{}
        }
    }

    componentDidMount(){

        axios.get("/session")
        .then(function(response){
            this.state.currentUser=response.data;
        }.bind(this))
        .catch(function(err){
            console.log(err)
        })
        .then(function(){})

        axios.get("/user/"+this.props.match.params.username)
        .then(function(response){
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
                
                {(()=>{
                    if(this.state.user.username===this.state.currentUser.username){
                        return (<h1>  This is your profile</h1>)
                    }
                })()}
                
                <h1>{this.state.user.username}</h1>
                <h3>{this.state.user.createdAt}</h3>
                {this.props.params}
            </div>
        )
    }
}