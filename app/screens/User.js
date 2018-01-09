import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import {connect} from 'react-redux'

import {getAllUser, deleteUserById} from '../actions/user'
import { Button, Divider, Header, Icon, List, ListItem  } from 'react-native-elements'
import Swipeout from 'react-native-swipeout'
import {DotIndicator} from 'react-native-indicators'

class LeftComponent extends Component {
    render(){
        const {navigate} = this.props.navigation
        return  <TouchableOpacity onPress={() => {navigate('DrawerToggle')}}>
                    <Icon
                        name='sc-telegram'
                        type='evilicon'
                        color='white'
                        size={30}/>
                </TouchableOpacity>
    }
}

class User extends Component {
    constructor (props) {
        super(props)
        this.renderRow = this.renderRow.bind(this)
        this.state = {
            swipeOpen: false,
            rowId: 0,
            refreshing: false
        }
    }

    componentWillMount(){
        getAllUser(this.props.dispatch)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.indicator === true && nextProps.indicator === false){
            this.setState({refreshing: false})
        }
    }
    
    _onRefresh() {
        this.setState({refreshing: true})
        getAllUser(this.props.dispatch)
    }

    _deleteUser(user){
        this.setState({swipeOpen: false, rowId: 0})
        deleteUserById(this.props.dispatch, user.ID)
    }

    _swipeOpen(sectionID, rowId, direction){
        if(!this.state.swipeOpen && direction=="right") {
            this.setState({swipeOpen: true, rowId})
        }
    }

    _swipeClose(sectionID, rowId, direction){
        if(this.state.swipeOpen && direction=="right") {
            this.setState({swipeOpen: false, rowId: 0})
        }
    }

    _isDisable(rowId) {
        return this.state.swipeOpen && rowId !== this.state.rowId
    }

    renderRow(user) {
        const styleButton = {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }

        var swipeoutBtnRight = [
            {   
                backgroundColor: 'white',
                component: <TouchableOpacity style={{flex:1}} onPress={() => this._deleteUser(user)}>
                              <View style={[styleButton,{backgroundColor: 'red'}]}>
                                <Icon name='highlight-off' color='white' size={15} />
                                <Text style={{color: 'white'}}>Delete</Text>
                              </View>
                           </TouchableOpacity>,
              },
          ]
        
        return (
            <Swipeout   key={user.ID} 
                        rowId={user.ID} 
                        disabled={this._isDisable(user.ID)}
                        onClose={(sectionID, rowId, direction) => this._swipeClose(sectionID, user.ID, direction)}
                        onOpen={(sectionID, rowId, direction) => this._swipeOpen(sectionID, user.ID, direction)}
                        style={{backgroundColor: 'rgba(0,0,0,0)'}}
                        right={swipeoutBtnRight}>
                            <ListItem containerStyle={{borderColor: 'red'}}
                                roundAvatar
                                avatar={{uri:user.avatar}}
                                key={user.ID}
                                title={user.name}
                                subtitle={user.address}
                                hideChevron={true}
                            />
            </Swipeout>
        )
      }

    render() {
        let users = this.props.users
        return (
            <View style={{flex:1, backgroundColor:'white'}}>
                <View>
                    <Header outerContainerStyles={{padding: 0, marginBottom: 0, height: 50, padding: 10}} backgroundColor="#ff5722"
                        leftComponent={<LeftComponent {...this.props}/>}
                        centerComponent={{ text: 'USERs '+ users.length, style: { color: '#fff' } }} 
                        rightComponent={{ icon: 'home', color: '#fff' }}
                    />
                </View>
                {
                    false?
                    (<View style={{marginTop: 60, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <DotIndicator color='orange' size={8} />
                    </View>) : (<View style={{marginTop: 50}}>
                    <ScrollView refreshControl={
                                                <RefreshControl
                                                    refreshing={this.state.refreshing}
                                                    onRefresh={this._onRefresh.bind(this)}
                                                />}
                                showsVerticalScrollIndicator={false}>
                        <List containerStyle={{marginTop:0, borderColor: 'white'}}>
                            {
                                users.map((user, i) => (
                                    this.renderRow(user)
                                ))
                            }
                        </List>
                    </ScrollView>
                </View>)
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => { 
    return{
        users: state.user,
        indicator: state.indicator
    }
};

export default connect(mapStateToProps)(User);
