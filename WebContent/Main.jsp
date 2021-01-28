<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Universidad Alkemy</title>
<link rel="StyleSheet" type="text/css" href="css/estilo.css">
</head>
<body>
    <header>
		<h1><a id="logo_loguin" href="https://www.alkemy.org/"></a>Universidad alkemy</h1>
		<% String user_type = (String)request.getAttribute("user_type");
		int type = Integer.parseInt(user_type);
		if(type == 1){%>
		<ul>
			<li>Cargar profesores</li>
			<li>Gestionar materias</li>
		</ul>>
		<%}
		else if (type==2)
		{%>
		<ul>
			<li>Materias</li>
		</ul>>
		<%}%>
    </header>
</body>
</html>