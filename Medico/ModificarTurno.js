import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity, ScrollView  } from 'react-native';
import {Footer, FooterTab, Container,Card, CardItem, Col, Accordion,Content } from 'native-base'
import { Divider,CheckBox, Overlay  } from 'react-native-elements';
import Check from './Check'

const { width } = Dimensions.get('window');
export default class ModificarTurno extends Component {
    constructor(props){
        super(props)
        this.state={
            showAlert: false,
            showAlert2: false,
            showAlert3: false,
        }
      }
      showAlert = () => {
        this.setState({
          showAlert: true
        });
      };
      showAlert2 = () => {
        this.setState({
          showAlert2: true
        }); 
      };
      showAlert3 = () => {
        this.setState({
          showAlert3: true
        }); 
      };
      hideAlert = () => {
        this.setState({
          showAlert: false
        });
      };
      hideAlert2 = () => {
        this.setState({
          showAlert2: false
        });
      };
      llevarIn= () => {
        this.setState({
          showAlert3: false
        });
        this.props.navigation.navigate('InicioMedico')
      };

    render() {
        const elim= ' Para seleccionar un turno, presione sobre el casillero.'+'\n'+
        ' Los turnos que hayan sido solicitados por un paciente no podrán ser eliminados y por lo tanto no aparecerán en las opciones.'+'\n'+
        ' Solo podrá eliminar todos los turnos de un día cuando ningún paciente haya solicitado turnos en ese día.'
        const agre= ' Para seleccionar un turno, presione sobre el casillero. Puede agregar tantos tunos como desee.'
        const {showAlert,showAlert2,showAlert3} = this.state;
        return (
            <Container>
                <ScrollView >
                    <Text style={{fontSize:18, textAlign:'center',marginVertical:20}}>MODIFICAR TURNO </Text>
                    <Text style={{fontSize:14, marginLeft:'4%',color:'#e93922', marginBottom:15}}> <Ionicons name='md-calendar' size={16} color='#e93922'></Ionicons> 9 Jueves<Text style={{fontSize:14,color:'black'}}> Abril</Text></Text>
                    <Text style={{fontSize:14,fontWeight:'bold' ,marginBottom:10, marginLeft:20}}>Agregar turnos</Text>
                    <View style={{flexDirection:"row" ,marginBottom:10, marginLeft:20}}>
                        <Text style={{fontSize:12 }}>Seleccione los turnos que desea agregar  </Text>
                        <TouchableOpacity onPress={()=>this.showAlert()}>
                            <Image style={{ height:16, width:16}} source={require('../assets/Images/information.png')} />
                        </TouchableOpacity>
                        <Overlay overlayStyle={{height:'25%'}} isVisible={showAlert}  onBackdropPress={()=>this.hideAlert()}>
                            <View>
                                <Text style={{textAlign:"center", marginTop:20}}>AGREGAR TURNO</Text>
                                <Text style={{textAlign:"justify", fontSize:12, marginTop:20, marginHorizontal:5}}>{agre}</Text>
                                <TouchableOpacity style={{backgroundColor:'#e93923', width:140, alignSelf:'center', marginTop:30}} onPress={()=>this.hideAlert()} >
                                    <Text style={{color:"white", fontWeight:"bold", fontSize:11, marginVertical:10, marginHorizontal:8, textAlign:'center' }}>ACEPTAR</Text>
                                </TouchableOpacity>
                            </View>
                        </Overlay>
                    </View>
                    <Check hora="10.00 Hs"/>

                    <Text style={{fontSize:14,fontWeight:'bold' ,marginBottom:10, marginLeft:20, marginTop:10}}>Eliminar turnos</Text>
                    <View style={{flexDirection:"row" ,marginBottom:10, marginLeft:20}}>
                        <Text style={{fontSize:12 }}>Seleccione los turnos que desea eliminar  </Text>
                        <TouchableOpacity onPress={()=>this.showAlert2()}>
                            <Image style={{ height:16, width:16}} source={require('../assets/Images/information.png')} />
                        </TouchableOpacity>
                        <Overlay overlayStyle={{height:'36%'}} isVisible={showAlert2}  onBackdropPress={()=>this.hideAlert2()}>
                            <View>
                                <Text style={{textAlign:"center", marginTop:20}}>ELIMINAR TURNO</Text>
                                <Text style={{textAlign:"justify", fontSize:12, marginTop:20, marginHorizontal:5}}>{elim}</Text>
                                <TouchableOpacity style={{backgroundColor:'#e93923', width:140, alignSelf:'center', marginTop:30}} onPress={()=>this.hideAlert2()} >
                                    <Text style={{color:"white", fontWeight:"bold", fontSize:11, marginVertical:10, marginHorizontal:8, textAlign:'center' }}>ACEPTAR</Text>
                                </TouchableOpacity>
                            </View>
                        </Overlay>
                    </View>
                    <Check hora="18.00 Hs"/>

                </ScrollView>
                <Footer style={{backgroundColor:'white'}} >
                <TouchableOpacity onPress={()=>this.showAlert3()}
                    style={{ width:180 ,alignSelf:'center', backgroundColor:'#e93922'}}>
                    <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>CONFIRMAR</Text>
                </TouchableOpacity> 
                <Overlay overlayStyle={{height:'17%'}} isVisible={showAlert3}>
                    <View>
                        <Text style={{textAlign:"center", marginTop:20}}>SE HA MODIFICADO SU AGENDA CON ÉXITO</Text>
                        <TouchableOpacity style={{backgroundColor:'#1F77A5', width:140, alignSelf:'center', marginTop:20}} onPress={()=>this.llevarIn()} >
                            <Text style={{color:"white", fontWeight:"bold", fontSize:11, marginVertical:10, marginHorizontal:8, textAlign:'center' }}>VOLVER AL INICIO</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>
                </Footer>
            </Container>
      );
    }
  }
  
