import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppRoot from './app/index';

export default class App extends React.Component {

  componentWillMount(){
    console.log("init")
  }
  
  render() {
    return (
      <AppRoot/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
