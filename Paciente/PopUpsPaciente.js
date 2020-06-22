
import React, { Component, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity, Alert, Modal,TouchableHighlight } from 'react-native';
import {Card, CardItem, Col, Row, Grid} from 'native-base'
import { Button, Overlay } from 'react-native-elements';
import ApiController from '../controller/ApiController'
import ConfirmarTurno from './ConfirmarTurno';
const { width } = Dimensions.get('window');
/*Tipos:
1: CIERRE: fuerea del pop up, con la cruz , TEXTO: no tiene, solo título
2: CIERRE: fuera del pop up, con la cruz, TEXTO: tiene + título
3: CIERRE: con el boton específico, TEXTO: tiene + título
4: CIERRE: con el boton específico, TEXTO: no tiene, solo título*/

export default function PopUp(props){
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
    //console.log('No confirmó')
  };
  const toggleOverlayConf = () => {
    setVisible(!visible);
    //console.log('Confirmó')
    let data={
      turno_id:props.id// buscar el id del turno
    }
    ApiController.confirmarTurno(data)//aun no maneja la respuesta
  };
  const toggleOverlayCanc = () => {
    setVisible(!visible);
    //console.log('Confirmó')
    let data={
      turno_id:props.id// buscar el id del turno
    }
    ApiController.cancelarTurno(data)//aun no maneja la respuesta
  };

if(props.tipo=='1'){
  return (
    <View>
       <TouchableOpacity  onPress={toggleOverlay}>
          <Text style={{color:props.col, fontWeight:"bold", fontSize:12 }}>{props.nombre}</Text>
        </TouchableOpacity>

      <Overlay overlayStyle={{height:props.alto}} isVisible={visible} onBackdropPress={toggleOverlay}>
        <View>
          <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={toggleOverlay} >
              <Text style={{fontSize:16, fontWeight:'bold'}}>X</Text>
          </TouchableOpacity> 
          <Text style={{textAlign:"center", marginTop:5,fontSize:13}}>{props.titulo}</Text>
 
          <TouchableOpacity style={{backgroundColor:props.col, width:140, alignSelf:'center', marginTop:20,}} onPress={toggleOverlayConf}>
              <Text style={{color:"white", fontWeight:"bold", fontSize:11, marginVertical:10, marginHorizontal:8, textAlign:'center' }}>{props.nombre} TURNO</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );}
  else if(props.tipo=='2'){
      return (
    <View>
       <TouchableOpacity  onPress={toggleOverlay}>
          <Text style={{color:props.col, fontWeight:"bold", fontSize:12 }}>{props.nombre}</Text>
        </TouchableOpacity>

      <Overlay overlayStyle={{height:props.alto}} isVisible={visible} onBackdropPress={toggleOverlay}>
        <View>
          <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={toggleOverlay} >
              <Text style={{fontSize:16, fontWeight:'bold'}}>X</Text>
          </TouchableOpacity> 
          <Text style={{textAlign:"center", marginTop:5}}>{props.titulo}</Text>
          <Text style={{textAlign:"justify", fontSize:12, marginTop:20, marginHorizontal:5}}>{props.texto}</Text>
          <TouchableOpacity style={{backgroundColor:props.col, width:140, alignSelf:'center', marginTop:30}} onPress={toggleOverlayCanc}>
              <Text style={{color:"white", fontWeight:"bold", fontSize:11, marginVertical:10, marginHorizontal:8, textAlign:'center' }}>{props.nombre} TURNO</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
  }
  else if(props.tipo=='3'){
    return (
      <View>
         <TouchableOpacity style={{backgroundColor:props.col, width:140, alignSelf:'center', marginTop:30}} onPress={toggleOverlay}>
            <Text style={{color:"white", fontWeight:"bold", fontSize:11, marginVertical:10, marginHorizontal:8, textAlign:'center' }}>{props.nombre}</Text>
          </TouchableOpacity>
  
        <Overlay overlayStyle={{height:props.alto}} isVisible={visible} onBackdropPress={toggleOverlay}>
          <View>
            <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={toggleOverlay} >
                <Text style={{fontSize:16, fontWeight:'bold'}}>X</Text>
            </TouchableOpacity> 
            <Text style={{textAlign:"center", marginTop:5}}>{props.titulo}</Text>
            <Text style={{textAlign:"justify", fontSize:12, marginTop:20, marginHorizontal:5}}>{props.texto}</Text>
            <TouchableOpacity style={{backgroundColor:props.col, width:140, alignSelf:'center', marginTop:30}} onPress={toggleOverlayConf}>
                <Text style={{color:"white", fontWeight:"bold", fontSize:11, marginVertical:10, marginHorizontal:8, textAlign:'center' }}>{props.bot}</Text>
            </TouchableOpacity>
          </View>
        </Overlay>
      </View>
    );
  }
  else if(props.tipo=4){}
};