import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity, ScrollView  } from 'react-native';
import { Divider,CheckBox, Overlay  } from 'react-native-elements';
import {Card, CardItem, Col, Row, Grid} from 'native-base'
import utils from '../utils/utils';
import CardTurnoPaciente from './CardTurnoPaciente'

const { width } = Dimensions.get('window');
export default class TurnosAsignados extends Component {
    constructor(props){
        super(props)
        this.state={
        }
      }

    render() {
        const turnos = this.props.navigation.getParam('turnos', []);
        const especialidad = this.props.navigation.getParam('especialidad', '');
      return (
        <View>
        <Text  style={{fontSize:16 , marginTop:20, marginLeft:10}}>Turnos asignados:</Text>
        <Text style={{fontSize:14, color:'#000000', marginTop:15, marginLeft:10}}><Ionicons name='md-calendar' size={16} color='black'></Ionicons> <Text style={{ fontWeight:'bold'}}>{new Date(turnos[0].fecha_inicio).getDate()} de {utils.getStringMes(turnos[0].fecha_inicio)}</Text> {utils.getStringWeekday(turnos[0].fecha_inicio)}</Text>
         <Text  style={{fontSize:14, color:'#e93923', marginTop:10,marginLeft:15, fontWeight: 'bold', marginBottom:10}}>{especialidad} </Text>   
         {turnos.map((turno, i)=>{
             if(turno.paciente_id!=null){
                 
                 return(
                     <CardTurnoPaciente key={i} turno={turno} />)
             }
         })} 
        </View>
      );
    }
  }
  