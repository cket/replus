function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  var message = document.querySelector('#message');
  if(message != null ) {
    message.getElementsByClassName("timeline-comment-actions");
    for (i = 0; i < elems.length; i++){
      var checkbox = message.createElement('input');
      checkbox.type = "checkbox";
      checkbox.name = "resolved";
      checkbox.value = "value";
      checkbox.id = "id";
      elems[i].resolved = checkbox;
    }
    renderStatus(elems.length.toString());
  }
});
