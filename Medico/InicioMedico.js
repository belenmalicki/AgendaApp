import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image,TextInput, Dimensions, TouchableOpacity, ScrollView  } from 'react-native';
import {Footer, FooterTab, Container,Card, CardItem, Col} from 'native-base'

const { width } = Dimensions.get('window');


export default class InicioMedico extends Component {
    constructor(props){
        super(props)
        this.state={
            fecha: false,
        }    
    }
  render() {
    var date = new Date().getDate().toString(); //Current Date
    var monthFut = new Date().getMonth() + 3; //Current Month
    var year = new Date().getFullYear().toString(); //Current Year
    var today = new Date();
    if(date.length==1){
        var endDate= year +'-0'+monthFut.toString()+'-0'+date 
    }else{
        var endDate= year +'-0'+monthFut.toString()+'-'+date 
    }

    var item = {'2020-04-04':[{esp:'Oculista', time:'9.00  - 12.00'}],
                '2020-05-22': [{esp: 'Cardiologia', time:'9.00  - 12.00'}],
                '2020-05-23': [{esp: 'Ginecologia', time:'14.00 - 18.00'}],}
    function addDays(date, days) {
        const copy = new Date(Number(date))
        copy.setDate(date.getDate() + days)
        return copy
        } 
    const dateAdd = addDays(today, 7);
   
    return (
      <Container>
       
            <Text style={{fontSize:17, textAlign:'center', marginVertical:20}}>¡BIENVENIDO NOMBREMEDICO!</Text>
           
            <Card style={{width:width*0.95, alignSelf:"center", paddingVertical:10, paddingHorizontal:8, marginBottom:15}}>
                <Text style={{fontSize:14, margin:8, textAlign:"justify",lineHeight:18 }}><Ionicons name='md-information-circle' size={18} color='#e93922'></Ionicons> Estimado: Le recordamos que solo podrá modificar los turnos una semana pasada a la fecha actual y aquellos que no hayan sido solicitados por algún paciente. </Text>
                <Text style={{fontSize:14, margin:8, textAlign:"justify",lineHeight:18 }}> Solo podrá crear la agenda de los dos dos meses siguientes al corriente. </Text>
            </Card>
            
            <Text style={{fontSize:14, marginLeft:'4%',color:'#e93922', marginBottom:15}}> <Ionicons name='md-calendar' size={16} color='#e93922'></Ionicons> AGENDA DE TURNOS</Text>
            <Agenda
            items={item}
            //cant meses atras que puedo ver en el calendario
            pastScrollRange={1}
            //cant meses adelante que puedo ver en el calendario
            futureScrollRange={3}
            maxDate={endDate}
            onDayPress={(day) => { 
                var selec = new Date(day.year,(day.month -1),day.day,0,0,0,0);
                if(selec.getTime()<dateAdd.getTime()){
                     this.setState({fecha:false});}
                else{
                    this.setState({fecha:true}); 
                }     
                     }}
            renderEmptyData = {() => {return (
                        <Card style={{width:width*0.85, alignSelf:"center", marginTop:10}} >
                            <CardItem style={{alignSelf:"center", marginTop:10}}>
                                <Text style={{fontSize:14, textAlign:"center",}}>No hay turnos asginados.</Text>
                               
                            </CardItem>
                            <CardItem style={{alignSelf:"center", marginBottom:10}}>
                               
                                <TouchableOpacity><Text style={{fontSize:13, textAlign:"center", color:"#1f77a5", fontWeight:'bold'}}>AGREGAR TURNOS</Text></TouchableOpacity>
                            </CardItem>
                        </Card>        );}}
            renderItem={(item, firstItemInDay, day) => { 
                if(this.state.fecha==true){
                    return (
                    <View style={{marginTop:20, marginRight:5}}>
                        <Card>
                            <CardItem>
                                <Col size={2} style={{}}>
                                    <Text style={{fontSize:14, fontWeight:'bold'}} ><Ionicons name='md-calendar' size={16} color='#1f77a5'></Ionicons> {item.time}</Text>
                                    <Text style={{fontSize:14, marginTop:10, marginLeft:16}}>{item.esp}</Text>
                                </Col>
                                <Col>
                                <TouchableOpacity  style={{marginRight:10}}>
                                    <Text style={{color:"#1f77a5", fontWeight:"bold", fontSize:12 }}>MODIFICAR</Text>
                                </TouchableOpacity>
                                </Col>
                            </CardItem>
                        </Card>        
                    </View>)}
                else{
                    return (
                    <View style={{marginTop:20, marginRight:5}}>
                        <Card>
                            <CardItem>
                                <Col size={2}>
                                    <Text style={{fontSize:14, fontWeight:'bold'}} ><Ionicons name='md-calendar' size={16} color='#1f77a5'></Ionicons> {item.time}</Text>
                                    <Text style={{fontSize:14, marginTop:10, marginLeft:16}}>{item.esp}</Text>
                                </Col>
                            </CardItem>
                        </Card>
                        
                    </View>)
                }
                } }
            


            theme={{
                agendaDayTextColor: '#1f77a5',
                agendaDayNumColor: '#1f77a5',
                todayTextColor: '#e93922',
                agendaKnobColor: 'grey',
                dotColor: '#1f77a5',
             
                selectedDayBackgroundColor: '#1f77a5',
            }}
             style={{height:width* 0.5}}/>


      </Container>
    );
  }
}

