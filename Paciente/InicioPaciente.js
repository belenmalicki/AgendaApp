import React, { Component, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image, Alert, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Footer, FooterTab, Container } from 'native-base'
import CardTurno from './CardsTurno'
import AwesomeAlert from 'react-native-awesome-alerts';
import ApiController from '../controller/ApiController';
import AsyncStorage from '@react-native-community/async-storage'
//import DateTimePicker from '@react-native-community/datetimepicker';


const { width } = Dimensions.get('window');



export default class InicioPaciente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      es_deudor: false,
      cargado: false,
      turnos: [],
      dias:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
      meses:["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    };
  };

  componentDidMount() {
    const usuario = this.props.navigation.getParam('usuario', {})

    const data = {
      paciente_id: usuario.paciente.id
    }

    ApiController.getTurnosPaciente(data, this.handleTurnos.bind(this))
  }

  handleTurnos(response) {
    response.json().then((turnos) => {
      console.log(turnos)
      this.setState({ turnos: turnos, cargado: true });
    })

  }

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

  solTurno() {
    if (this.state.es_deudor === false) {
      return (
        <TouchableOpacity onPress={() => { this.props.navigation.navigate('SolicitarTurno')}}
          style={{ width: 230, alignSelf: 'center', backgroundColor: '#e93922' }}>
          <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>SOLICITAR TURNO</Text>
        </TouchableOpacity>)

    }
    else {
      return (
        <TouchableOpacity onPress={() => this.showAlert()}
          style={{ width: 230, alignSelf: 'center', backgroundColor: '#e93922' }}>
          <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>SOLICITAR TURNO</Text>
        </TouchableOpacity>)
    }
  }

  showTurnos() {
    if (this.state.cargado) {
      if (this.state.turnos.length > 0) {
        console.log(this.state.turnos)
        return this.state.turnos.map((turno, i) => {
          let nom = turno.medico.datos.nombre.toUpperCase();
          let gen = turno.medico.datos.genero;
          let id = turno.id;
          let med = gen === 'femenino' ? `DRA. ${nom}` : `DR. ${nom}`
          let esp = turno.especialidad.titulo;
          let hora = new Date(turno.fecha_inicio).getHours()+'.'+new Date(turno.fecha_inicio).getMinutes(); 
          let fecha = turno.fecha_inicio;
          let dia = new Date(turno.fecha_inicio).getDate();
          let dianombre = this.state.dias[new Date(turno.fecha_inicio).getDay()];
          let mes = this.state.meses[new Date(turno.fecha_inicio).getMonth()];
          
          return <CardTurno id={id} dia={dia} mes={mes} dianombre={dianombre} key={i} med={med} esp={esp} hora={hora} fecha={fecha} />//todavia no se pasa la fecha y hora correcta
        })
      } else {
        return <Text>No tiene ningún turno solicitado.</Text> //embellecer en otra oportunidad (tal vez poner una imagen tipo las de flaticon)
      }
    } else {
      return (<View style={{ marginTop: '2%' }}>
        <ActivityIndicator size="large" color={'#e93922'}></ActivityIndicator>
      </View>)
    }
  }

  storeUsuario = async(usuario) =>{
    try {
      await AsyncStorage.setItem('usuario', JSON.stringify(usuario))
    }catch (e){
      console.log(e)
    }
  }

  render() {
    const { navigation } = this.props;
    const usuario = navigation.getParam('usuario', {})
    if (usuario.paciente.es_deudor) {
      this.showAlert()
    }console.log(usuario)

    const { showAlert } = this.state;

    this.storeUsuario(usuario);

    let genero = usuario.genero === 'femenino' ? 'A' : 'O'
    let nombre = usuario.nombre.toUpperCase()
    let bienvenida = `¡BIENVENID${genero}, ${nombre}!`

    const mensaje = " Le notificamos que mantiene una deuda pendiente con el establecimiento al día de la fecha y por lo tanto, no podrá solicitar un nuevo turno hasta que la regularice." + "\n" + "\n" + " Contactese al 4778-9809 para informarse sobre los métodos de pago."
    return (
      <Container>
        <ScrollView >
          <Text style={{ fontSize: 17, textAlign: 'center', marginVertical: 20 }}>{bienvenida}</Text>
          <Text style={{ fontSize: 14, marginLeft: '4%', color: '#e93922', marginBottom: 15 }}> <Ionicons name='md-calendar' size={16} color='#e93922'></Ionicons> PRÓXIMOS TURNOS</Text>
          {this.showTurnos()}
        </ScrollView>
        <Footer style={{ backgroundColor: 'white' }}>
          {this.solTurno()}
        </Footer>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="REGISTRA DEUDA"
          titleStyle={{ fontSize: 18, color: 'black' }}
          messageStyle={{ fontSize: 14, lineHeight: 18, color: 'black', marginVertical: 10, textAlign: 'justify' }}
          message={mensaje}

          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          confirmButtonStyle={{ paddingHorizontal: 40, borderRadius: 0, marginTop: 10 }}
          showConfirmButton={true}
          confirmButtonTextStyle={{ fontSize: 11, fontWeight: 'bold' }}
          contentContainerStyle={{ height: 280, marginBottom: 100 }}
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

