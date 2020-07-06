import React, { Component} from 'react';
import { Ionicons } from '@expo/vector-icons';
import {Text, View, Image, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Footer, Container,Card, CardItem } from 'native-base'
import CardTurno from './CardsTurno'
import AwesomeAlert from 'react-native-awesome-alerts';
import ApiController from '../controller/ApiController';


export default class InicioPaciente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      es_deudor: false,
      cargado: false,
      usuario: {},
      turnos: []
    };
    this.update=this.update.bind(this)
  };

  componentDidMount() {
    this.update()
    const usuario = this.props.navigation.getParam('usuario', {})
    if(usuario.paciente.es_deudor){
      this.setState({showAlert: true})
    }
  }

  handleTurnos(response) {
    response.json().then((turnos) => {
      this.setState({ turnos: turnos, cargado: true });
    })
  }

  update(){
    const usuario = this.props.navigation.getParam('usuario', {})
    const data = {
      paciente_id: usuario.paciente.id,
    }
    this.setState({usuario: usuario, es_deudor:usuario.paciente.es_deudor})
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
      const usuario = this.props.navigation.getParam('usuario', {})
      return (
        <TouchableOpacity onPress={() => { this.props.navigation.navigate('SolicitarTurno',{turnosPaciente:this.state.turnos, usuario: usuario})}}
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
        return this.state.turnos.map((turno, i) => {
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
        </View> 
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

