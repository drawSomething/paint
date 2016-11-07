var Draw = {
	ele : null,
	socket : null,
	canvas : null,
	context : null,
	stage_info : null,
	type : 'guest',
	path : {},
	strokeColor : "#000",
	init : function(opt){
		this.ele = opt && opt.ele,
		this.socket = opt && opt.socket,
		this.type = opt && opt.type,
		this.canvas = document.getElementById(this.ele);
		this.context = this.canvas.getContext('2d');
		this.stage_info = this.canvas.getBoundingClientRect();
		this.path = {
	        beginX: 0,
	        beginY: 0,
	        endX: 0,
	        endY: 0
	    };
	    if(this.type == 'owner'){
	    	this.startByOwner();
	    }else{
	    	this.startByGuess();
	    }
	    console.log(this.socket);
	    this.socket.on('open',function(){
	        console.log("已连接服务器");
	    });
	},
	startByOwner : function(){
		var _this = this;
		_this.canvas.addEventListener('touchstart',function(e){
			_this.drawBeginTouch(e.touches[0]);
		},false);
		_this.canvas.addEventListener('touchend',function(e){
			document.ontouchmove = document.ontouchstart = null;
			_this.socket.send('stop')
		},false);
	},
	startByGuess : function(){
		var _this = this,
			moveToSwitch = 1;
		_this.socket.on('message',function(msg){
			var pathObj = msg.split('.');
			_this.context.strokeStyle = "#000";
			if (moveToSwitch && msg != 'stop' && msg != 'clear') {
                _this.context.beginPath()
                _this.context.moveTo(pathObj[0], pathObj[1]);
                console.log(pathObj);
                moveToSwitch = 0
            } else if (!moveToSwitch && msg == 'stop') {
                _this.context.beginPath()
                _this.context.moveTo(pathObj[0], pathObj[1])
                moveToSwitch = 1
            } else if (moveToSwitch && msg == 'clear') {
                _this.context.clearRect(0, 0, 500, 500)
            } else if (msg == '答对了！！') {
                alert('恭喜你答对了！！')
            }
            _this.context.lineTo(pathObj[2], pathObj[3])
            _this.context.stroke()
		})
	},
	drawBeginTouch : function(e){

		var _this = this;
		window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty();
		_this.context.strokeStyle = "#000"

	    _this.context.beginPath()
	    _this.context.moveTo(
	        e.clientX - _this.stage_info.left,
	        e.clientY - _this.stage_info.top
	    )

	    _this.path.beginX = e.clientX - _this.stage_info.left
	    _this.path.beginY = e.clientY - _this.stage_info.top

	    document.addEventListener('touchmove',function(ev){
	    	_this.drawing(ev.touches[0]);
	    })
	},

	drawing : function(e){
		var _this = this;
		_this.context.lineTo(
	        e.clientX - _this.stage_info.left,
	        e.clientY - _this.stage_info.top
	    )

	    _this.path.endX = e.clientX - _this.stage_info.left
	    _this.path.endY = e.clientY - _this.stage_info.top

	    _this.socket.send(_this.path.beginX + '.' + _this.path.beginY + '.' + _this.path.endX + '.' + _this.path.endY)

	    _this.context.stroke()
	},

	drawEnd : function(e){
		document.onmousemove = document.onmouseup = null
	}
}
