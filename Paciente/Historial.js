import React, { Component } from 'react';
import { Platform, ScrollView, Text, View, Image, TextInput, Dimensions, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { Card, CardItem } from 'native-base';
import CardHistorial from './CardHistorial'
import ApiController from '../controller/ApiController'
import AsyncStorage from '@react-native-community/async-storage'
const { width } = Dimensions.get('window');


export default class Historial extends Component {

  constructor(props) {
    super(props);
    this.state = {
      actual: 5,
      usuario: {},
      cargado: false,
      historial: [],
      meses: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      completado: false
    }
  }

  componentDidMount() {
    this.getUsuario()//al hdp no le gusta que ponga el apicontroller.gethistorialpaciente aca
  }

  obtenerHistorial() {
    let data = {
      paciente_id: this.state.usuario.paciente.id
    }
    ApiController.getHistorialPaciente(data, this.handleHistorial.bind(this))
  }

  handleHistorial(response) {
    response.json().then((historial) => {
      this.setState({ historial: historial, cargado: true });
      //console.log(this.state.historial)
    })
  }

  getUsuario = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('usuario')
      const usuario = jsonValue != null ? JSON.parse(jsonValue) : null;
      this.setState({ usuario: usuario });
      this.obtenerHistorial();
    } catch (e) {
      console.log(e)
    }
  }

  cargar() {
    if (this.state.historial.length > this.state.actual) {
      this.setState({ actual: this.state.actual + 5 })
    }
  }

  showButton() {
    if (this.state.historial.length > this.state.actual) {
      return (<View style={{ marginTop: 60 }}>
        <TouchableOpacity onPress={() => { this.cargar() }}
          style={{ width: 230, alignSelf: 'center', backgroundColor: '#e93923', margin: '2%' }}>
          <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>CARGAR MÁS</Text>
        </TouchableOpacity>
      </View>)
    } else {
      return null
    }
  }

  renderTurnos() {
    if (!this.state.cargado) {
      return (<View style={{ marginTop: '2%' }}>
        <ActivityIndicator size="large" color={'#e93923'}></ActivityIndicator>
      </View>)
    } else if (this.state.historial.length === 0) {
      return (<View style={{alignItems: 'center'}}>
      <Card>
        <CardItem style={{flexDirection:'column', marginVertical:'3%'}}>
          <View style={{backgroundColor:'#e1e6e9', padding:15, borderRadius:80}}>
              <Image style={{alignSelf:"center", height:80, width:80 }} source={require('../assets/Images/calendarhistorial3.png')}></Image>
          </View>
        <Text style={{textAlign: 'center', marginTop: '3%', fontSize: 14, marginVertical:10}}>Todavía no concurriste a ninguna consulta en nuestro Centro Médico.</Text>
        </CardItem>
      </Card>
      </View>)
    } else {
      const array = this.state.historial.slice(0, this.state.actual)
      return (<View>
        {array.map((item, i) => <CardHistorial key={i} dia={new Date(item.fecha_inicio).getDate()} mes={this.state.meses[new Date(item.fecha_inicio).getMonth()]} med={item.medico.datos.nombre.toUpperCase()} esp={item.especialidad.titulo} fecha={item.fecha_inicio} />)}
        {this.showButton()}
      </View>
      );
    }
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ fontSize: 16,textAlign: 'center', marginTop: 20, marginBottom: 10 }}>Historial de turnos </Text>
        {/*todavia no se como pasar este formato de fecha a un numero normal*/}

        {this.renderTurnos()}


      </ScrollView>
    )
  }
}
