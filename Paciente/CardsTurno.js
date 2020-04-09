import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity, Alert } from 'react-native';
import {Card, CardItem, Col, Row, Grid} from 'native-base'
const { width } = Dimensions.get('window');
const AlertExample = () => {
    const showAlert = () =>{
       Alert.alert(
          '',
          '¿DESEA CONFIRMAR SU TURNO?',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed'), style:'default'},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'destructive'},
            
          ],
          
       )
    }
    return (
       <TouchableOpacity onPress = {showAlert} style={{marginRight:15}}>
                 
                        <Text style={{color:"#1f77a5", fontWeight:"bold", fontSize:12 }}> CONFIRMAR</Text>
                    </TouchableOpacity>
    )
 }


export default class CardTurno extends Component {
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
                        <Text style={{fontSize:15}}>DRA. RODRIGUEZ, CARLA</Text>
                        <Text style={{fontSize:13, marginTop:3}}>Cardióloga</Text>
                        <Text style={{fontSize:11, marginTop:12}}> <Ionicons name='md-time' size={12} color='black'></Ionicons> 14.00  Hs</Text>
                        <Text style={{fontSize:11,marginTop:3 }}> <Image style={{height:11, width:11}} source={require('../assets/Images/pin.png')}/> Sede Belgrano</Text>
                    </Col>
                
            </CardItem>
            <CardItem style={{ alignSelf:'flex-end', marginBottom:5}}>
                <View style={{flexDirection:"row"}}>
                <AlertExample />
                    <TouchableOpacity  style={{marginRight:15}}>
                        <Text style={{color:"#1f77a5", fontWeight:"bold", fontSize:12 }}> CONFIRMAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={{color:'#e93922', fontWeight:"bold", fontSize:12}}> CANCELAR</Text>
                    </TouchableOpacity>
                
                </View>
            </CardItem>
        </Card>
     </View>
    );
  }
}
