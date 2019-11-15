import React from "react";
import axios from 'axios';
import qs from 'querystring';
import Login from './login';

const apiEndpoint = "http://45.32.22.36:4000";

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number : 0,
            want1 : 0,
            want2 : 0,
            want3 : 0,
            message : '',
            onmessage : false,
            token : '',
            login : false
        };
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(evt) {

        const value = evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    }
    
    handleSubmit(event) {
        if(this.state.login) {
            const requestBody = {
                number : this.state.number,
                want1 : this.state.want1,
                want2 : this.state.want2,
                want3 : this.state.want3,
                token : this.state.token
            }

            axios.post(`${apiEndpoint}/`, qs.stringify(requestBody), config)
                .then((result) => {
                    if(result.data === "written") this.setState({message : "성공"});
                    else if(result.data === "changed") this.setState({message: "바뀜"});
                    else this.setState({message: "실패"});
                })
        }
        event.preventDefault();
    }

    render() {
        return (
            <div className="Select">
                <Login comp={this} />
                <p>안 훔쳤어
                </p>
            <form onSubmit={this.handleSubmit}>
                <h2>남의 번호</h2>
                <p>
                    1 지망 : 
                    <input type="text" name="want1" onChange={this.handleChange} />
                </p>
                <p>
                    2 지망 : 
                    <input type="text" name="want2" onChange={this.handleChange} />
                </p>
                <p>
                    3 지망 : 
                    <input type="text" name="want3" onChange={this.handleChange} />
                </p>
                <input type="submit" value="Submit" />
            </form>
                <p>{this.state.message}</p>
            </div>
        );
    }
}

export default Select;