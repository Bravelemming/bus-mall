'use strict';
//Jack Daniel Kinne - Library for writing HTML code into various nodes.
// Referencing the container for the DOM
function domReferenceParent(parent){
  var node = document.getElementById(parent);
  return node;
}

// build a new element to put on the page
function buildElement(element){
  var node = document.createElement(element);
  return node;
}

// give element some text
function assignElementText(text, element){
  element.textContent = text;
}

// append child to page
function appendChildtoParent(parent, child){
  parent.appendChild(child);
}

//build an element, assign it text, and append to page
function htmlTextHack(element, text, parentID){
  var node = domReferenceParent(parentID);
  var current = buildElement(element);
  assignElementText(text, current);
  appendChildtoParent(node, current);
}

// build an element without text, append.
function htmlNodeAdd(element, parentID){
  var node = domReferenceParent(parentID);
  var current = buildElement(element);
  appendChildtoParent(node, current);
}

//END HTML WRITE CODE
