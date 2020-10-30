import React, { Component } from 'react';
import {View, Dimensions } from 'react-native';
import {CheckBox} from 'react-native-elements';

export default class Check extends Component {
    constructor(props){
        super(props)
        this.state={
            checked:false  
        }
      }

    onPressUpdate = () => {
      this.setState({checked: !this.state.checked})
      if(this.props.update){
        this.props.update(this.props.id, this.props.item)
      }
    }
    render() {
      return (
        <View>
            <CheckBox
                title={this.props.hora}
                checked={this.state.checked}
                onPress={this.onPressUpdate}
                checkedColor='#1F77A5'
                containerStyle={{backgroundColor:'#fbfbfb', borderColor:'#fbfbfb', paddingVertical:0}}
                textStyle={{fontWeight:'normal', fontSize:12}} />   
        </View>
      );
    }
  }
  