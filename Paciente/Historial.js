import React, { Component } from 'react';
import { Platform, ScrollView, Text, View, Image,TextInput, Dimensions, TouchableOpacity  } from 'react-native';
import {createSwitchNavigator,createAppContainer } from 'react-navigation'
import CardHistorial from './CardHistorial'
const { width } = Dimensions.get('window');


export default class Historial extends Component {
  render() {
    return (
      <ScrollView style={{flex:1}}>
         <Text style={{fontSize:16, textAlign:'center',marginTop:20, marginBottom:10 }}>Historial de turnos </Text>
      <CardHistorial med="DRA. RODRIGEUZ, CARLA" esp="Cardiologa" fecha=" " />
      </ScrollView>
    );
  }
}
