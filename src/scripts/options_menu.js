function mostrarConfig(){
    $('#config_panel').toggle()
    $('#container_canvas').toggle()
    
    if ($('#config_panel').is(":visible")){
        $('#config_button').html('Cerrar');
    }else{
        $('#config_button').html('Opciones');
    }
    
    if (showConfigButtonWithSound){
        new Audio('../sounds/guitar.mp3').play();        
    }
}

// Aplicar configuraciones
function aplicarConfig(){
    if ($('#config_trucos input').val() === 'lvlmax'){
        level = 30;
        desbloquear();
    }
    
    if ($('#config_name input').val() != ''){
        name = $('#config_name input').val();   
    }
    
    if ($('#config_color input').val() != $('#puntero').attr('background')){
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
        appendBackgroundAudioTag($('#config_audio input').val());
    }

    if (applyButtonWithSound){
        new Audio('../sounds/guitar.mp3').play();        
    } 
}

function reiniciar(){
    if (confirm('Estas seguro? Volveras al nivel 1...')) {
        location.reload(true);
    } else {
        new Audio('../sounds/slam.mp3').play();
    }
}

function subirNivel(){
    if (money == 1){
        if (confirm('Estas seguro de que quieres que te timen?')) {
            level++;
            desbloquear();
            money = 0;
            $('#purse').toggle();
        } else {
            new Audio('../sounds/hi.mp3').play();
        } 
    }
}