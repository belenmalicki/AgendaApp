//const urlHeroku = "http://192.168.0.6:8000"
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
        const endpoint = `${urlHeroku}/api/getTurnosActivosPaciente`;
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

    //parámetro: paciente_id
    getHistorialPaciente(data,callback){
        const endpoint = `${urlHeroku}/api/getHistorialPaciente`;
        console.log('obteniendo historial');
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

    //parámetros: especialidad_id, medico_id, fecha (los ultimos 2 no son requeridos)
    getTurnos(data,callback){
        const endpoint = `${urlHeroku}/api/getTurnos`;
        console.log('obteniendo turnos disponibles');
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            console.log('listo!');
            callback(response)
        }).catch(err => console.log(err))
    }

    //parámetros: medico_id
    getJornadasMedico(data,callback){
        const endpoint = `${urlHeroku}/api/getJornadasMedico`;
        console.log('obteniendo agenda del médico');
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            console.log('listo!');
            callback(response)
        }).catch(err => console.log(err))
    }


    //parametros: jornada_id, horarios[]
    agregarTurnos(data,callback){
        const endpoint = `${urlHeroku}/api/agregarTurnos`;
        console.log('agregando turnos');
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            console.log('listo!');
            callback(response)
        }).catch(err => console.log(err))
    }

    //parámetros: jornada_id, turnos[] (array de id)
    eliminarTurnos(data,callback){
        const endpoint = `${urlHeroku}/api/eliminarTurnosById`;
        console.log('eliminando turnos');
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            console.log('listo!');
            callback(response)
        }).catch(err => console.log(err))
    }

    //parámetros: turno_id, paciente_id
    registrarDeuda(data, callback){
        const endpoint = `${urlHeroku}/api/registrarDeuda`;
        console.log('registrando deuda');
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            console.log('listo!');
            callback(response)
        }).catch(err => console.log(err))
    }

    registrarListaDeEsperaEspec(data, callback){
        const endpoint = `${urlHeroku}/api/registrarListaDeEsperaEspec`;
        console.log('registrando lista de espera');
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            console.log('listo!');
            callback(response)
        }).catch(err => console.log(err))
    }

    registrarListaDeEsperaMedico(data, callback){
        const endpoint = `${urlHeroku}/api/registrarListaDeEsperaMedico`;
        console.log('registrando lista de espera del medico');
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            console.log('listo!');
            callback(response)
        }).catch(err => console.log(err))
    }

    getJornadaHoy(data,callback){
        const endpoint = `${urlHeroku}/api/getJornadaHoy`;
        console.log('obteniendo Jornadas de hoy');
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            console.log('listo!');
            callback(response)
        }).catch(err => console.log(err))
    }


};

export default new ApiController;