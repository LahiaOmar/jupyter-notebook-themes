(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var themesSelectElement = document.getElementById("themes");
    var selectedTheme = localStorage.getItem("theme")
    if (selectedTheme != null) {
      for (var i = 0; i < themesSelectElement.length; i++) {
        if (themesSelectElement[i].value == selectedTheme) {
          themesSelectElement[i].selected = true;
        }
      }
    }

    themesSelectElement.addEventListener("change", function (params) {
      var themeName = this.value;
    });

    var applyButtonElement = document.getElementsByName("apply")[0];
    applyButtonElement.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var themesSelectElement = document.getElementById("themes");
        var themeName = themesSelectElement.value;
        localStorage.setItem("theme", themeName)
        var message = {
          activate: true,
          theme: themeName
        };

        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
          console.log(response)
        });
      });

      window.close();
    });


    var restoreButtonElement = document.getElementsByName("restore")[0];
    restoreButtonElement.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var themesSelectElement = document.getElementById("themes");
        var themeName = themesSelectElement.value;

        var message = {
          activate: false
        };

        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
          console.log(response)
        });
      });

      window.close();
    });
  });
})()