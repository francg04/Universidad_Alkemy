package com.universidad_alkemy.o1_Modelo.modelos;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import com.universidad_alkemy.o1_Modelo.conexion.Conexion;

public class Modelo_Loguin
{
	private Conexion conexion;
	private String sql;
	private PreparedStatement consulta;
	private ResultSet resultado;
	
	public Modelo_Loguin (DataSource origen_datos)
	{
		conexion = new Conexion(origen_datos);
		sql = "SELECT pass AS 'Clave' " + 
			  "FROM account " + 
			  "WHERE user_name = ?";
		consulta = null;
		resultado = null;
	}
	public String ingresar(String usuario)
	{
		String clave = null;
		try
		{
			consulta = conexion.crearConsulta(sql);
			consulta.setString(1, usuario);
			resultado = conexion.obtenerDatos();
			if(resultado.next())
			{
				clave = resultado.getString(1);
			}
			conexion.cerrarConsulta();
			conexion.desconectar();
		}
		catch (SQLException e)
		{
			e.printStackTrace();
		}
		return clave;
	}
}
