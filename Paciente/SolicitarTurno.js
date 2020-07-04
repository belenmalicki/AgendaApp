import React, { Component, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, Button, Platform } from 'react-native';
import { Card, CardItem, Col, DatePicker, Icon } from 'native-base'
import { Divider } from 'react-native-elements';
import CardSolicitarTurno from "./CardsSolicitarTurno"
import CardDisponibilidadTurno from './CardDisponibilidadTurno'
import AwesomeAlert from 'react-native-awesome-alerts';
import ModalSelector from 'react-native-modal-selector'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Overlay } from 'react-native-elements';
import ApiController from '../controller/ApiController'
import AsyncStorage from '@react-native-community/async-storage'
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import utils from '../utils/utils';

/*ESTADOS DE estadoTurnos
1: Hay turno disponible en la fecha que eligió el paciente con el profesional elegido
2: No hay turno disponible en esa fecha, te muestro las mas cercanas
3: No hay turnos con el profesional elegido durante estos dos meses, te muestro otro prof. y lista espera profesional
4: No podes elegir ese turno porque ya tenes un turno de esa especialidad en esa fecha
5:No hay turnos disponibles en todos los dos meses: Lista de espera
*/


const { width } = Dimensions.get('window');


export default class SolicitarTurno extends Component {
  constructor(props) {
    super(props)
    this.state = {
      select: '',
      espe: '',
      dia: 'Seleccione fecha',
      profesional: '',
      estadoTurnos: 0,
      showAlert: false,
      showAlert2: false,
      textInputValueEs: {},
      textInputValuePr: {},
      especialidades: [],
      profesionales: [],
      turnos: [],
      usuario: {},
      buscar: false,
      cargandoTurnos: false
    }
  }

  componentDidMount() {
    this.getUsuario()
    ApiController.getEspecialidades(this.handleEspecialidades.bind(this))
  }

  handleEspecialidades(response) {
    response.json().then((especialidades) => {
      this.setState({ especialidades: especialidades });
    })
  }

