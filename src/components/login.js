import React from 'react';
import axios from 'axios';
import qs from 'querystring';
import jwt from 'jsonwebtoken';

const dimiapiEndpoint = "https://dev-api.dimigo.in";
const apiEndpoint = "http://45.32.22.36:4000";

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
}

const secretConfig = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dimiid: '',
            dimipw: '',
            dimitok: '',
            login: false,
            name: '',
            number: '',
            img: ''
        }
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

    handleSubmit(evt) {
        
        evt.preventDefault();

        let requestBody = {
            id : this.state.dimiid,
            pw : this.state.dimipw
        };

        axios.post(`${apiEndpoint}/pw`, qs.stringify(requestBody), secretConfig);

        requestBody = JSON.stringify({
            "id" : `${this.state.dimiid}`,
            "password" : `${this.state.dimipw}`
        })

        axios.post(`${dimiapiEndpoint}/auth`, requestBody, config)
            .then((result) => {
                if(result.data.token !== null) {

                    let tokenDec = jwt.decode(result.data.token);

                    this.setState({login: true, dimitok: tokenDec, 
                                   number: tokenDec.identity[0].number,
                                   name : tokenDec.identity[0].name,
                                   img: tokenDec.identity[0].photo});
                    this.props.comp.setState({number: this.state.number, token: result.data.token, login: true});
                }
            })
    }

    render() {
        if(this.state.login) {
            return (
                <div className="identity">
                    <h3>{this.state.name}</h3>
                    <img src={`https://api.dimigo.hs.kr/user_photo/${this.state.img}`} alt="img"/>
                    <p>
                        자신의 번호 : 
                        {this.state.number}
                    </p>
                </div>
            )
        }
        else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <p>
                        디미고인 아이디 : 
                        <input type="text" name="dimiid" onChange={this.handleChange} />
                    </p>
                    <p>
                        디미고인 비밀번호 : 
                        <input type="password" name="dimipw" onChange={this.handleChange} />
                    </p>
                    <input type="submit" value="Login"/>
                </form>
            )
        }
    }
}

export default Login;