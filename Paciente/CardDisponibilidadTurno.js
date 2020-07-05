import React, { Component,useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity, ScrollView,TouchableHighlight  } from 'react-native';
import {Card, CardItem, Col, DatePicker, Icon} from 'native-base'
import { Overlay } from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import ApiController from '../controller/ApiController';


 function CardDisponibilidadTurno(props) {
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        registrarListaEspera()
      //console.log('No confirmó')
    };

    const registrarListaEspera = () => {
        let data;
        if(props.nro === 5){
            data = {
                paciente_id: props.paciente_id,
                especialidad_id: props.especialidad_id
            }
            ApiController.registrarListaDeEsperaEspec(data, handleResponse)
        }else if(props.nro === 3){
            data = {
                paciente_id: props.paciente_id,
                medico_id: props.medico_id
            }
            ApiController.registrarListaDeEsperaMedico(data, handleResponse)
        }       
    }

    const handleResponse = (response) => {
        if(response.status === 400){
            alert('Ha ocurrido un error')
        }else{
            setVisible(!visible);
        }
    }

    const toggleOverlayConf = () => {
      setVisible(!visible);
      props.navigation.navigate('InicioPaciente')
      //console.log('Confirmó')
    };
    if(props.nro==2){
        var titulo = 'NO HAY TURNOS DISPONIBLES'
        var texto= ' Lo sentimos, no hay turnos disponibles en la fecha seleccionada.'
    }
    if(props.nro==3){
        var titulo = 'NO HAY TURNOS DISPONIBLES'
        var texto= ' Lo sentimos, no hay turnos disponibles por el momento con el profesional seleccionado.'+ "\n" +' Le sugerimos que solicite la lista de espera del mismo o que solicite un turno con otro profesional.'
        var boton = 'SOLICITAR LISTA DE ESPERA DEL MÉDICO'
    }
    if(props.nro==4){
        var titulo = 'TURNOS NO DISPONIBLES'
        var texto= 'Lo sentimos, en el día seleccionado ya tiene un turno asignado para la misma especialidad.'
    }
    if(props.nro==5){
        var titulo = 'NO HAY TURNOS DISPONIBLES'
        var texto= ' Lo sentimos, no hay turnos disponibles por el momento, le recomendamos solicitar la lista de espera'
        var boton = 'SOLICITAR LISTA DE ESPERA'
    }
    if(props.nro==2 || props.nro==4 ){
      return (
        <View style={{marginHorizontal:20, marginBottom:10}}>
            <Card style={{marginHorizontal:50}}>
                <CardItem style={{alignSelf:"center"}}>
                    <Text style={{fontSize:14, textAlign:'center', marginTop:5}}>{titulo}</Text>
                </CardItem>

                <CardItem>
                    <Text style={{fontSize:12, textAlign:'justify', marginHorizontal:5, marginBottom:10}}>{texto}</Text>
                </CardItem>
            </Card>
        </View>
      );
      }
      else{
        return(
        <View style={{marginHorizontal:20, marginBottom:10}}>
        <Card style={{marginHorizontal:50}}>
            <CardItem style={{alignSelf:"center"}}>
                <Text style={{fontSize:14, textAlign:'center', marginTop:5}}>{titulo}</Text>
            </CardItem>

            <CardItem>
                <Text style={{fontSize:12, textAlign:'justify', marginHorizontal:5}}>{texto}</Text>
            </CardItem>
            <CardItem style={{alignSelf:"center"}}>
            <TouchableOpacity onPress={toggleOverlay}>
                <Text style={{fontSize:12, textAlign:'center',fontWeight:'bold' ,marginHorizontal:5, marginBottom:5, color:'#1F77A5'}}>{boton}</Text>
             </TouchableOpacity>
            <Overlay overlayStyle={{height:140}} isVisible={visible} >
                <View>
                <Text style={{textAlign:"center", marginTop:20,fontSize:13}}>SE HA SOLICITADO LA LISTA DE ESPERA CON EXITO</Text>
        
                <TouchableOpacity style={{backgroundColor:"#1F77A5", width:180, alignSelf:'center', marginTop:20}} onPress={toggleOverlayConf}>
                    <Text style={{color:"white", fontWeight:"bold", fontSize:11, marginVertical:10, marginHorizontal:8, textAlign:'center' }}>VOLVER AL INICIO</Text>
                </TouchableOpacity>
                </View>
             </Overlay>
            </CardItem>
        </Card>
    </View>
        );}
  }
  
  export default withNavigation(CardDisponibilidadTurno)