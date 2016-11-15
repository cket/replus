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

function renderStatus(response) {
  var total = '';
  if(response.total == '1'){
    total = "There is "  + response.total + " comment, ";
  } else { 
    total = "There are "  + response.total + " comments, ";
  }
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
