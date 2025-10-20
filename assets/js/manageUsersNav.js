document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".manage-users-btn");
  if (!buttons || buttons.length === 0) return;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var clientId = btn.getAttribute("data-client-id") || "";
      var clientName = btn.getAttribute("data-client-name") || "";
      var url = "./cmUser.html";
      var params = [];
      if (clientId) params.push("id=" + encodeURIComponent(clientId));
      if (clientName) params.push("name=" + encodeURIComponent(clientName));
      if (params.length > 0) url += "?" + params.join("&");
      window.location.href = url;
    });
  });
});
