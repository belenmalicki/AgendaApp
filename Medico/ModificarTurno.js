import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Footer,  Container } from 'native-base'
import {  Overlay } from 'react-native-elements';
import Check from './Check';
import AsyncStorage from '@react-native-community/async-storage';
import utils from '../utils/utils';
import ApiController from '../controller/ApiController';



const crearArray = (turnos) => {
    //crea el array de horarios que no tengan turnos asignados
    const array = []

    const fechaIni = new Date(turnos[0].fecha_inicio);
    const fechaFin = new Date(turnos[0].fecha_inicio)
    fechaIni.setHours(8,0,0)
    fechaFin.setHours(19,30,0)

    while(fechaIni.getTime() <= fechaFin.getTime()){
      array.push(new Date(fechaIni))
      fechaIni.setMinutes(fechaIni.getMinutes() + 30)
    }

    const horarios = array.filter((horario) => turnos.find((turno) => {
      const fecha = new Date(turno.fecha_inicio);
      return fecha.getTime() === horario.getTime()
    }) === undefined)

    return horarios;
}


export default class ModificarTurno extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAlert: false,
      showAlert2: false,
      showAlert3: false,
      usuario: {},
      turnosAgregar: [],
      turnosEliminar: []
    }
  }

  componentDidMount() {
    this.getUsuario()
  }

  getUsuario = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('usuario')
      const usuario = jsonValue != null ? JSON.parse(jsonValue) : null;
      this.setState({ usuario: usuario, especialidades: usuario.medico.especialidades, cargado: true })
    } catch (e) {
      console.log(e)
    }
  }

  updateArrayAgregar = (id, horario) => {
    const array = this.state.turnosAgregar;
    
    const index = array.findIndex((item) => item.id === id);

    if(index === -1){
      array.push({id: id, horario: horario})
    }else{
      array.splice(index, 1)
    }

    this.setState({turnosAgregar: array})
  }

  updateArrayEliminar = (id, turno_id) => {
    const array = this.state.turnosEliminar;

    const index = array.findIndex((item) => item.id === id);

    if(index === -1){
      array.push({id: id, turno_id: turno_id})
    }else{
      array.splice(index, 1)
    }

    this.setState({turnosEliminar: array})
  }

  eliminarTurnos(){
    const jornada_id = this.props.navigation.getParam('jornada_id', null)
    const array = this.state.turnosEliminar.map(t => t.turno_id)
    const data = {
      jornada_id: jornada_id,
      turnos: array
    }
    ApiController.eliminarTurnos(data, this.handleResponse.bind(this))
  }

  agregarTurnos(){
    const jornada_id = this.props.navigation.getParam('jornada_id', null)
    const array = this.state.turnosAgregar.map(t => t.horario)
    const data = {
      jornada_id: jornada_id,
      horarios: array
    }
    ApiController.agregarTurnos(data, this.handleResponse.bind(this))
  }

  agregarYeliminarTurnos(){
    const jornada_id = this.props.navigation.getParam('jornada_id', null)
    const array = this.state.turnosAgregar.map(t => t.horario)
    const data = {
      jornada_id: jornada_id,
      horarios: array
    }
    //console.log(data)
    ApiController.agregarTurnos(data, this.continuarUpdate.bind(this))
  }

  continuarUpdate(response){
    if(response.status === 400){
      alert('Ha ocurrido un error')
    }else{
      this.eliminarTurnos()
    }
  }

  handleResponse(response){
    if(response.status === 400){
      alert('Ha ocurrido un error.')
    }else{
      this.setState({
        showAlert3: true
      });
    }

  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
  showAlert2 = () => {
    this.setState({
      showAlert2: true
    });
  };
  showAlert3 = () => {
    if(this.state.turnosAgregar.length !== 0 && this.state.turnosEliminar.length !== 0){
      this.agregarYeliminarTurnos()
    }else if(this.state.turnosEliminar.length !== 0){
      this.eliminarTurnos()
    }else{
      this.agregarTurnos()
    }
  };
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };
  hideAlert2 = () => {
    this.setState({
      showAlert2: false
    });
  };
  llevarIn = () => {
    this.setState({
      showAlert3: false
    });
    this.props.navigation.navigate('InicioMedico', { usuario: this.state.usuario, render: new Date() })
  };

  render() {
    if (!this.state.cargado) {
      return null
    } else {
      const elim = ' Para seleccionar un turno, presione sobre el casillero.' + '\n' +
        ' Los turnos que hayan sido solicitados por un paciente no podrán ser eliminados y por lo tanto no aparecerán en las opciones.' + '\n' +
        ' Solo podrá eliminar todos los turnos de un día cuando ningún paciente haya solicitado turnos en ese día.'
      const agre = ' Para seleccionar un turno, presione sobre el casillero. Puede agregar tantos turnos como desee.'
      const { showAlert, showAlert2, showAlert3 } = this.state;
      const turnos = this.props.navigation.getParam('turnos', []);
      
      const fecha = this.props.navigation.getParam('fecha', '');

      const stringDia = utils.getStringWeekday(fecha) + ' ' + fecha.getDate().toString()
      const stringMes = utils.getStringMes(fecha)

      const elimTurnos = turnos.filter(turno => turno.paciente_id === null)
      const elimItems = elimTurnos.map(turno => { return { hora: new Date(turno.fecha_inicio), id: turno.id } })
      const addItems = crearArray(turnos)
      return (
        <Container>
          <ScrollView >
            <Text style={{ fontSize: 18, textAlign: 'center', marginVertical: 20 }}>MODIFICAR TURNO </Text>
            <Text style={{ fontSize: 14, marginLeft: '4%', color: '#e93922', marginBottom: 15 }}> <Ionicons name='md-calendar' size={16} color='#e93922'></Ionicons> {stringDia}<Text style={{ fontSize: 14, color: 'black' }}> {stringMes}</Text></Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10, marginLeft: 20 }}>Agregar turnos</Text>
            <View style={{ flexDirection: "row", marginBottom: 10, marginLeft: 20 }}>
              <Text style={{ fontSize: 12 }}>Seleccione los turnos que desea agregar  </Text>
              <TouchableOpacity onPress={() => this.showAlert()}>
                <Image style={{ height: 16, width: 16 }} source={require('../assets/Images/information.png')} />
              </TouchableOpacity>
              <Overlay overlayStyle={{ height: '25%' }} isVisible={showAlert} onBackdropPress={() => this.hideAlert()}>
                <View>
                  <Text style={{ textAlign: "center", marginTop: 20 }}>AGREGAR TURNO</Text>
                  <Text style={{ textAlign: "justify", fontSize: 12, marginTop: 20, marginHorizontal: 5 }}>{agre}</Text>
                  <TouchableOpacity style={{ backgroundColor: '#e93923', width: 140, alignSelf: 'center', marginTop: 30 }} onPress={() => this.hideAlert()} >
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 11, marginVertical: 10, marginHorizontal: 8, textAlign: 'center' }}>ACEPTAR</Text>
                  </TouchableOpacity>
                </View>
              </Overlay>
            </View>
            {addItems.map( (h,i) => <Check key={i} hora={utils.formatHora(h) + ' Hs'} item={h} id={i} update={this.updateArrayAgregar}></Check>)}

            <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10, marginLeft: 20, marginTop: 10 }}>Eliminar turnos</Text>
            <View style={{ flexDirection: "row", marginBottom: 10, marginLeft: 20 }}>
              <Text style={{ fontSize: 12 }}>Seleccione los turnos que desea eliminar  </Text>
              <TouchableOpacity onPress={() => this.showAlert2()}>
                <Image style={{ height: 16, width: 16 }} source={require('../assets/Images/information.png')} />
              </TouchableOpacity>
              <Overlay overlayStyle={{ height: '36%' }} isVisible={showAlert2} onBackdropPress={() => this.hideAlert2()}>
                <View>
                  <Text style={{ textAlign: "center", marginTop: 20 }}>ELIMINAR TURNO</Text>
                  <Text style={{ textAlign: "justify", fontSize: 12, marginTop: 20, marginHorizontal: 5 }}>{elim}</Text>
                  <TouchableOpacity style={{ backgroundColor: '#e93923', width: 140, alignSelf: 'center', marginTop: 30 }} onPress={() => this.hideAlert2()} >
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 11, marginVertical: 10, marginHorizontal: 8, textAlign: 'center' }}>ACEPTAR</Text>
                  </TouchableOpacity>
                </View>
              </Overlay>
            </View>
            {elimItems.map((item, i) => {return (
              <Check key={i} hora={utils.formatHora(item.hora) + ' Hs'} id={i} item={item.id} update={this.updateArrayEliminar}/>
            )})}

          </ScrollView>
          <Footer style={{ backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => this.showAlert3()}
              style={{ width: 180, alignSelf: 'center', backgroundColor: '#e93922' }}>
              <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>CONFIRMAR</Text>
            </TouchableOpacity>
            <Overlay overlayStyle={{ height: '17%' }} isVisible={showAlert3}>
              <View>
                <Text style={{ textAlign: "center", marginTop: 20 }}>SE HA MODIFICADO SU AGENDA CON ÉXITO</Text>
                <TouchableOpacity style={{ backgroundColor: '#1F77A5', width: 140, alignSelf: 'center', marginTop: 20 }} onPress={() => this.llevarIn()} >
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 11, marginVertical: 10, marginHorizontal: 8, textAlign: 'center' }}>VOLVER AL INICIO</Text>
                </TouchableOpacity>
              </View>
            </Overlay>
          </Footer>
        </Container>
      );
    }
  }
}
