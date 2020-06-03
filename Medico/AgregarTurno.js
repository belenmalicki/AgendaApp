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
        <Text style={{marginBottom:'5%',textAlign:'justify', fontSize:14, lineHeight:16, marginHorizontal:'5%'}}>
          Contactese al 4778-9809 para informarse sobre los métodos de pago.
        </Text>
      
      <View style={{marginTop:60}}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('InicioPaciente')}}
            style={{ width:230 ,alignSelf:'center', backgroundColor:'#e93922'}}>
            <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>VER MIS TURNOS</Text>
            </TouchableOpacity>
        </View>
        </View>
      );
    }
  }
  