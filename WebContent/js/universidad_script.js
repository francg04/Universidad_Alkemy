let parametros_busqueda = [];
let buscador;
let btn_buscar;
let genero_elegido;
let genero_opciones;

/*===========================*/
/*        VALIDACIONES       */
/*===========================*/
const SOLO_LETRAS = 1, 
      SOLO_NUMEROS = 2;

let expresiones = {
    o1_solo_numeros: /[0-9]/,
    o2_solo_letras: /[a-zA-Z\s]/,
    o3_documentos: /^[0-9]{6,8}$/,
    o4_nombres_y_apellidos: /[a-zA-Z\s]{1,30}/
};

let validacion_activa = 0;

function validar_documento(e){
    let tamanio = e.target.value.length;
    if( tamanio>5 ){
        e.target.style.border= "solid 3px green";
        if(tamanio>8){
            if(!(e.key =="Backspace")){
                e.preventDefault();
            }
        }
    }
    else{
        e.target.style.border= "solid 3px red";
    }
};

function validar_nombres(e){
    if(expresiones.o4_nombres_y_apellidos.test(e.target.value)){
        e.target.style.border= "solid 3px green";
    }
    else{
        e.target.style.border= "solid 3px red";
    }
};

let solo_numeros = (e) =>{
    if(expresiones.o1_solo_numeros.test(e.key)){
        validar_documento(e);
    }
    else{
        if(!(e.key =="Backspace")){
            e.preventDefault();
        }
        validar_documento(e);
    }
}

let solo_letras = (e) =>{
    if(expresiones.o2_solo_letras.test(e.key)){
        validar_nombres(e);
    }
    else{
        e.preventDefault();
    }
}
//================================================================================//
function cargar_variables(){
    animar_imagenes();
    buscador = document.getElementById("buscar");
    buscador.disabled = true;
    
    //buscador.addEventListener("keydown", solo_numeros);

    btn_buscar = document.getElementById("btn_buscar");
    btn_buscar.addEventListener('submit',(e)=>{
        e.preventDefault();
    });

    genero_opciones = document.getElementById("p_genero");

    genero_elegido = document.getElementById("p_genero_elegido");
    genero_elegido.disabled = true;

    parametros_busqueda.push(document.getElementById("p_todo"));
    parametros_busqueda.push(document.getElementById("p_nombre"));
    parametros_busqueda.push(document.getElementById("p_apellido"));
    parametros_busqueda.push(document.getElementById("p_documento"));

    agregar_eventos();
}
function animar_imagenes(){
    let mostrar = 2;
    setInterval(function(){
        document.getElementById("rbt"+mostrar).checked=true;
        mostrar++;
        if(mostrar>5){
            mostrar=1;
        }
    }, 3500);
}
function busqueda(parametro){
    buscador.value = "";
    buscador.style.borderColor = "black";

    if(parametro == "all"){
        buscador.placeholder = "Buscar por...";
        buscador.disabled = true;
        validacion_activa = 0;
    }
    else{
        buscador.placeholder = "Buscar por "+parametro;
        buscador.disabled = false;
        buscador.focus();
        if(parametro == "nombre" || parametro == "apellido"){
            buscador.style.borderColor = "red";
            if(validacion_activa==SOLO_NUMEROS){
                buscador.removeEventListener("keydown", solo_numeros);
            }
            buscador.addEventListener("keydown", solo_letras);
            validacion_activa = SOLO_LETRAS;
        }
        else{
            if(validacion_activa==SOLO_LETRAS){
                buscador.removeEventListener("keydown", solo_letras);
            }
            buscador.addEventListener("keydown", solo_numeros);
            validacion_activa = SOLO_NUMEROS;
        }
    }
}
function agregar_eventos(){
    for(let i=0; i<parametros_busqueda.length;i++){

        parametros_busqueda[i].addEventListener('click', function(){
            busqueda(parametros_busqueda[i].value);
        });
    }
    genero_opciones.addEventListener('click', activar_opciones);
    actualizar_modificar();
}
function activar_opciones(){
    if(genero_opciones.checked){
        genero_elegido.disabled = false;
    }
    else{
        genero_elegido.disabled = true;
    }
}
function actualizar_modificar(){
    let filas_datos = document.getElementsByClassName("dato");
    for(let i=0; i<filas_datos.length; i++)
    {
        alert(filas_datos[i].textContent());
    }
}
function actualizar_profesor(){
    
}