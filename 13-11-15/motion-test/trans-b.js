var qz = {};

qz.transx = function(elem, arr, num) {
	var el;
	var panelSize;
	var panelLeft;
	var panelRight;
	var timeOffset = 20;
	var next = 0;
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
						next = 0;
						el.innerHTML = "";
						setSizing(num);
					}, 250, 'unique');
				});
			} else { throw new Error('an element with the id of "' + elem + '" was not found'); }
		} else { throw new Error('required parameter(s) missing'); }
	};

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
	};

	function createPanels() {
		var panel;
		var top;

		var multiplier = (el.clientWidth - 700) / 400;
		var move = (Math.abs(multiplier - 1) * 150);

		var panelOffset = panelSize + move;

		for(var i = 0; i < num; i++){
			panel = document.createElement('div');
			panel.className = 'panel';
			top = document.createElement('div');
			top.className = 'top';
			top.style.backgroundImage = "url('"+ arr[1] +"')";

			if(i == 0) {
				panel.setAttribute('style','width:' + panelLeft + 'px');
				top.style.backgroundPosition = "-" + move + "px 0px";
			} else if(i == (num - 1)) {
				panel.setAttribute('style','width:' + panelRight + 'px');
				top.style.backgroundPosition = "-" + (move + (panelLeft + (panelSize * (num - 2)))) + "px 0px";
			} else {
				panel.setAttribute('style','width:' + panelSize + 'px');
				top.style.backgroundPosition = "-" + (move + ((panelSize * i) + (panelLeft - panelSize))) + "px 0px";
			}
			panel.appendChild(top);
			el.appendChild(panel);
		};
	};

	function addNext() {
		var p = document.getElementsByClassName('panel');

		for(var i = p.length - 1;i >= 0;i--) {
			bottom = document.createElement('div');
			bottom.className = 'bottom';
			bottom.style.backgroundImage = "url('"+ arr[next] +"')";
			bottom.style.backgroundPosition = "-1100px 0px";

			if(i == 0) {
				p[i].setAttribute('style','width:' + panelLeft + 'px');
				bottom.style.marginLeft = "-" + panelLeft + "px";
			} else if(i == (num - 1)) {
				p[i].setAttribute('style','width:' + panelRight + 'px');
				bottom.style.marginLeft = "-" + panelRight + "px";
			} else {
				p[i].setAttribute('style','width:' + panelSize + 'px');
				bottom.style.marginLeft = "-" + panelSize + "px";
			}
			p[i].appendChild(bottom);
		}
	};

	function doIn(i, a) {
		var multiplier = (el.clientWidth - 700) / 400;
		next == 0 ? move = (Math.abs(multiplier - 1) * 150) : move = (Math.abs(multiplier - 1) * 300);

		var t1 = setTimeout(function(){
			if(i == 0) {
				a.style.marginLeft = "0px";
				a.style.backgroundPosition = "-" + move + "px 0px";
			} else if(i == (num - 1)) {
				a.style.marginLeft = "0px";
				a.style.backgroundPosition = "-" + (move + (panelLeft + (panelSize * (num - 2)))) + "px 0px";
			} else {
				a.style.marginLeft = "0px";
				a.style.backgroundPosition = "-" + (move + ((panelSize * i) + (panelLeft - panelSize))) + "px 0px";
			}
			
			setTimeout(function(){
				a.className = 'top';
			}, i * timeOffset);

		}, (i) * timeOffset);
	};

	function doOut(i, a) {
		var t1 = setTimeout(function(){
			if(i == 0) {
				a.style.marginLeft = panelSize + (panelLeft - panelSize) + "px";
			} else if(i == (num - 1)) {
				a.style.marginLeft = panelSize + (panelRight - panelSize) + "px";
			} else {
				a.style.marginLeft = panelSize + "px";
			}
		}, i * timeOffset);

		var t2 = setTimeout(function(){
			if(i == 0) {
				a.style.backgroundPosition = "0px 0px";
			} else if(i == (num - 1)) {
				a.style.backgroundPosition = "0px 0px";
			} else {
				a.style.backgroundPosition = "0px 0px";
			}
		}, i * timeOffset * .5)

		if(i == 0) {
			setTimeout(function(){
				var t = document.getElementsByClassName('top');

				for(var i = 0;i < t.length;i++) {
					t[i].parentElement.removeChild(t[i]);
				}
			}, num * timeOffset + 750);

			setTimeout(function(){
				qz.transx.in();
			}, num * timeOffset - 500);
		}
	};

	qz.transx.in = function() {
		next == 0 ? next = 1 : next = 0;

		var a = document.getElementsByClassName('bottom');

		for(var i = a.length - 1;i >= 0;i--) {
			doIn(i, a[i]);
		}
	};

	qz.transx.out = function() {
		var a = document.getElementsByClassName('top');

		addNext();

		for(var i = a.length - 1;i >= 0;i--) {
			doOut(i, a[i]);
		}
	};
}