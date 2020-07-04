import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity, ScrollView  } from 'react-native';
import { Divider,CheckBox, Overlay  } from 'react-native-elements';
import utils from '../utils/utils';
import CardTurnoPaciente from './CardTurnoPaciente';

const { width } = Dimensions.get('window');
export default class TurnosHoy extends Component {
    constructor(props){
        super(props)
        this.state={

        }
      }
      static navigationOptions = {
        title: 'Turnos',
       drawerIcon: ({ focused }) => (
          <Ionicons name="md-home" size={24} color={focused ? '#e93923' : 'black'} />
        ),}
  
    render() {
      return (
        <View>
            <Text style={{fontSize:16 , marginTop:20, marginLeft:10}}><Image style={{height:18, width:18}} source={require('../assets/Images/time.png')}/> Turnos de hoy:</Text>
            <Text style={{fontSize:14, color:'#000000', marginTop:15, marginLeft:10}}><Ionicons name='md-calendar' size={16} color='black'></Ionicons> <Text style={{ fontWeight:'bold'}}>{new Date().getDate()} de {utils.getStringMes(new Date())}</Text> {utils.getStringWeekday(new Date())}</Text>    
            <Text  style={{fontSize:14, color:'#e93923', marginTop:10,marginLeft:15, fontWeight: 'bold', marginBottom:10}}>especialidad </Text> 
            
        </View>
      );
    }
  }
  