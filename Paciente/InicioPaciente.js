import React, { Component, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View, Image, Alert, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Footer, FooterTab, Container,Card, CardItem } from 'native-base'
import CardTurno from './CardsTurno'
import AwesomeAlert from 'react-native-awesome-alerts';
import ApiController from '../controller/ApiController';
import AsyncStorage from '@react-native-community/async-storage'
import CalendarioTurnos from '../Paciente/CalendarioTurno'
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
      dias:['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      meses:["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    };
    this.update=this.update.bind(this)
  };

  componentDidMount() {
    this.update()
  }

  handleTurnos(response) {
    response.json().then((turnos) => {
      //console.log(turnos)
      this.setState({ turnos: turnos, cargado: true });
    })
  }

  update(){
    const usuario = this.props.navigation.getParam('usuario', {})
    const data = {
      paciente_id: usuario.paciente.id,
    }
    this.setState({es_deudor:usuario.paciente.es_deudor})
    //console.log('usuario.paciente.es_deudor', usuario.paciente.es_deudor)
    ApiController.getTurnosPaciente(data, this.handleTurnos.bind(this))
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
        <TouchableOpacity onPress={() => { this.props.navigation.navigate('SolicitarTurno',{turnosPaciente:this.state.turnos})}}
          style={{ width: 230, alignSelf: 'center', backgroundColor: '#e93922' }}>
          <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>SOLICITAR TURNO</Text>
        </TouchableOpacity>)
    }
    else {
      return (
        <TouchableOpacity onPress={() => this.showAlert()}
          style={{ width: 230, alignSelf: 'center', backgroundColor: '#e93923' }}>
          <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>SOLICITAR TURNO</Text>
        </TouchableOpacity>)
    }
  }

  showTurnos() {
    if (this.state.cargado) {
      if (this.state.turnos.length > 0) {
        //console.log(this.state.turnos)
        return this.state.turnos.map((turno, i) => {
        /*  let nom = turno.medico.datos.nombre.toUpperCase();
          let gen = turno.medico.datos.genero;
          let id = turno.id;
          let med = gen === 'femenino' ? `DRA. ${turno.medico.datos.nombre.toUpperCase()}` : `DR. ${turno.medico.datos.nombre.toUpperCase()}`
          let esp = turno.especialidad.titulo;
          let hora = new Date(turno.fecha_inicio).getHours()+'.'+new Date(turno.fecha_inicio).getMinutes(); 
          let fecha = turno.fecha_inicio;
          let dia = new Date(turno.fecha_inicio).getDate();
          let dianombre = this.state.dias[new Date(turno.fecha_inicio).getDay()];
          let mes = this.state.meses[new Date(turno.fecha_inicio).getMonth()];*/
          return <CardTurno forzar={this.update} turno={turno} key={i}  />//todavia no se pasa la fecha y hora correcta
        })
      } else {
        return <View style={{alignItems: 'center'}}>
        <Card>
          <CardItem style={{flexDirection:'column', marginTop:'2%'}}>
            <View style={{backgroundColor:'#e1e6e9', padding:15, borderRadius:80}}>
                <Image style={{alignSelf:"center", height:80, width:80 }} source={require('../assets/Images/calendarhistorial3.png')}></Image>
            </View>
          <Text style={{textAlign: 'center', marginTop: '4%', fontSize: 14, marginVertical:10}}>No tenés ningún turno solicitado.</Text>
          </CardItem>
        </Card>
        </View> //embellecer en otra oportunidad (tal vez poner una imagen tipo las de flaticon)
      }
    } else {
      return (<View style={{ marginTop: '2%' }}>
        <ActivityIndicator size="large" color={'#e93923'}></ActivityIndicator>
      </View>)
    }
  }

  render() {
    const { navigation } = this.props;
    const usuario = navigation.getParam('usuario', {})
    if (usuario.paciente.es_deudor) {
      this.showAlert()
    }
    const { showAlert } = this.state;
    let genero = usuario.genero === 'femenino' ? 'A' : 'O'
    let nombre = usuario.nombre.toUpperCase()
    let apellido = usuario.apellido.toUpperCase()
    let bienvenida = `¡BIENVENID${genero}, ${nombre} ${apellido}!`
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
          }}
        />
      </Container>
    );
  }
}

