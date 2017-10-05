function addLoadEvent(func) {
	var oldonload = window.onload;
	if ( typeof window.onload != 'function'){
		window.onload = func;
	} else{
		window.onload = function() {
			oldonload();
			func();
		}

	}
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

function addClass(element,value) {
	if (!element.className){          //检查classname属性是否为null
		element.className = value;    //如果是，将新的class设置值直接赋给classname属性
	} else{                           //如果不是，把一个空格新的class设置值追加到classname属性上去
		newClassName = element.className; 
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}

function moveElement(elementID,final_x,final_y,interval) {
	if (!document.getElementById) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if (elem.movement){
		clearTimeout(elem.movement);
	}
	if (!elem.style.left){
		elem.style.left = "0px";
	}
	if (!elem.style.top){
		elem.style.top = "0px";
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos == final_x && ypos == final_y){
		return true;
	}
	if (xpos < final_x){
		var dist = Math.ceil((final_x - xpos)/10);
		xpos = xpos + dist;
	}
	if (xpos > final_x){
		var dist = Math.ceil((xpos - final_x)/10);
		xpos = xpos - dist;
	}
	if (ypos < final_y){
		var dist = Math.ceil((final_y - ypos));
		ypos = ypos + dist;
	}
	if (ypos > final_y){
		var dist = Math.ceil((ypos = final_y));
		ypos = ypos - dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}
//about.html
function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for (var i=0; i < sections.length; i++){
		if (sections[i].getAttribute("id") != id){
			sections[i].style.display = "none";
		} else{
			sections[i].style.display = "block";
		}
	}
}
function prepareInternalnav() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if (articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if (navs.length == 0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for (var i=0; i < links.length; i++){
		var sectionId = links[i].getAttribute("href").split("#")[1];//split方法：根据分隔符把一个字符串分成两或多部分的一种便捷方式
		if (!document.getElementById(sectionId)) continue;//确认真的存在带有相应id的元素
		document.getElementById(sectionId).style.display = "none";//页面加载后，需要默认隐藏所有部分
		links[i].destination = sectionId;//变量sectionId是局部变量
		links[i].onclick = function() {
			showSection(this.destination);
			return false;
		}
	}
}
function highlightPage() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var headers = document.getElementsByTagName('header');
	if (headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName('nav');
	if (navs.length == 0) return false;

	var links = navs[0].getElementsByTagName('a');
	var linkurl;
	for (var i=0; i < links.length; i++) {
		linkurl = links[i].getAttribute("href");
		if (window.location.href.indexOf(linkurl) != -1){ //如果没有匹配到，indexof将返回-1
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase(); //文本转换，转换为小写
			document.body.setAttribute("id",linktext);
		}
	}
}

function prepareSlideshow() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	//可以为图片加一个小窗口,绝大部分透明，只有四个圆角和div颜色相同
	// var frame = document.createElement("img");
	// frame.setAttribute("src", "images/");
	// frame.setAttribute("alt", "");
	// frame.setAttribute("id","frame");
	// slideshow.appendChild(frame);

	var preview = document.createElement("img");
	preview.setAttribute("id","preview");
	preview.setAttribute("src","images/img2.jpg");
	preview.setAttribute("alt","a glimpse of what awaits you");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	var links = document.getElementsByTagName("a");//document改为intro 这只有文章中的链接有效果
	var destination;
	for (var i=0; i < links.length; i++){
		links[i].onmouseover = function() {
			destination = this.getAttribute("href");
			if (destination.indexOf("index.html") != -1){
				moveElement("preview",0,0,5);
			}
			if (destination.indexOf("about.html") != -1){
				moveElement("preview",-150,0,5);
			}
			if (destination.indexOf("photos.html") != -1){
				moveElement("preview",-300,0,5);
			}
			if (destination.indexOf("live.html") != -1){
				moveElement("preview",-450,0,5);
			}
			if (destination.indexOf("contact.html") != -1){
				moveElement("preview", -600,0,5)
			}

		}
	}

}

//about.html
function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for (var i=0; i < sections.length; i++){
		if (sections[i].getAttribute("id") != id){
			sections[i].style.display = "none";
		} else{
			sections[i].style.display = "block";
		}
	}
}
function prepareInternalnav() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if (articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if (navs.length == 0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for (var i=0; i < links.length; i++){
		var sectionId = links[i].getAttribute("href").split("#")[1];//split方法：根据分隔符把一个字符串分成两或多部分的一种便捷方式
		if (!document.getElementById(sectionId)) continue;//确认真的存在带有相应id的元素
		document.getElementById(sectionId).style.display = "none";//页面加载后，需要默认隐藏所有部分
		links[i].destination = sectionId;//变量sectionId是局部变量
		links[i].onclick = function() {
			showSection(this.destination);
			return false;
		}
	}
}

//photos.html


function preparePlaceholder() {
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("alt","my image gallery");
	placeholder.setAttribute("src","images/placeholder.jpg");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("choose an image");
	description.appendChild(desctext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);

}

function prepareGallery() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i=0; i<links.length; i++){
		links[i].onclick = function() {
			return showPic(this);
		}
	}
}
function showPic(whichpic) {
	if (!document.getElementById("placeholder")) return false;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	if (!document.getElementById("placeholder")) return false;
	if (whichpic.getAttribute("title")) {
		var text = whichpic.getAttribute("title");
	} else{
		var text = "";
	}
	//var description = document.getElementById("description");
	// //[Web浏览器] "Uncaught TypeError: Cannot read property 'nodeType' of undefined"	
	// ///jsDom/demo1/scripts/global.js (235)
	// if (description.fristChild.nodeType == 3){
	// description.fristChild.nodeValue = text;
	// }
	return false;

}

