import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity, ScrollView  } from 'react-native';
import { Divider,CheckBox, Overlay  } from 'react-native-elements';

const { width } = Dimensions.get('window');
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
                containerStyle={{backgroundColor:'white', borderColor:'white', paddingVertical:0}}
                textStyle={{fontWeight:'normal', fontSize:12}} />   
        </View>
      );
    }
  }
  