'use strict';

const removeChildrenNode = (node, except = null) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  if (except !== null) {
    node.appendChild(except);
  }
};


window.utils = {
  removeChildrenNode
};
