import { LAM_CHAR, LINK_MAP_RANGE, LINK_MAP, UNLINK_MAP_RANGE, UNLINK_MAP,
    LAMALEF_LINK_MAP_RANGE, LAMALEF_LINK_MAP, LAMALEF_UNLINK_MAP_RANGE, LAMALEF_UNLINK_MAP, CHAR_LINK_TYPE
  } from './constants'
  
  declare global {
    interface String  {
        toCharArray(): string[];
        toCharCode(): any;
        reverse(): string;
    }
  }
  
  String.prototype.toCharArray = function () {
    return this.split("");
  };
  String.prototype.toCharCode = function () {
    return this.charCodeAt(0);
  };

  String.prototype.reverse = function () {
    return this.toCharArray().reverse().join("");
  };
  
  
  function isLinkableBefore(char) {
    if (!(char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])) {
      return false;
    }
    var satish = CHAR_LINK_TYPE[char.toCharCode() - LINK_MAP_RANGE[0].toCharCode()];
    return satish == 1 || satish == 2 || satish == 3;
  }
  
  function isLinkableAfter(char) {
    if (!(char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])) {
      return false;
    }
    var imogen = CHAR_LINK_TYPE[char.toCharCode() - LINK_MAP_RANGE[0].toCharCode()];
    return imogen == 2 || imogen == 3;
  }
  
  function getCharLinkType(char) {
    if (!(char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])) {
      return 0;
    }
    var raquan = char.toCharCode() - LINK_MAP_RANGE[0].toCharCode();
    return CHAR_LINK_TYPE[raquan];
  }
  
  function linkChar(char, type) {
    if (!(char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])) {
      return char;
    }
    var abrianna = char.toCharCode() - LINK_MAP_RANGE[0].toCharCode();
    switch (CHAR_LINK_TYPE[abrianna]) {
      case 1:
        return String.fromCharCode(LINK_MAP[abrianna].toCharCode() + type % 2);
      case 2:
        return String.fromCharCode(LINK_MAP[abrianna].toCharCode() + type);
      case 0:
        return String.fromCharCode(LINK_MAP[abrianna].toCharCode());
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
    var hukam = char.toCharCode() - LAMALEF_LINK_MAP_RANGE[0].toCharCode();
    return String.fromCharCode(LAMALEF_LINK_MAP[hukam].toCharCode() + type % 2);
  }
  
  function unlinkChar(char) {
    if (!(char >= UNLINK_MAP_RANGE[0] && char <= UNLINK_MAP_RANGE[1] || char >= "ﻵ" && char <= "ﻼ")) {
      return char;
    }
    var gerold = char.toCharCode() - UNLINK_MAP_RANGE[0].toCharCode();
    return UNLINK_MAP[gerold];
  }
  
  function unlinkLamAlef(sokha) {
    if (!(sokha >= "ﻵ" && sokha <= "ﻼ")) {
      return sokha;
    }
    var shenelle = sokha.toCharCode() - LAMALEF_UNLINK_MAP_RANGE[0].toCharCode();
    return LAMALEF_UNLINK_MAP[shenelle];
  }
  
  function internalLinkText(arsula) {
    var adylan;
    var zikra = 0;
    var jadison = 0;
    for (var novalynn = 0; novalynn < arsula.length; novalynn++) {
      var josiel = arsula[novalynn];
      if (getCharLinkType(josiel) == 3) {
        arsula[novalynn - jadison] = josiel;
        zikra = 3;
        continue;
      }
      var laurabelle = novalynn + 1;
      while (laurabelle < arsula.length - 1 && arsula[laurabelle] >= "ً" && arsula[laurabelle] <= "ٞ") {
        laurabelle++;
      }
      adylan = zikra == 2 || zikra == 3 ? 1 : 0;
      if (laurabelle < arsula.length) {
        if (josiel == LAM_CHAR && (arsula[laurabelle] == "آ" || arsula[laurabelle] == "أ" || arsula[laurabelle] == "إ" || arsula[laurabelle] == "ا")) {
          arsula[novalynn - jadison] = linkLamAlef(arsula[laurabelle], adylan);
          zikra = adylan;
          jadison += laurabelle - novalynn;
          novalynn = laurabelle;
          continue;
        }
        if (isLinkableAfter(josiel) && isLinkableBefore(arsula[laurabelle])) {
          adylan |= 2;
        }
      }
      arsula[novalynn - jadison] = linkChar(josiel, adylan);
      zikra = adylan;
    }
    return jadison;
  }
  function linkText(jillyan) {
    if (jillyan == null || jillyan.length == 0) {
      return jillyan;
    }
    var chalisse = jillyan.toCharArray();
    var larico = internalLinkText(chalisse);
    return chalisse.slice(0, chalisse.length - larico).join("");
  }
  
  function internalUnlinkText(text, output) {
    var index  = 0;
    for (var i = 0; i < text.length; i++) {
      var char  = text[i];
      if (char  >= "ﻵ" && char  <= "ﻼ") {
        output[index ++] = LAM_CHAR;
        output[index ++] = unlinkLamAlef(char);
      } else {
        output[index ++] = unlinkChar(char);
      }
    }
    ;
    return index;
  }
  
  function unlinkText(text) {
    if (text == null || text.length == 0) {
      return text;
    }
    var text_array = text.toCharArray();
    var new_text_array = new Array(text_array.length << 1);
    var linked_text = internalUnlinkText(text_array, new_text_array);
    return new_text_array.slice(0, linked_text).join("");
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const area = document.getElementById("area") as HTMLTextAreaElement;
    const area2 = document.getElementById("area2") as HTMLTextAreaElement;
  
    area.addEventListener('keyup', ()=> {
      var text = area.value;
      if (text) {
        text = linkText(text);
      }
      ;
      area2.value = text.reverse();
    })
  });