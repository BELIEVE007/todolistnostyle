var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ol = document.querySelector("ol");
var li = document.getElementsByTagName("li");
function inputLength() {
	return input.value.length;
}

function createListElement() {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
	ol.appendChild(li);
	input.value = "";
	var btn=document.createElement('button');
       btn.appendChild(document.createTextNode('!Done'));
       li.appendChild(btn);
       var btn2=document.createElement('button');
       btn2.appendChild(document.createTextNode('Delete'));
       li.appendChild(btn2);
       btn2.onclick=removeParent;
       btn.onclick=UnderlineParent;

}

function UnderlineParent(event){
	event.target.parentNode.classList.toggle("done");
}

function removeParent(evt){
	evt.target.parentNode.remove();
} 
function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}


button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);