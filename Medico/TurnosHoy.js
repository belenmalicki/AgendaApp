import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, ActivityIndicator, Text, View, Image,TextInput, Dimensions, TouchableOpacity, ScrollView  } from 'react-native';
import {Card, CardItem, Col, Row, Grid} from 'native-base'
import utils from '../utils/utils';
import CardTurnoPaciente from './CardTurnoPaciente';
import ApiController  from '../controller/ApiController'
import AsyncStorage from '@react-native-community/async-storage'


const { width } = Dimensions.get('window');
export default class TurnosHoy extends Component {
    constructor(props){
        super(props)
        this.state={
          jornadas:[],
          usuario: {},
          cargado: false
        }
      }
      static navigationOptions = {
        title: 'Turnos',
       drawerIcon: ({ focused }) => (
          <Ionicons name="md-home" size={24} color={focused ? '#e93923' : 'black'} />
        ),}

        componentDidMount() {
          this.getUsuario()
        }
      
        getUsuario = async () => {
          try {
            const jsonValue = await AsyncStorage.getItem('usuario')
            const usuario = jsonValue != null ? JSON.parse(jsonValue) : null;
            this.setState({ usuario: usuario })
            this.getJornada()
          } catch (e) {
            console.log(e)
          }
        }

       getJornada(){
        const { usuario} = this.state;
        if(this.state.cargado){
          this.setState({cargado: false})
      }
        let data = {
          medico_id: usuario.medico.id
      };

        ApiController.getJornadaHoy(data, this.handleData.bind(this));
       }

      handleData(response){
        if(response.status == 404){
            alert('ha ocurrido un error') //arreglar
        }else{
            response.json().then(jornadas => {
                this.setState({jornadas: jornadas, cargado: true})
            })
        }
    }
        mostrarCard(){
          if(this.state.cargado){
            if(this.state.jornadas.length===0){
             return( <Card style={{ width: width * 0.85, alignSelf: "center", marginTop: 10 }} >
                <CardItem style={{ marginTop: 10, alignSelf: "center", flexDirection: "column" }}>
                    <Image style={{ alignSelf: "center", height: 60, width: 60, marginBottom: 5 }} source={require('../assets/Images/calendar2.png')} />
                    <Text style={{ fontSize: 14, textAlign: "center",marginBottom:10 }}>No tenes turnos asignados para hoy.</Text>
                </CardItem>
              </Card>)
            }
            else{
              if(this.state.cargado)
              {
                return( this.state.jornadas[0].turnos.map((turno, i)=>{
                  //console.log('jornadas hoyyy',turno);
                  if(turno.paciente!=null)
                  return(<CardTurnoPaciente key={i} turno={turno} />)
              }))
              }}
          }else{
            return(<ActivityIndicator size="large" color={'#e93923'}></ActivityIndicator>)
          }
        }
  
    render() {
      var especialidad= ' '
     if(this.state.cargado)
      {especialidad =this.state.jornadas[0].especialidad.titulo}
      return (
        <View>
            <Text style={{fontSize:16 , marginTop:20, marginLeft:10}}><Image style={{height:18, width:18}} source={require('../assets/Images/time.png')}/> TURNOS DE HOY:</Text>
            <Text style={{fontSize:14, color:'#000000', marginTop:15, marginLeft:10}}><Ionicons name='md-calendar' size={16} color='black'></Ionicons> <Text style={{ fontWeight:'bold'}}>{new Date().getDate()} de {utils.getStringMes(new Date())}</Text> {utils.getStringWeekday(new Date())}</Text>    
            <Text  style={{fontSize:14, color:'#e93923', marginTop:10,marginLeft:15, fontWeight: 'bold', marginBottom:10}}>{utils.mayusPrimerLetra(especialidad)} </Text> 
            {this.mostrarCard()}
        </View>
      );
    }
  }
  