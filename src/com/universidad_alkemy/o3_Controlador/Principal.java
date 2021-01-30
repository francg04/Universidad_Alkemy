package com.universidad_alkemy.o3_Controlador;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import com.universidad_alkemy.o1_Modelo.ModeloUniversidad;

@WebServlet("/Principal")
public class Principal extends HttpServlet
{
	private static final long serialVersionUID = 1L;
	private ModeloUniversidad modelo_universidad;
	
	@Resource(name="mysql_universidad")
	private DataSource origen_datos;
	
	@Override
	public void init() throws ServletException
	{
		super.init();
		try
		{
			modelo_universidad = new ModeloUniversidad(origen_datos);
		}
		catch(Exception e){
			throw new ServletException(e);
		}
	}
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		// Leer el parametro del formulario
		String parametro = request.getParameter("instruccion");
		
		// Redirigir el flujo de ejecucion al metodo adecuado
		switch(parametro)
		{
			case "loguin":
			{
				//Comprobar loguin y obtener datos
				modelo_universidad.obtenerLoguin(request, response);
			}
			break;
		}
	}
}
