var name = 'viejo amigo',
    level = 1,
    time = 0,
    money = 1,
    pointerRadius = 50,
    porcentaje_meta = 60,
    porcentaje_nextLevel = 35,
    rainbowActive,
    applyButtonWithSound,
    showConfigButtonWithSound,
    timer;

$(document).ready(init);

function init() {
    adaptarPuntero();
    $('#config_button').click(mostrarConfig);
    desbloquear();
    temporizador();
}

function adaptarPuntero(){
    $('#puntero').css({'width': pointerRadius , 'height': pointerRadius, 'font-size': pointerRadius / 10});
}

// Reinicia la cuenta atrás para el logout automático (timeout), entre otros
function temporizador(){
    var canvas = document.querySelector('#paint'),
        meta1;
            
        canvas.addEventListener('mouseup', function() {
            var porcentaje = calculateBlack2();
            
            if ((porcentaje < porcentaje_nextLevel) ){
                level++;
                desbloquear();
                meta1 = false;
                porcentaje_meta -= 2;
                porcentaje_nextLevel -= 1;
                pointerRadius = 50;
                adaptarPuntero();
            }
        });
    
    pressTimer();

    function pressTimer(){
        clearTimeout(timer);
        timer = setTimeout(
        function(){
            time++;
            $('#crono').html(time + ' s');
            $('#nivel').html('Nivel ' + level);
        
	       var porcentaje = calculateBlack2();
        
            if ((porcentaje < porcentaje_meta) && !meta1){
                pointerRadius = pointerRadius * 1.5;
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

function toggleRainbow(){
    if (!rainbowActive){
        rainbowColor('puntero', 'main_header'); 
    }
    
    rainbowActive = !rainbowActive;
}

function rainbowColor(capa1, capa2){
    var colors = ['Red', 'Yellow', 'Green', 'Blue'];

    for (var i = 0; i < colores.length; i++){
        $( "#" + capa1 ).animate({
            backgroundColor: colors[i]
        }, 5000);
        
        $( "#" + capa2 ).animate({
            backgroundColor: colors[i]
        }, 5000);
    }
    
    if (rainbowActive){
        rainbowColor(capa1, capa2);    
    }
}

function appendBackgroundAudioTag(soundName) {
    $('#audio').html('<audio src="src/sounds/background/' + soundName + '.mp3" controls loop/>');
}

function appendBackgroundImgTag(number, width, height) {
    $('#background_image').html('<img src="src/images/' + number + '.jpg" width="' + width + '" height="' + height + '"/>');
}

function desbloquear(){
    var msj = '',
        texto = '';
    
    canvasEraser();
    
    var canvas = document.querySelector('#paint'),
        ctx = canvas.getContext('2d');
    
	ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(32, 32, 32)";
    ctx.fill();
    ctx.font = "40px Calibri";
    ctx.fillStyle = "white";
    
    switch(level){
        case 1:
            texto = 'Click & drag     ;-)';
            msj = '---Creado por Gabriel ---'
            break;
        case 2:
            msj = '"El Titulo" desbloqueado!'
            $('#titulo').toggle();
            break;
        case 3:
            msj = '"Opciones" desbloqueado!'
            $('#config_button').toggle();  
            break;
        case 4:
            //escribir levelmax para llegar al penúltimo nivel
            msj = '"Trucos" desbloqueado!'
            $('#config_trucos').toggle();
            $('#aplicar').toggle(); 
            $('#aplicar').click(aplicarConfig); 
            break;    
        case 5:
            msj = '"Contador de Nivel" desbloqueado!'
            $('#nivel').toggle();
            break;
        case 6:
            msj = '"Cambiar de Identidad" desbloqueado!'
            $('#config_name').toggle();
            break;
        case 7:
            msj = '"Musica de Ambiente" desbloqueado!'
            $('#config_audio').toggle();
            appendBackgroundAudioTag('people');
            break;
        case 8:
            //Cambiar color de fondo
            msj = '"Colores" desbloqueado!'
            $('#config_color').toggle();
            break;
         case 9:
            msj = '"Cambiar el Titulo" desbloqueado!'
            $('#config_titulo').toggle();
            break;
        case 10:
            //Desbloquea elección de forma del div cursor / +1 forma
            msj = '"Cambiar de Forma" desbloqueado!'
            // Tal vez se pueda el pincel tmb: http://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_linecap
            $('#config_forma').toggle();
            $('#forma_list').append('<option label="Cuadrado" value="cuadrado">');
            $('#puntero').css({'border-radius': '0px 0px 0px 0px'}); 
            break;
        case 11:
            //Cambiar color de las letras
            msj = '"Preparing for battle" desbloqueado!'
            $('#song_list').append('<option label="Fire Emblem Preparing Battle" value="song2">');
            appendBackgroundAudioTag('chimes');
            break;
        case 12:
            //Desbloquea acción al clicar o pulsar un botón (amplía durante 1 sec la div, tiene cooldown) (hacer que sea como una explosión, que se queda un rato en e sitio?)
            msj = '"Protestar es bueno" desbloqueado!'
            applyButtonWithSound = true;
            break;
        case 13:
            msj = '"Cronometro" desbloqueado!'
            $('#crono').toggle();
            break;
        case 14:
            msj = '¡"We will see each other at court!" desbloqueado!'
            $('#song_list').append('<option label="Objection Song" value="song4">');
            appendBackgroundAudioTag('restaurant');
            break;
        case 15:
            //Desbloquea fuente de letra
             msj = '"Super Cuuuuute" desbloqueado!'
            break;
        case 16:
            msj = '"Destruir" desbloqueado!'
            $('#config_reiniciar').toggle();
            $('#config_reiniciar').click(reiniciar);
            break;
        case 17:
             msj = '"An Epic Song" desbloqueado!'
            $('#song_list').append('<option label="Fire Emblem Tittle" value="song3">');
            appendBackgroundAudioTag('rain');
            break;
        case 18:
            msj = '"This is not even my Final Form" desbloqueado!'
            $('#forma_list').append('<option label="Diferente" value="diferente">');
            $('#puntero').css({'border-radius': '300px 0px 300px 0px'});
            break;
        case 19:
            //Desbloquea un ayudante (random printer)
             msj = '"yeah" desbloqueado!'
            break;
        case 20:
            //Desbloquea un color cambiante para el puntero
             msj = '"OMG" desbloqueado!'
            $('#config_rainbow').toggle();
            $('#config_rainbow').click(toggleRainbow);
            break;
         case 21:
            //Te otorga la posibilidad de, solo una vez, saltarte un nivel (con la única moneda que tienes)
            $('#purse').toggle();
            $('#subirNivel').toggle();
            msj = '"Pay to Win" desbloqueado!'
            $('#subirNivel').click(subirNivel);
            break;
        case 22:
            //22. ''  Ponerle audio, ese sonido que tanta gracia le hace a iván del instant buttons. Que suene cada vez que le da a config.
            msj = '"Por las Risas" desbloqueado!'
            showConfigButtonWithSound = true;            
            break;
        case 23:
            msj = '"Un ligero sentimiento de decepción" desbloqueado!';
            break;
        case 24:
            //24. '¡"Super Nova" desbloqueado!'  (una explosión mayor...)
            msj = '"Opciones" bloqueado de nuevo! :P';
            $('#config_button').toggle();
            break;
        case 25:
            //24. Nombrar al pnj
            msj = '"Menos recompensas" desbloqueado...'
            break;
        case 26:
            //26. Todos los textos pasan a ser la misma palabra...
            msj = '"Opciones" desbloqueado! (again)'
            $('#config_button').toggle();
            break;
        case 27:
            //27. Música del FFIX: mapa del mundo    
            msj = '"Piro Plus Plus" desbloqueado!'
            $('#song_list').append('<option label="FF IX World Map" value="song5">');
            appendBackgroundAudioTag('radio');
            break;
            break;
        case 28:
            //28. Novas aleatorias, espontáneas o generadas por el ayudante
            msj = '"Recta final" desbloqueado!'
            break;
        case 29:
            //29. La penúltima puede ser elegir tamaño del pincel    
            msj = '"Descanso voluntario" desbloqueado!'
            break;
        case 30:
            //29. La penúltima puede ser elegir tamaño del pincel    
            msj = '"Boss Battle" desbloqueado!'
            break;
        case 31:
            msj = 'VICTORIA'
            break;  
    }
    
    appendBackgroundImgTag(level, canvas.width, canvas.height);
    
    ctx.fillText(level, 50, canvas.height / 2);
    
    $('#aviso').html(msj);
    $('#aviso').show();
    $('#aviso').fadeOut(4000);
}