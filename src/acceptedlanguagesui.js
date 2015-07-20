import * as rooter from 'acceptedlanguagesui-root';

var page = acceptedlanguages.lib.page;
var relevant = acceptedlanguages.lib.relevant;

export function display({
  elementTag = 'div',
  elementId = 'acceptedlanguagesui',
  elementClass = 'acceptedlanguagesui',
  linkAttributeForMessage = 'data-message'
} = {}) {
  var root = rooter.getRoot();

  var currentLanguage = page.getCurrentLanguage();
  var relevantLanguage = relevant.getRelevantAlternateLanguages()[0];
  if (!currentLanguage || !relevantLanguage || relevantLanguage == currentLanguage) {
    return;
  }
  var href = page.getHrefForLanguage(relevantLanguage);
  var message = page.getLinkForLanguage(relevantLanguage).getAttribute(linkAttributeForMessage);

  var document = root.document;
  var body = document.body;

  var element = document.querySelector(`#${elementId}`) || document.createElement(elementTag);
  element.setAttribute('id', elementId);
  element.setAttribute('class', elementClass);
  element.innerHTML = `<a href="${href}">${message}</a>`;

  if (body.hasChildNodes()) {
    body.insertBefore(element, body.firstChild);
  } else {
    body.appendChild(element);
  }
};
