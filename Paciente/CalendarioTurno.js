import { Calendar, CalendarList, Agenda,LocaleConfig } from 'react-native-calendars';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Footer, FooterTab, Container, Card, CardItem, Col, Accordion, Content } from 'native-base';
import { Overlay } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import ApiController from '../controller/ApiController';

const { width } = Dimensions.get('window');

/*LocaleConfig.locales['es'] = {
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene.','Feb.','Mar.','Abr.','May..','Jun','Jul.','Ago.','Sep.','Oct.','Nov.','Dic.'],
    dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
    dayNamesShort: ['Dom.','Lun.','Mar.','Mie.','Jue.','Vie.','Sabb.'],
    today: 'Hoy'
  };
  LocaleConfig.defaultLocale = 'es';*/
  let turnos=[{
    "id": 1,
    "fecha_inicio": "2020-07-02T13:00:00.000Z",
    "fecha_fin": "2020-07-02T13:30:00.000Z",
    "sede": "Belgrano",
    "estado": "disponible",
    "createdAt": "2020-07-01T03:44:26.442Z",
    "updatedAt": "2020-07-01T03:44:26.442Z",
    "especialidad_id": 1,
    "jornada_id": 1,
    "medico_id": 1,
    "paciente_id": null,
    "medico": {
        "id": 1,
        "nro_matricula": "621248963",
        "foto_carnet": "https://i.imgur.com/rOeqi15.jpg",
        "createdAt": "2020-07-01T03:31:04.065Z",
        "updatedAt": "2020-07-01T03:31:04.065Z",
        "usuario_id": 2,
        "datos": {
            "id": 2,
            "apellido": "Rodríguez",
            "nombre": "Carla",
            "genero": "femenino"
        }
    },
    "especialidad": {
        "titulo": "Cardiología"
    }
},
{
    "id": 2,
    "fecha_inicio": "2020-07-02T13:30:00.000Z",
    "fecha_fin": "2020-07-02T14:00:00.000Z",
    "sede": "Belgrano",
    "estado": "disponible",
    "createdAt": "2020-07-01T03:44:26.442Z",
    "updatedAt": "2020-07-01T03:44:26.442Z",
    "especialidad_id": 1,
    "jornada_id": 1,
    "medico_id": 1,
    "paciente_id": null,
    "medico": {
        "id": 1,
        "nro_matricula": "621248963",
        "foto_carnet": "https://i.imgur.com/rOeqi15.jpg",
        "createdAt": "2020-07-01T03:31:04.065Z",
        "updatedAt": "2020-07-01T03:31:04.065Z",
        "usuario_id": 2,
        "datos": {
            "id": 2,
            "apellido": "Rodríguez",
            "nombre": "Carla",
            "genero": "femenino"
        }
    },
    "especialidad": {
        "titulo": "Cardiología"
    }
}
]

  export default class CalendarioTurnos extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pintar:false,
        dia:null
    }
  };
    render() {
        var item = Object.assign({}, ...turnos.map(j => {
            let fechastring = j.fecha_inicio.slice(0, 10);
            return ({ [fechastring]: { marked:true } })
        }
        ))
        if(this.state.dia!=null){
            item[this.state.dia].selected=truel
                }

      return (
            <View>
                <Calendar
                    current={new Date()}
                    minDate={new Date()}
                    maxDate={'2020-08-30'}
                    onDayPress={(day) => {this.setState({dia:day.dateString}),console.log('selected day', day.dateString)}}
                    onDayLongPress={(day) => {console.log('selected long day', day)}}
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    hideExtraDays={true}
                    disableMonthChange={true}
                    showWeekNumbers={true}
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    disableAllTouchEventsForDisabledDays={true}
                    renderHeader={(date) => {/*Return JSX*/}}
                    style={{height:0.8*width}}
                    markedDates={item}
                    theme={{agendaDayTextColor: '#1f77a5',
                            agendaDayNumColor: '#1f77a5',
                            todayTextColor: '#e93923',
                            dotColor: '#1f77a5',
                            arrowColor: '#e93923',
                            selectedDayBackgroundColor: '#1f77a5',}}
                    />
            </View>     
      );
    }
  }
