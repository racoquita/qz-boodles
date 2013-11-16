var qz = {};

qz.transitionBg = function(elem, arr, num) {
	var el;
	var panelSize;
	var panelLeft;
	var panelRight;
	var type = 0;

	if(elem && arr && num) {
		if(el = document.getElementById(elem)) {
			setSizing(num);
		} else {
			throw new Error('an element with the id of "' + elem + '" was not found');
		}
	} else {
		throw new Error('required parameter(s) missing');
	}

	function setSizing(num) {
		var w = el.clientWidth;
		var s = w % num;

		if(!s) {
			panelSize = w / num;
			panelLeft = w / num;
			panelRight = w / num;
		} else {
			panelSize = Math.floor(w / num);

			if(!(s % 2)) {
				type = 1;
				panelLeft = panelSize + s / 2;
				panelRight = panelSize + s / 2;
			} else {
				type = 2;
				panelLeft = panelSize + Math.ceil(s / 2);
				panelRight = panelSize + Math.floor(s / 2);
			}
		}
		createPanels();
	}

	function createPanels() {
		var panel;
		var inner;

		for(var i = 0; i < num; i++){
			panel = document.createElement('div');
			inner = document.createElement('div');
			panel.className = 'panel';
			inner.className = 'inner';

			if(type == 0) {
				panel.setAttribute('style','width:' + panelSize + 'px');
				inner.setAttribute('style','background-image:url('+ arr[1] +');background-position:-' + (panelSize * i) + 'px 0px');
				panel.appendChild(inner);
			} else if(type == 1) {
				if(i == 0) {
					panel.setAttribute('style','width:' + panelLeft + 'px');
					inner.setAttribute('style','background-image:url('+ arr[1] +');background-position:0px 0px');
				} else if(i == num) {
					panel.setAttribute('style','width:' + panelRight + 'px');
					inner.setAttribute('style','background-image:url('+ arr[1] +');background-position:-' + panelRight + 'px 0px');
				} else {
					panel.setAttribute('style','width:' + panelSize + 'px');
					inner.setAttribute('style','background-image:url('+ arr[1] +');background-position:-' + (panelSize * i) + 'px 0px');
				}
			} else {
				if(i == 0) {
					panel.setAttribute('style','width:' + panelLeft + 'px');
					inner.setAttribute('style','background-image:url('+ arr[1] +');background-position:0px 0px');
				} else if(i == num) {
					panel.setAttribute('style','width:' + panelRight + 'px');
					inner.setAttribute('style','background-image:url('+ arr[1] +');background-position:-' + panelRight + 'px 0px');
				} else {
					panel.setAttribute('style','width:' + panelSize + 'px');
					inner.setAttribute('style','background-image:url('+ arr[1] +');background-position:-' + (panelSize * i) + 'px 0px');
				}
			}
			panel.appendChild(inner);
			el.appendChild(panel);
		};
	}
};