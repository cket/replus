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
var needListeners = document.getElementsByClassName("file js-comment-container has-inline-notes");
if(typeof comments == 'undefined'){
	throw new Error();
}
var main_review = needListeners[0];

main_review.addEventListener('click', markResolved, true);

for (i = 0; i < comments.length; i++){
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name = "resolved";
	checkbox.value = "value";
	checkbox.id = 'cjk'.concat(String(i)); 
	comments[i].appendChild(checkbox);
};
function markResolved(event){
	console.log(this);
	console.log(event);
	var target = document.getElementById(event.target.id).parentNode;
	target.style.color = "blue";
}
