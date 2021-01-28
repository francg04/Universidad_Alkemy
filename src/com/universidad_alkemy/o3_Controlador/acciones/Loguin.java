package com.universidad_alkemy.o3_Controlador.acciones;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import com.universidad_alkemy.o1_Modelo.modelos.Modelo_Loguin;

public class Loguin
{
	private HttpServletRequest request;
	private HttpServletResponse response;
	private Modelo_Loguin m_loguin;

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
		else
		{
			// Loguin ok
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
