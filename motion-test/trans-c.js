var qz = {};

qz.transx = function(elemt, elemb, arr, num) {
	var elt;
	var elb;
	var panelSize;
	var panelLeft;
	var panelRight;
	var cssTime = 5000;

	(function(){init()})();

	function init() {
		if(elemt && elemb && arr && num) {
			if(elt = document.getElementById(elemt)) {
				elb = document.getElementById(elemb);
				setSizing(num);
				window.addEventListener('load', function(){
				  	elt.setAttribute('style','visibility:visible;');
				  	elb.setAttribute('style','visibility:visible;');
				});
			} else { throw new Error('an element with the id of "' + elemt + '" was not found'); }
		} else { throw new Error('required parameter(s) missing'); }
	};

	function setSizing(num) {
		var w = elt.clientWidth;
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
		createPanelsOut();
		createPanelsIn();
	};

	function createPanelsOut() {
		var panel;
		var top;

		for(var i = 0; i < num; i++){
			panel = document.createElement('div');
			panel.className = 'tpanel';
			top = document.createElement('div');
			top.className = 'top';
			top.style.backgroundImage = "url('"+ arr[1] +"')";

			if(i == 0) {
				panel.setAttribute('style','width:' + panelLeft + 'px');
				top.style.backgroundPosition = "0px 0px";
			} else if(i == (num - 1)) {
				panel.setAttribute('style','width:' + panelRight + 'px');
				top.style.backgroundPosition = "-" + (panelLeft + (panelSize * (num - 2))) + "px 0px";
			} else {
				panel.setAttribute('style','width:' + panelSize + 'px');
				top.style.backgroundPosition = "-" + ((panelSize * i) + (panelLeft - panelSize)) + "px 0px";
			}

			panel.appendChild(top);
			elt.appendChild(panel);
		}
	};

	function createPanelsIn() {
		var panel;
		var bottom;

		for(var i = 0; i < num; i++){
			panel = document.createElement('div');
			panel.className = 'bpanel';
			bottom = document.createElement('div');
			bottom.className = 'bottom';
			bottom.style.backgroundImage = "url('"+ arr[0] +"')";
			

			if(i == 0) {
				panel.setAttribute('style','width:' + panelLeft + 'px');
				bottom.style.backgroundPosition = "-1100px 0px";
			} else if(i == (num - 1)) {
				panel.setAttribute('style','width:' + panelRight + 'px');
				bottom.style.backgroundPosition = "-1100px 0px";
			} else {
				panel.setAttribute('style','width:' + panelSize + 'px');
				bottom.style.backgroundPosition = "-1100px 0px";
			}

			panel.appendChild(bottom);
			elb.appendChild(panel);
		}
	};

	function doOut(i, a) {
		var p = document.getElementsByClassName('tpanel');
		var t = factorial() / num;

		setTimeout(function(){
			setTimeout(function(){
				a.className = a.className += " move";
				a.style.backgroundPosition = (i * 250 + 1100) + 'px 0px';
			}, (num - i) * 100);

			setTimeout(function(){
				p[i].className = p[i].className + ' fade';
			}, ((num - i) * (t/2)) + 500);
		}, i);
	};

	function doIn(i, a) {
		var p = document.getElementsByClassName('bpanel');
		var t = factorial() / num;

		setTimeout(function(){
			a.className = a.className += " moveIn";
			
			if(i == 0) {
				a.style.backgroundPosition = '0px 0px';
			} else if(i == (num - 1)) {
				a.style.backgroundPosition = "-" + (1100 - (panelRight + panelLeft)) + 'px 0px';
			} else {
				a.style.backgroundPosition = "-" + (panelSize * i) + 'px 0px';
			}

			setTimeout(function(){
				p[i].className = p[i].className + ' fadeIn';
			}, ((num - i) * (t/2)) + 750);
		}, (num - i) * 100);
	}

	function factorial() { 
		var result = 0;
		for(var i = 0;i < num;i++) { result += i * 100 }
		return result;
	} 

	qz.transx.out = function() {
		var a = document.getElementsByClassName('top');

		for(var i = a.length - 1;i >= 0;i--) {
			doOut(i, a[i]);
		}
		qz.transx.in();
	};

	qz.transx.in = function() {
		var a = document.getElementsByClassName('bottom');

		for(var i = 0;i < a.length;i++) {
			doIn(i, a[i]);
		}
	};
}