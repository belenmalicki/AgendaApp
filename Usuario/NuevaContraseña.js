import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as Crypto from 'expo-crypto'
import ApiController from '../controller/ApiController';


export default class NuevaContraseña extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass1: '',
      pass2: ''
    }
  };

  onSubmit = async (usuario) => {
    if (this.state.pass1 != this.state.pass2) {
      alert('Las contraseñas ingresadas no coinciden')
    } else {
      const con = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        this.state.pass1
      );
      let data = {
        usuario_id: usuario.id,
        password: con
      }
      ApiController.updatePassword(data , this.handleUpdate.bind(this));
      
    }
  }

  handleUpdate(response){
    if (response.status == 200) {
      //Faltaría agregar un popup de que la contraseña se cambió correctamente
      response.json().then(usuario => {
        console.log(usuario)
        this.props.navigation.navigate('InicioPaciente')
      })
    } else {
      alert('Ocurrió un error. Intente nuevamente.')
    }

  }
      
      onChangePas = e => {
    if (/^[a-zA-Z]+$/.test(e[e.length-1]) || /^[0-9]+$/.test(e[e.length-1])) {
      this.setState({pass1: e})
    }
  };
  onChangeNewPas = e => {
    if (/^[a-zA-Z]+$/.test(e[e.length-1]) || /^[0-9]+$/.test(e[e.length-1])) {
      this.setState({pass2: e})
    }
  };

  render() {
    const usuario = this.props.navigation.getParam('usuario', {})
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 350 }}>
          <Text >
            {"INGRESE UNA NUEVA CONTRASEÑA"}
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text >
            {"CONTRASEÑA NUEVA"}
          </Text>
          <TextInput
            style={{ backgroundColor: "white", height: 50, width: 350 }}
            editable
            maxLength={32}
            placeholder="CONTRASEÑA"
            placeholderTextColor="#cccccc"
            secureTextEntry={true}
            value={this.state.pass1}
            onChangeText={(e)=>{this.onChangePas(e)}}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text >
            {"CONFIRMAR CONTRASEÑA"}
          </Text>
          <TextInput
            style={{ backgroundColor: "white", height: 50, width: 350 }}
            editable
            maxLength={32}
            placeholder="CONFIRMAR CONTRASEÑA"
            placeholderTextColor="#cccccc"
            secureTextEntry={true}
            value={this.state.pass2}
            onChangeText={(e)=>{this.onChangeNewPas(e)}}

          />
        </View>
        <View style={{ flex: 3, width: 150, justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.onSubmit(usuario)}
            style={{ width: 230, alignSelf: 'center', backgroundColor: '#e93922' }}>
            <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>CONFIRMAR</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}