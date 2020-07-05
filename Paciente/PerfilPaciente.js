import React, { Component } from 'react';
import { Text, View, Image, ActivityIndicator, Dimensions, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Divider } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import utils from '../utils/utils';

export default class PerfilPaciente extends Component {
  constructor(props) {
    super(props);
    this.state = { usuario: {}, cargado: false, }
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

  mostrarBoton(){
    if(this.state.usuario.medico!=null){
      return (<View style={{ marginTop: 10,marginBottom:20 }}>
      <Text style={{marginHorizontal:15, fontSize:13, marginBottom:10, textAlign:"justify" }}>Si desea volver a su agénda con los turnos programados diríjase a su cuenta de médico</Text>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('InicioMedico',{usuario: this.state.usuario}) }}
              style={{ width: 230, alignSelf: 'center', backgroundColor: '#e93922' }}>
              <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>VER AGENDA MÉDICO</Text>
            </TouchableOpacity>
          </View>)
    }

  }


  render() {

    if (!this.state.cargado) {
      return <View >
                  <Text style={{ fontSize: 16, textAlign: 'center', marginTop: '5%' }}>Mi Perfil </Text>
                  <ActivityIndicator style={{ marginTop: '2%'}} size="large" color={'#e93923'}></ActivityIndicator>
              </View>
    } else {

      if(this.state.usuario.paciente.obra_social=='medicare'){
        if(this.state.usuario.paciente.plan=='premium'){
          var img=require('../assets/Images/credencialesPaciente/Credencial_9.png')
        }
        if(this.state.usuario.paciente.plan=='plus'){
          var img=require('../assets/Images/credencialesPaciente/Credencial_8.png')
        }
        if(this.state.usuario.paciente.plan=='essential'){
          var img=require('../assets/Images/credencialesPaciente/Credencial_7.png')
        }
  
      }
      if(this.state.usuario.paciente.obra_social=='osima'){
        if(this.state.usuario.paciente.plan=='gold'){
          var img=require('../assets/Images/credencialesPaciente/Credencial_1.png')
        }
        if(this.state.usuario.paciente.plan=='silver'){
          var img=require('../assets/Images/credencialesPaciente/Credencial_2.png')
        }
        if(this.state.usuario.paciente.plan=='blue'){
          var img=require('../assets/Images/credencialesPaciente/Credencial_3.png')
        }
      } 
      if(this.state.usuario.paciente.obra_social=='arsalud'){
        if(this.state.usuario.paciente.plan=='250'){
          var img=require('../assets/Images/credencialesPaciente/Credencial_6.png')
        }
        if(this.state.usuario.paciente.plan=='240'){
          var img=require('../assets/Images/credencialesPaciente/Credencial_5.png')
        }
        if(this.state.usuario.paciente.plan=='230'){
          var img=require('../assets/Images/credencialesPaciente/Credencial_6.png')
        }
      }
     
      return (
        <ScrollView style={{ flex: 1 }}>

          <Text style={{ fontSize: 16, textAlign: 'center', marginTop: '5%' }}>Mi Perfil </Text>
          <ImageBackground style={{ height: 195, width: 300, marginTop: 20, alignSelf: "center" }} source={img} >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 18, marginTop: 10, fontWeight: 'bold', marginTop: 120, letterSpacing: 5 }}> {this.state.usuario.paciente.os_nro}  </Text>
              <Text style={{ fontSize: 11, marginTop: 10, fontWeight: 'bold', letterSpacing: 3 }}> {this.state.usuario.apellido.toUpperCase()} {this.state.usuario.nombre.toUpperCase()}  </Text>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <Text style={{ fontSize: 9, marginTop: 12 }}>dni </Text>
                <Text style={{ marginLeft: 2, fontSize: 11, marginTop: 10, fontWeight: 'bold' }}> {utils.separarEnMiles(this.state.usuario.dni)} </Text>
                <Text style={{ marginLeft: 30, fontSize: 9, marginTop: 12 }}>vto  </Text>
                <Text style={{ marginLeft: 2, fontSize: 11, marginTop: 10, fontWeight: 'bold' }}> 10/2023 </Text>
              </View>
            </View>
          </ImageBackground>


          <Text style={{ marginTop: '7%', textAlign: 'justify', fontSize: 14, marginBottom: 15, lineHeight: 16, marginHorizontal: '5%' }}>
            NOMBRE Y APELLIDO
          </Text>
          <Text style={{ fontSize: 13, lineHeight: 16, marginHorizontal: '6%', color: 'grey' }}>
            {this.state.usuario.nombre} {this.state.usuario.apellido}
          </Text>
          <Divider style={{ backgroundColor: 'black', marginHorizontal: '5%' }} />
          <Text style={{ marginTop: '5%', textAlign: 'justify', fontSize: 14, marginBottom: 15, lineHeight: 16, marginHorizontal: '5%' }}>
            NÚMERO DE SOCIO
          </Text>
          <Text style={{ fontSize: 13, lineHeight: 16, marginHorizontal: '6%', color: 'grey' }}>
            {utils.separarEnMiles(this.state.usuario.nro_socio)}
          </Text>
          <Divider style={{ backgroundColor: 'black', marginHorizontal: '5%' }} />
          <Text style={{ marginTop: '5%', textAlign: 'justify', fontSize: 14, marginBottom: 15, lineHeight: 16, marginHorizontal: '5%' }}>
            FECHA DE NACIMIENTO
          </Text>
          <Text style={{ fontSize: 13, lineHeight: 16, marginHorizontal: '6%', color: 'grey' }}>
            {new Date(this.state.usuario.fecha_nac).toLocaleDateString("es-AR")}
          </Text>
          <Divider style={{ backgroundColor: 'black', marginHorizontal: '5%' }} />
          
          <Text style={{ marginTop: '5%', textAlign: 'justify', fontSize: 14, marginBottom: 15, lineHeight: 16, marginHorizontal: '5%' }}>
            EMAIL
          </Text>
          <Text style={{ fontSize: 13, lineHeight: 16, marginHorizontal: '6%', color: 'grey' }}>
            {this.state.usuario.email}
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
          <Divider style={{ backgroundColor: 'black', marginHorizontal: '5%', marginBottom:20 }} />

          {this.mostrarBoton()}
          
        </ScrollView>
      );
    }
  }
}
