(() => {
  'use strict';
  var e, t, c, n;
  ((e = document.querySelector('[data-btn]')),
    (t = document.querySelector('[data-conditions-href]')),
    (c = document.querySelector('main.main')),
    (n = document.querySelector('input[type="checkbox"]')),
    e &&
      (setTimeout(function () {
        n && n.checked && (n.checked = !1);
      }, 10),
      e.addEventListener('click', function (d) {
        var target = d.target;
        var isConditionsLink =
          target === t || (target.closest && target.closest('[data-conditions-href]') === t);
        if ((null == n ? void 0 : n.checked) && e.dataset.href) {
          window.location.href = e.dataset.href;
        } else if (isConditionsLink && (null == t ? void 0 : t.dataset.conditionsHref)) {
          window.location.href = t.dataset.conditionsHref;
        } else {
          null == n || n.classList.add('checked');
          n && (n.checked = !0);
          setTimeout(function () {
            null == c || c.classList.add('main__active');
          }, 300);
        }
      })));
})();
