// heirarchy of the page:
// "timeline-comment js-comment"
// "discussion-item-body"
// "file js-comment-container has-inline-notes"
// "js-inline-comments-container review-comments"
// "js-comments-holder"
// "edit-comment-hide" //main class we want to mess with
// "review-comment-contents"

console.log('Script execution');
var comments = document.getElementsByClassName("review-comment js-comment js-task-list-container commit-comment  previewable-edit  ");
var needListeners = document.getElementsByClassName("timeline-comment-wrapper discussion-item-review mt-0 is-rejected is-writer");
if(typeof comments == 'undefined'){
	// javascipt has no exit? 
	throw new Error();
}
for(i = 0; i < needListeners.length; i++){
	var main_review = needListeners[i];
	main_review.addEventListener('click', markResolved, true);
}

for (i = 0; i < comments.length; i++){
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name = "resolved";
	checkbox.value = "value";
	//create unique id based on the parent id
	var id_value =  comments[i].id.concat('cjk');
	console.log(id_value);
	checkbox.id = id_value;
	var is_checked;
	chrome.storage.local.get(id_value, function(result){ 
		console.log(JSON.stringify(result)); 
		is_checked = result[this]; 
		console.log(is_checked);
		if(is_checked==true){
			var checkbox = document.getElementById(this);
			if(typeof checkbox == 'undefined' || checkbox.type != 'checkbox'){
				return;
			}
			checkbox.checked=true;
			_check(checkbox, this);
		}
	}.bind(id_value));
	comments[i].appendChild(checkbox);
};

function markResolved(event){
	var checkbox = document.getElementById(event.target.id);
	_check(checkbox, event.target.id);
}

function _check(checkbox, id){
	if(typeof checkbox == 'undefined' || checkbox.type != "checkbox"){
		return;
	}
	var target = checkbox.parentNode;
	// not to clash with built in 'checked'
	if(typeof checkbox.is_checked == 'undefined'){
		checkbox.is_checked = false;
	}
	// FIXME: need better key. hash of content + comment id?
	var key = String(id);
	console.log(key);
	if(checkbox.is_checked != true){
		target.style.color = "blue";
		checkbox.is_checked = true;
		var obj = {};
		obj[key] = true;
		chrome.storage.local.set(obj, function(){
			console.log('saved');
		});
	} else {
		target.style.color = "black";
		checkbox.is_checked = false;
		var obj = {};
		obj[key] = false;
		chrome.storage.local.set(obj, function(){
			console.log('saved');
		});
	}
}