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
		ctx.lineWidth = pointerRadius;
		
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

function calculateBlack(){
    var canvas = document.querySelector('#paint'),
        ctx = canvas.getContext('2d'),
        imgData=ctx.getImageData(0,0,canvas.width,canvas.height),
        total = imgData.data.length / 4,
        limpio = 0
    
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