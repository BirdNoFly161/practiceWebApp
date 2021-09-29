const React = require('react')

module.exports = class Content extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>

                <div className="navbar navbar-default navbar-static-top" role="navigation">
                    <div className="container">

                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">Learn About Me</a>
                        </div>

                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="/#/login">Log in</a></li>
                            <li><a href="/#/signup">Sign up</a></li>
                        </ul>

                    </div>

                </div>

                <div className="container">
                    <h1>Welcome to Learn About Me!</h1>

                    <div id="content">
                        {this.props.children}                
                    </div>
                </div>

            </div>
        )
    }
}