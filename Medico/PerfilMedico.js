import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import {Footer, FooterTab, Container, Col, Row} from 'native-base'
import { Divider } from 'react-native-elements' 
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'
const { width } = Dimensions.get('window');


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
      //console.log(usuario)
    } catch (e) {
      console.log(e)
    }
  }

  mostrarBoton() {
    if (this.state.usuario.paciente != null) {
      <View style={{ marginTop: 60 }}>
        <TouchableOpacity onPress={() => { this.props.navigation.navigate('InicioPaciente', { usuario: usuario }) }}
          style={{ width: 230, alignSelf: 'center', backgroundColor: '#e93922' }}>
          <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>IR A CUENTA PACIENTE</Text>
        </TouchableOpacity>
      </View>
    }


  }
  render() {
    if (!this.state.cargado) {
      return null
    } else {
      const {usuario} = this.state;
      const dr = usuario.genero === 'femenino' ? 'DRA.' : 'DR.';
      console.log(usuario)
      return (
        <ScrollView style={{ flex: 1 }}>

          <Text style={{ fontSize: 18, textAlign: 'center', marginTop: '5%' }}>Mi Perfil </Text>

          <ImageBackground style={{ height: 195, width: 300, marginTop: 20, alignSelf: "center" }} source={require('../assets/Images/credencialMedico/Credencial_Medico.png')} >
            <View >
              <Text style={{ marginLeft: 25, fontSize: 12, marginTop: 10, fontWeight: 'bold', marginTop: 100, letterSpacing: 3, textAlign: 'left' }}> {dr} </Text>
              <Text style={{ marginLeft: 25, fontSize: 14, marginTop: 10, fontWeight: 'bold', letterSpacing: 3 }}> {usuario.nombre.toUpperCase()} </Text>
              <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: "space-around", }}>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 12, marginTop: 12 }}>Nro. Socio/a</Text>
                  <Text style={{ fontSize: 12, marginTop: 5, fontWeight: 'bold' }}>{usuario.nro_socio}</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 12, marginTop: 12 }}>Matrícula</Text>
                  <Text style={{ fontSize: 12, marginTop: 5, fontWeight: 'bold' }}>{usuario.medico.nro_matricula}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
          <Text style={{ marginTop: '7%', textAlign: 'justify', fontSize: 14, marginBottom: 15, lineHeight: 16, marginHorizontal: '5%' }}>
            NOMBRE Y APELLIDO
      </Text>
          <Text style={{ fontSize: 13, lineHeight: 16, marginHorizontal: '6%', color: 'grey' }}>
            {usuario.nombre}
      </Text>
          <Divider style={{ backgroundColor: 'black', marginHorizontal: '5%' }} />
          <Text style={{ marginTop: '5%', textAlign: 'justify', fontSize: 14, marginBottom: 15, lineHeight: 16, marginHorizontal: '5%' }}>
            DNI
      </Text>
          <Text style={{ fontSize: 13, lineHeight: 16, marginHorizontal: '6%', color: 'grey' }}>
            {usuario.dni}
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
          <Divider style={{ backgroundColor: 'black', marginHorizontal: '5%' }} />

        {this.mostrarBoton()}
        </ScrollView>
      );
    }
  }
}
