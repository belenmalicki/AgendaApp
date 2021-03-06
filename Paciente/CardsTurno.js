import React, { Component} from 'react';
import { Ionicons } from '@expo/vector-icons';
import {Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import {Card, CardItem, Col, Row, Grid} from 'native-base'
import PopUp from './PopUpsPaciente'
import {  Overlay } from 'react-native-elements';
import utils from '../utils/utils';
import ApiController from '../controller/ApiController';
const { width } = Dimensions.get('window');

export default class CardTurno extends Component {
  constructor(props) {
    super(props);
    this.state={
      showAlert: false,
  }    
  };
  abrirPop=()=>{
    this.setState({ showAlert: true});
  
}

cerrarPop=()=>{
  this.setState({ showAlert: false});
  let data = {
    jornada_id: this.props.turno.jornada_id,
    turnos: [this.props.turno.id]
  }
  ApiController.eliminarTurnos(data, this.handleResponse.bind(this))
}

  handleResponse(response){
    if(response.status===400){
      alert('Ha ocurrido un error')
    }else{
      this.props.forzar()
    }
  }
  mostrarBotonConf(){
    let turno= new Date(this.props.turno.fecha_inicio)
    turno.setHours(turno.getHours()-12)
    let today= new Date() 


    if(today >= turno){
      if(this.props.turno.estado !== 'canceladoCM'){
        console.log('estado',this.props.turno.estado)
        if(this.props.turno.estado !== 'confirmado'){
          return <PopUp update={this.props.forzar} id={this.props.turno.id} key='1' tipo='1' alto='18%' nombre='CONFIRMAR' col='#1f77a5' titulo='¿DESEA CONFIRMAR SU TURNO?'/>
        }
      }
      else{
       return <View>
         <TouchableOpacity style={{backgroundColor:'white',  alignSelf:'center'}} onPress={() => this.abrirPop()}>
            <Text style={{color:"#1f77a5", fontWeight:"bold", fontSize:12, textAlign:'center' }}>CONFIRMAR</Text>
          </TouchableOpacity>
  
        <Overlay overlayStyle={{height:190}} isVisible={this.state.showAlert}  >
          <View>
            <Text style={{textAlign:"center", marginTop:10}}>TURNO CANCELADO</Text>
            <Text style={{textAlign:"justify", fontSize:12, marginTop:20, marginHorizontal:5}}>Lo sentimos, su turno ha sido cancelado por una situación de fuerza mayor.</Text>
            <Text style={{textAlign:"justify", fontSize:12, marginHorizontal:5}}>Nos contactaremos para reprogramarle un nuevo turno.</Text>
            <TouchableOpacity style={{backgroundColor:'#E93923', width:140, alignSelf:'center', marginTop:15}} onPress={() => this.cerrarPop()}>
                <Text style={{color:"white", fontWeight:"bold", fontSize:11, marginVertical:10, marginHorizontal:8, textAlign:'center' }}>ACEPTAR</Text>
            </TouchableOpacity>
          </View>
        </Overlay>
      </View>
      }
    }
  

     
  }
  mostrarBotonCanc(){
    if(this.props.turno.estado !== 'confirmado'){

      return <PopUp turno={this.props.turno} update={this.props.forzar} id={this.props.turno.id} key='2' tipo='2' alto='32%' nombre='CANCELAR' col='#e93922' titulo='¿DESEA CANCELAR SU TURNO?' texto='Los turnos podrán ser cancelados hasta 12 Hs. antes del mismo, en caso de no ser así, se le cobrará la penalización correspondiente'/>
    }else{
      return <View style={{alignItems:'center'}}>
                <Text style={{color:"#1f77a5", fontWeight:"bold", fontSize:12, textAlign:'center' }}>TURNO</Text>
                <Text style={{color:"#1f77a5", fontWeight:"bold", fontSize:12, textAlign:'center' }}>CONFIRMADO</Text>
              </View>
    }
  }
  render() {
    return (
      <View style={{ alignItems:'center', marginBottom:10}}>
        <Card style={{width:width*0.9}}>
            <CardItem>
                    <Col style={{marginTop:25}} >
                        <Text style={{fontSize:14, color:'#1f77a5', textAlign:"center", fontWeight:'bold'}}>{new Date(this.props.turno.fecha_inicio).getDate()}</Text>
                        <Text style={{fontSize:12, color:'#1f77a5', textAlign:"center", fontWeight:'bold'}}>{utils.getStringMes(this.props.turno.fecha_inicio)}</Text>
                        <Text style={{fontSize:12, color:'#1f77a5', textAlign:"center"}}>{utils.getStringWeekday(this.props.turno.fecha_inicio)}</Text>
                    </Col>
                    <Col size={3} style={{marginLeft:15}} >
                        <Text style={{fontSize:15}}>{this.props.turno.medico.datos.genero === 'femenino' ? `DRA. ${this.props.turno.medico.datos.apellido.toUpperCase()}, ${this.props.turno.medico.datos.nombre}` : `DR. ${this.props.turno.medico.datos.apellido.toUpperCase()}, ${this.props.turno.medico.datos.nombre}`}</Text>
                        <Text style={{fontSize:13, marginTop:3}}>{utils.mayusPrimerLetra(this.props.turno.especialidad.titulo)}</Text>
                        <Text style={{fontSize:11, marginTop:12}}> <Ionicons name='md-time' size={12} color='black'></Ionicons> {utils.formatHora(this.props.turno.fecha_inicio)} Hs</Text>
                        <Text style={{fontSize:11,marginTop:3 }}> <Image style={{height:11, width:11}} source={require('../assets/Images/pin.png')}/> Sede Belgrano</Text>
                    </Col>
            </CardItem>
            <CardItem style={{ alignSelf:'flex-end', marginBottom:5}}>
                <View style={{flexDirection:"row"}}>
                    <View style={{marginRight:15}}>
                      {this.mostrarBotonConf()}
                    </View>
                    {this.mostrarBotonCanc()}
                </View>
            </CardItem>
        </Card>
     </View>
    );
  }
}
