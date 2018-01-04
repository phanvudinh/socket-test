import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class MyCamera extends React.Component {
    constructor(props){
      super(props)
      console.log("constructor")
      this.state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        autoFocus: Camera.Constants.AutoFocus.on
      }
    }
  
    async componentWillMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
      console.log("ask for access camera phone")
    }
  
    render() {
      console.log("render")      
      const { hasCameraPermission } = this.state;
      if (hasCameraPermission === null) {
        console.log("perssion is null")            
        return <View />;
      } else if (hasCameraPermission === false) {
        console.log("perssion is false")                    
        return <Text>No access to camera</Text>;
      } else {
        console.log("perssion is true")                    
        return (
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }}
             type={this.state.type}
             autoFocus={this.state.autoFocus}
             onFacesDetected={(face) => {console.log("the face is detected",face)}}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({
                      type: this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                    });
                  }}>
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    {' '}Flip{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        );
      }
    }
  }