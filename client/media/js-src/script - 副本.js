"use strict";

class Draw {
	constructor(ele) {
		this.ele = ele;
		this.canvas = document.getElementById(this.ele);
		this.context = this.canvas.getContext('2d');
		this.stage_info = this.canvas.getBoundingClientRect();
		this.path = {
			beginX: 0,
			beginY: 0,
			endX: 0,
			endY: 0
		};
	}

	init() {
		let _this = this;
		this.canvas.addEventListener('touchstart', function (e) {
			alert('hhaha');
			_this.drawBeginTouch(e.touches[0]);
		}, false);
		this.canvas.addEventListener('touchend', function (e) {
			document.ontouchmove = document.ontouchstart = null;
		}, false);
		this.canvas.onmousedown = function (e) {
			console.log(e.touches);
			_this.drawBegin(e);
		};
		this.canvas.onmousend = function (e) {
			_this.drawEnd();
		};
	}

	drawBeginTouch(e) {

		var _this = this;
		window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty();
		this.context.strokeStyle = "#000";

		this.context.beginPath();
		this.context.moveTo(e.clientX - this.stage_info.left, e.clientY - this.stage_info.top);

		this.path.beginX = e.clientX - this.stage_info.left;
		this.path.beginY = e.clientY - this.stage_info.top;

		document.addEventListener('touchmove', function (ev) {
			_this.drawing(ev.touches[0]);
		});
	}

	drawBegin(e) {
		let _this = this;
		window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty();
		this.context.strokeStyle = "#000";

		this.context.beginPath();
		this.context.moveTo(e.clientX - this.stage_info.left, e.clientY - this.stage_info.top);

		this.path.beginX = e.clientX - this.stage_info.left;
		this.path.beginY = e.clientY - this.stage_info.top;

		document.onmousemove = function (e) {
			_this.drawing(e);
		};
	}

	drawing(e) {
		this.context.lineTo(e.clientX - this.stage_info.left, e.clientY - this.stage_info.top);

		this.path.endX = e.clientX - this.stage_info.left;
		this.path.endY = e.clientY - this.stage_info.top;

		// ws.send(this.path.beginX + '.' + this.path.beginY + '.' + this.path.endX + '.' + this.path.endY)

		this.context.stroke();
	}

	drawEnd(e) {
		document.onmousemove = document.onmouseup = null;
	}

	clearCanvas(ws, btn) {
		btn.onclick = () => {
			this.cxt.clearRect(0, 0, 500, 500);
			ws.send('clear');
		};
	}
}