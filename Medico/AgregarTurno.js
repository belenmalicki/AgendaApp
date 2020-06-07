import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity, ScrollView  } from 'react-native';
import {Footer, FooterTab, Container,Card, CardItem, Col, Accordion,Content } from 'native-base'

const { width } = Dimensions.get('window');
export default class AgregarTurno extends Component {
    render() {
      return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    
        <Text style={{fontSize:18, textAlign:'center',marginTop:'5%'}}>AGREGAR TURNO </Text>
        <Text style={{fontSize:14, marginLeft:'4%',color:'#e93922', marginBottom:15}}> <Ionicons name='md-calendar' size={16} color='#e93922'></Ionicons> 9 Jueves<Text style={{fontSize:14,color:'black'}}> Abril</Text></Text>
        <Text style={{fontSize:12,  marginTop:20, marginBottom:20, marginLeft:20}}>Elija la especialidad</Text>

        <Text style={{fontSize:12,  marginTop:20, marginBottom:20, marginLeft:20}}>Elija el horario del primer turno</Text>
          
        <Text style={{fontSize:12,  marginTop:20, marginBottom:20, marginLeft:20}}>Elija el horario del último turno</Text>  
        <View style={{flexDirection:"row"}}>
        <Text style={{fontSize:12,  marginTop:20, marginBottom:20, marginLeft:20}}>Elija la hora de almuerzo (opcional) </Text><TouchableOpacity>
        <Image style={{ height:16, width:16}} source={require('../assets/Images/information.png')} /></TouchableOpacity>
        </View>
        </View>
      );
    }
  }
  