import React from 'react';
import logo from './logo.svg';
import './App.scss';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({testVar: "fffffff"});
    }

    getRandom = () => (Math.random());

    render() {
        console.log(this.props);
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        {this.state.testVar} Memes.{this.getRandom()}aa
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        )
    }

    componentDidMount() {
        this.setState({testVar: "teeeeeest"});

        setTimeout(() => {
            this.setState({testVar: "another teeeeeeest"})
        }, 1000);
        fetch('api/hi')
            .then(res => res.json())
    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }


}


export default Home;
