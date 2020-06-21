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

/*ESTADOS DE estadoTurnos
1: Hay turno disponible en la fecha que eligió el paciente con el profesional elegido
2: No hay turno disponible en esa fecha, te muestro las mas cercanas
3: No hay turnos con el profesional elegido durante estos dos meses, te muestro otro prof. y lista espera profesional
4: No podes elegir ese turno porque ya tenes un turno de esa especialidad en esa fecha
5:No hay turnos disponibles en todos los dos meses: Lista de espera
*/



const { width } = Dimensions.get('window');


export default class SolicitarTurno extends Component {
    constructor(props){
        super(props)
        this.state={
            select:'',
            espe:'',
            profesional:'',
            estadoTurnos: 0,
            showAlert: false,
            textInputValueEs:{},
            textInputValuePr:{},
            especialidades:[],
            profesionales:[],
            turnos:[],
            dias:['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
            meses:["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
        }
    }

    componentDidMount() {
      ApiController.getEspecialidades(this.handleEspecialidades.bind(this))
    }

    handleEspecialidades(response) {
      response.json().then((especialidades) => {
        this.setState({ especialidades: especialidades});
      })
    }

    onChangeChoose(option){
      this.setState({textInputValueEs:option})
      this.setState({profesional:'',espe:option.titulo})
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

  handleTurnos(response){
    response.json().then((turnos) => {
      this.setState({ turnos: turnos,estadoTurnos:1});
    })
  }

  cerrarPop=()=>{
    this.setState({ showAlert: false});
  }

  buscar(){
    if(!this.state.estadoTurnos==1){
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
      for (let index = 0; index < keys.length; index++) {
        mapeado.push(reduced[keys[index]])
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
              {new Date(j[0].fecha_inicio).getDate()} {this.state.dias[(new Date(j[0].fecha_inicio).getDate()-1)%7]}
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
                    labelExtractor={item=>item.datos.nombre}
                    //supportedOrientations={['landscape']}
                   // optionTextStyle={color:'red'}
                    animationType={'none'}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option)=>{ this.setState({profesional:option.datos.nombre,textInputValuePr:option})}}>
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
              <View style={{width:width*0.88}}>
                    <DatePicker 
                      androidMode={"calendar"}
                      locale={"es"}
                      minimumDate={new Date()}
                      maximumDate={new Date(year, monthFut, date)}
                      placeHolderText="Seleccione una fecha"
                      placeHolderTextStyle={{ color: "rgba(0, 0, 0, .22)", fontSize:14,paddingLeft:18 }}
                      onDateChange={(fecha)=>(this.setState({select:fecha}))}
                    />
              </View>
              <Icon name={'caret-down'} type='FontAwesome'  style={{color:"rgba(0, 0, 0, .38)", fontSize:18,marginLeft:5  ,marginTop:25}}></Icon>
            </View> 
            <Divider style={{ backgroundColor: "rgba(0, 0, 0, .38)",alignSelf:'center',width:width*0.9 }} />
            <TouchableOpacity onPress={() => this.abrirPop()}
                style={{marginVertical:20, width:115 ,alignSelf:'flex-end', backgroundColor:'#e93922', marginRight:20}}>
                <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>BUSCAR</Text>
            </TouchableOpacity>
            {this.state.estadoTurnos==1 && this.buscar()}
            <Overlay overlayStyle={{height:140}} isVisible={this.state.showAlert} >
                <Text style={{fontSize:14, lineHeight:18,color:'black',textAlign:'center', marginTop:20, marginHorizontal:8}}>POR FAVOR, SELECCIONE POR LO MENOS LA ESPECIALIDAD</Text>
                <TouchableOpacity style={{backgroundColor:"#e93922", width:100, marginTop:20, alignSelf:"center"}} onPress={() => this.cerrarPop()}>
                    <Text style={{fontSize:11,fontWeight:'bold', color:'white', marginVertical:8, textAlign:"center"}} >ACEPTAR</Text>
                </TouchableOpacity>
            </Overlay>
        </ScrollView>
    );
  }
}