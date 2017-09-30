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

function addClass(elment,value) {
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
	var description = document.getElementById("description");
	if (description.fristChild.nodeType == 3){
		description.fristChild.nodeValue = text;
	}
	return false;

}

function preparePlaceholder() {
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById)

}

addLoadEvent(prepareSlideshow);
addLoadEvent(highlightPage);
addLoadEvent(prepareInternalnav);
