import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {Text, Image, Dimensions, ScrollView  } from 'react-native';
import {Card, CardItem} from 'native-base'
import utils from '../utils/utils';
import CardTurnoPaciente from './CardTurnoPaciente'

const { width } = Dimensions.get('window');
export default class TurnosAsignados extends Component {
    constructor(props){
        super(props)
        this.state={
        }
      }
      mostrarCard(){
        const turnos = this.props.navigation.getParam('turnos', []);
        const especialidad = this.props.navigation.getParam('especialidad', '');
        var jornada=[]
        turnos.map((turno, i)=>{
          if(turno.paciente_id!=null){
              jornada.push(turno)
          }
      })
        if(jornada.length==0){
          return(<Card style={{ width: width * 0.85, alignSelf: "center", marginTop: 10 }} >
          <CardItem style={{ marginTop: 10, alignSelf: "center", flexDirection: "column" }}>
              <Image style={{ alignSelf: "center", height: 60, width: 60, marginBottom: 5 }} source={require('../assets/Images/calendar2.png')} />
              <Text style={{ fontSize: 14, textAlign: "center",marginBottom:10 }}>Por el momento no solicitaron turnos para hoy.</Text>
          </CardItem>
        </Card>)
        }


      }

    render() {
        const turnos = this.props.navigation.getParam('turnos', []);
        const especialidad = this.props.navigation.getParam('especialidad', '');
      return (
        <ScrollView>
        <Text  style={{fontSize:16 , marginTop:20, marginLeft:10}}>Turnos asignados:</Text>
        <Text style={{fontSize:14, color:'#000000', marginTop:15, marginLeft:10}}><Ionicons name='md-calendar' size={16} color='black'></Ionicons> <Text style={{ fontWeight:'bold'}}>{new Date(turnos[0].fecha_inicio).getDate()} de {utils.getStringMes(turnos[0].fecha_inicio)}</Text> {utils.getStringWeekday(turnos[0].fecha_inicio)}</Text>
         <Text  style={{fontSize:14, color:'#e93923', marginTop:10,marginLeft:15, fontWeight: 'bold', marginBottom:10}}>{especialidad} </Text>   
         {this.mostrarCard()}
         
         {turnos.map((turno, i)=>{
             if(turno.paciente_id!=null){
                 
                 return(<CardTurnoPaciente key={i} turno={turno} />)
             }
         })} 
        </ScrollView>
      );
    }
  }
  