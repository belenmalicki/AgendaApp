import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity  } from 'react-native';
import {createSwitchNavigator,createAppContainer } from 'react-navigation'
const { width } = Dimensions.get('window');


export default class DeudaAlert extends Component {
  render() {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <View style={{marginHorizontal:'5%', borderWidth:0.5, borderColor:'black', }}>
      <Text style={{fontSize:18, textAlign:'center',marginTop:'5%'}}>REGISTRA DEUDA </Text>
      <Text style={{marginTop:'5%',textAlign:'justify', fontSize:14, marginBottom:20, lineHeight:16, marginHorizontal:'5%'}}>
      Le notificamos que mantiene una deuda pendiente con el establecimiento al día de la fecha y por lo tanto, no podrá solicitar un nuevo turno hasta que la regularice.
      </Text>
      <Text style={{marginBottom:'5%',textAlign:'justify', fontSize:14, lineHeight:16, marginHorizontal:'5%'}}>
        Contactese al 4778-9809 para informarse sobre los métodos de pago.
      </Text>
    </View>
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
