chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "modifyText") {
    var replacementText = request.replacementText || "y";
    var elements = document.getElementsByTagName("*");

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element.nodeType === Node.TEXT_NODE) {
        element.nodeValue = element.nodeValue.replace(/ll/g, replacementText);
      }
    }
  }
});
