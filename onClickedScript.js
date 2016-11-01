console.log('marking as resolved');
var commentBody = document.getElementsByClassName("comment-body markdown-body markdown-format js-comment-body");
commentBody[index].p = '~'.concat(commentBody[index].p, '~');
