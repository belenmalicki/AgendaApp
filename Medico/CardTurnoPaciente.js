import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity, ScrollView  } from 'react-native';
import { Divider,CheckBox, Overlay  } from 'react-native-elements';
import {Card, CardItem, Col, Row, Grid} from 'native-base'
import utils from '../utils/utils';

const { width } = Dimensions.get('window');
export default class CardTurnoPaciente extends Component {
    constructor(props){
        super(props)
        this.state={

        }
      }
  
    render() {
        var turno=this.props.turno
      return (
        <View>
            <Card style={{width:width*0.9, alignSelf:'center', marginBottom:5}}> 
                            <CardItem>
                                <Col style={{alignItems:"center"}}>
                                    <Text style={{color:'#1f77a5', fontWeight:'bold', fontSize:16}}>{utils.formatHora(turno.fecha_inicio)} Hs.</Text>
                                </Col>
                                <Col size={1} style={{flexDirection:'column', marginLeft:20}}>
                                    <Text style={{marginTop:5, fontSize:14, fontWeight:'bold'}}><Ionicons name='ios-person' size={16} color='black'></Ionicons>  {turno.paciente.datos.nombre} {turno.paciente.datos.apellido}</Text>
                                    <Text style={{marginTop:5, fontSize:12}}><Ionicons name='md-card' size={16} color='black'></Ionicons>  {utils.formatObraSocial(turno.paciente.obra_social)} {utils.mayusPrimerLetra(turno.paciente.plan)} </Text>
                                    <Text style={{marginTop:5, fontSize:12, marginBottom:10}}><Image style={{height:14, width:14}} source={require('../assets/Images/pin.png')}/>  Sede {turno.sede}</Text>
                                </Col>
                            </CardItem>
                    </Card>
        </View>
      );
    }
  }
  