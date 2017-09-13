var nombre = 'viejo amigo';

var lvl = 1;
var tiempo = 0;
var timer;
var gordura = 50;

var dinero = 1;

var porcentaje_meta = 60;
var porcentaje_nextLvl = 35;

var rainbow_active = false;

var aplicarBoton_suena = false;
var mostrarBoton_suena = false;

$(document).ready(ini);

function ini() {
    
    adaptarPuntero();
    $('#config_button').click(mostrarConfig);
    desbloquear();
    temporizador();
}

function adaptarPuntero(){
    $('#puntero').css({'width': gordura , 'height': gordura, 'font-size': gordura / 10});
}

function mostrarConfig(){
    $('#config_panel').toggle()
    $('#container_canvas').toggle()
    if ($('#config_panel').is(":visible")){
        $('#config_button').html('Cerrar');
    }else{
        $('#config_button').html('Opciones');
    }
    
    if (mostrarBoton_suena){
        var audio = new Audio('../sounds/guitar.mp3');
        audio.play();        
    }
}

// Reinicia la cuenta atrás para el logout automático (timeout), entre otros
function temporizador(){
    var meta1 = false;
    var canvas = document.querySelector('#paint');
            
        canvas.addEventListener('mouseup', function() {
            
            var porcentaje = calculateBlack2();
            if ((porcentaje < porcentaje_nextLvl) ){
                lvl++;
                desbloquear();
                //meta2 = true;
                meta1 = false;
                porcentaje_meta -= 2;
                porcentaje_nextLvl -= 1;
                gordura = 50;
                adaptarPuntero();
            }
        });
    
    pressTimer();

    function pressTimer(){
    
        clearTimeout(timer);
        timer = setTimeout(
        function(){
            tiempo++;
            $('#crono').html(tiempo + ' s');
            $('#nivel').html('Nivel ' + lvl);
        
	       var porcentaje = calculateBlack2();
        
            if ((porcentaje < porcentaje_meta) && (!meta1)){
                gordura = gordura * 1.5;
                adaptarPuntero();
                meta1 = true;
            }
        
            pressTimer();
        }
        // 1 sec
        , 1000
        );
    }
}


function simulateMouseup(){
    var e = $.Event( "mouseup", { which: 1 } );

    $('#paint').trigger(e);
}

function explotar(){
    $( "#boom" ).animate({
    opacity: 1,
    width: "+=50",
    height: "+=50"
  }, 3000, function() {
    $( "#boom" ).animate({
    opacity: 0,
    width: "-=50",
    height: "-=50"
  }, 3000)
  });
}

function activarRainbow(){
    if (rainbow_active){
        rainbow_active = false;    
    }else{
        rainbow_active = true; 
        rainbowColor('puntero', 'main_header'); 
    }
}


function rainbowColor(capa1, capa2){
    var colores = ['Red', 'Yellow', 'Green', 'Blue'];

    for (var i = 0; i < colores.length; i++){
    
        $( "#" + capa1 ).animate({
            backgroundColor: colores[i]
        }, 5000);
        
        $( "#" + capa2 ).animate({
            backgroundColor: colores[i]
        }, 5000);
    }
    
    if (rainbow_active){
        rainbowColor(capa1, capa2);    
    }
}

function tocarCancion(cancion){

    var x = document.createElement("AUDIO");

    x.setAttribute("src",cancion);
    
    x.setAttribute("controls", "controls");
    $('#audio').html(x);
}

function getBackgroundImgTag(number, width, height) {
    return '<img src="src/images/' + number + '.jpg" width="' + width + '" height="' + height + '"/>';
}

function getAudioTag(soundName) {
    return '<audio src="src/sounds/' + soundName + '.mp3" controls loop/>';
}


