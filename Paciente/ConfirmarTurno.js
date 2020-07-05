import React, { Component } from 'react';
import {ScrollView, Text, View, Image, TouchableOpacity  } from 'react-native';
import {StackActions,NavigationActions } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import ApiController from '../controller/ApiController'
import AsyncStorage from '@react-native-community/async-storage'



export default class ConfirmarTurno extends Component {
    constructor(props){
        super(props)
        this.state={
            showAlert: false,
            usuario:{},
            dias:['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
            meses:["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
        }
    }

    componentDidMount(){
      const usuario = this.props.navigation.getParam('usuario', null)
      if(usuario){
        this.setState({usuario: usuario})
      }else{
        this.getUsuario()
      }      
    }

    getUsuario = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('usuario')
        const usuario = jsonValue != null ? JSON.parse(jsonValue) : null;
        this.setState({usuario:usuario})
      } catch (e) {
        console.log(e)
      }
    }
    
    abrirPop=()=>{
          const id=this.props.navigation.getParam('id','')
          let data ={
            turno_id:id,
            paciente_id:this.state.usuario.paciente.id
          }
          ApiController.pedirTurno(data,this.handlePedido.bind(this))
      }
      handlePedido(response){
        if (response.status==200){
          this.setState({ showAlert: true});
        }
      }
      cerrarPop=()=>{
        this.setState({ showAlert: false});
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'InicioPaciente',params:{usuario:this.state.usuario} })],
          });
          this.props.navigation.dispatch(resetAction); 
      }
    
  render() {
    const { navigation } = this.props;
    const med  = navigation.getParam('med' ,{});
    var esp  = navigation.getParam( 'esp' , '');
    const fechaComp  = navigation.getParam( 'fecha' , '');
    const hora  = navigation.getParam( 'hora' ,'');
    const dia = new Date(fechaComp).getDate()
    const mes = this.state.meses[new Date(fechaComp).getMonth()]
    const dianombre = this.state.dias[(new Date(fechaComp).getDate()-1)%7]
    
    return (
      <ScrollView style={{flex:1}}>
         <Text style={{fontSize:14, marginLeft:10,marginTop:20,}}>Datos del turno: </Text>
         <Text style={{fontSize:14, marginLeft:14,marginTop:20, marginBottom:10, color:'#1F77A5', fontWeight:'bold' }}>{med.apellido} {med.nombre}</Text>
         <Text style={{fontSize:14, marginLeft:14, marginBottom:20, color:'#1F77A5' }}>{esp}</Text>
         <Text style={{fontSize:12, marginLeft:18, marginBottom:10 }}> <Ionicons name='md-calendar' size={16} color='black'></Ionicons> <Text style={{fontWeight:'bold'}}>{dia} {mes}</Text> {dianombre}   </Text>
         <Text style={{fontSize:12, marginLeft:18, marginBottom:10 }}> <Ionicons name='md-time' size={16} color='black'></Ionicons> {hora} Hs. </Text>
         <Text style={{fontSize:12, marginLeft:19, marginBottom:10 }}><Image style={{height:14, width:14}} source={require('../assets/Images/pin.png')}/> Belgrano</Text>
         <Text style={{fontSize:12, marginLeft:19, marginBottom:10 }}><Image style={{height:14, width:14}} source={require('../assets/Images/list.png')}/> Requisitos: </Text>
         <Text style={{fontSize:12, marginLeft:22, marginBottom:10, marginRight:15 }}>- Presentarse 15 minutos antes del turno para realizar los trámites administrativos. </Text>
         <Text style={{fontSize:12, marginLeft:22, marginBottom:10, marginRight:15 }}>- Portar los estudios solicitados por el médico en caso de que haya alguno.</Text>
         <TouchableOpacity onPress={() => this.abrirPop()}
            style={{marginTop:20, width:130 ,alignSelf:'flex-end', backgroundColor:'#e93922', marginRight:20}}>
            <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>CONFIRMAR</Text>
        </TouchableOpacity>
        <Overlay overlayStyle={{height:120}} isVisible={this.state.showAlert} >
            <View>
                <Text style={{fontSize:13, lineHeight:18,color:'black',textAlign:'center', marginTop:20, marginHorizontal:8}}>SE HA CONFIRMADO SU TURNO CON ÉXITO</Text>
                <TouchableOpacity style={{backgroundColor:"#1F77A5", width:180, marginTop:20, alignSelf:"center"}} onPress={() => this.cerrarPop()}>
                    <Text style={{fontSize:11,fontWeight:'bold', color:'white', marginVertical:8, textAlign:"center"}} >VOLVER AL INICIO</Text>
                </TouchableOpacity>
            </View>
         </Overlay> 
      </ScrollView>
    );
  }
}
