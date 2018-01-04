import React, { Component } from 'react';
import { View, Button } from 'react-native'
var Stomp = require('stompjs/lib/stomp.js').Stomp;
const url = "http://192.168.78.9:8080/flowmix/websocket"

class Socket extends Component {
    constructor(props){
        super(props)
        this.state = {sub: null, stompClient: null}
    }

    componentDidMount(){
        var stompClient = Stomp.client(url);

        this.setState({stompClient: stompClient})

        stompClient.connect({}, (success)=> {
            let sub = stompClient.subscribe(`/chanel/audio/106`,(message)=>{
                let data = JSON.parse(message.body)
                console.log("data", data)
            })
            this.setState({sub: sub})
        }, err => {
            console.log("error")
        })        
    }

    componentWillUnmount(){
        this.state.sub.unsubscribe()
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                    <Button
                    onPress={() => console.log(this.state.sub)}
                    title="Click"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                    />
            </View>
        )
    }
}

export default Socket;
