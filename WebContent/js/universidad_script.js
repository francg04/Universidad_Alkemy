let parametros_busqueda = [];
let buscador;
let genero_elegido;
let genero_opciones;
let nuevo_prof = false;
/*---------------------------------------------------*/
/*---------------[ BOTONES PRINCIPALES ]-------------*/
/*---------------------------------------------------*/

let btn_secc_profesores,
    btn_secc_materias,
    btn_buscar,
    btn_agregar_prof;

/*---------------------------------------------------*/
/*----------------[ FOMRS PRINCIPALES ]--------------*/
/*---------------------------------------------------*/
let form_nvo_prof;
/*---------------------------------------------------*/
/*===================================================*/
/*                    VALIDACIONES                   */
/*===================================================*/
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
function desa_btns_profesor(){
    let fuente = document.querySelector("#datos_profesores");
    let botones_profesor = fuente.querySelectorAll("input[type='button']");
    
    for(let i=0; i<botones_profesor.length; i++){
        botones_profesor[i].readOnly = !nuevo_prof;
        botones_profesor[i].disabled = nuevo_prof;
        
        if(botones_profesor[i].classList.contains("btn_V"))
        {
            botones_profesor[i].classList.toggle("fxHov_btnV");
        }
        else if(botones_profesor[i].classList.contains("btn_R"))
        {
            botones_profesor[i].classList.toggle("fxHov_btnR");
        }
        
        form_nvo_prof.readOnly = !nuevo_prof;
        form_nvo_prof.disabled = nuevo_prof;
        form_nvo_prof.classList.toggle("fxHov_profe");
    }
    nuevo_prof = !nuevo_prof;
}
function setear_botones(){
    btn_secc_profesores = document.getElementById("btn_SeccProfesores");
    btn_secc_materias = document.getElementById("btn_SeccMaterias");
    btn_buscar = document.getElementById("btn_buscar");
    btn_nvo_prof = document.getElementById("agregar_prof");

    buscador = document.getElementById("buscar");
    buscador.disabled = true;
}
function setear_forms(){
    form_nvo_prof = document.getElementById("agregar_profesor");
}
//================================================================================//
/*                          FUNCION SETEAR VARIABLES                              */
/*--------------------------------------------------------------------------------*/
function cargar_variables(){
    animar_imagenes();
    setear_botones();
    setear_forms();
    
    
    //buscador.addEventListener("keydown", solo_numeros);
    //
    btn_buscar = document.getElementById("btn_buscar");

    /*
    btn_buscar.addEventListener('submit',(e)=>{
        e.preventDefault();
    });
    */

    genero_opciones = document.getElementById("p_genero");
    genero_elegido = document.getElementById("p_genero_elegido");
    genero_elegido.disabled = true;
    
    let tbl_buscador = document.querySelector("#form_buscador > table");
    parametros_busqueda = tbl_buscador.querySelectorAll("input[type='radio']");
    
    agregar_eventos();
}

