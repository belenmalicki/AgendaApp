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
    render() {
      return (
        <View>
            <CheckBox
                title={this.props.hora}
                checked={this.state.checked}
                onPress={() => this.setState({checked: !this.state.checked})}
                checkedColor='black'
                containerStyle={{backgroundColor:'white', borderColor:'white', paddingVertical:0}}
                textStyle={{fontWeight:'normal', fontSize:12}} />   
        </View>
      );
    }
  }
  