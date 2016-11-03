// heirarchy of the page:
// "timeline-comment js-comment"
// "discussion-item-body"
// "file js-comment-container has-inline-notes"
// "js-inline-comments-container review-comments"
// "js-comments-holder"
// "edit-comment-hide" //main class we want to mess with
// "review-comment-contents"

console.log('Script execution');
var comments = document.getElementsByClassName("review-comment js-comment js-task-list-container commit-comment member-comment  previewable-edit  js-reorderable-task-lists reorderable-task-lists");
// add button to action bar iff child of review comment
var actionBars = document.getElementsByClassName("timeline-comment-actions");
var needsCheckBox = [];
for (j = 0; j < actionBars.length; j++){
	console.log(actionBars[j]);
	console.log(actionBars[j].parentNode);
	console.log(actionBars[j].parentNode.parentNode);
	if(actionBars[j].parentNode.parentNode.class == "comment previewable-edit timeline-comment js-comment js-task-list-container member-comment  js-reorderable-task-lists reorderable-task-lists"){
		needsCheckBox.push(actionBars[j]);
	}
}
var needListeners = document.getElementsByClassName("file js-comment-container has-inline-notes");
if(typeof comments == 'undefined'){
	// javascipt has no exit? 
	throw new Error();
}
var main_review = needListeners[0];

main_review.addEventListener('click', markResolved, true);

for (i = 0; i < needsCheckBox.length; i++){
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name = "resolved";
	checkbox.value = "value";
	checkbox.id = 'cjk'.concat(String(i));
	// check storage to see if this was clicked before page was reloaded 
	needsCheckBox[i].appendChild(checkbox);
};
function markResolved(event){
	var checkbox = document.getElementById(event.target.id);
	var target = checkbox.parentNode;
	// careful not to clash with built in 'checked'
	if(typeof checkbox.is_checked == 'undefined'){
		checkbox.is_checked = true;
	}
	if(checkbox.is_checked){
		console.log('Now Blue');
		target.style.color = "blue";
		checkbox.is_checked = false;
	} else {
		console.log('Now Black');
		target.style.color = "black";
		checkbox.is_checked = true;
	}
	
}
