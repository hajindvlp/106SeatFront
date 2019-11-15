import React from 'react';
import axios from 'axios';

const apiEndpoint = "http://45.32.22.36:4000";

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

class Seat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content : '',
            list : ''
        }
        this.getContent();
        this.getList();
    }

    getContent() {
        axios.get(`${apiEndpoint}/complete`, config)
            .then((res) => {
                if(res.status === 200) {

                    let seatRaw = res.data;
                    let seatSemiHtml = <></>;
                    let tmp = <></>;
                
                    for(var i=0 ; i<6 ; i++){
                        tmp = <></>;
                        for(var j=0 ; j<6 ; j++) {
                            if((j+1)%2 === 0) tmp = (<>{tmp}<td className="set">{seatRaw[i*6+j]}</td></>);
                            else tmp = (<>{tmp}<td>{seatRaw[i*6+j]}</td></>);
                        }
                        seatSemiHtml = (<>{seatSemiHtml}<tr>{tmp}</tr></>);
                    }

                    let seatHtml = (
                        <>
                        <table>
                            {seatSemiHtml}
                        </table>
                        </>
                    );

                    this.setState({content: seatHtml});
                } else if(res.status === 202) {
                    let contentRaw = (<><h2>{res.data} / 35 </h2><p>35명이 모두 채워져야 보입니다...</p><h4>아직 안한사람</h4></>);
                    this.setState({content : contentRaw});
                }
            });
    }

    getList() {
        axios.get(`${apiEndpoint}/list`, config)
            .then((res) => {
                let list = res.data;
                let listHtml = <></>;

                for(var i=0 ; i<list.length ; i++) {
                    listHtml = (<>{listHtml}<li>{list[i]}</li></>)
                }

                this.setState({list : listHtml});
            })
    }

    render() {
        return (
            <div className="seat">
                {this.state.content}
                <ul>
                    {this.state.list}
                </ul>
            </div>
        );
    }
}

export default Seat;