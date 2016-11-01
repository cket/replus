console.log('execution, at least');
var elems = document.getElementsByClassName("timeline-comment-actions");

for (i = 0; i < elems.length; i++){
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name = "resolved";
	checkbox.value = "value";
	checkbox.id = 'cjk'.concat(String(i)); 
	elems[i].appendChild(checkbox);
};
console.log('content loaded ');
for (i = 0; i < elems.length; i++){
	var j = i;
	console.log('adding listers at index:');
	console.log(i);
	var link = document.getElementById('cjk'.concat(String(i)));
    link.addEventListener('click', function() {
    	markResolved(0);
	});
}
function markResolved(index){
	console.log('At index:');
	console.log(index);
	var commentBody = document.getElementsByClassName("comment-body markdown-body markdown-format js-comment-body");
	if(typeof commentBody[index] != 'undefined'){
		console.log('marking as resolved');
		console.log(commentBody[index].innerHTML);
		children = document.querySelectorAll(".comment-body markdown-body markdown-format js-comment-body");
		// commentBody[index].innerHTML = '~'.concat(commentBody[index].innerHTML, '~');
		//currently works techinically but the markdown isn't evaluated.. we have to map every char into it's 
		// crossed out equivalent. Alternatively color it.
	}
}
// function toggleState() {
// 	console.log('saving settings');
// 	// Get a value saved in a form.
// 	var theValue = chrome.storage.get('value', function(objects){
// 		// Save it using the Chrome extension storage API.
// 		var value = (typeof objects.value != 'undefined' ? objects.value : true)
// 		chrome.storage.sync.set({'value': value}, function() {
// 		// Notify that we saved.
// 		message('Value saved');
// 		});
// 	});
// };

//add new toggle-able button 'resolved'

//document.body.innerHTML = document.body.innerHTML.replace(new RegExp("better", "g"), "nobody");


var replaceTextInNode = function(parentNode){
	for(var i = parentNode.childNodes.length-1; i >= 0; i--){
		var node = parentNode.childNodes[i];
		if(node.nodeType == Element.TEXT_NODE){
			node.textContent = 'HI';
		} else if(node.nodeType == Element.ELEMENT_NODE){
			replaceTextInNode(node);
		}
	}
};

//replaceTextInNode(document.body);

