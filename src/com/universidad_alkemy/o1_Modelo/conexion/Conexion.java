package com.universidad_alkemy.o1_Modelo.conexion;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

public class Conexion
{
	private DataSource origen_datos;
	private Connection conexion;
	private PreparedStatement consulta;
	private CallableStatement procedimiento;
	private ResultSet resultado;
	private boolean exito;
	
	public Conexion(DataSource origen_datos)
	{
		this.origen_datos = origen_datos;
		conexion = null;
		consulta = null;
		procedimiento = null;
		resultado = null;
	}
	//-------------------------------------------------------------
	// Metodos conectar y desconectar
	//-------------------------------------------------------------
	private void conectar() throws SQLException
	{
		conexion = origen_datos.getConnection();
	}
	public void desconectar() throws SQLException
	{
		conexion.close();
	}
	public void cerrarConsulta() throws SQLException
	{
		resultado.close();
	}
	//-------------------------------------------------------------
	// Crear Consulta
	//-------------------------------------------------------------
	public PreparedStatement crearConsulta(String sql) throws SQLException
	{
		conectar();
		consulta = conexion.prepareStatement(sql);
		return consulta;
	}
	//-------------------------------------------------------------
	// Crear Llamada Procedimiento
	//-------------------------------------------------------------
	public CallableStatement crearLlamadaProcedimiento(String sql) throws SQLException
	{
		conectar();
		procedimiento = conexion.prepareCall(sql);
		return procedimiento;
	}
	//-------------------------------------------------------------
	// ABMC de DATOS (Alta - Baja - Modificacion - Consulta)
	//-------------------------------------------------------------
	public boolean abmDato() throws SQLException
	{
		exito = false;
		exito = consulta.execute();
		consulta.close();
		conexion.close();
		return exito;
	}
	public ResultSet obtenerDatos() throws SQLException
	{
		resultado = consulta.executeQuery();
		return resultado;
	}
	public DatabaseMetaData obtenerMetaDatos() throws SQLException
	{
		conectar();
		DatabaseMetaData datos = conexion.getMetaData();
		return datos;
	}
}
