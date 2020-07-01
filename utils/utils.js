class Utilidades{

    separarEnMiles(num){
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}

export default new Utilidades;