function desbloquear(){
    canvasEraser();
    var canvas = document.querySelector('#paint');
	var ctx = canvas.getContext('2d');
	ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(32, 32, 32)";
    ctx.fill();
    ctx.font = "40px Calibri";
    ctx.fillStyle = "white";
    
    var msj = '';
    var texto = '';
        
    switch(lvl){
        case 1:
            texto = 'Click & drag     ;-)';
            msj = '---Creado por Gabriel ---'
            break;
        case 2:
            texto = '1';
            msj = '"El Titulo" desbloqueado!'
            $('#titulo').toggle();
            break;
        case 3:
            texto = '2';
            msj = '"Opciones" desbloqueado!'
            $('#config_button').toggle();  
            break;
        case 4:
            texto = '3';
            //escribir lvlmax para llegar al penúltimo nivel
            msj = '"Trucos" desbloqueado!'
            $('#config_trucos').toggle();
            $('#aplicar').toggle(); 
            $('#aplicar').click(aplicarConfig); 
            break;    
        case 5:
            texto = '4';
            msj = '"Contador de Nivel" desbloqueado!'
            $('#nivel').toggle();
            break;
        case 6:
            texto = '5';
            msj = '"Cambiar de Identidad" desbloqueado!'
            $('#config_nombre').toggle();
            break;
        case 7:
            texto = nombre+'6';
            msj = '"Musica de Ambiente" desbloqueado!'
            $('#config_audio').toggle();
            $('#audio').html(getAudioTag('background/people'));
            break;
        case 8:
            texto = '7';
            //Cambiar color de fondo
            msj = '"Colores" desbloqueado!'
            $('#config_color').toggle();
            break;
         case 9:
            texto = '8';
            msj = '"Cambiar el Titulo" desbloqueado!'
            $('#config_titulo').toggle();
            break;
        case 10:
            texto = '9';
            //Desbloquea elección de forma del div cursor / +1 forma
            msj = '"Cambiar de Forma" desbloqueado!'
            // Tal vez se pueda el pincel tmb: http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_linecap
            $('#config_forma').toggle();
            $('#forma_list').append('<option label="Cuadrado" value="cuadrado">');
            $('#puntero').css({'border-radius': '0px 0px 0px 0px'}); 
            break;
        case 11:
            img_fondo = '<img src="images/11.jpg" width="'+canvas.width+'" height="'+canvas.height+'"/>';
            texto = '10';
            //Cambiar color de las letras
            msj = '"Preparing for battle" desbloqueado!'
            $('#song_list').append('<option label="Fire Emblem Preparing Battle" value="song2">');
            $('#audio').html(getAudioTag('background/chimes'));
            break;
        case 12:
            texto = '11';
            //Desbloquea acción al clicar o pulsar un botón (amplía durante 1 sec la div, tiene cooldown) (hacer que sea como una explosión, que se queda un rato en e sitio?)
            msj = '"Protestar es bueno" desbloqueado!'
            aplicarBoton_suena = true;
            break;
        case 13:
            texto = '12';
            msj = '"Cronometro" desbloqueado!'
            $('#crono').toggle();
            break;
        case 14:
            texto = '13';
            msj = '¡"We will see each other at court!" desbloqueado!'
            $('#song_list').append('<option label="Objection Song" value="song4">');
            $('#audio').html(getAudioTag('background/restaurant'));
            break;
        case 15:
            texto = 'Otras cosas nunca cambiaron';
            //Desbloquea fuente de letra
             msj = '"Super Cuuuuute" desbloqueado!'
            //$('#config_song').toggle();
            break;
        case 16:
            texto = '14';
            msj = '"Destruir" desbloqueado!'
            $('#config_reiniciar').toggle();
            $('#config_reiniciar').click(reiniciar);
            break;
        case 17:
            texto = '15';
             msj = '"An Epic Song" desbloqueado!'
            $('#song_list').append('<option label="Fire Emblem Tittle" value="song3">');
            $('#audio').html(getAudioTag('background/rain'));
            break;
        case 18:
            texto = '16';
            msj = '"This is not even my Final Form" desbloqueado!'
            $('#forma_list').append('<option label="Diferente" value="diferente">');
            $('#puntero').css({'border-radius': '300px 0px 300px 0px'});
            break;
        case 19:
            texto = '17';
            //Desbloquea un ayudante (random printer)
             msj = '"yeah" desbloqueado!'
            //$('#config_song').toggle();
            break;
        case 20:
            texto = '18';
            //Desbloquea un color cambiante para el puntero
             msj = '"OMG" desbloqueado!'
            $('#config_rainbow').toggle();
            $('#config_rainbow').click(activarRainbow);
            break;
         case 21:
            texto = '19';
            //Te otorga la posibilidad de, solo una vez, saltarte un nivel (con la única moneda que tienes)
            $('#dinero').toggle();
            $('#subirNivel').toggle();
            msj = '"Pay to Win" desbloqueado!'
            $('#subirNivel').click(subirNivel);
            break;
        case 22:
            texto = '20';
            //22. ''  Ponerle audio, ese sonido que tanta gracia le hace a iván del instant buttons. Que suene cada vez que le da a config.
            msj = '"Por las Risas" desbloqueado!'
            mostrarBoton_suena = true;            
            break;
        case 23:
            texto = '21';
            //23. msj = '¡"Como en el Club de la Lucha" desbloqueado!'   Sale una imagen tan solo un momento...
            msj = '"Un ligero sentimiento de decepción" desbloqueado!';
            break;
        case 24:
            img_fondo = '<img src="images/24.jpg" width="'+canvas.width+'" height="'+canvas.height+'"/>';
            texto = '22';
            //24. '¡"Super Nova" desbloqueado!'  (una explosión mayor...)
            msj = '"Opciones" bloqueado de nuevo! :P';
            $('#config_button').toggle();
            break;
        case 25:
            texto = '23';
            //24. Nombrar al pnj
            msj = '"Menos recompensas" desbloqueado...'
            break;
        case 26:
            texto = '24';
            //26. Todos los textos pasan a ser la misma palabra...
            msj = '"Opciones" desbloqueado! (again)'
            $('#config_button').toggle();
            break;
        case 27:
            texto = '25';
            //27. Música del FFIX: mapa del mundo    
            msj = '"Piro Plus Plus" desbloqueado!'
            $('#song_list').append('<option label="FF IX World Map" value="song5">');
            $('#audio').html(getAudioTag('background/radio'));
            break;
            break;
        case 28:
            texto = '26';
            //28. Novas aleatorias, espontáneas o generadas por el ayudante
            msj = '"Recta final" desbloqueado!'
            break;
        case 29:
            texto = '27';
            //29. La penúltima puede ser elegir tamaño del pincel    
            msj = '"Descanso voluntario" desbloqueado!'
            break;
        case 30:
            texto = '28';
            //29. La penúltima puede ser elegir tamaño del pincel    
            msj = '"Boss Battle" desbloqueado!'
            break;
        case 31:
            //texto = 'Victoria!';
            //VICTORIA    
            msj = 'VICTORIA'
            break;
            
    }
    $('#img_fondo').html(getBackgroundImgTag(lvl, canvas.width, canvas.height));
    
    ctx.fillText(texto, 50, canvas.height / 2);
    
    $('#aviso').html(msj);
    $('#aviso').show();
    $('#aviso').fadeOut(4000);
}

