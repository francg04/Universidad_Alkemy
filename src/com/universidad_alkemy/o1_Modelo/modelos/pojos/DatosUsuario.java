package com.universidad_alkemy.o1_Modelo.modelos.pojos;

import java.io.Serializable;
// Plain Old Data Object
public class DatosUsuario implements Serializable
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String nombre;
	private String apellido;
	private boolean sexo;
	
	public DatosUsuario() {
		nombre = "";
		apellido = "";
		sexo = false;
	}
	
	public DatosUsuario(String nombre, String apellido, boolean sexo) {
		super();
		this.nombre = nombre;
		this.apellido = apellido;
		this.sexo = sexo;
	}

	public DatosUsuario(Object[] datos) {
		nombre = (String) datos[0];
		apellido = (String) datos[1];
		sexo = (Boolean) datos[2];
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellido() {
		return apellido;
	}
	public void setApellido(String apellido) {
		this.apellido = apellido;
	}
	public boolean getSexo() {
		return sexo;
	}
	public void setSexo(boolean sexo) {
		this.sexo = sexo;
	}
}
