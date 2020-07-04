import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid, Dimensions } from 'react-native';
import * as Crypto from 'expo-crypto'
import ApiController from '../controller/ApiController';

const { width } = Dimensions.get('window');
export default class NuevaContraseña extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass1: '',
      pass2: '',
      cargando: false
    }
  };

  onSubmit = async (usuario) => {
    this.setState({ cargando: true })
    if (this.state.pass1 != this.state.pass2) {
      alert('Las contraseñas ingresadas no coinciden')
      this.setState({ cargando: false })
    } else {
      const con = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        this.state.pass1
      );
      let data = {
        usuario_id: usuario.id,
        password: con
      }
      ApiController.updatePassword(data, this.handleUpdate.bind(this));

    }
  }

  storeUsuario = async (usuario) => {
    try {
      await AsyncStorage.setItem('usuario', JSON.stringify(usuario))
    } catch (e) {
      console.log(e)
    }
  }

  handleUpdate(response) {
    if (response.status == 400 || response.status == 404) {
      this.setState({ cargando: false })
      alert('Ha ocurrido un error, por favor inténtelo nuevamente.')
    } else {
      response.json().then(usuario => {
        this.storeUsuario(usuario).then(() => {
          this.setState({ cargando: false })
          //console.log(usuario)        
          ToastAndroid.show('Se ha actualizado la contraseña correctamente.', ToastAndroid.LONG)
          if (usuario.medico && !usuario.paciente) { //por ahora para debug, despues va al revés
            this.props.navigation.navigate('InicioMedico', { usuario: usuario })
          }
          else {
            this.props.navigation.navigate('InicioPaciente', { usuario: usuario })
          }
        })
      })
    }
  }

  showLoading(usuario) {
    if (this.state.cargando) {
      return (<View>
        <ActivityIndicator size="large" color={'#e93922'}></ActivityIndicator>
      </View>)
    } else {
      return (
        <View style={{ marginBottom: 40 }}>
          <TouchableOpacity onPress={() => this.onSubmit(usuario)}
            style={{ width: 230, alignSelf: 'center', backgroundColor: '#e93922' }}>
            <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>CONFIRMAR</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  onChangePas = e => {
    if (/^[a-zA-Z]+$/.test(e[e.length - 1]) || /^[0-9]+$/.test(e[e.length - 1])) {
      this.setState({ pass1: e })
    }
  };
  onChangeNewPas = e => {
    if (/^[a-zA-Z]+$/.test(e[e.length - 1]) || /^[0-9]+$/.test(e[e.length - 1])) {
      this.setState({ pass2: e })
    }
  };

  render() {
    const usuario = this.props.navigation.getParam('usuario', {})
    return (
      <View style={{ flex: 1 }} >
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: 'center', marginVertical: 20 }} >INGRESE UNA NUEVA CONTRASEÑA</Text>
          <Text style={{ fontSize: 12, marginBottom: 5, marginLeft: 15, marginTop: 10 }} >CONTRASEÑA NUEVA</Text>
          <TextInput
            style={{ fontSize: 12, backgroundColor: "white", alignSelf: 'center', paddingLeft: 10, alignSelf: 'center', marginBottom: '10%', height: 20, width: width * 0.9, borderWidth: 1, borderLeftColor: 'white', borderRightColor: 'white', borderTopColor: 'white' }}
            editable
            maxLength={32}
            placeholder="CONTRASEÑA"
            placeholderTextColor="#cccccc"
            secureTextEntry={true}
            value={this.state.pass1}
            onChangeText={(e) => { this.onChangePas(e) }}
          />

          <Text style={{ fontSize: 12, marginBottom: 5, marginLeft: 15 }} >CONFIRMAR CONTRASEÑA</Text>
          <TextInput
            style={{ fontSize: 12, backgroundColor: "white", alignSelf: 'center', paddingLeft: 10, alignSelf: 'center', marginBottom: '10%', height: 20, width: width * 0.9, borderWidth: 1, borderLeftColor: 'white', borderRightColor: 'white', borderTopColor: 'white' }}
            editable
            maxLength={32}
            placeholder="CONFIRMAR CONTRASEÑA"
            placeholderTextColor="#cccccc"
            secureTextEntry={true}
            value={this.state.pass2}
            onChangeText={(e) => { this.onChangeNewPas(e) }}

          />
        </View>
        {this.showLoading(usuario)}

      </View>
    )
  }
}