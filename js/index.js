(function () {
  'use strict';

  var subscriptionButton = document.getElementById('subscription-button');
  var checkBox = document.getElementById('check-box');
  var agreementArea = document.getElementById('agreement');

  var isChecked = false;
  var isButtonActivated = false;

  function handleAgreementClick(event) {
    if (event.target.classList.contains('rules-link') || event.target.closest('.rules-link')) {
      return;
    }

    event.stopPropagation();

    if (isButtonActivated) {
      return;
    }

    isChecked = true;
    checkBox.classList.add('checked');
    subscriptionButton.disabled = false;

    setTimeout(function () {
      subscriptionButton.classList.add('button--active');
      isButtonActivated = true;
      subscriptionButton.disabled = false;
      subscriptionButton.style.cursor = 'pointer';
    }, 300);
  }

  function handleActivatedButtonClick() {
    var targetHref = subscriptionButton.getAttribute('data-href');
    if (targetHref && targetHref !== '#') {
      window.location.href = targetHref;
    }
  }

  if (agreementArea) {
    agreementArea.addEventListener('click', handleAgreementClick);
  }

  if (subscriptionButton) {
    subscriptionButton.addEventListener('click', function (event) {
      if (event.target.closest('.agreement')) {
        return;
      }

      if (isButtonActivated && subscriptionButton.classList.contains('button--active')) {
        handleActivatedButtonClick();
      }
    });
  }

  window.addEventListener('DOMContentLoaded', function () {
    if (subscriptionButton) {
      subscriptionButton.disabled = true;
    }
    if (checkBox) {
      checkBox.classList.remove('checked');
    }
  });
})();
