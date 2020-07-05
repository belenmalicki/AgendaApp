import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Platform, Text, View, Image, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Footer, FooterTab, Container, Card, CardItem, Col, Icon, Content } from 'native-base'
import { Divider, CheckBox, Overlay } from 'react-native-elements';
import PopUp from '../Paciente/PopUpsPaciente'
import ModalSelector from 'react-native-modal-selector'
import TimePicker from "react-native-24h-timepicker";
import ApiController from '../controller/ApiController';
import AsyncStorage from '@react-native-community/async-storage'
import utils from '../utils/utils';


const formatFecha = (fecha, hora) => {
   return hora !== null ? new Date(fecha.toLocaleDateString() + ' ' + hora) : null;
}


const { width } = Dimensions.get('window');
export default class AgregarTurno extends Component {
  constructor(props) {
    super(props)
    this.state = {
      textInputValueEs: '',
      entrada: 'Seleccione horario del primer turno',
      hourEnt: '',
      salida: "Seleccione horario del ultimo turno",
      almuerzo: 'Seleccione la hora de almuerzo',
      colTx: 'rgba(0, 0, 0, .22)',
      colTx2: 'rgba(0, 0, 0, .22)',
      colTx3: 'rgba(0, 0, 0, .22)',
      showAlert: false,
      showAlert2: false,
      showAlert3: false,
      checked: false,
      usuario: {},
      especialidades: [],
      cargado: false
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

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {

    if (hour >= 8 && hour <= 19) {
      this.setState({ entrada: `${hour}:${minute}` });
      this.setState({ hourEnt: hour });
      this.setState({ colTx: 'black' });
      //console.log("confirm1", hour, minute)
      this.TimePicker.close();
    } else {
      console.log('no perro')
    }

  }
  onCancel2() {
    this.TimePicker2.close();
  }

  onConfirm2(hour, minute) {
    //console.log('hour2',this.state.hour)
    var HsEntrada = parseInt(this.state.hourEnt)
    //console.log('hour', parseInt(entrada))
    if (hour > HsEntrada) {
      this.setState({ salida: `${hour}:${minute}` });
      this.setState({ colTx2: 'black' });
      this.TimePicker2.close();
    } else {
      console.log('no perro 2')
    }
  }

  onCancel3() {
    this.TimePicker3.close();
  }

  onConfirm3(hour, minute) {
    if (hour >= 8 && hour <= 19) {
      this.setState({ almuerzo: `${hour}:${minute}` });
      this.setState({ colTx3: 'black' });
      //console.log("confirm1", hour, minute)
      this.TimePicker3.close();
    } else {
      console.log('no perro 3')
    }
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });

  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });

  };

  generarJornada(){
    const esp = this.state.especialidades.find(e => e.titulo === this.state.textInputValueEs);
    const fecha = this.props.navigation.getParam('fecha', '');

    const {entrada, salida, checked, usuario} = this.state;

    const almuerzo = this.state.almuerzo === 'Seleccione la hora de almuerzo' ? null : this.state.almuerzo;
    
    const fecha_inicio = formatFecha(fecha, entrada)
    const fecha_fin = formatFecha(fecha, salida)
    const horario_almuerzo = formatFecha(fecha, almuerzo)
    
    console.log(fecha_inicio);
    console.log(fecha_fin);
    console.log(horario_almuerzo);

    let data = {
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin,
      horario_almuerzo: horario_almuerzo,
      medico_id: usuario.medico.id,
      especialidad_id: esp.id,
      sede: 'Belgrano'
    };

    ApiController.generarJornadaMedico(data, this.handleResponse.bind(this), checked)  

  }

  handleResponse(response){
    if(response.status === 400){
      alert('Ha ocurrido un error, por favor intente nuevamente')
    }else{
      this.setState({
        showAlert2: true
      });
    }
  }



  AbrirPop = () => {
    if (this.state.textInputValueEs !== '' && this.state.entrada !== 'Seleccione horario del primer turno' && this.state.salida !== "Seleccione horario del ultimo turno") {
      this.generarJornada()
      
    }
    else {
      this.setState({
        showAlert3: true
      });
    }

  };

  llevarIn = () => {
    if (this.state.showAlert2 == true) {
      this.setState({
        showAlert2: false,
      });
      this.props.navigation.navigate('InicioMedico', {usuario: this.state.usuario, render: new Date()})
    }
    else
      this.setState({ showAlert3: false, });
  };

  render() {
    if (!this.state.cargado) {
      return null
    } else {
      const fecha = this.props.navigation.getParam('fecha', '')

      const stringDia = utils.getStringWeekday(fecha) + ' ' + fecha.getDate().toString()
      const stringMes = utils.getStringMes(fecha)
      const stringCheck = `Repetir turno para las próximas semanas de ${stringMes}`
      

      const {especialidades} = this.state

      const items = especialidades.map((esp, i) => {return {key: i+1, label: esp.titulo}})

      items.unshift({key: 0, section: true, label: 'Especialidad'})

      const { showAlert, showAlert2, showAlert3 } = this.state;
      //const {showAlert2} = this.state;
      const {usuario} = this.state
      //console.log(usuario.medico)
      return (
        <ScrollView style={{}}>

          <Text style={{ fontSize: 18, textAlign: 'center', marginVertical: 20 }}>AGREGAR TURNO </Text>
          <Text style={{ fontSize: 14, marginLeft: '4%', color: '#e93922', marginBottom: 15 }}> <Ionicons name='md-calendar' size={16} color='#e93922'></Ionicons> {stringDia} <Text style={{ fontSize: 14, color: 'black' }}> {stringMes} </Text></Text>
          <Text style={{ fontSize: 12, marginBottom: 20, marginLeft: 20 }}>Elija la especialidad</Text>
          <View style={{ alignSelf: 'center', width: width * 0.9, marginTop: 0 }}>
            <ModalSelector
              data={items}
              initValue="Seleccione especialidad"
              //supportedOrientations={['landscape']}
              //  optionTextStyle={color:'red'}
              animationType={'none'}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={(option) => { this.setState({ textInputValueEs: option.label }) }}>
              <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between' }}>

                <TextInput
                  style={{ borderWidth: 1, borderColor: 'white', fontSize: 14, paddingLeft: 8 }}
                  editable={false}
                  placeholder="Seleccione especialidad"
                  value={this.state.textInputValueEs} />
                <Icon name={'caret-down'} type='FontAwesome' style={{ color: "rgba(0, 0, 0, .38)", fontSize: 18, alignSelf: 'flex-end' }}></Icon>
              </View>
              <Divider style={{ backgroundColor: "rgba(0, 0, 0, .38)", alignSelf: 'center', width: width * 0.9 }} />
            </ModalSelector>
          </View>

          <Text style={{ fontSize: 12, marginTop: 20, marginBottom: 20, marginLeft: 20 }}>Elija el horario del primer turno</Text>
          <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => this.TimePicker.open()}
              style={{ marginLeft: 25 }}>
              <Text style={{ color: this.state.colTx, fontSize: 14, paddingLeft: 8 }}>{this.state.entrada}</Text>
            </TouchableOpacity>
            <Icon name={'caret-down'} type='FontAwesome' style={{ color: "rgba(0, 0, 0, .38)", fontSize: 18, alignSelf: 'flex-end', marginRight: 20 }}></Icon>

            <TimePicker
              ref={ref => {
                this.TimePicker = ref;
              }}
              onCancel={() => this.onCancel()}
              minuteInterval={30}
              //maxHour={16}
              selectedHour={"8"}
              onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
            />
          </View>
          <Divider style={{ backgroundColor: "rgba(0, 0, 0, .38)", alignSelf: 'center', width: width * 0.9 }} />
          <Text style={{ fontSize: 12, marginTop: 20, marginBottom: 20, marginLeft: 20 }}>Elija el horario del último turno</Text>

          <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => this.TimePicker2.open()}
              style={{ marginLeft: 25 }}>
              <Text style={{ color: this.state.colTx2, fontSize: 14, paddingLeft: 8 }}>{this.state.salida}</Text>
            </TouchableOpacity>
            <Icon name={'caret-down'} type='FontAwesome' style={{ color: "rgba(0, 0, 0, .38)", fontSize: 18, alignSelf: 'flex-end', marginRight: 20 }}></Icon>
            <TimePicker
              ref={ref => {
                this.TimePicker2 = ref;
              }}
              onCancel={() => this.onCancel2()}
              minuteInterval={30}
              //maxHour={16}
              selectedHour={"8"}
              onConfirm={(hour, minute) => this.onConfirm2(hour, minute)}
            /></View>
          <Divider style={{ backgroundColor: "rgba(0, 0, 0, .38)", alignSelf: 'center', width: width * 0.9 }} />
          <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 12, marginLeft: 20 }}>Elija la hora de almuerzo (opcional) </Text>
            <TouchableOpacity onPress={() => this.showAlert()}>
              <Image style={{ height: 16, width: 16 }} source={require('../assets/Images/information.png')} />
            </TouchableOpacity>
          </View>
          <Overlay overlayStyle={{ height: '28%' }} isVisible={showAlert} onBackdropPress={() => this.hideAlert()}>
            <View>

              <Text style={{ textAlign: "center", marginTop: 20 }}>HORA DE ALMUERZO</Text>
              <Text style={{ textAlign: "justify", fontSize: 12, marginTop: 20, marginHorizontal: 5 }}>  El horario de almuerzo es opcional y posee una duración de 1 Hs, por lo que el horario que seleccione será el inicio de su hora de almuerzo</Text>
              <TouchableOpacity style={{ backgroundColor: '#e93923', width: 140, alignSelf: 'center', marginTop: 30 }} onPress={() => this.hideAlert()} >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 11, marginVertical: 10, marginHorizontal: 8, textAlign: 'center' }}>ACEPTAR</Text>
              </TouchableOpacity>
            </View>
          </Overlay>
          <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => this.TimePicker3.open()}
              style={{ marginLeft: 25 }}>
              <Text style={{ color: this.state.colTx3, fontSize: 14, paddingLeft: 8 }}>{this.state.almuerzo}</Text>
            </TouchableOpacity>
            <Icon name={'caret-down'} type='FontAwesome' style={{ color: "rgba(0, 0, 0, .38)", fontSize: 18, alignSelf: 'flex-end', marginRight: 20 }}></Icon>

            <TimePicker
              ref={ref => {
                this.TimePicker3 = ref;
              }}
              onCancel={() => this.onCancel3()}
              minuteInterval={30}
              //maxHour={16}
              selectedHour={"8"}
              onConfirm={(hour, minute) => this.onConfirm3(hour, minute)}
            />
          </View>
          <Divider style={{ backgroundColor: "rgba(0, 0, 0, .38)", alignSelf: 'center', width: width * 0.9 }} />

          <CheckBox
            title={stringCheck}
            checked={this.state.checked}
            //checked={false}
            onPress={() => this.setState({ checked: !this.state.checked })}
            checkedColor='#1F77A5'
            containerStyle={{ backgroundColor: 'white', borderColor: 'white' }}
            textStyle={{ fontWeight: 'normal', fontSize: 12 }}
          //checkedIcon={<Ionicons name='md-checkbox' size={16} color='#e93922'></Ionicons> }
          />
          <TouchableOpacity
            onPress={() => this.AbrirPop()}
            style={{ width: 180, alignSelf: 'center', backgroundColor: '#e93923', marginTop: 20 }}>
            <Text style={{ marginVertical: 10, fontSize: 11, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>CONFIRMAR</Text>
          </TouchableOpacity>
          <Overlay overlayStyle={{ height: '18%' }} isVisible={showAlert2}>
            <View>
              <Text style={{ textAlign: "center", marginTop: 20 }}>SE HA AGREGADO SU TURNO CON ÉXITO</Text>
              <TouchableOpacity style={{ backgroundColor: '#1F77A5', width: 140, alignSelf: 'center', marginTop: 30 }} onPress={() => this.llevarIn()} >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 11, marginVertical: 10, marginHorizontal: 8, textAlign: 'center' }}>VOLVER AL INICIO</Text>
              </TouchableOpacity>
            </View>
          </Overlay>
          <Overlay overlayStyle={{ height: '18%' }} isVisible={showAlert3}>
            <View>
              <Text style={{ textAlign: "center", marginTop: 20 }}>POR FAVOR, COMPLETE TODOS LOS CAMPOS</Text>
              <TouchableOpacity style={{ backgroundColor: '#e93923', width: 140, alignSelf: 'center', marginTop: 30 }} onPress={() => this.llevarIn()} >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 11, marginVertical: 10, marginHorizontal: 8, textAlign: 'center' }}>ACEPTAR</Text>
              </TouchableOpacity>
            </View>
          </Overlay>
        </ScrollView>
      );
    }
  }
}
