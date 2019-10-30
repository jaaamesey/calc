import React from 'react';
import './App.scss';
import {Calculator} from "./Calculator";


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
                <Calculator/>
            </div>
        )
    }

    componentDidMount() {
        this.setState({testVar: "teeeeeest"});

        setTimeout(() => {
            this.setState({testVar: "another teeeeeeest"})
        }, 1000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }


}


export default Home;
