import React, { Component } from 'react';
import { Platform, ScrollView, Text, View, Image,TextInput, Dimensions, TouchableOpacity  } from 'react-native';
import {createSwitchNavigator,createAppContainer } from 'react-navigation'
import CardHistorial from './CardHistorial'
import ApiController from '../controller/ApiController'
import AsyncStorage from '@react-native-community/async-storage'
const { width } = Dimensions.get('window');


export default class Historial extends Component {

  constructor(props) {
    super(props);
    this.state = { actual:1, usuario: {}, cargado: false, historial:[],meses:["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"] }
  }

  componentDidMount(){
    this.getUsuario()//al hdp no le gusta que ponga el apicontroller.gethistorialpaciente aca
  }

  obtenerHistorial(){
    let data={
      paciente_id:this.state.usuario.paciente.id
    }
    ApiController.getHistorialPaciente(data,this.handleHistorial.bind(this))
  }

  handleHistorial(response) {
    response.json().then((historial) => {
      this.setState({ historial: historial, cargado: true });
      console.log(this.state.historial)
    })
  }

  getUsuario = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('usuario')
      const usuario = jsonValue != null ? JSON.parse(jsonValue) : null;
      this.setState({usuario:usuario,cargado:true});
      this.obtenerHistorial();
    } catch (e) {
      console.log(e)
    }
  }

  cargar(){
    if(this.state.historial.length>this.state.actual){
      this.setState({actual:this.state.actual+1})
    }else{
      alert("No se encuentran mas turnos anteriores")
    }
  }

  render() {
    if(!this.state.cargado){
      return null
    }else{
      return (
        <ScrollView style={{flex:1}}>
          <Text style={{fontSize:16, textAlign:'center',marginTop:20, marginBottom:10 }}>Historial de turnos </Text>
          {/*todavia no se como pasar este formato de fecha a un numero normal*/}
            {this.state.historial.slice(0,this.state.actual).map((item,i)=> <CardHistorial key={i} dia={new Date(item.fecha_inicio).getDate()} mes={this.state.meses[new Date(item.fecha_inicio).getMonth()]} med={item.medico.datos.nombre} esp={item.especialidad.titulo} fecha={item.fecha_inicio} />)}
            <View style={{ marginTop: 60 }}>
              <TouchableOpacity onPress={() => { this.cargar() }}
                 style={{ width: 230, alignSelf: 'center', backgroundColor: '#e93922' }}>
                <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>CARGAR MAS</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
      );
    }
  }
}
