import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import ApiController from '../controller/ApiController';



export default class OlvidoContraseña extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      dni: '',
      nrosoc: ''
    }
  };


  checkData() {
    const data = {
      email: this.state.email,
      dni: this.state.dni,
      nro_socio: this.state.nrosoc
    }

    ApiController.verificarDatos(data, this.handleData.bind(this))
  }

  handleData(response) {
    if (response.status == 200) {
      response.json().then(usuario => {
        console.log(usuario)
        this.props.navigation.navigate('NuevaContraseña')
      })
    } else {
      alert('Los datos ingresados no son válidos.')
    }
  }


  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 350 }}>
          <Text >
            {"¿OLVIDÓ SU CONTRASEÑA?"}
          </Text>
          <Text >
            {"Por Favor ingrese los siguientes datos para que pueda generar una nueva contraseña o comuniquese al +54 (011) 5777-3200."}
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text >
            {"NOMBRE DE USUARIO"}
          </Text>
          <TextInput
            style={{ backgroundColor: "white", height: 50, width: 350 }}
            editable
            underlineColorAndroid="black"
            maxLength={32}
            placeholder="NOMBRE DE USUARIO"
            placeholderTextColor="#cccccc"
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text >
            {"DNI"}
          </Text>
          <TextInput
            style={{ backgroundColor: "white", height: 50, width: 350 }}
            editable
            underlineColorAndroid="black"
            maxLength={32}
            placeholder="DNI"
            placeholderTextColor="#cccccc"
            onChangeText={(text) => this.setState({ dni: text })}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text >
            {"NUMERÓ DE SOCIO/ LEGAJO LABORAL"}
          </Text>
          <TextInput
            style={{ backgroundColor: "white", height: 50, width: 350 }}
            editable
            underlineColorAndroid="black"
            maxLength={32}
            placeholder="NUMERÓ DE SOCIO"
            placeholderTextColor="#cccccc"
            onChangeText={(text) => this.setState({ nrosoc: text })}
          />
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => { this.checkData() }}
            style={{ width: 230, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#e93922' }}>
            <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>CONFIRMAR</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

}