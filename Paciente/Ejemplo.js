import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import TimePicker from "react-native-24h-timepicker";
 
class Ejemplo extends Component {
  constructor() {
    super();
    this.state = {
      entrada:'',
      hourEnt:'',
      salida:""
    };
  }
 
  onCancel() {
    this.TimePicker.close();
  }
 
  onConfirm(hour, minute) {
    if(hour>=8 && hour<=19){
    this.setState({ entrada: `${hour}:${minute}` });
    this.setState({ hourEnt: hour});
    //console.log("confirm1", hour, minute)
    this.TimePicker.close();
    }else{
        console.log('no perro')
    }
    
  }
  onCancel2() {
    this.TimePicker.close();
  }
 
  onConfirm2(hour, minute) {
      //console.log('hour2',this.state.hour)
      var HsEntrada= parseInt(this.state.hourEnt)
      //console.log('hour', parseInt(entrada))
    if(hour>HsEntrada){
    this.setState({ salida: `${hour}:${minute}` });
    this.TimePicker2.close();
    }else{
        console.log('no perro 2')
    }
    
  }
 
  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity
          onPress={() => this.TimePicker.open()}
          style={styles.button}>
          <Text style={styles.buttonText}>TIMEPICKER</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{this.state.entrada}</Text>
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
        <TouchableOpacity
          onPress={() => this.TimePicker2.open()}
          style={styles.button}>
          <Text style={styles.buttonText}>TIMEPICKER 2</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{this.state.salida}</Text>
        <TimePicker
          ref={ref => {
            this.TimePicker2 = ref;
          }}
          onCancel={() => this.onCancel2()}
          minuteInterval={30}
          //maxHour={16}
          selectedHour={"8"}
          onConfirm={(hour, minute) => this.onConfirm2(hour, minute)}
        />
     
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 50
  },
  text: {
    fontSize: 20,
    marginTop: 10
  },
  button: {
    backgroundColor: "#4EB151",
    paddingVertical: 11,
    paddingHorizontal: 17,
    borderRadius: 3,
    marginVertical: 50
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  }
});
 
export default Ejemplo;