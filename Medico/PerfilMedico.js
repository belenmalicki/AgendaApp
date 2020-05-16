import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity,ScrollView  } from 'react-native';
import {Footer, FooterTab, Container, Col, Row} from 'native-base'
import { Divider } from 'react-native-elements' 
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');


export default class Perfil extends Component {
  render() {
    return (
      <ScrollView style={{flex:1}}>
      
      <Text style={{fontSize:18, textAlign:'center',marginTop:'5%'}}>PERFIL </Text>
      
      <View style={{backgroundColor:'pink', width:300, alignSelf: "center", height:195, marginTop:20, borderRadius:20}}>
            <Row size={40} style={{alignSelf:'flex-end'}}>
                <Text  style={{textAlign:'right',marginTop:30, marginRight:30, fontSize:20 }}><Ionicons  name="ios-globe" size={24} color={'black'} /> OSDE </Text>
            </Row>
            <Text  style={{ marginLeft:30, fontSize:18, marginTop:10, fontWeight:'bold' }}> 61  759666  1  02  </Text>
            <Text  style={{ marginLeft:30, fontSize:11, marginTop:10, fontWeight:'bold' }}> PANZA MATIAS EZEQUIEL  </Text>
            <View style={{ flexDirection:'row', marginBottom:10}}>
                <Text  style={{ marginLeft:25, fontSize:9, marginTop:12 }}>plan </Text>
                <Text  style={{ marginLeft:2, fontSize:11, marginTop:10, fontWeight:'bold' }}> 2  310  </Text>
                <Text  style={{ marginLeft:15, fontSize:9, marginTop:12 }}>vto  </Text>
                <Text  style={{ marginLeft:2, fontSize:11, marginTop:10, fontWeight:'bold' }}> 31/10/2020 </Text>
            </View>
      </View>
      <Text style={{marginTop:'7%',textAlign:'justify', fontSize:14, marginBottom:15, lineHeight:16, marginHorizontal:'5%'}}>
        NOMBRE Y APELLIDO
      </Text>
      <Text style={{fontSize:13, lineHeight:16, marginHorizontal:'6%', color:'grey'}}>
        Panza Matias Ezequiel
      </Text>
      <Divider style={{ backgroundColor: 'black',marginHorizontal:'5%' }} />
      <Text style={{marginTop:'5%',textAlign:'justify', fontSize:14, marginBottom:15, lineHeight:16, marginHorizontal:'5%'}}>
        DNI
      </Text>
      <Text style={{fontSize:13, lineHeight:16, marginHorizontal:'6%', color:'grey'}}>
        41.823.654
      </Text>
      <Divider style={{ backgroundColor: 'black',marginHorizontal:'5%' }} />
      <Text style={{marginTop:'5%',textAlign:'justify', fontSize:14, marginBottom:15, lineHeight:16, marginHorizontal:'5%'}}>
        DIRECCION
      </Text>
      <Text style={{fontSize:13, lineHeight:16, marginHorizontal:'6%', color:'grey'}}>
        Av. Santa Fe 1502 6t0 "B"
      </Text>
      <Divider style={{ backgroundColor: 'black',marginHorizontal:'5%' }} />
      <Text style={{marginTop:'5%',textAlign:'justify', fontSize:14, marginBottom:15, lineHeight:16, marginHorizontal:'5%'}}>
        TELÉFONO
      </Text>
      <Text style={{fontSize:13, lineHeight:16, marginHorizontal:'6%', color:'grey'}}>
        011 57761245
      </Text>
      <Divider style={{ backgroundColor: 'black',marginHorizontal:'5%' }} />
    
    <View style={{marginTop:60}}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('InicioPaciente')}}
          style={{ width:230 ,alignSelf:'center', backgroundColor:'#e93922'}}>
          <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>VER INICIO PACIENTE</Text>
          </TouchableOpacity>
      </View>
      </ScrollView>
    );
  }
}
