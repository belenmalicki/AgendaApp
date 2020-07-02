class Utilidades{

    separarEnMiles(num){
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    formatHora(d){
        let date = new Date(d)
        let hour = date.getHours()
        let min = date.getMinutes()
        if(min / 10 == 0){
            min = `0${min}`
        }
        return `${hour}:${min}`
    }

    getStringMes(d){
        let date = new Date(d)
        let numMes = date.getMonth()

        return meses[numMes]
    }

    getStringWeekday(d){
        let date = new Date(d);
        let numDia = date.getDay();

        return dias[numDia]
    }
}

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export default new Utilidades;