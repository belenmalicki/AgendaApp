import React, { Component, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Image,TextInput, Dimensions, TouchableOpacity, ScrollView, Button, Platform } from 'react-native';
import {Card, CardItem, Col, DatePicker, Icon} from 'native-base'
import { Divider } from 'react-native-elements';
import CardSolicitarTurno from "./CardsSolicitarTurno"
import CardDisponibilidadTurno from './CardDisponibilidadTurno'
import AwesomeAlert from 'react-native-awesome-alerts';
import ModalSelector from 'react-native-modal-selector'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Overlay } from 'react-native-elements';
import ApiController from '../controller/ApiController'
import AsyncStorage from '@react-native-community/async-storage'
import { Calendar, CalendarList, Agenda,LocaleConfig } from 'react-native-calendars';

/*ESTADOS DE estadoTurnos
1: Hay turno disponible en la fecha que eligió el paciente con el profesional elegido
2: No hay turno disponible en esa fecha, te muestro las mas cercanas
3: No hay turnos con el profesional elegido durante estos dos meses, te muestro otro prof. y lista espera profesional
4: No podes elegir ese turno porque ya tenes un turno de esa especialidad en esa fecha
5:No hay turnos disponibles en todos los dos meses: Lista de espera
*/
let turnos=[{
  "id": 1,
  "fecha_inicio": "2020-07-02T13:00:00.000Z",
  "fecha_fin": "2020-07-02T13:30:00.000Z",
  "sede": "Belgrano",
  "estado": "disponible",
  "createdAt": "2020-07-01T03:44:26.442Z",
  "updatedAt": "2020-07-01T03:44:26.442Z",
  "especialidad_id": 1,
  "jornada_id": 1,
  "medico_id": 1,
  "paciente_id": null,
  "medico": {
      "id": 1,
      "nro_matricula": "621248963",
      "foto_carnet": "https://i.imgur.com/rOeqi15.jpg",
      "createdAt": "2020-07-01T03:31:04.065Z",
      "updatedAt": "2020-07-01T03:31:04.065Z",
      "usuario_id": 2,
      "datos": {
          "id": 2,
          "apellido": "Rodríguez",
          "nombre": "Carla",
          "genero": "femenino"
      }
  },
  "especialidad": {
      "titulo": "Cardiología"
  }
},
{
  "id": 2,
  "fecha_inicio": "2020-07-02T13:30:00.000Z",
  "fecha_fin": "2020-07-02T14:00:00.000Z",
  "sede": "Belgrano",
  "estado": "disponible",
  "createdAt": "2020-07-01T03:44:26.442Z",
  "updatedAt": "2020-07-01T03:44:26.442Z",
  "especialidad_id": 1,
  "jornada_id": 1,
  "medico_id": 1,
  "paciente_id": null,
  "medico": {
      "id": 1,
      "nro_matricula": "621248963",
      "foto_carnet": "https://i.imgur.com/rOeqi15.jpg",
      "createdAt": "2020-07-01T03:31:04.065Z",
      "updatedAt": "2020-07-01T03:31:04.065Z",
      "usuario_id": 2,
      "datos": {
          "id": 2,
          "apellido": "Rodríguez",
          "nombre": "Carla",
          "genero": "femenino"
      }
  },
  "especialidad": {
      "titulo": "Cardiología"
  }
}
]


const { width } = Dimensions.get('window');


