import React from 'react';
import './App.scss';
import {Calculator} from "./Calculator";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({testVar: "fffffff"});
    }

    render() {
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

}


export default Home;
