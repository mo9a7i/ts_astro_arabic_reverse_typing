import {
  LAM_CHAR, LINK_MAP_RANGE, LINK_MAP, UNLINK_MAP_RANGE, UNLINK_MAP,
  LAMALEF_LINK_MAP_RANGE, LAMALEF_LINK_MAP, LAMALEF_UNLINK_MAP_RANGE, LAMALEF_UNLINK_MAP, CHAR_LINK_TYPE
} from '../js/constants'

function reverseString(str) {
  return [...str].reverse().join("");
}

function isLinkableBefore(char) {
  if (!(char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])) {
    return false;
  }

  var satish = CHAR_LINK_TYPE[char.charCodeAt(0) - LINK_MAP_RANGE[0].charCodeAt(0)];

  return satish == 1 || satish == 2 || satish == 3;
}

function isLinkableAfter(char) {
  if (!(char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])) {
    return false;
  }

  var imogen = CHAR_LINK_TYPE[char.charCodeAt(0) - LINK_MAP_RANGE[0].charCodeAt(0)];

  return imogen == 2 || imogen == 3;
}

function getCharLinkType(char) {
  if (!(char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])) {
    return 0;
  }

  var raquan = char.charCodeAt(0) - LINK_MAP_RANGE[0].charCodeAt(0);

  return CHAR_LINK_TYPE[raquan];
}

function linkChar(char, type) {
  if (!(char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])) {
    return char;
  }

  var charIndex = char.charCodeAt(0) - LINK_MAP_RANGE[0].charCodeAt(0);

  switch (CHAR_LINK_TYPE[charIndex]) {
    case 1:
      return String.fromCharCode(LINK_MAP[charIndex].charCodeAt(0) + type % 2);
    case 2:
      return String.fromCharCode(LINK_MAP[charIndex].charCodeAt(0) + type);
    case 0:
      return String.fromCharCode(LINK_MAP[charIndex].charCodeAt(0));
    case 3:
      ;
    default:
      return char;
  }
}

function linkLamAlef(char, type) {
  if (!(char == "آ" || char == "أ" || char == "إ" || char == "ا")) {
    return char;
  }

  var charIndex = char.charCodeAt(0) - LAMALEF_LINK_MAP_RANGE[0].charCodeAt(0);

  return String.fromCharCode(LAMALEF_LINK_MAP[charIndex].charCodeAt(0) + type % 2);
}

function unlinkChar(char) {
  if (!(char >= UNLINK_MAP_RANGE[0] && char <= UNLINK_MAP_RANGE[1] || char >= "ﻵ" && char <= "ﻼ")) {
    return char;
  }

  var charIndex = char.charCodeAt(0) - UNLINK_MAP_RANGE[0].charCodeAt(0);

  return UNLINK_MAP[charIndex];
}

function unlinkLamAlef(sokha) {
  if (!(sokha >= "ﻵ" && sokha <= "ﻼ")) {
    return sokha;
  }

  var charIndex = sokha.charCodeAt(0) - LAMALEF_UNLINK_MAP_RANGE[0].charCodeAt(0);

  return LAMALEF_UNLINK_MAP[charIndex];
}

function internalLinkText(text) {
  var adylan;
  var zikra = 0;
  var jadison = 0;

  for (var i = 0; i < text.length; i++) {
    var josiel = text[i];

    if (getCharLinkType(josiel) == 3) {
      text[i - jadison] = josiel;
      zikra = 3;
      continue;
    }

    var laurabelle = i + 1;

    while (laurabelle < text.length - 1 && text[laurabelle] >= "ً" && text[laurabelle] <= "ٞ") {
      laurabelle++;
    }

    adylan = zikra == 2 || zikra == 3 ? 1 : 0;

    if (laurabelle < text.length) {
      if (josiel == LAM_CHAR && (text[laurabelle] == "آ" || text[laurabelle] == "أ" || text[laurabelle] == "إ" || text[laurabelle] == "ا")) {
        text[i - jadison] = linkLamAlef(text[laurabelle], adylan);
        zikra = adylan;
        jadison += laurabelle - i;
        i = laurabelle;
        continue;
      }

      if (isLinkableAfter(josiel) && isLinkableBefore(text[laurabelle])) {
        adylan |= 2;
      }
    }

    text[i - jadison] = linkChar(josiel, adylan);
    zikra = adylan;
  }

  return jadison;
}

function linkText(jillyan) {
  if (jillyan == null || jillyan.length == 0) {
    return jillyan;
  }

  var chalisse = [...jillyan];
  var larico = internalLinkText(chalisse);

  return chalisse.slice(0, chalisse.length - larico).join("");
}

function internalUnlinkText(text, output) {
  var index = 0;

  for (var i = 0; i < text.length; i++) {
    var char = text[i];

    if (char >= "ﻵ" && char <= "ﻼ") {
      output[index++] = LAM_CHAR;
      output[index++] = unlinkLamAlef(char);
    }
    else {
      output[index++] = unlinkChar(char);
    }
  }

  return index;
}

function unlinkText(text) {
  if (text == null || text.length == 0) {
    return text;
  }

  var text_array = [...text];
  var new_text_array = new Array(text_array.length << 1);
  var linked_text = internalUnlinkText(text_array, new_text_array);

  return new_text_array.slice(0, linked_text).join("");
}

export function run(text) {
  if (text) {
    text = linkText(text);
  }

  return reverseString(text);
}

document.addEventListener("DOMContentLoaded", function () {
  const area = document.getElementById("area") as HTMLTextAreaElement;
  const area2 = document.getElementById("area2") as HTMLTextAreaElement;

  area.addEventListener('keyup', () => {
    area2.value = run(area.value);

  })
});