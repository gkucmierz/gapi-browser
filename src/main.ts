
import { waitProp } from 'wait-prop';

const GAPI_SCRIPT_HTTP = 'http://apis.google.com/js/api.js';
const GAPI_SCRIPT_HTTPS = 'https://apis.google.com/js/api.js';
const GAPI_MAIN_OBJECT = 'gapi';
const document = window.document;

let gapiResolve: Function;
export const getGapi = new Promise(resolve => gapiResolve = resolve);

const callOnce = (fn: Function) => {
  let called = false;
  return (...args: any) => {
    if (called) return false;
    called = true;
    return fn(...args);
  };
};

const addGapiScript = () => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https:' == document.location.protocol ? GAPI_SCRIPT_HTTPS : GAPI_SCRIPT_HTTP;
  ( document.getElementsByTagName('head')[0] ||
    document.getElementsByTagName('body')[0]
  ).appendChild(script);
};

const domReady = callOnce(() => {
  addGapiScript();
  waitProp(window, GAPI_MAIN_OBJECT).then((gapi: any) => gapiResolve(gapi));
});

const init = () => {
  if (document.readyState === 'complete') {
    domReady();
  } else if (document.readyState === 'interactive') {
    domReady();
  } else {
    window.addEventListener('DOMContentLoaded', domReady);
    window.addEventListener('load', domReady)
  }
};

init();
