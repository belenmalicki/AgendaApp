const urlLocal = "http://192.168.0.8:8000"
const urlHeroku = "https://centro-medico-backend-h.herokuapp.com"


class ApiController {

    //parametros: email, password
    login(data, callback){
        const endpoint = `${urlHeroku}/api/verificarUsuario` 
        console.log('verificando usuario')
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data) // data can be `string` or {object}!
        }).then((response) => {
            console.log('listo!')
            callback(response)
        }).catch(err => console.log(err))
    };

    //parametros: email, dni, nro_socio
    verificarDatos(data, callback){
        const endpoint = `${urlHeroku}/api/verificarCuenta`
        console.log('verificando datos')
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data) // data can be `string` or {object}!
        }).then((response) => {
            console.log('listo!')
            callback(response)
        }).catch(err => console.log(err))
    };

    //parametros: usuario_id, password
    updatePassword(data, callback){
        const endpoint = `${urlHeroku}/api/updatePassword`
        console.log('actualizando contraseña')
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data) // data can be `string` or {object}!
        }).then((response) => {
            console.log('listo!');
            callback(response)
        }).catch(err => console.log(err))
    }

    //parametro: paciente_id
    getTurnosPaciente(data, callback){
        const endpoint = `${urlHeroku}/api/getTurnosPaciente`;
        console.log('obteniendo turnos del paciente')
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data) // data can be `string` or {object}!
        }).then((response) => {
            console.log('listo!');
            callback(response)
        }).catch(err => console.log(err))
    }

    //parametros: turno_id, paciente_id
    pedirTurno(data, callback){
        const endpoint = `${urlHeroku}/api/pedirTurno`;
        console.log('pidiendo turno');
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data) // data can be `string` or {object}!
        }).then((response) => {
            console.log('listo!');
            callback(response)
        }).catch(err => console.log(err))
    }


    //parametro: turno_id
    confirmarTurno(data, callback){
        const endpoint = `${urlHeroku}/api/confirmarTurno`
        console.log('confirmando turno');
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data) // data can be `string` or {object}!
        }).then((response) => {
            console.log('listo!');
            callback(response)
        }).catch(err => console.log(err))
    }

    //parámetro: turno_id
    cancelarTurno(data, callback){
        const endpoint = `${urlHeroku}/api/cancelarTurno`;
        console.log('cancelando turno');
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data) // data can be `string` or {object}!
        }).then((response) => {
            console.log('listo!');
            callback(response)
        }).catch(err => console.log(err))
    }

    //parámetro: -
    getEspecialidades(callback){
        const endpoint = `${urlHeroku}/api/getEspecialidades`;
        console.log('obteniendo especialidades');
        fetch(endpoint, {
            method: 'GET',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
        }).then((response) => {
            console.log('listo!');
            callback(response)
        }).catch(err => console.log(err))
    }

    //parámetros: titulo
    getMedicosEspecialidad(data, callback){
        const endpoint = `${urlHeroku}/api/getMedicosEspecialidad`
        console.log('obteniendo medicos');
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data) // data can be `string` or {object}!
        }).then((response) => {
            console.log('listo!');
            callback(response)
        }).catch(err => console.log(err))
    }

    //parámetros: fecha_inicio, fecha_fin, medico_id, especialidad_id, horario_almuerzo
    generarJornadaMedico(data, callback, semanal){
        let endpoint
        if(semanal){
            endpoint = `${urlHeroku}/api/generarJornadaSemanal`
        }else{
            endpoint = `${urlHeroku}/api/generarJornada`
        }
        console.log('generando jornada');
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data) // data can be `string` or {object}!
        }).then((response) => {
            console.log('listo!');
            callback(response)
        }).catch(err => console.log(err))
    }

    //FALTA IMPLEMENTAR: /getTurnos, /getJornadasMedico, /agregarTurnos, /eliminarTurnos
    //FALTA ARREGLAR: generarJornada no maneja el horario de almuerzo




};

export default new ApiController;