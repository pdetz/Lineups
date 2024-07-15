"use strict";

const PRINT = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 8H2v9h4v4h12v-4h4V8zm-6 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>';
const UPLOAD = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z"/></svg>';
const BOLT = '<svg height="12pt" viewBox="0 0 128 128"><path d="M70 10 L25 68 L45 68 L0 118 L100 48 L70 48 L128 10 L60 10 Z"/></svg>';
const STAR = '<svg xmlns="http://www.w3.org/2000/svg" height="12pt" viewBox="0 0 40 50"><path d="M9.708 36.667 13.583 24 3.333 16.667H16L20 3.333L24 16.667H36.667L26.417 24L30.292 36.667L20 28.833Z"/></svg>';

const HEADERS = ['#f66', '#fa0', '#ff0', '#5d0', '#6db', '#6af', '#c6d', '#999'];
const ROWS =    ['#fdd', '#fea', '#ffa', '#dfb', '#dfe', '#def', '#edf', '#eee'];

const aquatic = ['🐬', '🦈', '🐟', '🐳',  '🐠', '🐡', '🐙', '🦑'];
const reptiles = ['🐊', '🐢', '🐸', '🐍', '🐉', ];
const bugs = ['🐞', '🐝'];
const birds = ['🦆', '🦉', '🦅', '🐧', '🪿'];
const animals = ['🦊', '🐻', '🐯', '🦘'];
const magic = ['🧙‍♂️', '⚡', '☀️', '🌙', '⭐', '🔥', '💧', '🔱'];
const nature = ['🌊', '🌩️', '🌪️', '🌀'];
const symbols = [STAR, BOLT];
const people = ['👣', '😈', '🚀', '🛩️'];
const circles = ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", '✔'];
//const hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤'];
const EMOJIS = [...aquatic, ...reptiles, ...bugs, ...birds, ...animals, ...magic, ...nature, ...people, ...circles];

const random = (min=0, max=EMOJIS.length - 1) => Math.floor(Math.random() * (max - min + 1)) + min;

const NAMES = [
    { nombre: "Andres", apellido: "Angelfish", gender: "M" },
    { nombre: "Anna", apellido: "Angelfish", gender: "F" },
    { nombre: "Bianca", apellido: "Barracuda", gender: "F" },
    { nombre: "Billy", apellido: "Beluga", gender: "M" },
    { nombre: "Bonnie", apellido: "Barracuda", gender: "F" },
    { nombre: "Bruno", apellido: "Beluga", gender: "M" },
    { nombre: "Carmen", apellido: "Clownfish", gender: "F" },
    { nombre: "Carlos", apellido: "Cuttlefish", gender: "M" },
    { nombre: "Diane", apellido: "Dolphin", gender: "F" },
    { nombre: "Daniel", apellido: "Dugong", gender: "M" },
    { nombre: "Diego", apellido: "Dolphin", gender: "M" },
    { nombre: "Donna", apellido: "Dory", gender: "F" },
    { nombre: "Edward", apellido: "Eel", gender: "M" },
    { nombre: "Elena", apellido: "Eel", gender: "F" },
    { nombre: "Felicia", apellido: "Flying Fish", gender: "F" },
    { nombre: "Francisco", apellido: "Flying Fish", gender: "M" },
    { nombre: "Fred", apellido: "Frog", gender: "M" },
    { nombre: "Fiona", apellido: "Flounder", gender: "F" },
    { nombre: "Gabriela", apellido: "Gator", gender: "F" },
    { nombre: "Gary", apellido: "Gator", gender: "M" },
    { nombre: "Grace", apellido: "Gator", gender: "F" },
    { nombre: "Harry", apellido: "Hammerhead", gender: "M" },
    { nombre: "Henry", apellido: "Haddock", gender: "M" },
    { nombre: "Jackie", apellido: "Jellyfish", gender: "F" },
    { nombre: "Jamal", apellido: "Jellyfish", gender: "M" },
    { nombre: "Joey", apellido: "Jackfish", gender: "M" },
    { nombre: "Javier", apellido: "Jellyfish", gender: "M" },
    { nombre: "Tianna", apellido: "Tortoise", gender: "F" },
    { nombre: "Kevin", apellido: "Killer Whale", gender: "M" },
    { nombre: "Luisa", apellido: "Lobster", gender: "F" },
    { nombre: "Leo", apellido: "Lobster", gender: "M" },
    { nombre: "Lana", apellido: "Limpet", gender: "F" },
    { nombre: "Marco", apellido: "Manta Ray", gender: "M" },
    { nombre: "Malik", apellido: "Manta Ray", gender: "M" },
    { nombre: "Maddie", apellido: "Manta Ray", gender: "F" },
    { nombre: "Nathaniel", apellido: "Narwhal", gender: "M" },
    { nombre: "Nancy", apellido: "Nautilus", gender: "F" },
    { nombre: "Olivia", apellido: "Octopus", gender: "F" },
    { nombre: "Otto", apellido: "Octopus", gender: "M" },
    { nombre: "Paola", apellido: "Pufferfish", gender: "F" },
    { nombre: "Peter", apellido: "Penguin", gender: "M" },
    { nombre: "Paula", apellido: "Porpoise", gender: "F" },
    { nombre: "Sherry", apellido: "Shark", gender: "F" },
    { nombre: "Shauna", apellido: "Shark", gender: "F" },
    { nombre: "Ricky", apellido: "River Otter", gender: "M" },
    { nombre: "Steven", apellido: "Stingray", gender: "M" },
    { nombre: "Samuel", apellido: "Swordfish", gender: "M" },
    { nombre: "Sophie", apellido: "Swordfish", gender: "F" },
    { nombre: "Zuri", apellido: "Zander", gender: "F" },
    { nombre: "Tommy", apellido: "Turtle", gender: "F" }
];

const DOB = [
    "04092015",
    "08012014",
    "12122015",
    "02182015",
    "05052016",
    "10092015",
    "11222015",
    "03012015",
    "05252017",
    "07092016",
    "05012014",
    "05022014",
    "05032014",
    "05042014",
    "05052014",
    "05012013",
    "05022013",
    "05032013",
    "05042013",
    "05052013",
    "05012012",
    "05022012",
    "05032012",
    "05042012",
    "05052012",
    "05012011",
    "05022011",
    "05032011",
    "05042011",
    "05052011",
    "05012010",
    "05022010",
    "05032010",
    "05042010",
    "05052010",
    "05012009",
    "05022009",
    "05032009",
    "05042009",
    "05052009",
    "05012008", // 15 years old
    "05022008", // 15 years old
    "05032008", // 15 years old
    "05042007", // 16 years old
    "05052007", // 16 years old
    "05012006", // 17 years old
    "05022006", // 17 years old
    "05032005", // 18 years old
    "05042005", // 18 years old
    "05052005", // 18 years old
];