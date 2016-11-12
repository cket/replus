// Copyright 2016 Christopher Ketchum

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//    http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

console.log('Script execution');
var comments = document.getElementsByClassName("review-comment js-comment js-task-list-container commit-comment  previewable-edit  ");
var needListeners = document.getElementsByClassName("timeline-comment-wrapper discussion-item-review mt-0 is-rejected is-writer");
var numberChecked = 0;
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
		numberChecked ++;
		target.style.color = "blue";
		checkbox.is_checked = true;
		var obj = {};
		obj[key] = true;
		chrome.storage.local.set(obj, function(){
			console.log('saved');
		});
	} else {
		target.style.color = "black";
		numberChecked --;
		checkbox.is_checked = false;
		var obj = {};
		obj[key] = false;
		chrome.storage.local.set(obj, function(){
			console.log('saved');
		});
	}
}

// Listen for messages
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	console.log('Browser action');
    if (request.greeting == "numberChecked"){
    	var numComments = String(comments.length);
    	console.log('resolved comments: '+String(numberChecked));
    	console.log('total comments: '+numComments);
    	var obj = {};
		obj['total'] = numComments;
		obj['resolved'] = numberChecked;
        sendResponse(obj);
    }
});