//live.html
function stripeTables() {
	if (!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	for (var i=0; i<tables.length; i++){
		var odd = false;
		var rows = tables[i].getElementsByTagName("tr");
		for (var j=0; j<rows.length; j++){
			if (odd == true){
				addClass(rows[j], "odd");
				odd = false;
			} else{
				odd = true;
			}
		}
	}
}
 function highlightRows() {
 	if (!document.getElementsByTagName) return false;
 	var rows = document.getElementsByTagName("tr");
 	for (var i=0; i<length; i++){
 		rows[i].oldClassName = rows[i].className;
 		rows[i].onmouseover = function() {
 			addClass(this,"hightlight");
 		}
 		rows[i].onmouseout = function() {
 			this.className = this.oldClassName;
 		}
 	}
 }
 function displayAbbreviations() {
 	if (!document.getElementsByTagName || !document.createElement 
 		|| !document.createTextNode) return false;
 	var abbreviations = document.getElementsByTagName("abbr");
 	if (abbreviations.length < 1) return false;
 	var defs = new Array();
 	for (var i=0; i<abbreviations.length; i++){
 		var current_abbr = abbreviations[i];
 		if (current_abbr.childNodes.length < 1) continue;
 		var definition = current_abbr.getAttribute("title");
 		var key = current_abbr.lastChild.nodeValue;
 		defs[key] = definition;
 	}
 	var dlist = document.createElement("dl");
 	for (key in defs){
 		var definition = defs[key];
 		var dtitle = document.createElement("dt");
 		var dtitle_text = document.createTextNode(key);
 		dtitle.appendChild(dtitle_text);
 		var ddesc = document.createElement("dd");
 		var ddesc_text = document.createTextNode(definition);
 		ddesc.appendChild(ddesc_text);
 		dlist.appendChild(dtitle);
 		dlist.appendChild(ddesc);
 	}
 	if (dlist.childNodes.length < 1) return false;
 	var header = document.createElement("h3");
 	var header_text = document.createTextNode("abbreviations");
 	header.appendChild(header_text);
 	var articles = document.getElementsByTagName("article");
 	if (articles.length == 0) return false;
 	var container = articles[0];
 	container.appendChild(header);
 	container.appendChild(dlist);
 }

 //contact.html
 function focusLabels() {
 	if (!document.getElementsByTagName) return false;
 	var labels = document.getElementsByTagName("label");
 	for (var i=0; i<labels.length; i++){
 		if (!labels[i].getAttribute("for")) continue;
 		labels[i].onclick = function() {
 			var id = this.getAttribute("for");
 			if (!document.getElementById(id)) return false;
 			var element = document.getElementById(id);
 			element.focus();
 		}
 	} 
 }
//
//缺少表单验证函数
//
//
//浏览器不支持placeholder
 function resetFields(whichform) {
 	if (Modernizr.input.placeholder) return;
 	for (var i=0; i<whichform.elements.length; i++){
 		var element = whichform.elements[i];
 		if (element.type == "submit") continue;
 		var check = element.placeholder || element.getAttribute("placeholder");
 		if (!check) continue;
 		element.onfocus = function() {
 			var text = this.placeholder || this.getAttribute("placeholder");
 			if (this.value == text){
 				this.className = '';
 				this.value = "";
 			}
 		}
 		element.onblur = function() {
 			if (this.value == ""){
 				this.className = "placeholder";
 				this.value = this.placeholder || this.getAttribute('placeholder');
 			}
 		}

 		element.onblur();
 	}
 }
 // function prepareForms() {
 // 	for (var i=0; i<document.forms.length; i++){
 // 		var thisform = document.forms[i];
 // 		resetFields(thisform);
 // 	}
 // }

 //验证表单
 function isFiled(filed) {
 	if (filed.value.replace(' ','').length == 0) return false;
 	var placeholder = filed.placeholder || filed.getAttribute('placeholder');
 	return (filed.value != placeholder);
 }
 //验证email
 //首先查找字符@，接着搜索句点".";
 function isEmail(filed) {
 	return (filed.value.indexOf("@") != -1 && filed.value.indexOf(".") != -1);
 }

 function validateForm(whichform) {
 	for (var i=0; i<whichform.elements.length; i++){
 		var element = whichform.elements[i];
 		if (element.required == 'required') {
 			if (!isFiled(element)) {
 				alert("Please fill in the" +element.name+ "filed.");
 				return false;
 			}
 		}
 		if (element.type == 'email'){
 			if (!isEmail(element)){
 				alert("the " +element.name+ " filed must be a valid email address.");
 				return false;
 			}
 		}
 	}
 	return true;
 }
 //提交表单，会触发submit事件，而事件会被onsubmit事件处理函数拦截。处理函数时，会将表单传递给validateForm函数
 
function prepareForms(){
    for(var i=0;i< document.forms.length;i++){
        var thisform = document.forms[i];
        resetFields(thisform);
        thisform.onsubmit = function(){
            if(!validateForm(this)) return false;
            var article = document.getElementsByTagName('article')[0];
            if(submitFormWithAjax(this,article)) return false;
            return true;
        }
    }
}

//提交表单
function getHTTPObject() {
	if (typeof XMLHttpRequest == "undefind")
		XMLHttpRequest = function() {
			try{ return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
				catch (e) {}
			try{ return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
			    catch (e) {}
			try{ return new ActiveXObject("Msxml2.XMLHTTP"); }
			    catch (e) {}
			    return false;
		}
		return new XMLHttpRequest();
}
function displayAjaxLoading(element) {
	while (element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
	var content = document.createElement("img");
	content.setAttribute("src","images/loading.gif");
	content.setAttribute("alt","Loading...");
	element.appendChild(content);
}
function submitFormWithAjax(whichform, thetarget){
	var request = getHTTPObject();
	if (!request) {
		return false;
	}
	displayAjaxLoading(thetarget);
	var dataParts = [];
	var element;
	for (var i=0; i<whichform.elements.length; i++){
		element = whichform.elements[i];
		dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
	}
	var data = dataParts.join('&');
	request.open("POST", whichform.getAttribute("action"), true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.onreadystatechange = function() {
		if (request.readyState == 4){
			if (request.status == 200 || request.status == 0){
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (match.length > 0){
					thetarget.innerHTML = matches[1];
				} else{
					thetarget.innerHTML = '<p>Oops, there was an error. Soory.</p>';
				}

			} else{
				thetarget.innerHTML = '<p>' + request.statusText + '</p>';
			}
		}

	};
	request.send(data);
	return true;

};//为什么加分号

addLoadEvent(prepareSlideshow);
addLoadEvent(highlightPage);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);


