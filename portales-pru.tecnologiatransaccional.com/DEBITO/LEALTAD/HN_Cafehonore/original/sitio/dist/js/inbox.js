/********************************************************/
/*         Desarrollado por Jesus Li��n			*/
/*			webmaster@ribosomatic.com	*/
/*				ribosomatic.com		*/
/*		Puedes hacer lo que quieras con el c�digo*/
/*		  pero visita la web cuando te acuerdes	*/
/********************************************************/

/********************************************************/
/*			Modificado por Fausto Sandoval				*/
/*			fausto_sandoval85@hotmail.com				*/
/*				info@guanasoft.com						*/
/*					guanasoft.com						*/
/* Cambios Realizados:									*/
/*	1- Uso del Envio de Parametros para optimizacion.	*/
/*	2- Se agrego un preload mientras se carga la pagina */
/*		en los estados del objeto ajax.					*/
/********************************************************/

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }

    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

//En Produccion Framework
//**********************************************////////////////////////////////
//funcion principal de menu que establece el li seleccionado del menu 
//**********************************************////////////////////////////////
function Menu(num, seccion, carga, resultado)
{
    divCarga = document.getElementById(carga);
    divResultado = document.getElementById(resultado);
    ajax = objetoAjax();
    var datos = document.getElementById("l" + num);
    //switch para verificar de que pestaña del menu pasamos a otra para efecto de seleccion
//    switch (num)
//    {
//        case '2':
//            for ($i = 1; $i <= 7; $i++) {
//                if ($i == 2) {
//                    datos.className = "active";
//                } else {
//                    document.getElementById("l" + $i).className = " ";
//                }
//            }
//            break;
//        case '3':
//            for ($i = 1; $i <= 7; $i++) {
//                if ($i == 3) {
//                    datos.className = "active";
//                } else {
//                    document.getElementById("l" + $i).className = " ";
//                }
//            }
//            break;
//        case '4':
//            for ($i = 1; $i <= 7; $i++) {
//                if ($i == 4) {
//                    datos.className = "active";
//                } else {
//                    document.getElementById("l" + $i).className = " ";
//                }
//            }
//            break;
//        case '5':
//            for ($i = 1; $i <= 7; $i++) {
//                if ($i == 5) {
//                    datos.className = "active";
//                } else {
//                    document.getElementById("l" + $i).className = " ";
//                }
//            }
//            break;
//        case '6':
//            for ($i = 1; $i <= 7; $i++) {
//                if ($i == 6) {
//                    datos.className = "active";
//                } else {
//                    document.getElementById("l" + $i).className = " ";
//                }
//            }
//            break;
//        case '7':
//            for ($i = 1; $i <= 7; $i++) {
//                if ($i == 7) {
//                    datos.className = "active";
//                } else {
//                    document.getElementById("l" + $i).className = " ";
//                }
//            }
//            break;
//        default:
//            for ($i = 1; $i <= 7; $i++) {
//                if ($i == 3) {
//                    document.getElementById("l6").className = "active";
//                } else {
//                    document.getElementById("l" + $i).className = " ";
//                }
//            }
//    }
    ajax.open("POST", seccion, true);
    ajax.onreadystatechange = function()
    {
        if (ajax.readyState == 1) {
            divCarga.innerHTML = "<center><img src=\"img/ajax-loader.gif\"/></center>";
        } else if (ajax.readyState == 4)
        {
            if (ajax.status == 200) {
                divCarga.innerHTML = "";
                divResultado.innerHTML = ajax.responseText;
            } else if (ajax.status == 404) {
                divResultado.innerHTML = "La p�gina no existe";
            } else {
                divResultado.innerHTML = "Error:".ajax.status;
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send(null);
}

//En Produccion en Sitio Guanasoft
function CargaInfo(pagina, seccion, carga, resultado)
{
    divCarga = document.getElementById(carga);
    divResultado = document.getElementById(resultado);
    ajax = objetoAjax();
    ajax.open("POST", pagina, true);
    ajax.onreadystatechange = function()
    {
        if (ajax.readyState == 1) {
            divCarga.innerHTML = "<center>&nbsp;&nbsp;&nbsp;<img src='../img/load.html'> Cargando...</center>";
        } else if (ajax.readyState == 4)
        {
            if (ajax.status == 200) {
                divCarga.innerHTML = "";
                divResultado.innerHTML = ajax.responseText;
            } else if (ajax.status == 404) {
                divResultado.innerHTML = "La p�gina no existe";
            } else {
                divResultado.innerHTML = "Error:".ajax.status;
            }
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("opcion=" + seccion);
}

//En Produccion en Sitio Guanasoft  
function Suscribirme() {
//donde se mostrar� el resultado
    carga = document.formulario.load.value;
    resul = document.formulario.data.value;
    divCarga = document.getElementById(carga);
    divResultado = document.getElementById(resul);
    correo = document.formulario.email.value;
    quien = document.formulario.Cid.value;
    site = document.formulario.Sid.value;
    //instanciamos el objetoAjax
    ajax = objetoAjax();
    //usamos el medoto POST
    //archivo que realizar� la operacion
    ajax.open("POST", "suscribirse.html", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 1) {
            divCarga.innerHTML = "<center>&nbsp;&nbsp;&nbsp;<img src='img/load.gif'> Cargando...</center>";
        } else if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                divCarga.innerHTML = "";
                divResultado.innerHTML = ajax.responseText
            } else if (ajax.status == 404) {
                divResultado.innerHTML = "La p�gina no existe";
            } else {
                divResultado.innerHTML = "Error:".ajax.status;
            }
//mostrar resultados en esta capa
        }
        if (ajax.readyState == 4) {
//mostrar resultados en esta capa
            divResultado.innerHTML = ajax.responseText
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //enviando los valores
    ajax.send("correo=" + correo + "&quien=" + quien + "&site=" + site);
}


function Comentario() {
//donde se mostrar� el resultado
    carga = document.formulario.load.value;
    resul = document.formulario.data.value;
    divCarga = document.getElementById(carga);
    divResultado = document.getElementById(resul);
    correo = "";
    nombre = document.formulario.C1.value;
    comentario = document.formulario.C2.value;
    quien = document.formulario.Cid.value;
    site = document.formulario.Sid.value;
    //instanciamos el objetoAjax
    ajax = objetoAjax();
    //usamos el medoto POST
    //archivo que realizar� la operacion
    ajax.open("POST", "comentar.html", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 1) {
            divCarga.innerHTML = "<center>&nbsp;&nbsp;&nbsp;<img src='img/load.gif'> Cargando...</center>";
        } else if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                divCarga.innerHTML = "";
                divResultado.innerHTML = ajax.responseText
            } else if (ajax.status == 404) {
                divResultado.innerHTML = "La p�gina no existe";
            } else {
                divResultado.innerHTML = "Error:".ajax.status;
            }
//mostrar resultados en esta capa
        }
        if (ajax.readyState == 4) {
//mostrar resultados en esta capa
            divResultado.innerHTML = ajax.responseText
        }
    }
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //enviando los valores
    ajax.send("correo=" + correo + "&nombre=" + nombre + "&comentario=" + comentario + "&quien=" + quien + "&site=" + site);
}

function popUp(URL) {
    day = new Date();
    id = day.getTime();
    eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0,width=750,height=650');");
}

function enviar(campos, divcambio, pagcarga) {
    var xmlhttp;
    var datos = "";
    for (i = 1; i <= campos; i++)
    {
        datos = datos + ":" + document.getElementById("c" + i).value;
    }
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 1) {
            document.getElementById(divcambio).innerHTML = "<center><img src='img/load.gif'> Cargando... </center>";
        } else if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            document.getElementById(divcambio).innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("POST", pagcarga, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("fname=" + datos);
}

function Pagina(nroPagina, divcambio, pagcarga) {
    var xmlhttp;
    divContenido = document.getElementById(divcambio);
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 1) {
            document.getElementById(divcambio).innerHTML = "<center><img src='img/load.gif'> Cargando...</center> ";
        } else if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            document.getElementById(divcambio).innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("POST", pagcarga, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("pag=" + nroPagina );
}

function mostrar(str, pagcarga, divcambio) {
    var xmlhttp;
    if (str == "") {
        document.getElementById(divcambio).innerHTML = "";
        return;
    }
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 1) {
            document.getElementById(divcambio).innerHTML = "";
        } else if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            document.getElementById(divcambio).innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("POST", pagcarga, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("fname=" + str);
}
function miFuncion(x, y) {
    var Elemento = document.getElementById(x);
    var Elemento2 = document.getElementById(y);
    if (Elemento.style.display == 'block') {
        Elemento.style.display = 'none';
    } else {
        Elemento.style.display = 'block';
    }
}
function redireccionar(direccion) {
    setTimeout("location.href='" + direccion + "'", 1000);
}

function theFocus(obj) {
    var tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = obj.title;
    tooltip.style.display = "block";
    tooltip.style.top = obj.offsetTop - tooltip.offsetHeight + "px";
    tooltip.style.left = obj.offsetLeft + "px";
}

function theBlur(obj) {
    var tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
    tooltip.style.top = "-9999px";
    tooltip.style.left = "-9999px";
}

function PopWindow(id)
{
    window.open(id, 'popp', 'width=700,height=300,menubar=no,scrollbars=yes,toolbar=no,location=no,directories=no,resizable=no,top=200,left=400');
}


function cambiarClaseMenu($num) {
    for ($i = 1; $i <= 7; $i++) {
        $('#l' + $i).attr("class", "none");
        if ($i == $num)
        {
            $('#l' + $num).attr("class", "active");
        }
        $('#menubutton').attr("class", "navbar-toggle collapsed");
        $('#menudiv').attr("class", "navbar-collapse collapse");
    }
}

function cargar_ajax($pag, $div) {
    $($div).html('<center><div><img src="img/ajax-loader.gif"/></div></center>');
    var jqxhr = $.ajax({
        url: $pag,
        success: function(data) {
            $($div).fadeIn(10000).html(data);
        },
        error: function() {
            alert("Error al cargar");
        },
        complete: function() {

        }
    });
}

function validaForm() {
    if ($("#c1").val() == "") {
        alert("El campo Nombre de Usuario no puede esta vacio");
        $("#c1").focus();
        return false;
    }
    if ($("#c2").val() == "") {
        alert("El campo Contraseña no puede estar vacio.");
        $("#c2").focus();
        return false;
    }
    return true;
}

function destroySession() {
//    var root = location.protocol + '//' + location.host + '/Organica/index.php';
//    setTimeout("location.href='" + root + "'", 2000);
    setTimeout("location.href='index.php'", 2000);
    $.ajax({
        url: "display/logout2.php",
        data: "logout2.php",
        success: function(data) {
        }
    });
}


var expr = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
var expr1 = /^[a-zA-Z]*$/;

$(document).ready(function() {


    $("#campofecha").datepicker();

    $.ajaxSetup({
        type: "POST"
    });

    $('#acerca').click(function() {
        $('#cambia').html('<center><div><img src="img/ajax-loader.gif"/></div></center>');
        cambiarClaseMenu(2);
        var page = $(this).attr('href');
        var dataString = 'page=' + page;
        $.ajax({
            url: "acerca.php",
            data: dataString,
            //funcion para procesar respuesta
            success: function(data) {
                $('#cambia').fadeIn(10000).html(data);
            }
        });
    });
    $('#politicas').click(function() {
        $('#cambia').html('<center><div><img src="img/ajax-loader.gif"/></div></center>');
        cambiarClaseMenu(3);
        var page = $(this).attr('href');
        var dataString = 'page=' + page;
        $.ajax({
            url: "politicas.php",
            data: dataString,
            //funcion para procesar respuesta
            success: function(data) {
                $('#cambia').delay(500).fadeIn('slow').html(data);
            }
        });
    });
    $('#condiciones').on('click', function() {
        $('#cambia').html('<center><div><img src="img/ajax-loader.gif"/></div></center>');
        cambiarClaseMenu(5);
        var page = $(this).attr('href');
        var dataString = 'page=' + page;
        $.ajax({
            url: "condiciones.php",
            data: dataString,
            //funcion para procesar respuesta
            success: function(data) {
                $('#cambia').fadeIn(10000).html(data);
            }
        });
    });
    $('#establecimientos').click(function() {
        $('#cambia').html('<center><div><img src="img/ajax-loader.gif"/></div></center>');
        cambiarClaseMenu(4);
        var page = $(this).attr('href');
        var dataString = 'page=' + page;
        $.ajax({
            url: "establecimientos.php",
            data: dataString,
            //funcion para procesar respuesta
            success: function(data) {
                $('#cambia').fadeIn(10000).html(data);
            }
        });
    });    
    $('#cuenta').on('click', function() {
        $('#cambia').html('<center><div><img src="img/ajax-loader.gif"/></div></center>');
        cambiarClaseMenu(6);
        var page = $(this).attr('href');
        var dataString = 'page=' + page;
        $.ajax({
            url: "cuenta.php",
            data: dataString,
            //funcion para procesar respuesta
            success: function(data) {
                $('#cambia').fadeIn(10000).html(data);
            }
        });
    });
    $('#contact').click(function() {
        $('#cambia').html('<center><div><img src="img/ajax-loader.gif"/></div></center>');
        cambiarClaseMenu(7);
        var page = $(this).attr('href');
        var dataString = 'page=' + page;
        $.ajax({
            url: "contacto.php",
            data: dataString,
            //funcion para procesar respuesta
            success: function(data) {
                $('#cambia').fadeIn(10000).html(data);
            }
        });
    });

//funcion de ejemplo para crear objetos con ajax 
//se carga con ajax y para acceder a ellos se debe de escribir este codigo.
    $(document).on('click', '#botonenviar', function() {
        if (validaForm()) {
            var $btn = $(this).button('loading');
            $.post("display/logincheck.html", $("#formdata").serialize(), function(res) {
//                $("#formulario").fadeOut("slow");                
//                $('#cambia').delay(500).fadeIn("slow").html(res);
                if (res == 1) {
                    $('#cambia').html('<center><div><img src="img/ajax-loader.gif"/><br>Cargando...</div></center>');
                    cambiarClaseMenu(6);
                    $.ajax({
                        url: "display/micuenta_1.php",
                        data: "pagina=paginascuenta/perfil_1_1.php",
                        //funcion para procesar respuesta
                        success: function(data) {
                            $btn.button('reset');
                            $('#cambia').delay(500).fadeIn("slow").html(data);
                            //aumenta de tamaño el nombre de el cliente esquina superior derecha
                            $('#topRight').attr("class", "col-md-8 col-md-offset-4");
                        }
                    });
                } else if (res == 2)
                {
                    $('#cambia').html('<center><div><img src="img/ajax-loader.gif"/><br>Cargando...</div></center>');
                    cambiarClaseMenu(5);
                    $.ajax({
                        url: "display/catalogopremios.php",
                        data: "url=../",
                        //funcion para procesar respuesta
                        success: function(data) {
                            $btn.button('reset');
                            $('#cambia').delay(500).fadeIn("slow").html(data);
                            //aumenta de tamaño el nombre de el cliente esquina superior derecha
                            $('#topRight').attr("class", "col-md-8 col-md-offset-4");
                        }
                    });
                } else {
                    alert(res);
                    $btn.button('reset');
                    $.ajax({
                        url: "display/bod_login.php",
                        data: "url=../configuracion/conexion.php",
                        //funcion para procesar respuesta
                        success: function(data) {
                            $('#cambia').delay(500).fadeIn("slow").html(data);
                        }
                    });
                }
            });
        }
    });


    ////EVENTO DE CARGA DE DIV PRINCIPALES DE MI CUENTA
    $(document).on('click', '#movimientoss', function() {
        var page = $(this).attr('value');
        cargar_ajax(page, '#cambia2');
    });
    $(document).on('click', '#perfil', function() {
        var page = $(this).attr('value');
        cargar_ajax(page, '#cambia2');
    });
    $(document).on('click', '#contrasenias', function() {
        var page = $(this).attr('value');
        cargar_ajax(page, '#cambia2');
    });
    $(document).on('click', '#estab', function() {
        var page = $(this).attr('value');
        cargar_ajax(page, '#cambia2');
    });
    $(document).on('click', '#premio', function() {
        var page = $(this).attr('value');
        cargar_ajax(page, '#cambia2');
    });
    $(document).on('click', '#update', function() {
        var page = $(this).attr('value');
        cargar_ajax(page, '#cambia2');
    });
    $(document).on('click', '#session', function() {
        $('#cambia').html('<center><div><img src="img/ajax-loader.gif"/></div></center>');
        cambiarClaseMenu(6);
        var page = $(this).attr('href');
        var dataString = 'page=' + page;
        $.ajax({
            url: "cuenta.php",
            data: dataString,
            //funcion para procesar respuesta
            success: function(data) {
                $('#cambia').fadeIn(10000).html(data);
            }
        });
    });
});