import React, { Component } from 'react';
import { Platform, ScrollView, Text, View, Image,TextInput, Dimensions, TouchableOpacity  } from 'react-native';
import {createSwitchNavigator,createAppContainer } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
const { width } = Dimensions.get('window');


export default class ConfirmarTurno extends Component {
    constructor(props){
        super(props)
        this.state={
            showAlert: false,
        }
    }
    
    abrirPop=()=>{
          this.setState({ showAlert: true});
      }
      cerrarPop=()=>{
        this.setState({ showAlert: false});
        this.props.navigation.navigate('InicioPaciente')
      }
    
  render() {
    const { navigation } = this.props;
    const med  = navigation.getParam('med' ,{});
    const esp  = navigation.getParam( 'esp' , {});
    const fechaComp  = navigation.getParam( 'fecha' , {});
    const hora  = navigation.getParam( 'hora' , {});
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };//long month y weekday 
    console.log('fecha', fechaComp.toLocaleDateString('es-ES', options))
    const dia = fechaComp.toLocaleDateString('es-ES', options).substr(0,3);
    const fecha = fechaComp.toLocaleDateString('es-ES', options).substr(5,6);
      
    return (
      <ScrollView style={{flex:1}}>
         <Text style={{fontSize:14, marginLeft:10,marginTop:20,}}>Datos del turno: </Text>
         <Text style={{fontSize:14, marginLeft:14,marginTop:20, marginBottom:10, color:'#1F77A5', fontWeight:'bold' }}>{med}</Text>
         <Text style={{fontSize:14, marginLeft:14, marginBottom:20, color:'#1F77A5' }}>{esp}</Text>
         <Text style={{fontSize:12, marginLeft:18, marginBottom:10 }}> <Ionicons name='md-calendar' size={16} color='black'></Ionicons> <Text style={{fontWeight:'bold'}}>{fecha}</Text> {dia}   </Text>
         <Text style={{fontSize:12, marginLeft:18, marginBottom:10 }}> <Ionicons name='md-time' size={16} color='black'></Ionicons> {hora} Hs. </Text>
         <Text style={{fontSize:12, marginLeft:19, marginBottom:10 }}><Image style={{height:14, width:14}} source={require('../assets/Images/pin.png')}/> Belgrano</Text>
         <Text style={{fontSize:12, marginLeft:19, marginBottom:10 }}><Image style={{height:14, width:14}} source={require('../assets/Images/list.png')}/> Requisitos: </Text>
         <Text style={{fontSize:12, marginLeft:22, marginBottom:10, marginRight:15 }}>- Presentarse 15 minutos antes del turno para realizar los trámites administrativos. </Text>
         <Text style={{fontSize:12, marginLeft:22, marginBottom:10, marginRight:15 }}>- Portar los estudios solicitados por el médico en caso de que haya alguno.</Text>
         <TouchableOpacity onPress={() => this.abrirPop()}
            style={{marginTop:20, width:130 ,alignSelf:'flex-end', backgroundColor:'#e93922', marginRight:20}}>
            <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>CONFIRMAR</Text>
        </TouchableOpacity>
        <Overlay overlayStyle={{height:120}} isVisible={this.state.showAlert} >
            <Text style={{fontSize:13, lineHeight:18,color:'black',textAlign:'center', marginTop:20, marginHorizontal:8}}>SE HA CONFIRMADO SU TURNO CON ÉXITO</Text>
            <TouchableOpacity style={{backgroundColor:"#1F77A5", width:180, marginTop:20, alignSelf:"center"}} onPress={() => this.cerrarPop()}>
                <Text style={{fontSize:11,fontWeight:'bold', color:'white', marginVertical:8, textAlign:"center"}} >VOLVER AL INICIO</Text>
            </TouchableOpacity>
         </Overlay> 
      </ScrollView>
    );
  }
}
