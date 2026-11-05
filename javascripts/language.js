/* Le sélecteur de langue garde la page en cours : les deux sites ont les mêmes chemins. */
(function () {
  if (typeof __md_scope === "undefined") return;
  var root = __md_scope.pathname;
  var isEnglish = document.documentElement.lang === "en";
  var path = window.location.pathname.slice(root.length);
  var frenchRoot = isEnglish ? new URL("..", __md_scope).pathname : root;
  document.querySelectorAll("a[hreflang]").forEach(function (link) {
    var target = link.hreflang === "en" ? frenchRoot + "en/" + path : frenchRoot + path;
    link.href = target + window.location.hash;
  });
})();
