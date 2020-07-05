import React, { Component } from 'react';
import ApiController from '../controller/ApiController';
import { Text, View,TextInput,TouchableOpacity, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('screen');

export default class OlvidoContraseña extends Component {
  constructor(props) {
    super(props)
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
        this.props.navigation.navigate('NuevaContraseña', {usuario: usuario})
      })
    } else {
      alert('Los datos ingresados no son válidos.')
    }
  }
  
  onChangeUs = e => {
    if (/^[a-zA-Z]+$/.test(e[e.length-1]) || e[e.length-1]=='@' || e[e.length-1]=='.') {
      this.setState({email: e})
    }
  };
  onChangeDNI = e => {
    if (/^[0-9]+$/.test(e[e.length-1])) {
      this.setState({dni: e})
    }
  };
  onChangeNum = e => {
    if (/^[0-9]+$/.test(e[e.length-1])) 
      this.setState({nrosoc: e})
    }
    render(){
        return(
            <View style={{flex:1, height:height}} >
            <View style={{ height:height*0.8}}>
              <Text style={{textAlign:"center", marginVertical:20}}>¿OLVIDÓ SU CONTRASEÑA?</Text>
              <Text style={{fontSize:14,textAlign:'justify', marginHorizontal:10, marginBottom:20}}>
                Por Favor ingrese los siguientes datos para que pueda generar una nueva contraseña o comuniquese al +54 (011) 5777-3200.
              </Text>
              <Text style={{fontSize:12,marginBottom:5, marginLeft:15}}> NOMBRE DE USUARIO</Text>
              <TextInput
                    style={{fontSize:12, paddingLeft:10, alignSelf:'center' ,marginBottom:'10%',height: 20, width:width* 0.9 , borderWidth: 1, borderLeftColor:'white', borderRightColor:'white', borderTopColor:'white'}}
                    editable
                    maxLength={32}
                    placeholder="NOMBRE DE USUARIO"
                    placeholderTextColor="#cccccc"
                    value={this.state.Usuario}
                    onChangeText={(e)=>{this.onChangeUs(e)}}

                  />  
              <Text style={{fontSize:12,marginBottom:5, marginLeft:15}}>DNI</Text>
              <TextInput
                    style={{fontSize:12, paddingLeft:10 ,alignSelf:'center', marginBottom:'10%',height: 20, width:width* 0.9 , borderWidth: 1, borderLeftColor:'white', borderRightColor:'white', borderTopColor:'white' }}
                    editable
                    maxLength={32}
                    placeholder="DNI"
                    placeholderTextColor="#cccccc"
                    value={this.state.DNI}
                    onChangeText={(e)=>{this.onChangeDNI(e)}}
                  />
                 
              <Text style={{fontSize:12,marginBottom:5, marginLeft:15}}>NUMERO DE SOCIO</Text>
              <TextInput
                    style={{fontSize:12, paddingLeft:10 ,alignSelf:'center', marginBottom:'10%',height: 20, width:width* 0.9 , borderWidth: 1, borderLeftColor:'white', borderRightColor:'white', borderTopColor:'white' }}
                    editable
                    maxLength={32}
                    placeholder="NUMERO DE SOCIO"
                    placeholderTextColor="#cccccc"
                    value={this.state.Legajo}
                    onChangeText={(e)=>{this.onChangeNum(e)}}
                  />
                  </View>

              <View style={{marginBottom:40}}>
                  <TouchableOpacity  onPress={() => { this.checkData() }}
                    style={{ width: 230, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#e93922' }}>
                        <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>CONFIRMAR</Text>
                  </TouchableOpacity>
                </View>
            </View>
    )
  }

}