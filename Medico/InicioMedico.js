import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Footer, FooterTab, Container, Card, CardItem, Col, Accordion, Content } from 'native-base';
import { Overlay } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import ApiController from '../controller/ApiController';

const { width } = Dimensions.get('window');

export default class InicioMedico extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fecha: false,
            showAlert: false,
            usuario: {},
            jornadas: [],
            cargado: false,
            date: undefined
        }
    }


    componentDidMount(){
        const usuario = this.props.navigation.getParam('usuario', {});

        let data = {
            medico_id: usuario.medico.id
        };

        ApiController.getJornadasMedico(data, this.handleData.bind(this));
    }

    handleData(response){
        if(response.status == 404){
            alert('ha ocurrido un error') //arreglar
        }else{
            response.json().then(jornadas => {
                this.setState({jornadas: jornadas, cargado: true})
            })
        }
    }


    abrirPop = () => {
        this.setState({ showAlert: true });

    }

    cerrarPop = () => {
        this.setState({ showAlert: false });

    }


    storeUsuario = async (usuario) => {
        try {
            await AsyncStorage.setItem('usuario', JSON.stringify(usuario))
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        if(!this.state.cargado){
            return (<View style={{ marginTop: '8%' }}>
            <ActivityIndicator size="large" color={'#e93923'}></ActivityIndicator>
          </View>)
        }else{
        var date = new Date().getDate().toString(); //Current Date
        var monthFut = new Date().getMonth() + 3; //Current Month
        var year = new Date().getFullYear().toString(); //Current Year
        var today = new Date();

        if (date.length == 1) {
            var endDate = year + '-0' + monthFut.toString() + '-0' + date
        } else {
            var endDate = year + '-0' + monthFut.toString() + '-' + date
        }

        const { jornadas } = this.state;

        var item = Object.assign({}, ...jornadas.map(j => {
            let fechastring = j.fecha_inicio.slice(0, 10);
            let fechaIni = new Date(j.fecha_inicio);
            let fechaFin = new Date(j.fecha_fin);
            let hora = fechaIni.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' - ' + fechaFin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

            return ({ [fechastring]: [{ esp: j.especialidad.titulo, time: hora, turnos: j.turnos }] })
        }
        ))

        function addDays(date, days) {
            const copy = new Date(Number(date))
            copy.setDate(date.getDate() + days)
            return copy
        }
        const dateAdd = addDays(today, 7);

        const usuario = this.props.navigation.getParam('usuario', {});
        this.storeUsuario(usuario);
        let genero = usuario.genero === 'femenino' ? 'A' : 'O';
        let dr = usuario.genero === 'femenino' ? 'DRA.' : 'DR.';
        let apellido = usuario.apellido.toUpperCase();
        let bienvenida = `¡BIENVENID${genero} ${dr} ${apellido}!`
        return (
            <Container>

                <Text style={{ fontSize: 17, textAlign: 'center', marginVertical: 20 }}>{bienvenida}</Text>
                {/* 
            <Card style={{width:width*0.95, alignSelf:"center", paddingVertical:10, paddingHorizontal:8, marginBottom:15}}>
                <Text style={{fontSize:14, margin:8, textAlign:"justify",lineHeight:18 }}><Ionicons name='md-information-circle' size={18} color='#e93922'></Ionicons> Estimado: Le recordamos que solo podrá modificar los turnos una semana pasada a la fecha actual y aquellos que no hayan sido solicitados por algún paciente. </Text>
                <Text style={{fontSize:14, margin:8, textAlign:"justify",lineHeight:18 }}> Solo podrá crear la agenda de los dos dos meses siguientes al corriente. </Text>
            </Card>
           */ }
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 14, marginLeft: '4%', color: '#e93922', marginBottom: 15 }}> <Ionicons name='md-calendar' size={16} color='#e93922'></Ionicons> AGENDA DE TURNOS</Text>
                    <TouchableOpacity onPress={() => this.abrirPop()} style={{ marginLeft: 5 }}><Image source={require('../assets/Images/question.png')} style={{ height: 18, width: 18 }} /></TouchableOpacity>
                    <Overlay overlayStyle={{ height: 160 }} isVisible={this.state.showAlert} onBackdropPress={() => this.cerrarPop()}>
                        <View>

                            <Text style={{ textAlign: "justify", marginTop: 10, fontSize: 13 }}> Solo podrá crear la agenda de los próximos dos meses siguientes al corriente.</Text>
                            <Text style={{ textAlign: "justify", marginTop: 5, fontSize: 13 }}> Solo podrá modificar turnos de la semana siguiente a la actual.</Text>
                            <TouchableOpacity style={{ backgroundColor: '#E93923', width: 140, alignSelf: 'center', marginTop: 20, }} onPress={() => this.cerrarPop()}>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 11, marginVertical: 10, marginHorizontal: 8, textAlign: 'center' }}>ACEPTAR</Text>
                            </TouchableOpacity>
                        </View>
                    </Overlay>
                </View>
                <Agenda
                    items={item}
                    //cant meses atras que puedo ver en el calendario
                    pastScrollRange={1}
                    //cant meses adelante que puedo ver en el calendario
                    futureScrollRange={3}
                    maxDate={endDate}
                    onDayPress={(day) => {
                        var selec = new Date(day.year, (day.month - 1), day.day, 0, 0, 0, 0);
                        if (selec.getTime() < dateAdd.getTime()) {
                            this.setState({ fecha: false, date: selec });
                        }
                        else {
                            this.setState({ fecha: true, date: selec });
                        }
                    }}
                    renderEmptyData={() => {
                        return (
                            <Card style={{ width: width * 0.85, alignSelf: "center", marginTop: 10 }} >
                                <CardItem style={{ marginTop: 10, alignSelf: "center", flexDirection: "column" }}>
                                    <Image style={{ alignSelf: "center", height: 60, width: 60, marginBottom: 5 }} source={require('../assets/Images/calendar2.png')} />
                                    <Text style={{ fontSize: 14, textAlign: "center", }}>No hay turnos asginados.</Text>
                                </CardItem>
                                <CardItem style={{ alignSelf: "center", marginBottom: 10 }}>
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('AgregarTurno', { fecha: this.state.date }) }}><Text style={{ fontSize: 13, textAlign: "center", color: "#1f77a5", fontWeight: 'bold' }}>AGREGAR TURNOS</Text></TouchableOpacity>
                                </CardItem>
                            </Card>);
                    }}
                    renderItem={(item, firstItemInDay, day) => {
                        if (this.state.fecha == true) {
                            return (
                                <View style={{ marginTop: 20, marginRight: 5 }}>
                                    <Card>
                                        <CardItem>
                                            <Col size={2} style={{}}>
                                                <Text style={{ fontSize: 14, fontWeight: 'bold' }} ><Ionicons name='md-calendar' size={18} color='#1f77a5'></Ionicons> {item.time}</Text>
                                                <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 16 }}>{item.esp}</Text>
                                            </Col>
                                            <Col>
                                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('ModificarTurno', {turnos: item.turnos}) }} style={{ marginRight: 10 }}>
                                                    <Text style={{ color: "#1f77a5", fontWeight: "bold", fontSize: 12 }}>MODIFICAR</Text>
                                                </TouchableOpacity>
                                            </Col>
                                        </CardItem>
                                    </Card>
                                </View>)
                        }
                        else {
                            return (
                                <View style={{ marginTop: 20, marginRight: 5 }}>
                                    <Card>
                                        <CardItem>
                                            <Col size={2}>
                                                <Text style={{ fontSize: 14, fontWeight: 'bold' }} ><Ionicons name='md-calendar' size={18} color='#1f77a5'></Ionicons> {item.time}</Text>
                                                <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 16 }}>{item.esp}</Text>
                                            </Col>
                                        </CardItem>
                                    </Card>

                                </View>)
                        }
                    }}



                    theme={{
                        agendaDayTextColor: '#1f77a5',
                        agendaDayNumColor: '#1f77a5',
                        todayTextColor: '#e93922',
                        agendaKnobColor: 'grey',
                        dotColor: '#1f77a5',

                        selectedDayBackgroundColor: '#1f77a5',
                    }}
                    style={{ height: width * 0.5 }} />


            </Container>
        );
    }
}
}

