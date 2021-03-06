import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements' 
import AsyncStorage from '@react-native-community/async-storage'
import utils from '../utils/utils';


export default class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = { usuario: {}, cargado: false }
  }

  componentDidMount() {
    this.getUsuario()
  }

  getUsuario = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('usuario')
      const usuario = jsonValue != null ? JSON.parse(jsonValue) : null;
      this.setState({ usuario: usuario, cargado: true })
    } catch (e) {
      console.log(e)
    }
  }

  mostrarBoton() {
    if (this.state.usuario.paciente != null) {
      return (<View style={{ marginTop: 20,marginBottom:20 }}>
      <Text style={{marginHorizontal:15, fontSize:13, marginBottom:10, textAlign:"justify" }}>Si desea ver sus turnos solicitados, diríjase a su cuenta de paciente</Text>
        <TouchableOpacity  onPress={() => { this.props.navigation.navigate('InicioPaciente', { usuario: this.state.usuario }) }}
          style={{ width: 230, alignSelf: 'center', backgroundColor: '#e93922' }}>
          <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>IR A CUENTA PACIENTE</Text>
        </TouchableOpacity>
      </View>)
    }


  }
  render() {
    if (!this.state.cargado) {
      return null
    } else {
      const {usuario} = this.state;
      const dr = usuario.genero === 'femenino' ? 'DRA.' : 'DR.';
      return (
        <ScrollView style={{ flex: 1 }}>

          <Text style={{ fontSize: 18, textAlign: 'center', marginTop: '5%' }}>Mi Perfil </Text>

          <ImageBackground style={{ height: 195, width: 300, marginTop: 20, alignSelf: "center" }} source={require('../assets/Images/credencialMedico/Credencial_Medico.png')} >
            <View >
              <Text style={{ marginLeft: 25, fontSize: 12, marginTop: 10, fontWeight: 'bold', marginTop: 100, letterSpacing: 3, textAlign: 'left' }}> {dr} </Text>
              <Text style={{ marginLeft: 25, fontSize: 14, marginTop: 10, fontWeight: 'bold', letterSpacing: 3 }}> {usuario.apellido.toUpperCase()} {usuario.nombre.toUpperCase()} </Text>
              <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: "space-around", }}>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 12, marginTop: 12 }}>Nro. Socio/a</Text>
                  <Text style={{ fontSize: 12, marginTop: 5, fontWeight: 'bold' }}>{utils.separarEnMiles(usuario.nro_socio)}</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 12, marginTop: 12 }}>Matrícula</Text>
                  <Text style={{ fontSize: 12, marginTop: 5, fontWeight: 'bold' }}>{utils.separarEnMiles(usuario.medico.nro_matricula)}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
          <Text style={{ marginTop: '7%', textAlign: 'justify', fontSize: 14, marginBottom: 15, lineHeight: 16, marginHorizontal: '5%' }}>
            NOMBRE Y APELLIDO
      </Text>
          <Text style={{ fontSize: 13, lineHeight: 16, marginHorizontal: '6%', color: 'grey' }}>
            {usuario.nombre} {usuario.apellido}
      </Text>
          <Divider style={{ backgroundColor: 'black', marginHorizontal: '5%' }} />
          <Text style={{ marginTop: '5%', textAlign: 'justify', fontSize: 14, marginBottom: 15, lineHeight: 16, marginHorizontal: '5%' }}>
            DNI
      </Text>
          <Text style={{ fontSize: 13, lineHeight: 16, marginHorizontal: '6%', color: 'grey' }}>
            {utils.separarEnMiles(usuario.dni)}
      </Text>
          <Divider style={{ backgroundColor: 'black', marginHorizontal: '5%' }} />
          <Text style={{ marginTop: '5%', textAlign: 'justify', fontSize: 14, marginBottom: 15, lineHeight: 16, marginHorizontal: '5%' }}>
            FECHA DE NACIMIENTO
      </Text>
          <Text style={{ fontSize: 13, lineHeight: 16, marginHorizontal: '6%', color: 'grey' }}>
          {new Date(usuario.fecha_nac).toLocaleDateString("es-AR")}
      </Text>
          <Divider style={{ backgroundColor: 'black', marginHorizontal: '5%' }} />
          <Text style={{ marginTop: '5%', textAlign: 'justify', fontSize: 14, marginBottom: 15, lineHeight: 16, marginHorizontal: '5%' }}>
            EMAIL
      </Text>
          <Text style={{ fontSize: 13, lineHeight: 16, marginHorizontal: '6%', color: 'grey' }}>
            {usuario.email}
      </Text>
          <Divider style={{ backgroundColor: 'black', marginHorizontal: '5%' }} />
          <Text style={{ marginTop: '5%', textAlign: 'justify', fontSize: 14, marginBottom: 15, lineHeight: 16, marginHorizontal: '5%' }}>
            DIRECCION
      </Text>
          <Text style={{ fontSize: 13, lineHeight: 16, marginHorizontal: '6%', color: 'grey' }}>
            {usuario.direccion}
      </Text>
          <Divider style={{ backgroundColor: 'black', marginHorizontal: '5%' }} />
          <Text style={{ marginTop: '5%', textAlign: 'justify', fontSize: 14, marginBottom: 15, lineHeight: 16, marginHorizontal: '5%' }}>
            TELÉFONO
      </Text>
          <Text style={{ fontSize: 13, lineHeight: 16, marginHorizontal: '6%', color: 'grey' }}>
            {usuario.telefono}
      </Text>
          <Divider style={{ backgroundColor: 'black', marginHorizontal: '5%', marginBottom:10 }} />

        {this.mostrarBoton()}
        </ScrollView>
      );
    }
  }
}
