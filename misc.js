"use strict";

const PRINT = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 8H2v9h4v4h12v-4h4V8zm-6 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>';
const UPLOAD = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z"/></svg>';

const HEADERS = ['#f66', '#fa0', '#ff0', '#5d0', '#6db', '#6af', '#c6d', '#888'];
const ROWS =    ['#fdd', '#fea', '#ffa', '#dfb', '#dfe', '#def', '#edf', '#ddd'];

const aquatic = ['🐬', '🐳', '🐋', '🦈', '🐠', '🐟', '🐡', '🐙', '🦑', '🦐', '🦀', '🐸'];
const reptiles = ['🐊', '🐢', '🦎', '🐍', '🦕', '🦖']
const birds = ['🦆', '🦢', '🦩', '🐦', '🦉', '🦅', '🕊️', '🦜'];
const animals = ['🐵', '🐶', '🐱', '🦊', '🐻', '🐼', '🦁', '🐯', '🐮', '🐘', '🦏', '🐪', '🦒', '🦔', '🐿️', '🐇', '🦝', '🐾'];
const swimmers = ['👣', '🦶',   '🏊', '🏊🏻', '🏊🏼', '🏊🏽', '🏊🏾', '🏊🏿'];
const nature = ['💧', '🌊', '🌧️', '🌩️', '⚡', '🌪️', '🌴', '🌸'];
const stars = ['⭐', '🌟', '🌠'];
const hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎'];
const ICONS = [...aquatic, ...reptiles, ...birds, ...animals, ...swimmers, ...nature, ...stars, ...hearts];

let ROSTER = [];

const random = (min=0, max=ICONS.length) => Math.floor(Math.random() * (max - min + 1)) + min;

function make(el) {
    let [[element, ...c1], id] = el.split("#").map(s => s.split(".")).map(x => [x.shift(), x]);

    let $el = $(document.createElement(element)).addClass(...c1);
    if (id != null) $el.attr("id", id.shift()).addClass(...id);

    if (element == "table") {
        let $tbody = $(document.createElement("tbody"));
        let $tr = $(document.createElement("tr"));
        return [$el.append($tbody), $tbody.append($tr), $tr];
    }
    return $el;
}

$.fn.addTR = function(css = "") {
    return make("tr." + css).appendTo($(this));
}

$.fn.addTD = function(cell, css = "") {
    return $(this).append(make("td." + css).html(cell));
}

$.fn.addTH = function(cell, css = "") {
    return $(this).append(make("th." + css).html(cell));
}