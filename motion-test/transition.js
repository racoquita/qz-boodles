var qz = {};

qz.transitionBg = function(elem, arr, num) {
	var el;
	var panelSize;
	var panelLeft;
	var panelRight;
	var direction = 1;
	var offset = 10;
	var waitForFinalEvent = (function() {
		var timers = {};
		return function (callback, ms, uniqueId) {
			if (!uniqueId) {
			  	uniqueId = "uniqueId";
			}
			if (timers[uniqueId]) {
			  	clearTimeout (timers[uniqueId]);
			}
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})();

	(function(){init()})();

	function init() {
		if(elem && arr && num) {
			if(el = document.getElementById(elem)) {
				setSizing(num);
				window.addEventListener('load', function(){
				  	el.setAttribute('style','visibility:visible;');
				});
				window.addEventListener('resize', function(e){
					waitForFinalEvent(function(){
						direction = 1;
						el.innerHTML = "";
						setSizing(num);
					}, 250, 'unique');
				});
			} else { throw new Error('an element with the id of "' + elem + '" was not found'); }
		} else { throw new Error('required parameter(s) missing'); }
	}
		
	qz.transitionBg.animatePanelsIn = function() {
		var a = document.getElementsByClassName('inner');
		var b = document.getElementsByClassName('other');

		direction == 1 ? amt = panelSize : amt = 0;

		if(direction == 1){
			setTimeout(function(){reset('inner')}, offset * num);
			for(var j = 0;j < a.length;j++) {
				doTimeout(j, a[j], b[j], amt);
			}
		} else {
			setTimeout(function(){reset('other')}, offset * num);
			for(var j = a.length - 1;j >= 0;j--) {
				doTimeout(j, a[j], b[j], amt);
			}
		}
		direction = -direction;
	}

	function reset(str) {
		var a = document.getElementsByClassName(str);

		for(var i = 0;i < a.length; i++) {
			a[i].style.backgroundPosition = "0px 0px";
		}
	}

	function doTimeout(i, a, b, amt) {
		var time;

		direction == 1 ? time = (i * offset) : time = ((num - i) * offset);

		var timer = setTimeout(function(){
			var z = direction == 1 ? z = 0 : z = 1;

			if(i == 0) {
				a.style.marginLeft =  amt + ((panelLeft - panelSize) * z) + 'px';
				b.style.marginLeft =  amt + ((panelLeft - panelSize) * z) + 'px';
				a.style.backgroundPosition = "0px 0px";
				b.style.backgroundPosition = "0px 0px";
			} else if(i == (num - 1)) {
				a.style.marginLeft =  amt + ((panelRight - panelSize) * z) + 'px';
				b.style.marginLeft =  amt + ((panelRight - panelSize) * z) + 'px';
				a.style.backgroundPosition = "-" + ((panelSize * i) + (panelLeft - panelSize)) +"px 0px";
				b.style.backgroundPosition = "-" + ((panelSize * i) + (panelLeft - panelSize)) +"px 0px";
			} else {
				a.style.marginLeft =  amt + 'px';
				b.style.marginLeft =  amt + 'px';
				a.style.backgroundPosition = "-" + ((panelSize * i) + ((panelLeft - panelSize) * z)) +"px 0px";
				b.style.backgroundPosition = "-" + ((panelSize * i) + ((panelLeft - panelSize) * z)) +"px 0px";
			}
		}, time);
	}

	function setSizing(num) {
		var w = el.clientWidth;
		var s = w % num;

		if(!s) {
			panelSize = panelLeft = panelRight = w / num;
		} else {
			panelSize = Math.floor(w / num);
			if(!(s % 2)) {
				panelLeft = panelRight = (panelSize + s / 2);
			} else {
				panelLeft = panelSize + Math.ceil(s / 2);
				panelRight = panelSize + Math.floor(s / 2);
			}
		}
		createPanels();
	}

	function createPanels() {
		var panel;
		var inner;
		var other;

		for(var i = 0; i < num; i++){
			panel = document.createElement('div');
			panel.className = 'panel';
			inner = document.createElement('div');
			inner.className = 'inner';
			inner.style.backgroundImage = "url('"+ arr[1] +"')";
			other = document.createElement('div');
			other.className = 'other';
			other.style.backgroundImage = "url('"+ arr[0] +"')";

			if(i == 0) {
				panel.setAttribute('style','width:' + panelLeft + 'px');
				inner.style.backgroundPosition = "0px 0px";
				other.style.left = "-" + panelLeft + "px";
			} else if(i == (num - 1)) {
				panel.setAttribute('style','width:' + panelRight + 'px');
				inner.style.backgroundPosition = "-" + (panelLeft + (panelSize * (num - 2))) + "px 0px";
				other.style.left = "-" + panelRight + "px";
			} else {
				panel.setAttribute('style','width:' + panelSize + 'px');
				inner.style.backgroundPosition = "-" + ((panelSize * i) + (panelLeft - panelSize)) + "px 0px";
				other.style.left = "-" + panelSize + "px";
			}
			panel.appendChild(inner);
			panel.appendChild(other);
			el.appendChild(panel);
		};
	}
};


