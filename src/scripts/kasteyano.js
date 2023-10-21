function kasteyaniza(cadenaEntrada, opciones)   {
    let resultado = cadenaEntrada;

    if (opciones.reemplazarVPorB) {
        resultado = reemplazarVPorB(resultado);
    }

    if (opciones.reemplazarXPorKs) {
        resultado = reemplazarXPorKs(resultado);
    }

    if (opciones.reemplazarCPorK) {
        resultado = reemplazarCPorK(resultado);
    }
    
    if (opciones.reemplazarQuPorK)  {
        resultado = reemplazarQuPorK(resultado);
    } 

    if (opciones.reemplazarCPorZ) {
        resultado = reemplazarCPorZ(resultado);
    }
    
    if (opciones.reemplazarLlPorY) {
        resultado = reemplazarLlPorY(resultado);
    }

    if (opciones.eliminarH) {
        resultado = eliminarH(resultado);
    }
    
    if(opciones.eliminarTildes)   {
        resultado = eliminarTildes(resultado);
    }
    
    if(opciones.usarSoloMayusculas)  {
        resultado = usarSoloMayusculas(resultado);
    }
    
    if(opciones.usarSoloMinusculas)  {
        resultado = usarSoloMinusculas(resultado);
    }
    
    return resultado;
}

// Función para reemplazar 'v' por 'b' en una cadena
function reemplazarVPorB(cadenaEntrada) {
    // Se usa una expresión regular para reemplazar 'v' con 'b', mayúscula y minúscula
    const cadenaSustituida = cadenaEntrada.replace(/V/g, 'B').replace(/v/g, 'b');
    return cadenaSustituida;
}

function reemplazarCPorZ(cadenaEntrada) {
    // Se usa una expresión regular para reemplazar 'ce' con 'ze' preservando la capitalización
    const cadenaSustituida = cadenaEntrada.replace(/(ce|ci)/gi, function(match, p1) {
        // match contiene la subcadena coincidente (ce o ci)
        // p1 contiene la subcadena capturada (ce o ci)
        // Verifica si la subcadena capturada es 'ce' o 'ci' y devuelve 'ze' o 'zi' respectivamente
        if (p1.toLowerCase() === 'ce') {
            return match.replace(/ce/i, 'ze'); // Preserva la capitalización original
        } else {
            return match.replace(/ci/i, 'zi'); // Preserva la capitalización original
        }
    });
    return cadenaSustituida;
}

function reemplazarCPorK(cadenaEntrada) {
    // Convertir el texto a minúsculas para hacer la comparación sin importar la capitalización original
    //Sustituye siempre la c por k, excepto cuando hay ce, ci (con acentos) y ch
    let cadenaSustituida = cadenaEntrada.replace(/c(?![eiéíhEIÉÍH])/g, 'k').replace(/C(?![eiéíhEIÉÍH])/g, 'K');
    return cadenaSustituida;
}

function reemplazarQuPorK(cadena) {
    // Convertir el texto a minúsculas para hacer la comparación sin importar la capitalización original
    //Si hay alguna q que no vaya seguida de u, se reemplaza
    let resultado = cadena.replace(/q(?!u)|q(?!U)|q\b/g, 'k').replace(/Q(?!u)|Q(?!U)|Q\b/g, 'K');
    
    // Las 'qu' se reemplazan en conjunto
    resultado = cadena.replace(/qu/g, 'k')
        .replace(/qU/g, 'k')
        .replace(/Qu/g, 'K')
        .replace(/QU/g, 'K');

    return resultado;
}

function reemplazarXPorKs(cadenaEntrada) {
    // Reemplazar 'x' por 'ks' y 'X' por 'Ks'
    const cadenaSustituida = cadenaEntrada.replace(/x/g, 'ks').replace(/X/g, 'Ks');
    return cadenaSustituida;
}

// Función para quitar la letra 'h' en una cadena
// 1) la letra H y h deben eliminarse
// 2) si la letra fuera H mayúscula y estuviera al inicio de la palabra, la siguiente letra es mayúscula también
function eliminarH(cadena) {
        /*return cadena.replace(/\b[H]([a-záéíóúñ])/g, function(match, letraSiguiente) {
        // Convertir la siguiente letra en mayúscula
        return letraSiguiente.toUpperCase();
    }).replace(/[Hh]/g, ''); // Eliminar el resto de 'h' o 'H'
    */
    
    let resultado = '';
    let prevChar = '';
    let sigCharMayusc = false
     
    for (let i = 0; i < cadena.length; i++) {
        let caracter = cadena[i];

        //si el caracter anterior fue una H mayúscula, el siguiente es mayúscula
        if(sigCharMayusc)   {
            caracter = caracter.toUpperCase();
            sigCharMayusc = false;
        }
                
        if(caracter === 'H' || caracter === 'h')    {
            // Solo mantengo la hache si va precedida de ce
            if(prevChar === 'C' || prevChar === 'c')    {
                resultado += caracter;
                prevChar = caracter;
            }
            else    {
                // Si es H mayúscula que no va precedida de ce, la siguiente letra será mayúscula 
                if(caracter === 'H')   {
                    sigCharMayusc = true;
                }
            }
        }
        else    {
            resultado += caracter;
            prevChar = caracter;
        }
    }
    
    return resultado;
}

function reemplazarLlPorY(cadenaEntrada) {
    // Reemplazar 'll' por 'y', y 'LL' y 'Ll' por 'Y'
    const cadenaSustituida = cadenaEntrada.replace(/ll/g, 'y').replace(/LL|Ll/g, 'Y')
    return cadenaSustituida;
}

// Función para suprimir las tildes
function eliminarTildes(cadena) {
    const tildes = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'
    };

    return cadena.replace(/[áéíóúÁÉÍÓÚ]/g, function (letra) {
        return tildes[letra];
    });
}

function usarSoloMayusculas(cadena)   {
    return cadena.toUpperCase();
}

function usarSoloMinusculas(cadena)   {
    return cadena.toLowerCase();
}
