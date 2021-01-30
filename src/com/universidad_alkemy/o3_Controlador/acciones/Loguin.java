package com.universidad_alkemy.o3_Controlador.acciones;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import com.universidad_alkemy.o1_Modelo.modelos.Modelo_DatosUsuario;
import com.universidad_alkemy.o1_Modelo.modelos.Modelo_Loguin;
import com.universidad_alkemy.o1_Modelo.modelos.pojos.DatosUsuario;

public class Loguin
{
	private HttpServletRequest request;
	private HttpServletResponse response;
	private Modelo_Loguin m_loguin;
	private Modelo_DatosUsuario user_data;

	public Loguin(HttpServletRequest request, HttpServletResponse response)
	{
		this.request = request;
		this.response = response;
	}
	public void ejecutar(DataSource origen_datos) 
	{
		String usuario = request.getParameter("user");
		String clave = request.getParameter("pass");
		String tipo = request.getParameter("user_type");
		
		m_loguin = new Modelo_Loguin(origen_datos);
		String clave_ = m_loguin.ingresar(usuario);
		
		if(clave_ == null)
		{
			// Usuario invalido
			System.out.println("Usuario incorrecto");
		}
		else if(!clave_.equals(clave))
		{
			// Clave invalida
			System.out.println("Clave incorrecta");
		}
		else // Loguin ok
		{
			//obtenemos datos del usuario
			user_data = new Modelo_DatosUsuario(origen_datos);
			DatosUsuario datos = user_data.obtener(usuario);
			
			request.setAttribute("user_data", datos);
			request.setAttribute("user_type", tipo);
			
			RequestDispatcher mensajero = request.getRequestDispatcher("/Main.jsp");
			try
			{
				mensajero.forward(request, response);
			}
			catch (ServletException e)
			{
				e.printStackTrace();
			}
			catch (IOException e)
			{
				e.printStackTrace();
			}
		}
	}
}
