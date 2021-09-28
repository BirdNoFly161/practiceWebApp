const React= require('react')
const ReactDOM= require('react-dom')
const axios= require('axios')
const {Link}= require('react-router-dom')

module.exports= class Users extends React.Component{
    constructor(props){
        super(props)
        this.state={
            users:[],
            usersRaw:{},
            // this loading can help you to know when data is arrived
            //loading : false
        }
    }
    /*getData = async ()=>{
        try{
            this.setState(s => ({...s , loading : true}));
            const response = await axios.get("/users");
            const users = response.data
            this.setState(s => ({...s ,users, loading : false}));
        }catch(e){}
    }*/
    componentDidMount(){
        // you can use async await, it is more easier to read, and make th code cleaner
        // put getData here
        // getData() 
        // why ??? , sometimes you need to put additional acts , when they all on the same scope , maintenance them will be hard
        axios.get("/users")
        .then(function(response){
            console.log(response.data)
            this.setState({users: response.data})
        }.bind(this))
        .catch(function(err){
            console.log(err)
        })
        .then(function(){})

        axios.get("/visits")
        .then(function(response){
            console.log(response.data)
            if(response.data.visits){
                this.setState({visits: response.data.visits})
            }
        }.bind(this))
        .catch(function(err){
            console.log(err)
        })
        .then(function(){})

    }
    
    render(){
        return (<div className="users">
            {this.state.users.map(function(user){
                return (<div className="panel panel-default">
                    <div className="panel-heading">
                        <Link to={`/user/${user.username}`}>{user.username}</Link>
                    </div>
                </div>)
            })}
            {(()=>{
                if(this.state.visits){
                    return (<h1> you have visited this page {this.state.visits} times </h1>)
                }
                else{
                    return (<h1> you have never visited this page</h1>)
                }
            })()}
        </div>)
    }
}