function subirNivel(){
    if (dinero == 1){
        if (confirm('Estas seguro de que quieres que te timen?')) {
            lvl++;
            desbloquear();
            dinero = 0;
            $('#dinero').toggle();
        } else {
            var audio = new Audio('../sounds/hi.mp3');
            audio.play();
        } 
    }
}

// Aplicar configuraciones
function aplicarConfig(){
    if ($('#config_trucos input').val() === 'lvlmax'){
        lvl = 30;
        desbloquear();
    }
    
    if ($('#config_nombre input').val() != ''){
        nombre = $('#config_nombre input').val();   
    }
    
    if ($('#config_color input').val() != $('#puntero').attr('background')){
        //alert($('#config_color input').val());
        $('#puntero').css('background', $('#config_color input').val());
        $('#main_header').css('background', $('#config_color input').val());
    }
    
    if ($('#config_titulo input').val() != ''){
        $('#titulo').html($('#config_titulo input').val());   
    }
    
    if ($('#config_forma input').val() === 'circulo'){
        $('#puntero').css({'border-radius': '200px 200px 200px 200px'});
    }else if ($('#config_forma input').val() === 'cuadrado'){
        $('#puntero').css({'border-radius': '0px 0px 0px 0px'});
    }else if ($('#config_forma input').val() === 'diferente'){
        $('#puntero').css({'border-radius': '300px 0px 300px 0px'});
    }
    
    if ($('#config_audio input').val() !== ''){
        $('#audio').html(getAudioTag($('#config_audio input').val()));
    }

    if (aplicarBoton_suena){
        var audio = new Audio('../sounds/guitar.mp3');
        audio.play();        
    }
    
}

