import React, { Component } from 'react';
import { View, Button } from 'react-native';

class Home extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                    <Button
                    onPress={() => this.props.navigation.navigate('Socket')}
                    title="Socket"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                    />

                    <Button
                    onPress={() => this.props.navigation.navigate('MyCamera')}
                    title="MyCamera"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                    />
            </View>
        )
    }
};

export default Home;
