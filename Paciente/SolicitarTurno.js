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
            corazon: false,
            //chosenDate:' ',
            select: new Date(),
            espe:' ',
            estadoTurnos:5,
            showAlert: false,
            textInputValueEs:'',
            textInputValuePr:''
            
        }
        this.setDate = this.setDate.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }

    setDate(newDate) {
      this.setState({ chosenDate: "Seleccione una fecha"});
      this.setState({ select: newDate});
    }
    onChangeText(text) {
          this.setState({ espe: text });
       
    } 
    
    _changeState = () =>{

        if (this.state.corazon == false){
          this.setState({corazon: true})
          this.setState({ showAlert: true});
    
        }
        else{
          this.setState({corazon:false})
          this.setState({ showAlert: true});
    
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
  abrirPop=()=>{
    if (this.state.corazon == false){
      this.setState({corazon: true})
      this.setState({ showAlert: true});
    }else{
      this.setState({corazon:false})
      this.setState({ showAlert: true});
    }
  }
  cerrarPop=()=>{
    this.setState({ showAlert: false});
  }

    buscar(){
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
    }/*else {
      <TouchableOpacity onPress={() => this.abrirPop()}
                style={{marginTop:20, width:115 ,alignSelf:'flex-end', backgroundColor:'#e93922', marginRight:20}}>
                <Text style={{marginVertical:10,fontSize:11, color:'white', textAlign:'center', fontWeight:'bold'}}>BUSCAR</Text>
       </TouchableOpacity>  
      
    }*/}
      
  render() {
    /*let especialidad = [{
        value: 'Cardiologia',
      }, {
        value: 'Neumonologia',
      }, {
        value: 'Oculista',
      }];
      let profesional = [{
        value: 'Todos los profesionales',
      }, {
        value: 'Rodriguez Carla',
      }, {
        value: 'Casares Luis',
      }];*/
      var date = new Date().getDate(); //Current Date
      var monthFut = new Date().getMonth() + 2; //Current Month + 2
      var year = new Date().getFullYear(); //Current Year
      var mensaje = this.state.espe +"\n" +this.state.select.toString().substr(8,2)+' ' +this.state.select.toString().substr(0,3)+' ' + this.state.select.toString().substr(4,3) +"\n"  +  "Horario"
      console.log(mensaje)
      const {showAlert} = this.state;
      let index = 0;
        const especialidad = [
            { key: index++, section: true, label: 'Especialidad' },
            { key: index++, label: 'Cardiología' },
            { key: index++, label: 'Neumonología' },
            { key: index++, label: 'Oculista', accessibilityLabel: 'Tap here for cranberries' },
            { key: index++, label: 'Psicología', customKey: 'Not a fruit' }
        ];
         const profesional = [
            { key: index++, section: true, label: 'Profesional' },
            { key: index++, label: 'Todos los profesionales' },
            { key: index++, label: 'Rodriguez Carla' },
            { key: index++, label: 'Casares Luis', accessibilityLabel: 'Tap here for cranberries' },
            { key: index++, label: 'Osvaldo Daniela', customKey: 'Not a fruit' }
        ];
       console.log(this.state.textInputValuePr, 'especialidad')
      return (
        <ScrollView style={{flex:1}} >
       
            <Text style={{fontSize:17, textAlign:'center', marginTop:20, marginBottom:10}}>SOLICITAR TURNO</Text>   

           {/* <View style={{alignSelf:'center',width:width*0.9}}>
                <Dropdown
                    label='Seleccione especialidad'
                    data={especialidad}
                    onChangeText={this.onChangeText}
                    />
            </View>
            <View style={{alignSelf:'center',width:width*0.9}}>
                <Dropdown
                    label='Seleccione Profesional'
                    data={profesional}   
                    />
            </View> */}

            
            {/*Modal selector*/}
            <Text style={{fontSize:12,  marginTop:20, marginBottom:20, marginLeft:20}}>Especialidad:</Text>   
            <View style={{alignSelf:'center',width:width*0.9, marginTop:0}}>
                <ModalSelector
                    data={especialidad}
                    initValue="Seleccione especialidad"
                    //supportedOrientations={['landscape']}
                  //  optionTextStyle={color:'red'}
                    animationType={'none'}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option)=>{ this.setState({textInputValueEs:option.label}) }}>
                 <View style={{flexDirection:'row',marginBottom:10,justifyContent:'space-between' }}> 
                      
                      <TextInput
                            style={{borderWidth:1,borderColor:'white', fontSize:14,paddingLeft:8}}
                            editable={false}
                            placeholder="Seleccione especialidad"
                            value={this.state.textInputValueEs} />
                      <Icon name={'caret-down'} type='FontAwesome'  style={{color:"rgba(0, 0, 0, .38)", fontSize:18, alignSelf:'flex-end'}}></Icon>
                  </View>
                  <Divider style={{ backgroundColor: "rgba(0, 0, 0, .38)",alignSelf:'center',width:width*0.9 }} />
                </ModalSelector>
            </View> 
             {/*Modal selector*/}
             <Text style={{fontSize:12,  marginTop:20, marginBottom:0, marginLeft:20}}>Profesional:</Text> 
            <View style={{alignSelf:'center',width:width*0.9, marginTop:20}}>
                <ModalSelector
                    data={profesional}
                    initValue="Seleccione profesional"
                    //supportedOrientations={['landscape']}
                   // optionTextStyle={color:'red'}
                    animationType={'none'}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option)=>{ this.setState({textInputValuePr:option.label})}}>
                 <View style={{flexDirection:'row',marginBottom:10,justifyContent:'space-between' }}> 
                      <TextInput
                            style={{borderWidth:1,borderColor:'white', fontSize:14,paddingLeft:8}}
                            editable={false}
                            placeholder="Seleccione profesional"
                            value={this.state.textInputValuePr} />
                      <Icon name={'caret-down'} type='FontAwesome'  style={{color:"rgba(0, 0, 0, .38)", fontSize:18, alignSelf:'flex-end'}}></Icon>
                  </View>
                  <Divider style={{ backgroundColor: "rgba(0, 0, 0, .38)",alignSelf:'center',width:width*0.9 }} />
                </ModalSelector>
            </View> 
            
            <Text style={{fontSize:12,  marginTop:20, marginBottom:0, marginLeft:20}}>Fecha:</Text> 
            <View style={{marginLeft:'3%', flexDirection:"row", justifyContent:'space-between',width:width*0.9}}>
              <View style={{width:width*0.88}}>
              { /* <Text style={{color:"rgba(0, 0, 0, .38)", marginLeft:"2%",fontSize:12 }}>
                  {this.state.chosenDate}
                </Text>*/}
                    <DatePicker 
                      androidMode={"calendar"}
                      locale={"es"}
                      minimumDate={new Date()}
                      maximumDate={new Date(year, monthFut, date)}
                      placeHolderText="Seleccione una fecha"
                      placeHolderTextStyle={{ color: "rgba(0, 0, 0, .22)", fontSize:14,paddingLeft:18 }}
                      onDateChange={this.setDate}  
                    />

              </View>
              
              <Icon name={'caret-down'} type='FontAwesome'  style={{color:"rgba(0, 0, 0, .38)", fontSize:18,marginLeft:5  ,marginTop:25}}></Icon>
            </View> 
            <Divider style={{ backgroundColor: "rgba(0, 0, 0, .38)",alignSelf:'center',width:width*0.9 }} />
            {this.buscar()}
       { /*   <AwesomeAlert
            //show={showAlert}
            showProgress={false}
      
            messageStyle={{fontSize:14, lineHeight:18,color:'black',textAlign:'center'}}
            message="POR FAVOR, COMPLETE TODOS LOS CAMPOS"
            
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            confirmButtonStyle={{paddingHorizontal:40, borderRadius:0, marginTop:10}}
            showConfirmButton={true}
            confirmButtonTextStyle={{fontSize:11,fontWeight:'bold'}}
            //contentContainerStyle={{height:280, marginBottom:100}}
            confirmText="ACEPTAR"
            confirmButtonColor="#e93922"
            
            onConfirmPressed={() => {
              this.hideAlert();
              console.log('pressed')
            }}
    />*/}
   <Overlay overlayStyle={{height:140}} isVisible={showAlert} >
      <Text style={{fontSize:14, lineHeight:18,color:'black',textAlign:'center', marginTop:20, marginHorizontal:8}}>POR FAVOR, COMPLETE TODOS LOS CAMPOS</Text>
      <TouchableOpacity style={{backgroundColor:"#e93922", width:100, marginTop:20, alignSelf:"center"}} onPress={() => this.cerrarPop()}>
          <Text style={{fontSize:11,fontWeight:'bold', color:'white', marginVertical:8, textAlign:"center"}} >ACEPTAR</Text>
      </TouchableOpacity>
   </Overlay>
       
        </ScrollView>
    );
  }
}