/*----------------------ANIMACION IMAGENES----------------------*/
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
/*--------------------------------------------------------------*/
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
/*-------------------------------------------------------------------------*/
/*=======================[ FUNCION AGRAGAR EVENTOS ]=======================*/
/*-------------------------------------------------------------------------*/
function agregar_actions_botones(){
    // btn: nuevo profesor

    btn_nvo_prof.addEventListener("click", function(){
        activar_seccion(form_nvo_prof);
    });
    // btn: cerrar form 
    let btn_cerrar_prof = document.getElementById("btn_cierre_prof");

    btn_cerrar_prof.addEventListener("click", function(){
        desa_btns_profesor();
        activar_seccion(form_nvo_prof);
    });
}
function agregar_eventos(){
    prmtrs_busqueda();
    agregar_transicion();
    agregar_opacidad();
    agregar_actions_botones();
}
function agregar_opacidad(){
    // opacidad a secciones

    // opacidad a form_nuevo_prof
}
function agregar_transicion(){
    // transicion a secciones

    // transicion a form_nuevo_prof
    let form_nvo_prof = document.getElementById("datos_profesores");
        form_nvo_prof.classList.add("transicion");

    // transicion a botones
}
function prmtrs_busqueda(){
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
/*=========================================================================*/
/*                  SCRIPT BOTONES ACTUALIZAR / ELIMINAR                   */
/*=========================================================================*/
let datos;
let datos_backup;
let id_fila;
let estado_boton = false;
let fila_activa;
let botones_act;

let input_estado;
let evento_estado = false;

const ACTUALIZAR = "actualizar_Profesor";
const ELIMINAR = "eliminar_Profesor";

function obtener_acceso(id){
   
    id_fila = id;
    datos_backup=[];

    fila_activa = document.getElementById(id); // seteamos la fila activa

    datos = fila_activa.querySelectorAll('input[type="text"]');
    
    botones_act = fila_activa.querySelectorAll('input[type="button"]');

    desabilitar_botones();
    activar_botones();
    for(let i=0; i<datos.length; i++)
    {   
        let dato = datos[i].getAttribute("value");
        datos_backup.push(dato);
        
        if(i!=0){
            let read_status  = datos[i].readOnly;
            let enabled_status = datos[i].disabled;

            if (datos[i].classList.contains("genero")){
                
                editar_genero(datos[i]);
            }
            else if(datos[i].classList.contains("estado")){
                read_status = false;
                enabled_status = true;

                input_estado=datos[i];
                
                editar_estado(datos[i])
            }

            datos[i].readOnly = !read_status;
            datos[i].disabled = !enabled_status;
            datos[i].style.background = "transparent";
        }
    }
}
/*----------------------input estado-----------------------*/
let add_cambio = (e) =>{
    if (e.currentTarget.checked) {
        input_estado.value= "Activo";
    }
    else {
        input_estado.value= "Inactivo";
    }
}

function editar_estado(boton){
    let chk_box = fila_activa.querySelector("input[type='checkbox']");
    let valor = boton.value;
    
    boton.style.width = "100px";
    chk_box.style.margin = "0 0 0 -17px";
    
    get_estado(chk_box, valor);
    
    if(!evento_estado)
    {
        chk_box.addEventListener("change", add_cambio);
        evento_estado = false;
    }
    else
    {
        chk_box.removeEventListener("change", add_cambio);
        evento_estado = true;
    }
    chk_box.classList.toggle("ocultar");
}
function get_estado(chkbox, valor){
    if(valor == "Activo"){
        chkbox.checked = true;
    }
    else{
        chkbox.checked = false;
    }
}
/*----------------------input genero-----------------------*/
function editar_genero(boton){
    let combo_genero = fila_activa.querySelector("select");
    let genero = boton.value;

    set_genero(combo_genero, genero);

    boton.classList.toggle("ocultar");
    combo_genero.classList.toggle("ocultar");
}
function set_genero(combo, valor){
    let opciones = combo.querySelectorAll("option");
    let genero = get_valor_genero(valor);
    for(let i=0; i<opciones.length; i++){
        if(opciones[i].value == genero)
        {
            opciones[i].checked = true;
        }
    }
}
function get_valor_genero(cadena){
    if(cadena == "Masculino"){
        return 1;
    }
    return 0;
}
/*------------------------------------------------------------*/
function activar_botones(){
    botones_act[0].classList.toggle("ocultar");
    botones_act[1].classList.toggle("ocultar");
    botones_act[2].classList.toggle("ocultar");
    botones_act[3].classList.toggle("ocultar");
}
function check_clase_btn(boton){
    if(boton.classList.contains("btn_V")){
        boton.classList.toggle(".verde:hover");
    }
    else if(boton.classList.contains("btn_R")){
        boton.classList.toggle(".rojo:hover");
    }
}
function desabilitar_botones(){
    let tabla = document.getElementById("datos_profesores");
    let botones = tabla.querySelectorAll('input[type="button"]');

    estado_boton = !estado_boton;
    
    for(let i=0; i<botones.length; i+=4){
        
        botones[i].disabled = estado_boton;
        check_clase_btn(botones[i]);
        botones[i+1].disabled = estado_boton;
        check_clase_btn(botones[i+1]);
        botones[i+2].disabled = estado_boton;
        check_clase_btn(botones[i+2]);
        botones[i+3].disabled = estado_boton;
        check_clase_btn(botones[i+3]);

    }
    botones_act[0].disabled = estado_boton;
    check_clase_btn(botones_act[0]);
    botones_act[1].disabled = estado_boton;
    check_clase_btn(botones_act[1]);
    botones_act[2].disabled = !estado_boton;
    check_clase_btn(botones_act[2]);
    botones_act[3].disabled = !estado_boton;
    check_clase_btn(botones_act[3]);
}
function cancelar_acceso()
{
    desabilitar_botones();
    activar_botones();

    for(let i=0; i<datos.length; i++)
    {
        if(i!=0){
            let read_status  = datos[i].readOnly;
            let enabled_status = datos[i].disabled;

            if (datos[i].classList.contains("genero")){
                editar_genero(datos[i]);
            }
            else if(datos[i].classList.contains("estado")){
                read_status = false;
                enabled_status = true;

                editar_estado(datos[i])
            }

            datos[i].readOnly = !read_status;
            datos[i].disabled = !enabled_status;
        }
        datos[i].value = datos_backup[i];
        
    }
}

function guardar_dato(){
    let formulario = fila_activa.querySelector("form");
    let elementos = formulario.elements;
    let instruccion = elementos[0];
    instruccion.value = ACTUALIZAR;
    formulario.submit();
}
function eliminar_dato(id){
    id_fila = id;
   
    fila_activa = document.getElementById(id); // seteamos la fila activa
    let formulario = fila_activa.querySelector("form");
    let elementos = formulario.elements;
    let instruccion = elementos[0];
    instruccion.value = ELIMINAR;
    formulario.submit();
}
/*=========================================================================*/
/*                FIN SCRIPT BOTONES ACTUALIZAR / ELIMINAR                 */
/*=========================================================================*/

/*-----------------------------------------------------------*/
/*             INICIO SCRIPT ANIMACION ACTIVACION            */
/*-----------------------------------------------------------*/
let ancho, alto;
let activa = false;

function activar_seccion(seccion){
    if(activa){
        ancho = seccion.style.width;
        alto = seccion.style.height;
        seccion.classList.toggle("ocultar")
        seccion.classList.toggle("opacidad");
        setTimeout(() => {
            seccion.style.height = '0px';
            setTimeout(() => {
                seccion.style.width = "0px";
            }, 400);
        }, 800);
        activa = !activa;
    }
    else{
        seccion.style.width = ancho
        seccion.style.height = alto;
        seccion.classList.toggle("ocultar")
        setTimeout(() => {
            seccion.style.height = ''+alto+'px';
            }, 400);
        setTimeout(() => {
            seccion.classList.toggle('opacidad');
        }, 800);
        activa = !activa;
    }
}

function activar_form(form_){

}

/*-----------------------------------------------------------*/
/*              FIN SCRIPT ANIMACION ACTIVACION              */
/*-----------------------------------------------------------*/