function reiniciar(){
    if (confirm('Estas seguro? Volveras al nivel 1...')) {
        location.reload(true);
    } else {
        var audio = new Audio('../sounds/slam.mp3');
        audio.play();
    }
}


function calculateBlack(){
    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');
    var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
    
    var total = imgData.data.length / 4;
    
    var limpio = 0
    
    for (var i=0; i < total; i = i+4){
       if ((imgData.data[0] == 0) && (imgData.data[1] == 0) && (imgData.data[2] == 0) && (imgData.data[3]) == 0){
           limpio++; 
       }
    }
    
    var resultado = parseFloat(limpio / total * 100)
        
    console.log('Limpiado el ' + resultado + ' %');
    
    return resultado;
}


function calculateBlack2(){
    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');
    var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
    
    var total = imgData.data.length / 4;
    
    var gris = 0
    
    for (var i=0; i < imgData.data.length; i+=4){
       if ((imgData.data[i+0] == 32) && (imgData.data[i+1] == 32) && (imgData.data[i+2] == 32)){
           gris++; 
       }
    }
    
    var resultado = parseFloat(gris / total * 100)
        
    console.log('Aún por borrar: ' + resultado);
    
    return resultado;
}


function canvasEraser() {
	var canvas = document.querySelector('#paint');
	var ctx = canvas.getContext('2d');
	
	var sketch = document.querySelector('#sketch');
	var sketch_style = getComputedStyle(sketch);
	canvas.width = parseInt(sketch_style.getPropertyValue('width'));
	canvas.height = parseInt(sketch_style.getPropertyValue('height'));
		
	// Creating a tmp canvas
	var tmp_canvas = document.createElement('canvas');
	var tmp_ctx = tmp_canvas.getContext('2d');
	tmp_canvas.id = 'tmp_canvas';
	tmp_canvas.width = canvas.width;
	tmp_canvas.height = canvas.height;
	
	sketch.appendChild(tmp_canvas);
		
	// Hide Tmp Canvas
	tmp_canvas.style.display = 'none';
    
	var mouse = {x: 0, y: 0};
	var last_mouse = {x: 0, y: 0};
	
	// Pencil Points
	var ppts = [];
	
	/* Mouse Capturing Work */
	tmp_canvas.addEventListener('mousemove', function(e) {
		mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
	}, false);
	
	canvas.addEventListener('mousemove', function(e) {
		mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
        
        $('#puntero').css({'left' : mouse.x -20 , 'top': mouse.y -20 });
        
	}, false);
	
	canvas.addEventListener('mousedown', function(e) {
		canvas.addEventListener('mousemove', onErase, false);
		
		mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
		mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
        		
		ppts.push({x: mouse.x, y: mouse.y});
		
		onErase();
	}, false);
	
	canvas.addEventListener('mouseup', function() {
		canvas.removeEventListener('mousemove', onErase, false);
		
		// Emptying up Pencil Points
		ppts = [];
	}, false);
	
	var onErase = function() {
		
		// Saving all the points in an array
		ppts.push({x: mouse.x, y: mouse.y});
		
		ctx.globalCompositeOperation = 'destination-out';
		ctx.fillStyle = 'rgba(0,0,0,1)';
		ctx.strokeStyle = 'rgba(0,0,0,1)';
		ctx.lineWidth = gordura;
		
		if (ppts.length < 3) {
			var b = ppts[0];
			ctx.beginPath();
			ctx.arc(b.x, b.y, ctx.lineWidth / 2, 0, Math.PI * 2, !0);
			ctx.fill();
			ctx.closePath();
			
			return;
		}
		
		// Tmp canvas is always cleared up before drawing.		
		ctx.beginPath();
		ctx.moveTo(ppts[0].x, ppts[0].y);
		
		for (var i = 1; i < ppts.length - 2; i++) {
			var c = (ppts[i].x + ppts[i + 1].x) / 2;
			var d = (ppts[i].y + ppts[i + 1].y) / 2;
			
			ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
		}
		
		// For the last 2 points
		ctx.quadraticCurveTo(
			ppts[i].x,
			ppts[i].y,
			ppts[i + 1].x,
			ppts[i + 1].y
		);
		ctx.stroke();
	};
}