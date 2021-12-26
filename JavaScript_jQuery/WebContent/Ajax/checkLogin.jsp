<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String no = request.getParameter("no");
	if(session.getAttribute("id")!=null && session.getAttribute("id")!=""){
		out.println("로그인한 상태입니다");
	}else{
		out.println("로그인이 되지 않은 상태입니다");
	}
	out.println("<br> 넘어온 번호는 "+no+"입니다.");
%>
