let contador = 0;

const getObjeto = () => {
    return contador;
}

const addObjeto = () => {
    contador++;
}

const objeto = { getObjeto, addObjeto }

export default objeto
