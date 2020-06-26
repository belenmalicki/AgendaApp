import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Footer, FooterTab, Container, Col, Row } from 'native-base'
import { Divider } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'

const { width } = Dimensions.get('window');


export default class PerfilPaciente extends Component {
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
      console.log(usuario)
    } catch (e) {
      console.log(e)
    }
  }

  render() {

    if (!this.state.cargado) {
      return null
      //mostrar que está cargando, con un activity indicator
    } else {
      return (
        <ScrollView style={{ flex: 1 }}>

          <Text style={{ fontSize: 16, textAlign: 'center', marginTop: '5%' }}>Mi Perfil </Text>

          {/*}  <View style={{backgroundColor:'pink', width:300, alignSelf: "center", height:195, marginTop:20, borderRadius:20}}>
            <Row size={40} style={{alignSelf:'flex-end'}}>
                <Text  style={{textAlign:'right',marginTop:30, marginRight:30, fontSize:20 }}><Ionicons  name="ios-globe" size={24} color={'black'} /> OSDE </Text>
            </Row>
            <Text  style={{ marginLeft:30, fontSize:18, marginTop:10, fontWeight:'bold' }}> 61  759666  1  02  </Text>
            <Text  style={{ marginLeft:30, fontSize:11, marginTop:10, fontWeight:'bold' }}> PANZA MATIAS EZEQUIEL  </Text>
            <View style={{ flexDirection:'row', marginBottom:10}}>
                <Text  style={{ marginLeft:25, fontSize:9, marginTop:12 }}>plan </Text>
                <Text  style={{ marginLeft:2, fontSize:11, marginTop:10, fontWeight:'bold' }}> 2  310  </Text>
                <Text  style={{ marginLeft:15, fontSize:9, marginTop:12 }}>vto  </Text>
                <Text  style={{ marginLeft:2, fontSize:11, marginTop:10, fontWeight:'bold' }}> 31/10/2020 </Text>
            </View>
      </View>*/}
          <ImageBackground style={{ height: 195, width: 300, marginTop: 20, alignSelf: "center" }} source={require('../assets/Images/credencialesPaciente/Credencial_9.png')} >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 18, marginTop: 10, fontWeight: 'bold', marginTop: 120, letterSpacing: 3 }}> 61  759666  1  02  </Text>
              <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', letterSpacing: 3 }}> {this.state.usuario.nombre}  </Text>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ fontSize: 9, marginTop: 12 }}>dni </Text>
                <Text style={{ marginLeft: 2, fontSize: 11, marginTop: 10, fontWeight: 'bold' }}> {this.state.usuario.dni} </Text>
                <Text style={{ marginLeft: 30, fontSize: 9, marginTop: 12 }}>vto  </Text>
                <Text style={{ marginLeft: 2, fontSize: 11, marginTop: 10, fontWeight: 'bold' }}> 10/2023 </Text>
              </View>
            </View>
          </ImageBackground>


          <Text style={{ marginTop: '7%', textAlign: 'justify', fontSize: 14, marginBottom: 15, lineHeight: 16, marginHorizontal: '5%' }}>
            NOMBRE Y APELLIDO
      </Text>
          <Text style={{ fontSize: 13, lineHeight: 16, marginHorizontal: '6%', color: 'grey' }}>
            {this.state.usuario.nombre}
      </Text>
          <Divider style={{ backgroundColor: 'black', marginHorizontal: '5%' }} />

          <Text style={{ marginTop: '5%', textAlign: 'justify', fontSize: 14, marginBottom: 15, lineHeight: 16, marginHorizontal: '5%' }}>
            DIRECCION
      </Text>
          <Text style={{ fontSize: 13, lineHeight: 16, marginHorizontal: '6%', color: 'grey' }}>
            {this.state.usuario.direccion}
      </Text>
          <Divider style={{ backgroundColor: 'black', marginHorizontal: '5%' }} />
          <Text style={{ marginTop: '5%', textAlign: 'justify', fontSize: 14, marginBottom: 15, lineHeight: 16, marginHorizontal: '5%' }}>
            TELÉFONO
      </Text>
          <Text style={{ fontSize: 13, lineHeight: 16, marginHorizontal: '6%', color: 'grey' }}>
            {this.state.usuario.telefono}
      </Text>
          <Divider style={{ backgroundColor: 'black', marginHorizontal: '5%' }} />

          <View style={{ marginTop: 60 }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('InicioMedico') }}
              style={{ width: 230, alignSelf: 'center', backgroundColor: '#e93922' }}>
              <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>VER AGENDA MÉDICO</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
  }
}
