function renderStatus(response) {
  var total = "There are "  + response.total + " comments, "
  var resolved = '';
  if(response.resolved == '1'){
    resolved =  response.resolved + " of which has been resolved.";
  } else {
    resolved =  response.resolved + " of which have been resolved.";
  }
  var status = total + resolved
  
  document.getElementById('status').textContent = status;
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "numberChecked"}, function(response) {
        renderStatus(response);
    });
});
