/* Filtres de la liste de publications et infobulle du graphique. */
(function () {
  function initFilters(prefix) {
    var query = document.getElementById(prefix + "-q");
    if (!query) return;
    var type = document.getElementById(prefix + "-type");
    var year = document.getElementById(prefix + "-year");
    var count = document.getElementById(prefix + "-count");
    var items = Array.prototype.slice.call(document.querySelectorAll("." + prefix));
    var sections = document.querySelectorAll("." + prefix + "-group");

    function apply() {
      var terms = query.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
      var shown = 0;
      items.forEach(function (item) {
        var match =
          (!type.value || item.dataset.type === type.value) &&
          (!year.value || item.dataset.year === year.value) &&
          terms.every(function (term) { return item.dataset.text.indexOf(term) !== -1; });
        item.hidden = !match;
        if (match) shown += 1;
      });
      sections.forEach(function (section) {
        section.hidden = !section.querySelector("." + prefix + ":not([hidden])");
      });
      count.textContent = shown + " " + (shown > 1 ? count.dataset.many : count.dataset.one);
    }

    var wanted = new URLSearchParams(window.location.search).get("annee");
    if (wanted) year.value = wanted;
    [query, type, year].forEach(function (control) {
      control.addEventListener("input", apply);
    });
    document.getElementById(prefix + "-reset").addEventListener("click", function () {
      query.value = "";
      type.value = "";
      year.value = "";
      apply();
    });
    apply();
  }

  function initChart() {
    document.querySelectorAll(".pub-chart-wrap").forEach(function (wrap) {
      var tip = wrap.querySelector(".pub-tip");
      wrap.querySelectorAll(".pub-chart__col").forEach(function (column) {
        column.addEventListener("mouseenter", function () {
          var bar = column.querySelector(".pub-chart__bar");
          if (!bar) return;
          var box = bar.getBoundingClientRect();
          var origin = wrap.getBoundingClientRect();
          tip.textContent = column.dataset.tip;
          tip.style.left = box.left - origin.left + box.width / 2 + "px";
          tip.style.top = box.top - origin.top + "px";
          tip.hidden = false;
        });
        column.addEventListener("mouseleave", function () { tip.hidden = true; });
      });
    });
  }

  initFilters("pub");
  initFilters("talk");
  initChart();
})();
