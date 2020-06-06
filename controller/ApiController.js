const urlLocal = "http://192.168.0.8:8000"
const urlHeroku = "https://centro-medico-backend-h.herokuapp.com"


class ApiController {
    login(data, callback){
        const endpoint = `${urlLocal}/api/verificarUsuario` 
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

    verificarDatos(data, callback){
        const endpoint = `${urlLocal}/api/verificarCuenta`
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
    }


};

export default new ApiController;