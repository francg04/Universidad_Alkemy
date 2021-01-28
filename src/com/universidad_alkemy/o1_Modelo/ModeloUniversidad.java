package com.universidad_alkemy.o1_Modelo;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import com.universidad_alkemy.o1_Modelo.modelos.Modelo_Loguin;
import com.universidad_alkemy.o3_Controlador.acciones.Loguin;

public class ModeloUniversidad
{
	DataSource origen_datos;
	Connection conexion;
	public ModeloUniversidad(DataSource origen_datos)
	{
		this.origen_datos = origen_datos;
	}
	public void obtenerLoguin(HttpServletRequest request, HttpServletResponse response)
	{
		 new Loguin(request, response).ejecutar(origen_datos);
	}
}
