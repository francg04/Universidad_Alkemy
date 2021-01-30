<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="com.universidad_alkemy.o1_Modelo.modelos.pojos.DatosUsuario" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Universidad Alkemy</title>
<link rel="StyleSheet" type="text/css" href="css/estilo.css">
<script src="js/universidad_script.js"></script>
</head>
<body>
    <header id="Menu_Principal">
		<h1><a id="logo_loguin" href="https://www.alkemy.org/"></a>Universidad alkemy</h1>
		<% String user_type = (String)request.getAttribute("user_type");
		   DatosUsuario datos = (DatosUsuario)request.getAttribute("user_data");
		int type = Integer.parseInt(user_type);%>
		<b class="saludo">Bienvenid<% 
			if (datos.getSexo()){
				%>o <%out.print(datos.getApellido()+", "+datos.getNombre());%>
			<%}
			else{
				%>a <%=datos.getApellido()%>,<%=datos.getNombre()%><%}%></b>
		<% if(type == 1){%>
		<ul>
			<li><a class="subrayado">Cargar profesores</a></li>
			<li><a class="subrayado">Gestionar materias</a></li>
		</ul>
		<%}
		else if (type==2)
		{%>
		<ul>
			<li><a class="subrayado">Materias</a></li>
		</ul>>
		<%}%>
	</header>
	<article>
		<div class="slidershow middle">
            <div class="slides">
                <input type="radio" name="rbt" id="rbt1">
                <input type="radio" name="rbt" id="rbt2">
                <input type="radio" name="rbt" id="rbt3">
                <input type="radio" name="rbt" id="rbt4">
                <input type="radio" name="rbt" id="rbt5">
                <script>
                    let btn = document.getElementById("rbt1");
                </script>
                <div class="slide s1">
                    <img src="img/1.jpg" alt="">
                </div>
                <div class="slide">
                    <img src="img/2.jpg" alt="">
                </div>
                <div class="slide">
                    <img src="img/3.jpg" alt="">
                </div>
                <div class="slide">
                    <img src="img/4.jpg" alt="">
                </div>
                <div class="slide">
                    <img src="img/5.jpg" alt="">
                </div>
            </div>
            <div class="navigation">
                <label for="rbt1" class="barra"></label>
                <label for="rbt2" class="barra"></label>
                <label for="rbt3" class="barra"></label>
                <label for="rbt4" class="barra"></label>
                <label for="rbt5" class="barra"></label>
            </div>
        </div>
		<% if (type== 1){%>
		<%}else{%>
		<%}%>
	</article>
</body>
</html>