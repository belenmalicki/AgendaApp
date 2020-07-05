import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView  } from 'react-native';
const { width } = Dimensions.get('window');

export default class DeudaAlert extends Component {
  render() {
    return (
      <ScrollView style={{flex:1}}>
        <Text style={{fontSize:16, textAlign:"center", marginTop: 15}}>Acerca de Clinica Arduino</Text>
        <Image source={require('../assets/Images/clinica.jpg')} style={{height:width*0.4 ,width:width*0.8, alignSelf:'center',marginVertical:12 }}></Image>
        <Text style={{fontSize:14, color:'#E93923', marginLeft: 15, fontWeight:'bold'}}>Mision</Text>
        <Text style={{fontSize:14, marginHorizontal: 20, textAlign:'justify', marginVertical:10}}> Brindar a la comunidad servicios de atención para la salud con excelencia y certeza diagnóstica, sustentados por la confiabilidad, accesibilidad, calidad y calidez, en un clima laboral de respeto y armonía. Satisfacer las necesidades de los pacientes, su entorno, profesionales médicos y financiadores, contribuyendo a la mejora continua de la salud, calidad de vida de las personas brindando apoyo científico-técnico a los profesionales tratantes.</Text>
        <Text style={{fontSize:14, color:'#E93923', marginLeft: 15, fontWeight:'bold'}}>¿Como llegar?</Text>
        <Text style={{fontSize:14,  marginLeft: 20, marginTop:10}}>SEDE BELGRANO</Text>
        <View>
          <Text style={{fontSize:14,  marginLeft: 20, marginTop:10}}><Image style={{height:16, width:16}} source={require('../assets/Images/pinRed.png')}/>  Av. Pueyrredón 1640, Buenos Aires, Argentina</Text>
          <Text style={{fontSize:14,  marginLeft: 20, marginTop:5}}><Image style={{height:16, width:16}} source={require('../assets/Images/call.png')}/> +54 (011) 5777-3200</Text>
          <Text style={{fontSize:14,  marginLeft: 20, marginTop:5}}><Image style={{height:16, width:16}} source={require('../assets/Images/bus.png')}/><Text style={{fontWeight:'bold'}}>  Lineas de colectivo:</Text> 12 – 39 – 41 – 59 – 60 </Text>
          <Text style={{fontSize:14,  marginLeft: 20, marginTop:5, marginRight:5}}><Image style={{height:16, width:16}} source={require('../assets/Images/underground.png')}/><Text style={{fontWeight:'bold'}}>  Lineas de subte:</Text> Línea D: Estación Pueyrredón, Línea H: Estación Santa Fe.</Text>
        </View>
      </ScrollView>
    );
  }
}
