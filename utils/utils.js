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

    dayEquals(date1, date2){
        let d1 = new Date(date1);
        let d2 = new Date(date2);

        let anio = d1.getFullYear() === d2.getFullYear()
        let mes = d1.getMonth() === d2.getMonth()
        let day = d1.getDate() === d2.getDate()

        return anio && mes && day
    }

    mayusPrimerLetra(string){
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    formatObraSocial(string){
        if(string === 'medicare') return 'Medicare';
        if(string === 'osima') return 'OSIMA';
        if(string === 'arsalud') return 'ARSalud';
    }
}

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export default new Utilidades;