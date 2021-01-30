package com.universidad_alkemy.o1_Modelo.modelos;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;
import com.universidad_alkemy.o1_Modelo.conexion.Conexion;
import com.universidad_alkemy.o1_Modelo.modelos.pojos.DatosUsuario;

public class Modelo_DatosUsuario
{
	private Conexion conexion;
	private String sql;
	private PreparedStatement consulta;
	private ResultSet resultado;
	
	public Modelo_DatosUsuario(DataSource origen_datos)
	{
		conexion = new Conexion(origen_datos);
		sql = "SELECT person.name as \"Nombre\", person.last_name as \"Apellido\", person.gender as \"Genero\" \r\n" + 
			  "FROM  person, account " + 
			  "WHERE person.document = account.person_id AND " + 
			  "account.user_name = ?";
		consulta = null;
		resultado = null;
	}
	public DatosUsuario obtener(String usuario)
	{
		DatosUsuario datos = null;
		try 
		{
			consulta = conexion.crearConsulta(sql);
			consulta.setString(1, usuario);
			resultado = consulta.executeQuery();
			
			if(resultado.next())
			{
				datos = new DatosUsuario(resultado.getString(1),
										 resultado.getString(2),
										 resultado.getBoolean(3));
			}
			resultado.close();
			consulta.close();
			//conexion.cerrarConsulta();
			conexion.desconectar();
		}
		catch(SQLException e)
		{
			e.printStackTrace();
		}
		return datos;
	}
}