export default class SolicitarTurno extends Component {
    constructor(props){
        super(props)
        this.state={
            select:'',
            espe:'',
            dia:'Seleccione fecha',
            profesional:'',
            estadoTurnos: 0,
            showAlert: false,
            showAlert2: false,
            textInputValueEs:{},
            textInputValuePr:{},
            especialidades:[],
            profesionales:[],
            turnos:[],
            usuario:{},
            dias:[ 'Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            meses:["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
        }
    }

    componentDidMount() {
      this.getUsuario()
      ApiController.getEspecialidades(this.handleEspecialidades.bind(this))
    }

    handleEspecialidades(response) {
      response.json().then((especialidades) => {
        this.setState({ especialidades: especialidades});
      })
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

    onChangeChoose(option){
      this.setState({textInputValueEs:option})
      this.setState({profesional:'',espe:option.titulo,estadoTurnos:0})
      let data={
        titulo:option.titulo
      }
      ApiController.getMedicosEspecialidad(data,this.handleProfesionales.bind(this))
    }

    handleProfesionales(response) {
      response.json().then((profesionales) => {
        this.setState({ profesionales: profesionales});
      })
    }

  abrirPop=()=>{
    if (this.state.espe==''){
      this.setState({ showAlert: true});
    }else{
      let data
      if(!this.state.profesional=='' && !this.state.select==''){
        data={
          especialidad_id:this.state.textInputValueEs.id,
          medico_id:this.state.textInputValuePr.Medico_especialidad.medico_id,
          fecha:this.state.select
        }
      }else if(!this.state.profesional==''){
        data={
          especialidad_id:this.state.textInputValueEs.id,
          medico_id:this.state.textInputValuePr.Medico_especialidad.medico_id
        }
        }else if(!this.state.select==''){
          data={
            especialidad_id:this.state.textInputValueEs.id,
            fecha:this.state.select
          }
        }else{
          data={
            especialidad_id:this.state.textInputValueEs.id
          }
        }
        ApiController.getTurnos(data,this.handleTurnos.bind(this))
      }   
  }
  abrirPop2=()=>{this.setState({showAlert2:true})}

  handleTurnos(response){
    response.json().then((turnos) => {
      if(turnos.length>0 || this.state.estadoTurnos==5){//si se encontro algun turno o si no hay turnos en 2 meses
        var turnosPaciente=this.props.navigation.getParam('turnosPaciente', [])//verificar que el usuario no tenga turno para ese dia
         if(turnosPaciente.find(t=> (new Date( t.fecha_inicio).getDate()+new Date(t.fecha_inicio).getMonth()) == new Date(this.state.select).getDate()+new Date(this.state.select).getMonth())!=undefined){
          this.setState({estadoTurnos:4});
        }else{ 
          if(this.state.estadoTurnos==0){
            this.setState({estadoTurnos:1});
          }
          this.setState({ turnos: turnos})
        }
      }else{//si no hay turnos por otras razones
          if(this.state.select!==''){//buscar sin fecha especifica
            this.setState({estadoTurnos:2,select:''});
          }else{
            if(this.state.profesional!==''){//buscar los otros profesional
              this.setState({estadoTurnos:3,profesional:''});
            }else{
              if(this.state.select==''&&this.state.profesional==''){//si no hay mas profesionales no hay turno
                this.setState({estadoTurnos:5});
              }
            }
          }
          this.abrirPop()
      }
    })
  }

  cerrarPop=()=>{
    this.setState({ showAlert: false});
  }
  cerrarPop2=()=>{
    this.setState({ showAlert2: false});
  }

  buscar(){
    if(this.state.estadoTurnos!=1){
      return(<View>
       <CardDisponibilidadTurno nro={this.state.estadoTurnos} />
      </View>)
    }
    if(this.state.estadoTurnos==1||this.state.estadoTurnos==2||this.state.estadoTurnos==3){
      var reduced= this.state.turnos.reduce(function(result,object){
        var key=new Date(object.fecha_inicio).getDate().toString()+'-'+new Date(object.fecha_inicio).getMonth().toString()+'-'+new Date(object.fecha_inicio).getFullYear().toString()
        if(result[key])
          result[key].push(object);
        else
          result[key] = [ object ];
        return result;
      },{})
      var mapeado= []
      var keys=Object.keys(reduced)
      var turnosPaciente=this.props.navigation.getParam('turnosPaciente', [])
      for (let index = 0; index < keys.length; index++) {
        if(turnosPaciente.find(t=> (new Date( t.fecha_inicio).getDate().toString()+'-'+new Date(t.fecha_inicio).getMonth().toString()+'-'+new Date(t.fecha_inicio).getFullYear().toString()) == keys[index])==undefined){
          mapeado.push(reduced[keys[index]])
        }
      }
      return(<View>
      <View style={{backgroundColor:'#1f77a5',marginHorizontal:10, paddingLeft:8}}>
          <Text style={{fontSize:14, color:'white', backgroundColor:'#1f77a5',  marginVertical:5, fontWeight:"bold"}}>
            Solicite un turno para {this.state.espe}
          </Text>
          </View>
          {mapeado.map((j)=><View>
            <View style={{flexDirection:"row", marginLeft:20, marginTop:15}}>
            <Text style={{fontSize:14,color:'#e93922', fontWeight:'bold'}}>
              {new Date(j[0].fecha_inicio).getDate()} {this.state.dias[(new Date(j[0].fecha_inicio).getDay())]}
            </Text>
            <Text style={{fontSize:14, marginLeft:2}}>
              {this.state.meses[new Date(j[0].fecha_inicio).getMonth()]} 
            </Text>
          </View>
          {j.map((item,i)=>
          <CardSolicitarTurno key={i} id={item.id} hora={new Date(item.fecha_inicio).getHours()+'.'+new Date(item.fecha_inicio).getMinutes()} med={item.medico.datos} espe={item.especialidad.titulo} fecha={item.fecha_inicio}/>)}
          </View>)}
        </View>)
    }
  }
  /* buscar(){
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
      if(this.state.textInputValueEs===''||this.state.textInputValuePr===''||this.state.select.toString().substr(0,10)===new Date().toString().substr(0,10) ||(this.state.textInputValueEs===''&&this.state.textInputValuePr===''&& this.state.select.toString().substr(0,10)===new Date().toString().substr(0,10) ) ){
           
        return (      
         <TouchableOpacity onPress={() => this.abrirPop()}
              style={{marginTop:20, width:115 ,alignSelf:'flex-end', backgroundColor:'#e93922', marginRight:20}}>
              <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>BUSCAR</Text>
          </TouchableOpacity>  
       
        )
    }
    else{

        if(this.state.estadoTurnos==1){
            return(
                <View>
                  <TouchableOpacity 
                  style={{marginVertical:20, width:115 ,alignSelf:'flex-end', backgroundColor:'#e93922', marginRight:20}}>
                      <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>BUSCAR</Text>
                </TouchableOpacity> 



                  <View style={{backgroundColor:'#1f77a5',marginHorizontal:10, paddingLeft:8}}>
                      <Text style={{fontSize:14, color:'white', backgroundColor:'#1f77a5',  marginVertical:5, fontWeight:"bold"}}>
                          Solicite un turno para {this.state.textInputValueEs}
                      </Text>
                </View>
                <View style={{flexDirection:"row", marginLeft:20, marginTop:15}}>
              <Text style={{fontSize:14,color:'#e93922', fontWeight:'bold'}}>
             
              {this.state.select.toLocaleDateString('es-ES', options).substr(5,2)} {this.state.select.toLocaleDateString('es-ES', options).substr(0,3)} 
              </Text>
              <Text style={{fontSize:14, marginLeft:2}}>
               {this.state.select.toLocaleDateString('es-ES', options).substr(7,4)} 
              </Text>
            </View>
              <CardSolicitarTurno espe={this.state.textInputValueEs} fecha={this.state.select} />
                  </View>
              
            )
        }else if(this.state.estadoTurnos==2){
          return(
              <View>
                <TouchableOpacity 
                style={{marginVertical:20, width:115 ,alignSelf:'flex-end', backgroundColor:'#e93922', marginRight:20}}>
                    <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>BUSCAR</Text>
              </TouchableOpacity> 
              <CardDisponibilidadTurno nro={this.state.estadoTurnos} />
                <View style={{backgroundColor:'#1f77a5',marginHorizontal:10, paddingLeft:8}}>
                    <Text style={{fontSize:14, color:'white', backgroundColor:'#1f77a5',  marginVertical:5, fontWeight:"bold"}}>
                        Solicite un turno para {this.state.textInputValueEs}
                    </Text>
              </View>
              <View style={{flexDirection:"row", marginLeft:20, marginTop:15}}>
            <Text style={{fontSize:14,color:'#e93922', fontWeight:'bold'}}>
            {this.state.select.toLocaleDateString('es-ES', options).substr(5,2)} {this.state.select.toLocaleDateString('es-ES', options).substr(0,3)}
            </Text>
            <Text style={{fontSize:14, marginLeft:2}}>
            {this.state.select.toLocaleDateString('es-ES', options).substr(7,4)} 
            </Text>
          </View>
          <CardSolicitarTurno espe={this.state.textInputValueEs} fecha={this.state.select} />
                </View> 
          )
        }else if(this.state.estadoTurnos==3){
        return(
            <View>
              <TouchableOpacity 
              style={{marginVertical:20, width:115 ,alignSelf:'flex-end', backgroundColor:'#e93922', marginRight:20}}>
                  <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>BUSCAR</Text>
            </TouchableOpacity> 
            <CardDisponibilidadTurno nro={this.state.estadoTurnos} />
              <View style={{backgroundColor:'#1f77a5',marginHorizontal:10, paddingLeft:8}}>
                  <Text style={{fontSize:14, color:'white', backgroundColor:'#1f77a5',  marginVertical:5, fontWeight:"bold"}}>
                      Solicite un turno para {this.state.textInputValueEs}
                  </Text>
            </View>
            <View style={{flexDirection:"row", marginLeft:20, marginTop:15}}>
          <Text style={{fontSize:14,color:'#e93922', fontWeight:'bold'}}>
          {this.state.select.toLocaleDateString('es-ES', options).substr(5,2)} {this.state.select.toLocaleDateString('es-ES', options).substr(0,3)}
          </Text>
          <Text style={{fontSize:14, marginLeft:2}}>
          {this.state.select.toLocaleDateString('es-ES', options).substr(7,4)} 
          </Text>
        </View>
        <CardSolicitarTurno espe={this.state.textInputValueEs} fecha={this.state.select} />
              </View>  
        )}else if(this.state.estadoTurnos==4){
          return(
              <View>
                <TouchableOpacity 
                style={{marginVertical:20, width:115 ,alignSelf:'flex-end', backgroundColor:'#e93922', marginRight:20}}>
                    <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>BUSCAR</Text>
              </TouchableOpacity> 
              <CardDisponibilidadTurno nro={this.state.estadoTurnos} />
                </View> 
        )}else if(this.state.estadoTurnos==5){
            return(
                <View>
                  <TouchableOpacity 
                  style={{marginVertical:20, width:115 ,alignSelf:'flex-end', backgroundColor:'#e93922', marginRight:20}}>
                      <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>BUSCAR</Text>
                </TouchableOpacity> 
                <CardDisponibilidadTurno nro={this.state.estadoTurnos} />
                  </View>
        )}

  }else {
    <TouchableOpacity onPress={() => this.abrirPop()}
              style={{marginTop:20, width:115 ,alignSelf:'flex-end', backgroundColor:'#e93922', marginRight:20}}>
              <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>BUSCAR</Text>
     </TouchableOpacity>  
    
  }*/

  render() {
      var date = new Date().getDate(); //Current Date
      var monthFut = new Date().getMonth() + 2; //Current Month + 2
      var year = new Date().getFullYear(); //Current Year
    var i=0
      var item = Object.assign({}, ...turnos.map(j => {
        let fechastring = j.fecha_inicio.slice(0, 10);
        return ({ [fechastring]: { marked:true } })
    }
    ))
    if(this.state.dia!='Seleccione fecha'){
        item[this.state.dia].selected=true
            }
    let cambio = this.state.dia === 'Seleccione fecha' ? 'rgba(0,0,0,0.22)' : 'black'
    console.log('selec', this.state.select)
      return (
        //style no funciona con ScrollView, debe ser contentContainerStyle
        //flex:1 hacia que la pantalla no se moviera con el scrollview
        <ScrollView>
            <Text style={{fontSize:17, textAlign:'center', marginTop:20, marginBottom:10}}>SOLICITAR TURNO</Text>   
            {/*Modal selector*/}
            <Text style={{fontSize:12,  marginTop:20, marginBottom:20, marginLeft:20}}>Especialidad:</Text>   
            <View style={{alignSelf:'center',width:width*0.9, marginTop:0}}>
                <ModalSelector
                    data={this.state.especialidades}
                    initValue="Seleccione especialidad"
                    keyExtractor={item=>item.id}
                    labelExtractor={item=>item.titulo}
                    //supportedOrientations={['landscape']}
                  //  optionTextStyle={color:'red'}
                    animationType={'none'}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option)=>{ this.onChangeChoose(option) }}>
                 <View style={{flexDirection:'row',marginBottom:10,justifyContent:'space-between' }}> 
                      <TextInput
                            style={{borderWidth:1,borderColor:'white', fontSize:14,paddingLeft:8}}
                            editable={false}
                            placeholder="Seleccione especialidad"
                            value={this.state.espe} />
                      <Icon name={'caret-down'} type='FontAwesome'  style={{color:"rgba(0, 0, 0, .38)", fontSize:18, alignSelf:'flex-end'}}></Icon>
                  </View>
                  <Divider style={{ backgroundColor: "rgba(0, 0, 0, .38)",alignSelf:'center',width:width*0.9 }} />
                </ModalSelector>
            </View> 
             {/*Modal selector*/}
             <Text style={{fontSize:12,  marginTop:20, marginBottom:0, marginLeft:20}}>Profesional:</Text> 
            <View style={{alignSelf:'center',width:width*0.9, marginTop:20}}>
                <ModalSelector
                    data={this.state.profesionales}
                    initValue="Seleccione profesional"
                    keyExtractor={item=>item.Medico_especialidad.medico_id}
                    labelExtractor={item=>item.datos.apellido+' '+item.datos.nombre}
                    //supportedOrientations={['landscape']}
                   // optionTextStyle={color:'red'}
                    animationType={'none'}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option)=>{ this.setState({profesional:option.datos.apellido+' '+option.datos.nombre,textInputValuePr:option,estadoTurnos:0})}}>
                 <View style={{flexDirection:'row',marginBottom:10,justifyContent:'space-between' }}> 
                      <TextInput
                            style={{borderWidth:1,borderColor:'white', fontSize:14,paddingLeft:8}}
                            editable={false}
                            placeholder="Seleccione profesional"
                            value={this.state.profesional} />
                      <Icon name={'caret-down'} type='FontAwesome'  style={{color:"rgba(0, 0, 0, .38)", fontSize:18, alignSelf:'flex-end'}}></Icon>
                  </View>
                  <Divider style={{ backgroundColor: "rgba(0, 0, 0, .38)",alignSelf:'center',width:width*0.9 }} />
                </ModalSelector>
            </View>
            <Text style={{fontSize:12,  marginTop:20, marginBottom:0, marginLeft:20}}>Fecha:</Text> 
            <View style={{marginLeft:'3%', flexDirection:"row", justifyContent:'space-between',width:width*0.9}}>
              <TouchableOpacity style={{marginTop:20}}onPress={() => this.abrirPop2()}>
                <Text style={{paddingLeft:20,fontSize:14, color:cambio,marginBottom:10 }}>{this.state.dia}</Text>
            </TouchableOpacity>
              <Icon name={'caret-down'} type='FontAwesome'  style={{color:"rgba(0, 0, 0, .38)", fontSize:18,marginLeft:5  ,marginTop:20}}></Icon>
            </View> 
            <Divider style={{ backgroundColor: "rgba(0, 0, 0, .38)",alignSelf:'center',width:width*0.9 }} />
            <Overlay key={i++} overlayStyle={{height:width, width:width}} isVisible={this.state.showAlert2}>
            <View>
            <Calendar
                    current={new Date()}
                    minDate={new Date()}
                    maxDate={new Date(year, monthFut, date)}
                    onDayPress={(day) => {this.setState({dia:day.dateString}),this.setState({select:new Date(day.year,day.month, day.day)}),console.log('selected day', day.dateString)}}
                    onDayLongPress={(day) => {console.log('selected long day', day)}}
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    hideExtraDays={true}
                    disableMonthChange={true}
                    showWeekNumbers={true}
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    disableAllTouchEventsForDisabledDays={true}
                    renderHeader={(date) => {/*Return JSX*/}}
                    style={{height:0.8*width}}
                    markedDates={item}
                    theme={{agendaDayTextColor: '#1f77a5',
                            agendaDayNumColor: '#1f77a5',
                            todayTextColor: '#e93923',
                            dotColor: '#1f77a5',
                            arrowColor: '#e93923',
                            selectedDayBackgroundColor: '#1f77a5',}}
                    />
                <TouchableOpacity style={{backgroundColor:"#e93922", width:100, marginTop:20, alignSelf:"center"}} onPress={() => this.cerrarPop2()}>
                    <Text style={{fontSize:11,fontWeight:'bold', color:'white', marginVertical:8, textAlign:"center"}} >ACEPTAR</Text>
                </TouchableOpacity>
              </View>               
            </Overlay>
            <TouchableOpacity onPress={() => this.abrirPop()}
                style={{marginVertical:20, width:115 ,alignSelf:'flex-end', backgroundColor:'#e93922', marginRight:20}}>
                <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>BUSCAR</Text>
            </TouchableOpacity>
            {this.state.estadoTurnos!=0 && this.buscar()}
            <Overlay overlayStyle={{height:140}} isVisible={this.state.showAlert} >
              <View>
                  <Text style={{fontSize:14, lineHeight:18,color:'black',textAlign:'center', marginTop:20, marginHorizontal:8}}>POR FAVOR, SELECCIONE POR LO MENOS LA ESPECIALIDAD</Text>
                  <TouchableOpacity style={{backgroundColor:"#e93922", width:100, marginTop:20, alignSelf:"center"}} onPress={() => this.cerrarPop()}>
                      <Text style={{fontSize:11,fontWeight:'bold', color:'white', marginVertical:8, textAlign:"center"}} >ACEPTAR</Text>
                  </TouchableOpacity>
                </View>
            </Overlay>
        </ScrollView>
    );
  }
}