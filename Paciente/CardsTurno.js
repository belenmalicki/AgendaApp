import React, { Component, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity, Alert, Modal,TouchableHighlight } from 'react-native';
import {Card, CardItem, Col, Row, Grid} from 'native-base'
import { Button, Overlay } from 'react-native-elements';
import PopUp from './PopUpsPaciente'
const { width } = Dimensions.get('window');

export default class CardTurno extends Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (
      <View style={{ alignItems:'center', marginBottom:10}}>
        <Card style={{width:width*0.9}}>
            <CardItem>
                
                    <Col style={{marginTop:25}} >
                        <Text style={{fontSize:14, color:'#1f77a5', textAlign:"center", fontWeight:'bold'}}>07</Text>
                        <Text style={{fontSize:12, color:'#1f77a5', textAlign:"center", fontWeight:'bold'}}>Abril</Text>
                        <Text style={{fontSize:12, color:'#1f77a5', textAlign:"center"}}>Martes</Text>
                    </Col>
                    <Col size={3} style={{marginLeft:15}} >
                        <Text style={{fontSize:15}}>{this.props.med}</Text>
                        <Text style={{fontSize:13, marginTop:3}}>{this.props.esp}</Text>
                        <Text style={{fontSize:11, marginTop:12}}> <Ionicons name='md-time' size={12} color='black'></Ionicons> {this.props.hora}  Hs</Text>
                        <Text style={{fontSize:11,marginTop:3 }}> <Image style={{height:11, width:11}} source={require('../assets/Images/pin.png')}/> Sede Belgrano</Text>
                    </Col>
                
            </CardItem>
            <CardItem style={{ alignSelf:'flex-end', marginBottom:5}}>
                <View style={{flexDirection:"row"}}>
                
                 {  /* <TouchableOpacity  style={{marginRight:15}}>
                        <Text style={{color:"#1f77a5", fontWeight:"bold", fontSize:12 }}> CONFIRMAR</Text>
                    </TouchableOpacity>*/}
                    <View style={{marginRight:15}}>
                    <PopUp key='1' tipo='1' alto='18%' nombre='CONFIRMAR' col='#1f77a5' titulo='¿DESEA CONFIRMAR SU TURNO?'/>
                    </View>
                    <PopUp key='2' tipo='2' alto='28%' nombre='CANCELAR' col='#e93922' titulo='¿DESEA CONFIRMAR SU TURNO?' texto='Los turnos podrán ser cancelados hasta 12 Hs. antes del mismo, en caso de no ser así, se le cobrará la penalización correspondiente'/>
                   
                
                </View>
            </CardItem>
        </Card>
     </View>
    );
  }
}