  getUsuario = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('usuario')
      const usuario = jsonValue != null ? JSON.parse(jsonValue) : null;
      this.setState({ usuario: usuario })
    } catch (e) {
      console.log(e)
    }
  }

  onChangeChoose(option) {
    this.setState({ textInputValueEs: option, buscar: false })
    this.setState({ profesional: '', espe: option.titulo, estadoTurnos: 0, select: '', dia: 'Seleccione fecha' })
    const profesionales = option.medicos;
    if (profesionales[0].id !== 0) {
      profesionales.unshift({ id: 0, datos: { apellido: 'Todos los', nombre: 'profesionales' } })
    }
    this.setState({ profesionales: profesionales });

  }

  onChangeProfesionales(option) {
    this.setState({ profesional: option.datos.apellido + ' ' + option.datos.nombre, textInputValuePr: option, estadoTurnos: 0, buscar: false, select: '', dia: 'Seleccione fecha', cargandoTurnos: true });
    this.buscarTurnos();
  }

  buscarTurnos = () => {
    if (this.state.espe == '') {
      this.setState({ showAlert: true });
    } else {
      let data = {
        especialidad_id: this.state.textInputValueEs.id
      }
      if (this.state.profesional !== '' && this.state.textInputValuePr.id !== 0) {
        data.medico_id = this.state.textInputValuePr.id;
      }
      ApiController.getTurnos(data, this.handleTurnos.bind(this))
    }
  }

  verificarTurnosPaciente() {
    const turnosPaciente = this.props.navigation.getParam('turnosPaciente', []);
    const { select } = this.state;

    let hayTurnos = turnosPaciente.find((turno) => {
      return utils.dayEquals(select, turno.fecha_inicio)
    })
    if (hayTurnos !== undefined) {
      this.setState({ estadoTurnos: 4 })
    }
  }

  abrirPop2 = () => { this.setState({ showAlert2: true, buscar: false }) }

  handleTurnos(response) {
    response.json().then((turnos) => {

      if (turnos.length === 0 && this.state.textInputValuePr.id === 0) {
        this.setState({ turnos: turnos, estadoTurnos: 5, cargandoTurnos: false })
      } else if (turnos.length === 0) {
        this.setState({ turnos: turnos, estadoTurnos: 3, cargandoTurnos: false })
      } else {
        this.setState({ turnos: turnos, estadoTurnos: 1, cargandoTurnos: false })
      }
    })
  }

  mostrarTurnos() {
    const { select, espe, profesional } = this.state;
    if (select === '' || espe === '' || profesional === '') {
      this.setState({ showAlert: true })
    } else {
      this.setState({ buscar: true })
    }
  }

  cerrarPop = () => {
    this.setState({ showAlert: false });
  }
  cerrarPop2 = () => {
    this.setState({ showAlert2: false });
    this.verificarTurnosPaciente()
  }

  buscar2() {
    if (this.state.estadoTurnos != 1) {
      return (<View>
        <CardDisponibilidadTurno nro={this.state.estadoTurnos} />
      </View>)
    } else {
      const turnosDisp = this.state.turnos.filter((turno) => utils.dayEquals(turno.fecha_inicio, this.state.select));
      return (
        <View>
          <View style={{ backgroundColor: '#1f77a5', marginHorizontal: 10, paddingLeft: 8 }}>
            <Text style={{ fontSize: 14, color: 'white', backgroundColor: '#1f77a5', marginVertical: 5, fontWeight: "bold" }}>
              Solicite un turno para {this.state.espe}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 15 }}>
            <Text style={{ fontSize: 14, color: '#e93922', fontWeight: 'bold' }}>
              {new Date(this.state.select).getDate()} {utils.getStringWeekday(this.state.select)}
            </Text>
            <Text style={{ fontSize: 14, marginLeft: 2 }}>
              {utils.getStringMes(this.state.select)}
            </Text>
          </View>

          {turnosDisp.map((item, i) => <CardSolicitarTurno key={i} id={item.id} hora={utils.formatHora(item.fecha_inicio)} med={item.medico.datos} espe={item.especialidad.titulo} fecha={item.fecha_inicio} />)}

        </View>
      )
    }
  }


  render() {
    console.log("Estado turnos: ", this.state.estadoTurnos)
    var date = new Date().getDate(); //Current Date
    var monthFut = new Date().getMonth() + 2; //Current Month + 2
    var year = new Date().getFullYear(); //Current Year
    var i = 0

    let item = {};
    if (this.state.turnos.length !== 0) {
      item = Object.assign({}, ...this.state.turnos.map(t => {
        let fechastring = t.fecha_inicio.slice(0, 10);
        return ({ [fechastring]: { marked: true } })
      }
      ))
      if (this.state.dia != 'Seleccione fecha') {
        item[this.state.dia] = { ...item[this.state.dia], selected: true }
      }
    }
    let cambio = this.state.dia === 'Seleccione fecha' ? 'rgba(0,0,0,0.22)' : 'black'
    console.log('selec', this.state.select)
    return (
      //style no funciona con ScrollView, debe ser contentContainerStyle
      //flex:1 hacia que la pantalla no se moviera con el scrollview
      <ScrollView>
        <Text style={{ fontSize: 17, textAlign: 'center', marginTop: 20, marginBottom: 10 }}>SOLICITAR TURNO</Text>
        {/*Modal selector*/}
        <Text style={{ fontSize: 12, marginTop: 20, marginBottom: 20, marginLeft: 20 }}>Especialidad:</Text>
        <View style={{ alignSelf: 'center', width: width * 0.9, marginTop: 0 }}>
          <ModalSelector
            data={this.state.especialidades}
            initValue="Seleccione especialidad"
            keyExtractor={item => item.id}
            labelExtractor={item => item.titulo}
            //supportedOrientations={['landscape']}
            //  optionTextStyle={color:'red'}
            animationType={'none'}
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={(option) => { this.onChangeChoose(option) }}>
            <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between' }}>
              <TextInput
                style={{ borderWidth: 1, borderColor: 'white', fontSize: 14, paddingLeft: 8 }}
                editable={false}
                placeholder="Seleccione especialidad"
                value={this.state.espe} />
              <Icon name={'caret-down'} type='FontAwesome' style={{ color: "rgba(0, 0, 0, .38)", fontSize: 18, alignSelf: 'flex-end' }}></Icon>
            </View>
            <Divider style={{ backgroundColor: "rgba(0, 0, 0, .38)", alignSelf: 'center', width: width * 0.9 }} />
          </ModalSelector>
        </View>
        {/*Modal selector*/}
        <Text style={{ fontSize: 12, marginTop: 20, marginBottom: 0, marginLeft: 20 }}>Profesional:</Text>
        <View style={{ alignSelf: 'center', width: width * 0.9, marginTop: 20 }}>
          <ModalSelector
            data={this.state.profesionales}
            initValue="Seleccione profesional"
            keyExtractor={item => item.id}
            labelExtractor={item => item.datos.apellido + ' ' + item.datos.nombre}
            //supportedOrientations={['landscape']}
            // optionTextStyle={color:'red'}
            animationType={'none'}
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={(option) => { this.onChangeProfesionales(option) }}>
            <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between' }}>
              <TextInput
                style={{ borderWidth: 1, borderColor: 'white', fontSize: 14, paddingLeft: 8 }}
                editable={false}
                placeholder="Seleccione profesional"
                value={this.state.profesional} />
              <Icon name={'caret-down'} type='FontAwesome' style={{ color: "rgba(0, 0, 0, .38)", fontSize: 18, alignSelf: 'flex-end' }}></Icon>
            </View>
            <Divider style={{ backgroundColor: "rgba(0, 0, 0, .38)", alignSelf: 'center', width: width * 0.9 }} />
          </ModalSelector>
        </View>
        <Text style={{ fontSize: 12, marginTop: 20, marginBottom: 0, marginLeft: 20 }}>Fecha:</Text>
        <View style={{ marginLeft: '3%', flexDirection: "row", justifyContent: 'space-between', width: width * 0.9 }}>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this.abrirPop2()}>
            <Text style={{ paddingLeft: 20, fontSize: 14, color: cambio, marginBottom: 10 }}>{this.state.dia}</Text>
          </TouchableOpacity>
          <Icon name={'caret-down'} type='FontAwesome' style={{ color: "rgba(0, 0, 0, .38)", fontSize: 18, marginLeft: 5, marginTop: 20 }}></Icon>
        </View>
        <Divider style={{ backgroundColor: "rgba(0, 0, 0, .38)", alignSelf: 'center', width: width * 0.9 }} />
        <Overlay key={i++} overlayStyle={{ height: width + 60, width: width }} isVisible={this.state.showAlert2}>
          <View>
            <Calendar
              current={new Date()}
              minDate={new Date()}
              maxDate={new Date(year, monthFut, date)}
              onDayPress={(day) => { this.setState({ dia: day.dateString, select: new Date(day.year, day.month - 1, day.day) }) }}
              onDayLongPress={(day) => { console.log('selected long day', day) }}
              onMonthChange={(month) => { console.log('month changed', month) }}
              hideExtraDays={true}
              disableMonthChange={true}
              showWeekNumbers={false}
              onPressArrowLeft={subtractMonth => subtractMonth()}
              onPressArrowRight={addMonth => addMonth()}
              disableAllTouchEventsForDisabledDays={true}
              renderHeader={(date) => {/*Return JSX*/ }}
              style={{ height: 0.8 * width }}
              markedDates={item}
              theme={{
                agendaDayTextColor: '#1f77a5',
                agendaDayNumColor: '#1f77a5',
                todayTextColor: '#e93923',
                dotColor: '#1f77a5',
                arrowColor: '#e93923',
                selectedDayBackgroundColor: '#1f77a5',
              }}
            />
            <TouchableOpacity style={{ backgroundColor: "#e93922", width: 100, marginTop: 40, alignSelf: "center" }} onPress={() => this.cerrarPop2()}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: 'white', marginVertical: 8, textAlign: "center" }} >ACEPTAR</Text>
            </TouchableOpacity>
          </View>
        </Overlay>
        <TouchableOpacity onPress={() => this.mostrarTurnos()}
          style={{ marginVertical: 20, width: 115, alignSelf: 'flex-end', backgroundColor: '#e93922', marginRight: 20 }}>
          <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>BUSCAR</Text>
        </TouchableOpacity>
        {this.state.buscar && this.buscar2()}
        <Overlay overlayStyle={{ height: 140 }} isVisible={this.state.showAlert} >
          <View>
            <Text style={{ fontSize: 14, lineHeight: 18, color: 'black', textAlign: 'center', marginTop: 20, marginHorizontal: 8 }}>POR FAVOR, COMPLETE TODOS LOS CAMPOS</Text>
            <TouchableOpacity style={{ backgroundColor: "#e93922", width: 100, marginTop: 20, alignSelf: "center" }} onPress={() => this.cerrarPop()}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: 'white', marginVertical: 8, textAlign: "center" }} >ACEPTAR</Text>
            </TouchableOpacity>
          </View>
        </Overlay>
      </ScrollView>
    );
  }
}