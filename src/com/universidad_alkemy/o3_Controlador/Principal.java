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
import com.universidad_alkemy.o3_Controlador.acciones.Loguin;

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
		
		//si no se envia el parametro, mostrar loguin
		if(parametro==null) {
			parametro = "loguin";
		}
		// Redirigir el flujo de ejecucion al metodo adecuado
		switch(parametro) {
		case "loguin":{
			//Obtener la lista de productos desde el modelo
			modelo_universidad.obtenerLoguin(request, response);
		}break;
		/*
		case "insertarBBDD":{
			agregarProducto(request, response);
		}break;
		case "cargar":{
			try {
				cargarProducto(request, response);
			} catch (Exception e) {
				
				e.printStackTrace();
			}
		}break;
		case "actualizarBBDD":{
			try {
				actualizarProducto(request, response);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}break;
		case "eliminar":{
			eliminarProducto(request, response);
		}break;
		default:{
			obtenerProductos(request, response);
		}
		*/
		}
	}
}
