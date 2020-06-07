import React, { Component, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,Alert, Dimensions, TouchableOpacity, ScrollView, Button  } from 'react-native';
import {Footer, FooterTab, Container} from 'native-base'
import CardTurno from './CardsTurno'
import AwesomeAlert from 'react-native-awesome-alerts';
//import DateTimePicker from '@react-native-community/datetimepicker';
import Ejemplo from './Ejemplo'


const { width } = Dimensions.get('window');



export default class InicioPaciente extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showAlert: false,
      es_deudor:false,
    };
  };
 
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
 
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  solTurno(){
    if(this.state. es_deudor===false){
      return(    
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('SolicitarTurno')}}
              style={{ width:230 ,alignSelf:'center', backgroundColor:'#e93922'}}>
              <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>SOLICITAR TURNO</Text>
          </TouchableOpacity> )

    }
    else{
      return(
          <TouchableOpacity onPress={() => this.showAlert()}
              style={{ width:230 ,alignSelf:'center', backgroundColor:'#e93922'}}>
              <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>SOLICITAR TURNO</Text>
          </TouchableOpacity> )
    }
  }
 
  render() {
    const {showAlert} = this.state;
const mensaje= " Le notificamos que mantiene una deuda pendiente con el establecimiento al día de la fecha y por lo tanto, no podrá solicitar un nuevo turno hasta que la regularice." +"\n" +"\n" + " Contactese al 4778-9809 para informarse sobre los métodos de pago."
    return (
      <Container>
        <ScrollView >
            <Text style={{fontSize:17, textAlign:'center', marginVertical:20}}>¡BIENVENIDO NOMBREUSUARIO!</Text>
            <Text style={{fontSize:14, marginLeft:'4%',color:'#e93922', marginBottom:15}}> <Ionicons name='md-calendar' size={16} color='#e93922'></Ionicons> PRÓXIMOS TURNOS</Text>
            <CardTurno med="DRA. RODRIGUEZ, CARLA" esp="Cardióloga" hora="14.00" fecha=" " /> 
        </ScrollView>
        <Footer style={{backgroundColor:'white'}}>
          {this.solTurno()}
        </Footer>
        <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="REGISTRA DEUDA"
                titleStyle={{fontSize:18, color:'black'}}
                messageStyle={{fontSize:14, lineHeight:18,color:'black', marginVertical:10,textAlign:'justify'}}
                message={mensaje}
                
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                confirmButtonStyle={{paddingHorizontal:40, borderRadius:0, marginTop:10}}
                showConfirmButton={true}
                confirmButtonTextStyle={{fontSize:11,fontWeight:'bold'}}
                contentContainerStyle={{height:280, marginBottom:100}}
                confirmText="ACEPTAR"
                confirmButtonColor="#e93922"
                
                onConfirmPressed={() => {
                  this.hideAlert();
                  console.log('pressed')
                }}
        />
      </Container>
    );
  }
}

