/**
 * 참고 : 김영보님의 머신러닝 책(생각나눔 출판사)의 소스파일 이다.

 * TensorFlow.js를 사용한 Machine Learning 결과를 처리한다.
 * - 웹 페이지에 결과를 표시한다.
 * - 그래프로 표현한다.
 * 주의: 본 소스 코드는 개인 용도이며 범용성이 없습니다.
 * 개발자: 김영보
 * email: tonextday@gmail.com
 * @version: 1.0
 *
 * Process machine learning results using TensorFlow.js.
 * - Display data on web pages.
 * - Expressed in a graph.
 * warning: This source code is for personal use and is not versatile.
 */
/**
 * @license
 * Copyright(c) 2018, Young-Bo Kim(김영보) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 * =============================================================================
 */
(function(){if (Object.is(window.web, undefined)){window.web = {};};}());
(function(){web.idNumber = 0;web.decimalLength = 5;web.axisCount = 10;}());
(function(){web.height = 200;web.width = 200;web.mainTop = '50px';web.mainLeft = '50px';web.logTop = '50px';web.logLeft = '50px';web.top = 50;web.left = 20;web.px = 'px';}());
(function(){web.const25 = 25;web.const30 = 30;web.const20 = 20;web.const15 = 15;web.strokeWidth = 1;web.radius = 4;web.stroke = "gray";web.fill = "black";}());
(function(){web.table = {width: '600px','table-layout': 'fixed', 'border-collapse': 'collapse','font-size': '14px', 'font-family': '맑은' + '고딕','border-width': '1px', 'border-style': 'solid', 'border-color': 'gray'};web.th = {background: '#d7d0eb','border-width': '1px', 'border-style': 'solid', 'border-color': 'gray'};web.td = {'padding-left': '10px','border-width': '1px', 'border-style': 'solid', 'border-color': 'gray'};}());
Object.assign(web, {
  aa(a){return (a || "ml") + "_" + ++this.idNumber;},ab(a){return a && Object.is(typeof a, "string") ? document.getElementById(a) : a || null;},ac(a, b){if (typeof a !== 'string'){return a;};const c = b || document.body;const d = document.createElement(a);c.appendChild(d);return d;},ad(a, b){a = this.ab(a);if (!a || !Object.is(typeof b, "object")){return null;};for (const c in b){if (!Object.is(b[c], "")){a.setAttribute(c, b[c]);};};},ae(a, b){for (const c in b){a.style[c] = b[c];};},af(a){const b = [];for (var c = 0; c < a.length; c++){b.push(a[c]);};return b;},ag(a, b = 'x'){if (!Array.isArray(a)){return a;};const c = this.af(a);c.sort(function(one, two){if (one[b] > two[b]){return 1;};if (one[b] < two[b]){return -1;};return 0;});return c;},ai(a){if (!a){return '';};if (typeof a === 'string' || typeof a === 'number'){a = [a];};return a.map(function(b){if (b.toString().endsWith("px")){return b.replace(/px$/, "");};return b;});}
});

Object.assign(web, {
  ba(){if (this.mainElement){return;};this.mainElement = this.ac('main');this.ad(this.mainElement, {id: this.aa()});this.ae(this.mainElement, {position: "absolute",top: this.mainTop, left: this.mainLeft,width: (document.documentElement.clientWidth - 70) + "px",height: (document.documentElement.clientHeight - 70) + "px"});},
  bb(a = {}, b = {}){if (this.boxElement){return;};this.boxElement = this.ac('div', this.mainElement);this.ad(this.boxElement, {id: this.aa()});this.boxElement.dataset['box'] = 'box';const c = this.ai([a.top || b.top || 0,a.left || 0,a.height || this.svgHeight || this.height]);this.ae(this.boxElement, {position: "absolute",top: c[0] + this.px, left: c[1] + this.px,height: c[3] + this.px});},
  bc(a = {}){if (!a.title){return;};const b = this.ac('div', this.boxElement);this.ad(b, {id: this.aa()});const c = this.ai([a.width || this.width]);const d = {position: "absolute", width: c + this.px,left: (this.beginGraphX || 0) + 'px','text-align': 'center'};if (typeof a.title === 'object' && a.title.style){Object.assign(d, a.title.style);};this.ae(b, d);b.textContent = typeof a.title === 'string' ? a.title : a.title.text ;},
  bd(a){this.decimal = null;if (a && a.decimal && Number.isInteger(a.decimal)){this.decimal = a.decimal;};},
  be(a, b = {}){let c = a.toString();const d = c.split('.');if (d.length < 2){return a;};let e = this.decimalLength, k = false;if (!Object.is(this.decimal, null)){e = this.decimal;};if (c.includes('e')){const f = c.split('e');const g = f[1].match(/[+|-]/);const h = Number.parseInt(f[1].replace(g[0], ''));const i = f[0].replace('.', '');if (g[0] === '-'){if (h >= b.decimal){d[1] = d[1].substr(0, b.decimal) + 'e' + f[1];return Number.parseFloat(d[0] + '.' + d[1]);} else {const j = f[0].split('.');if (j[1].length > b.decimal){d[1] = j[1].substr(0, b.decimal) + 'e' + f[1];}return Number.parseFloat(d[0] + '.' + d[1]);};} else {k = true;d[1] = i.padEnd(h + 1, '0');}};if (b.decimal && b.decimal === 'all'){e = d[1].length;};if (k){return Number.parseFloat(d[1].substr(0, e));};return Number.parseFloat(d[0] + '.' + d[1].substr(0, e));},
  bf(a = {style: {}}){if (!a.style){a.style = {};};const b = Object.assign({}, a.style);b.position = a.style.position || "relative";b.top = a.style.top || 0;b.left = a.style.left || 0;b["padding-left"] = a.style["padding-left"] || 0;return b;},
  bg(a = {}){if (a.option && typeof a.option === 'object'){for (const b in a.option){this[b] = a.option[b];};};this.optionAttr = {};if (a.attr && typeof a.attr === 'object'){Object.assign(this.optionAttr, a.attr);};}
});

Object.assign(web, {
  ca(a){if (!a.lineSpace){return;};const b = document.querySelectorAll("div[data-box='box']");let c = 0;if (b.length > 0){const d = b[b.length - 1];c = d.offsetHeight + d.offsetTop;}this.boxElement = null;this.bb(a, {top: c + 15});this.dd(a);},
  cb(a, b){if (typeof a !== "object"){return;};if (a.x && a.y){this.cd(a, b);return true;};if (Array.isArray(a)){const c = a[0];if (c.x && c.y){this.cd(a, b);return true;};this.db(a, b);return true;};if (Object.is(typeof a, 'object')){this.cc(a, b);};return true;},
  cc(a, b){var c = 0;for (var d in a){if (b.max && b.max === c){break;};const e = this.ac('li', this.olNode);e.textContent = d + ': ' + a[d];c++;};},
  cd(a, b){this.bd(b);for (var k = 0; k < a.length; k++){const c = a[k];if (b.max && b.max === k){break;};const d = this.be(c.x, b);const e = this.be(c.y, b);const f = document.createElement('li');f.textContent = `x:${d} y:${e}`;this.olNode.appendChild(f);};}
});

Object.assign(web, {
  da(a, b){this.bd(b);const c = this.ac('li', this.olNode);c.textContent = this.be(a, b);},
  db(a, b, c, d){c = c || '';if (!c && this.bracketCount){const e = [];for (var k = 0; k < this.bracketCount; k++){e.push('&nbsp');};c = e.join('');};const f = this.getDecimalData(a, b);const g = document.createElement('li');g.innerHTML = c + '[' + f.join(', ') + ']' + (d || '');this.olNode.appendChild(g);},
  dc(a, b){a = a.split('\n');if (a[0] === 'Tensor'){a.shift();}for (let k = 0; k < a.length; k++){const c = document.createElement('li');c.textContent = a[k];this.olNode.appendChild(c);}},
  dd(a){this.olNode = this.ac('ol', this.boxElement);if (a && a.title){this.olNode.textContent = a.title;};this.ae(this.olNode, {'list-style': 'none',margin: 0, padding: 0});},
  de(a, b, c){if (b.shape.length === 0){if (Array.isArray(a)){a = a[0];};this.da(a, c);return;};this.bracketCount = b.shape.length - 1;if (b.shape.length === 1){this.db(a, c);return;};if (b.shape.length === 2){const d = this.df(a, b.shape[1]);this.dg(d, c, '[', ']');return;};if (b.shape.length === 3){const d = this.dh(b, a, c);this.di(d, c, '[[', ']]');};},
  df(a, b){const c = [];for (var k = 0; k < a.length; k += b){const d = [];for (var m = 0; m < b; m++){d.push(a[k + m]);};c.push(d);};return c;},
  dg(a, b, c, d){for (let k = 0; k < a.length; k++){let e = '', f = '';if (k === 0){e = c;};f = (k + 1) === a.length ? d : ',';this.db(a[k], b, e, f);};},
  dh(a, b, c){const d = this.df(b, a.shape[a.shape.length - 1]);const e = d.length / a.shape[0];return this.df(d, e);},
  di(a, b, c, d){for (var k = 0; k < a.length; k++){var e = '', f = '';if (k === 0){e = c;f = '],';} else {e = '&nbsp;[';};if (k > 0 && k < a.length){f = '],';};if (k + 1 === a.length){f = d;};this.dg(a[k], b, e, f);};}
});

Object.assign(web, {xlink: "http://www.w3.org/1999/xlink",xmlns: "http://www.w3.org/2000/svg", version: "1.1"});
Object.assign(web, {
  ea(a = {}){const b = document.createElementNS(this.xmlns, "svg");this.boxElement.appendChild(b);const c = this.ai([a.width || this.svgWidth || this.width,a.height || this.svgHeight || this.height]);this.ae(b, {position: 'absolute',top: this.title ? '20px' : 0});this.ad(b, {id: this.aa(), version: this.version,width: c[0], height: c[1],viewBox: `0,0,${c[0]},${c[1]}`});this['svgElement'] = b;},
  eb(){if (!this.mainElement){this.fb();};this.groupElement = this.ec("g");this.svgElement.appendChild(this.groupElement);},
  ec(a, b = true){const c = document.createElementNS(this.xmlns, a);if (b === "none"){return c;};if (typeof b === "string"){c['id'] = b;} else if (b === true){c['id'] = this.aa();};return c;},
  ed(a){const b = this.ec("circle");const c = Object.assign({}, a);c.r = c.r || this.radius;c.fill = c.fill || this.fill;c.stroke = c.stroke || this.fill;c['stroke-width'] = c['stroke-width'] || this.strokeWidth;this.ad(b, c);this.groupElement.appendChild(b);},
  ee(a){const b = this.ec('ellipse');const c = Object.assign({}, a);c.rx = c.rx || 3;c.ry = c.ry || 2;c.fill = c.fill || this.fill;c.stroke = c.stroke || this.fill;c['stroke-width'] = c['stroke-width'] || this.strokeWidth;this.ad(b, c);this.groupElement.appendChild(b);},
  ef(a, b, c){if (!c){c = this.ec("text");if (!this.groupElement){this.eb();}this.groupElement.appendChild(c);};this.ad(c, a);c.textContent = b !== undefined ? b : '';return c;},
  eg(a){const b = this.ec("rect");const c = Object.assign({}, a);c.fill = c.fill || this.fill;this.ad(b, c);this.groupElement.appendChild(b);}
});

Object.assign(web, {
  fa(a = {}){this.svgElement = null;this.boxElement = null;this.fb(a);this.eb();this.ge(a.axisX);this.eb();this.he(a.axisY);if (this.grid){this.gf();this.hf();};},
  fb(a = {}){this.ba();this.bb(a.option);this.boxElement.dataset['box'] = 'box';this.bc(a.option);this.ea();},
  fc(a = {}, b, c){if (!b){b = this.ec("line");if (!this.groupElement){this.eb();}this.groupElement.appendChild(b);};const d = {"stroke-width": this.strokeWidth,stroke: this.stroke};Object.assign(d, a);if (c){Object.assign(d, c);};this.ad(b, d);this['lineElement'] = b;},
  fd(a = {}){const b = this.ec("path");if (!this.groupElement){this.eb();};this.groupElement.appendChild(b);if (a.d){b.setAttribute('d', a.d);};if (a.attr){this.ad(b, a.attr);}}
});

Object.assign(web, {
  ga(){let a = '';if (this.titleX.style){a = this.titleX.style;delete this.titleX.style;};this.titleX.x = this.beginGraphX + (this.width / 2);const b = this.titleX.text || '';delete this.titleX.text;const c = this.ef(this.titleX, b);this.titleX.text = b;if (a){this.ae(c, a);this.titleX.style = a;};},
  gb(a = {}){if (a.hideLine || a.hideline){return;};this.fc({x1: this.beginGraphX, y1: this.height + this.const15,x2: this.beginGraphX + this.width + this.const15,y2: this.height + this.const15,stroke: this.stroke, 'stroke-width': 1});},
  gc(a = {}){if (a.hideGrid || a.hidegrid){return;};let b = this.beginGraphX;const c = this.axisX.count || 0;for (let k = 1; k < c + 1; k++){b += this.intervalX;this.fc({x1: b, y1: this.height + this.const15,x2: b, y2: this.height + this.const15 + 5,stroke: this.stroke, 'stroke-Width': 1, 'stroke-dasharray': '2 2'});};},
  gd(a){if (a.hideLabel || a.hidelabel){return;};let b = this.beginGraphX;let c = this.axisX.begin;for (let k = 0; k < this.axisX.count + 1; k++){this.ef({x: b, y: this.labelX.y,"text-anchor": "middle"}, c);const d = this.axisX.increase * 10;c = ((c * 10) + (this.axisX.increase * 10)) / 10;b += this.intervalX;};},
  ge(a = {}){this.gb(a);this.gc(a);this.gd(a);this.ga();},
  gf(){this.eb();let a = this.beginGraphX + this.intervalX;for (let k = 0; k < this.axisX.count; k++){this.fc({x1: a, y1: this.const15,x2: a, y2: this.height + this.const15,stroke: "#e6e6e6", 'stroke-width': 1, 'stroke-dasharray': '2 2'});a += this.intervalX;};}
});

Object.assign(web, {
  ha(){if (!this.titleY.text){return;};const a = this.titleY.x;const b = this.height / 2 + this.const15 + 10;const c = this.ef({x: a, y: b}, this.titleY.text);if (this.titleY.rotate !== undefined){this.ad(c, {transform: `rotate(${this.titleY.rotate} ${a + 15} ${b})`});}},
  hb(a){if (a.hideLine || a.hideline){return;};this.fc({x1: this.beginGraphX, y1: 0,x2: this.beginGraphX, y2: this.height + this.const15,stroke: this.stroke, 'stroke-width': 1});},
  hc(a){if (a.hideGrid || a.hidegrid){return;};let b = this.const15;for (let k = 0; k < this.axisY.count; k++){this.fc({x1: this.beginGraphX - 5, y1: b,x2: this.beginGraphX, y2: b,stroke: this.stroke, 'stroke-width': 1});b += this.intervalY;};},
  hd(a){if (a.hideLabel || a.hidelabel){return;};let b = 15;let c = this.axisY.end;for (let k = 0; k < this.axisY.count + 1; k++){this.ef({x: this.beginGraphX - 10,y: b + 5, "text-anchor": "end"}, c);const d = c * 10;const e = (this.axisY.increase * 10) * -1;c = (d + e) / 10;b += this.intervalY;};},
  he(a){this.ha();this.hb(a);this.hc(a);this.hd(a);},
  hf(){this.eb();let a = this.const15;for (let k = 0; k < this.axisY.count; k++){this.fc({x1: this.beginGraphX, y1: a,x2: this.beginGraphX + this.width, y2: a,stroke: "#e6e6e6", 'stroke-width': 1, 'stroke-dasharray': '2 2'});a += this.intervalY;};}
});

Object.assign(web, {
  ia(a){if (Object.is(a.x, NaN) || Object.is(a.y, NaN) || Object.is(a.p, NaN)){return true;};const b = a.p !== undefined ? a.p : a.y;if (a.y === Infinity || a.y === -Infinity || b === Infinity || b === -Infinity){return true;};return b;},
  ib(a, b){if (!b || b.weight === undefined){return;};if (b.begin !== undefined){this.ic(a[0], b, Number(b.begin));};if (b.end !== undefined){this.ic(a[a.length - 1], b, Number(b.end) * -1);};},
  ic(a, b, c){const d = this.ie(a.x, a.p !== undefined ? a.p : a.y);const e = a.x - c;const f = (b.weight * e) + b.bias;const g = this.ie(e, f);const h = Object.assign({x1: d.x, y1: d.y, x2: g.x, y2: g.y}, this.optionAttr || {});this.fc(h);},
  ie(a, b){let c = Math.abs((this.axisX.begin - a)) * this.intervalX / this.axisX.increase;c += this.beginGraphX;let d = Math.abs((this.axisY.begin - b)) * this.intervalY / this.axisY.increase;d = this.height + this.const15 - d;return {x: c, y: d};},
  ig(a = {}){this.titleY = {x: 0, width: 0, text: '', style: ''};if (!a.title || !a.title.text){return;};this.titleY.width = this.const25;Object.assign(this.titleY, a.title);},
  ih(a = {}){this.labelY = {width: this.const30, style: ''};if (!a.label){return;};if (a.label.hidden){this.labelY.width = 0;};Object.assign(this.labelY, a.label);},
  ii(a = {}){this.labelX = {y: this.const15 + this.height + this.const20,x: this.titleY.x + this.titleY.width + this.labelY.width,style: ''};if (!a.label){return;};if (a.label.hidden){this.labelX.y = this.const15 + this.height;}Object.assign(this.labelX, a.label);},
  ij(a = {}){this.titleX = {y: this.labelX.y, text: '', style: '', 'text-anchor': 'middle'};if (!a.title || !a.title.text){return;};if (!a.title.y){this.titleX.y += this.const25;};Object.assign(this.titleX, a.title);},
  ik(a = {}){if (!a.axisY){if (!this.axisY){this.axisY = {};}this.axisY.rotate = '';this.axisY.anchor = '';return;};this.axisY = {count: this.axisCount};Object.assign(this.axisY, a.axisY);this.ig(a.axisY);this.ih(a.axisY);this.beginGraphX = this.titleY.x + this.titleY.width + this.labelY.width;if (this.labelY.width){this.beginGraphX += 10;}},
  il(a = {}){this.intervalY = (a.height || this.height) / this.axisY.count;},
  im(a){if (!a.axisX){if (!this.axisX){this.axisX = {};};this.axisX.rotate = '';this.axisX.anchor = '';return;};this.axisX = {count: this.axisCount};Object.assign(this.axisX, a.axisX);this.ii(a.axisX);this.ij(a.axisX);},
  io(a = {}){this.intervalX = (a.width || this.width) / this.axisX.count;},
  ip(a){if (this.axisY.increase){return;};if (a.axisY && a.axisY.increase){this.axisY.increase = a.axisY.increase;} else {this.axisY.increase = (Math.abs(this.axisY.begin) + Math.abs(this.axisY.end)) / this.axisY.count;};},
  iq(a){if (this.axisX.increase){return;};if (a.axisX && a.axisX.increase){this.axisX.increase = a.axisX.increase;} else {this.axisX.increase = (Math.abs(this.axisX.begin) + Math.abs(this.axisX.end)) / this.axisX.count;};},
  ir(a = {}){this.svgWidth = this.width + this.beginGraphX + this.const15;this.svgHeight = this.const15 + this.titleX.y;},
  is(a){this.ik(a);this.il(a.option);this.im(a);this.io(a.option);}
});

Object.assign(web, {
  ja(){const a = document.querySelectorAll("div[data-box='box']");for (let b = 0; b < a.length; b++){const c = a[b];if (c.style['position'] === 'fixed'){continue;};this.ae(c, {position: 'fixed',top: Number.parseFloat(c.style['top']) + 50 + this.px,left: Number.parseFloat(c.style['left']) + 50 + this.px});}},
  jb(a, b = {}){const c = Object.assign({}, a);for (let d in b){c[d] = b[d];};let e = '';for (let d in c){e += (d + ':' + c[d] + ';');};return e;},
  jc(a){this.tableBox = this.ac('div', this.mainElement);const b = {position: 'absolute'};if (a.table){for (let c in a.table){if (c === 'width' || c === 'left' || c === 'top'){a.table[c] = this.ai(a.table[c]) + this.px;}};Object.assign(b, a.table);};this.ae(this.tableBox, b);const d = {};if (a.table && a.table.width){d.width = a.table.width;};return this.jb(this.table, d);},
  jd(a){let b = '';for (let c of a){let d = '';if (c.style){d = this.jb(this.th, c.style);};b += `<th style=${d}>${c.text || ''}</th>`;};return b;},
  je(a){let b = '';for (let k = 0; k < a.length; k++){const c = a[k];b += '<tr>';if (!Array.isArray(c)){continue;};for (let m = 0; m < c.length; m++){const d = this.jb(this.td);b += `<td style=${d}>${c[m]}</td>`;};b += '</tr>';};return b;}
});

Object.assign(web, {
  ka(a){this.eb();const b = a.attr || {};const c = Array.isArray(a.data) ? a.data : [a.data];c.forEach(function(d){b.cx = Math.abs((this.axisX.begin - d.x)) * this.intervalX / this.axisX.increase + this.beginGraphX;const cy = Math.abs((this.axisY.begin - d.y)) * this.intervalY / this.axisY.increase;b.cy = this.height + this.const15 - cy;this.ed(b);}, this);},
  kb(a){this.eb();const b = a.attr || {};const c = Array.isArray(a.data) ? a.data : [a.data];c.forEach(function(d){b.cx = Math.abs((this.axisX.begin - d.x)) * this.intervalX / this.axisX.increase + this.beginGraphX;const cy = Math.abs((this.axisY.begin - d.y)) * this.intervalY / this.axisY.increase;b.cy = this.height + this.const15 - cy;this.ee(b);}, this);},
  kc(a){this.eb();const b = a.attr || {};if (b.width && !b.height){b.height = b.width;};if (!b.width){b.width = 4;b.height = 4;};const c = Array.isArray(a.data) ? a.data : [a.data];c.forEach(function(xy){let d = Math.abs((this.axisX.begin - xy.x)) * this.intervalX / this.axisX.increase + this.beginGraphX;b.x = d;let e = Math.abs((this.axisY.begin - xy.y)) * this.intervalY / this.axisY.increase;b.y = this.height + this.const15 - e;this.eg(b);}, this);}
});

Object.assign(web, {
  la(a){this.eb();const b = Array.isArray(a.data) ? a.data : [a.data];for (let k = 0; k < b.length; k++){this.lb(a, b[k]);};},
  lb(a, b){const c = this.lc(b);const d = this.ld(b);const e = {x1: c.x1, y1: d.y1, x2: c.x2, y2: d.y2};if (a.attr){Object.assign(e, a.attr);}this.fc(e);if (typeof a.extend === 'object'){this.le(a.extend, c, d, a.attr);};if (b.arrow){this.lh(b.arrow, c, d);};},
  lc(a){const b = Math.abs((this.axisX.begin - a.x1)) * this.intervalX / this.axisX.increase + this.beginGraphX;const c = Math.abs((this.axisX.begin - a.x2)) * this.intervalX / this.axisX.increase + this.beginGraphX;return {x1: b, x2: c};},
  ld(a){let b = Math.abs((this.axisY.begin - a.y1)) * this.intervalY / this.axisY.increase;b = (this.height + this.const15 - b);let c = Math.abs((this.axisY.begin - a.y2)) * this.intervalY / this.axisY.increase;c = (this.height + this.const15 - c);return {y1: b, y2: c};},
  le(a, b, c, d = {}){if (a.begin){this.lf(a.begin, b, c, d);};if (a.end){this.lg(a.end, b, c, d);};},
  lf(a, b, c, d = {}){const e = (b.x1 - ((b.x2 - b.x1) * a));const f = (c.y1 + ((c.y1 - c.y2) * a));this.fc({x1: b.x1, y1: c.y1, x2: e, y2: f}, '', d);},
  lg(a, b, c, d = {}){const e = (b.x2 + ((b.x2 - b.x1) * a));const f = (c.y2 - ((c.y1 - c.y2) * a));this.fc({x1: b.x2, y1: c.y2, x2: e, y2: f}, '', d);},
  lh(a, b, c){if (a === true){a = {};};const d = Object.assign({}, a);let e = 8;if (d.height){e = d.height;delete d.height;};d.fill = d.fill || this.fill;d.stroke = d.stroke || this.stroke;d['stroke-width'] = !d['stroke-width'] || 2;const f = this.ec("path");this.groupElement.appendChild(f);let g = a.pos || a.position;if (!g){g = b.x1 === b.x2 ? 's' : 'e';};if (g === 'e'){return this.li(f, d, b, c, e);};if (g === 's'){return this.lj(f, d, b, c, e);};if (b.x1 === b.x2){d.d = `M${b.x1},${c.y1} L${b.x1 - (e / 2)},${c.y1 + e}L${b.x1 + (e / 2)},${c.y1 + e} Z`;} else {};this.ad(f, d);},
  li(a, b, c, d, e){const f = this.lineElement.getAttribute('stroke-width');if (c.x1 === c.x2){const g = this.lineElement.getAttribute('y2');b.d = `M${c.x2},${d.y2} L${c.x2 - (e / 2)},${d.y2 + e}L${c.x2 + (e / 2)},${d.y2 + e}`;} else {const h = this.lineElement.getAttribute('x2');this.ad(this.lineElement, {'x2': Number.parseFloat(h) - Number.parseFloat(f) - 2});b.d = `M${c.x2},${d.y2} L${c.x2 - e},${d.y2 - (e / 2)}L${c.x2 - e},${d.y2 + (e / 2)}`;};this.ad(a, b);},
  lj(a, b, c, d, e){if (c.x1 === c.x2){} else {const f = this.lineElement.getAttribute('stroke-width');const g = this.lineElement.getAttribute('x2');this.ad(this.lineElement, {'x2': Number.parseFloat(g) + Number.parseFloat(f) + 2});b.d = `M${c.x2},${d.y2} L${c.x2 + e},${d.y2 - (e / 2)}L${c.x2 + e},${d.y2 + (e / 2)}`;this.ad(a, b);};}
});

web.xhrPromise = {
  default: {async: true, encode: "UTF-8",method: "POST",parsing : "y"},
  main(a){const b = new Promise(function(resolve, reject){const c = new XMLHttpRequest();c.options = {};const d = web.xhrPromise;Object.assign(c.options, d.default);Object.assign(c.options, a);c.options.sendData = d.stringify(a.sendData);c.onload = d.onSuccess.bind(d, c, resolve, reject);c.onerror = d.onError.bind(d, c, reject);c.open(c.options.method, c.options.url, c.options.async);c.send(c.options.sendData);});return b;},
  onSuccess(a, resolve, reject, d){if (a.status < 200 || a.status > 299){reject(a);return;};if (a.options.parsing === "y"){this.parseData(a);};if (!a.parseError){resolve(a);};},
  stringify(a){if (a){return JSON.stringify(a);};return null;},
  parseData(a){a.parseData = [];if (!a.response){return;};if (a.options.dataName === 'iris'){web.iris.setData(a);return;};if (a.options.dataName === 'housing'){web.housing.setData(a);return;};try {a.parseData = JSON.parse(a.response);} catch(e) {console.log("parseError", a);};},
  onError(a, reject){reject(a);}
};

web.iris = {
  setData(a){const b = [];const c = a.response.split(/\n/);for (let k = 0; k < c.length; k++){const d = c[k].split(',');const e = [];for (let m = 0; m < 4; m++){e.push(Number.parseFloat(d[m]));};e.push(d[4]);b.push([e]);};a.parseData = b;},
  getData(a, b, c){const d = [];let e;const f = function(h){if (Array.isArray(b)){const g = [];for (let m = 0; m < b.length; m++){g.push(e[b[m]]);};d.push(g);} else {d.push(e[b]);}};for (let k = 0; k < a.length; k++){e = a[k];if (c){if (('Iris-' + c) === e[4]){f(e);};} else {f(e);};};return d;}
};

web.housing = {fieldNames: ['id', 'crim', 'zn', 'indus', 'chas', 'nox', 'rm', 'age', 'dis', 'rad','tax', 'ptratio', 'black', 'lstat', 'medv'],
  setData(a){const b = [];const c = a.response.split(/\n/);for (let k = 0; k < c.length; k++){const d = {};const e = {};const f = c[k].split(',');for (let m = 0; m < f.length; m++){d[this.fieldNames[m]] = Number.parseFloat(f[m]);};b.push([d]);};a.parseData = b;},
  getData(a, b = 0, ...c){const d = [];let e = c;if (e.length === 0){for (let k = 0; k < this.fieldNames.length; k++){e.push(this.fieldNames[k]);}e.shift();e.pop();};for (let k = 0; k < a.length; k++){if (b && k == b){break;};const f = a[k];for (let g of e){const h = f[g];d[k] ? d[k].push(h) : d.push([h]);};};return d;}
};

Object.assign(web, {
  log(a, b = {}){if (b.lineSpace){this.ca(b);} else {this.ba();this.bb(b);this.dd(b);};if (a && a.rank !== undefined && a.shape !== undefined){const c = this.getArray(a);this.de(c, a, b);return;};if (this.cb(a, b)){return;};if (!b.style){b.style = {};};b.style = this.bf(b);if (b.split){this.dc(a, b);return;}Array.isArray(a) ? this.db(a, b) : this.da(a, b);},
  sortXYDesc(a, b = 'x'){if (!Array.isArray(a)){return a;};const c = this.af(a);c.sort(function(one, two){if (one[b] > two[b]){return -1;};if (one[b] < two[b]){return 1;};return 0;});return c;},
  showCircle(a, b = {}){let c, d;if (!Array.isArray(a)){if (a.x && a.y){a = [a];} else {return;};};const e = Object.assign({}, this.optionAttr);a.forEach(function(h, i){const f = this.ia(h);if (f === true){return;}const g = this.ie(h.x, f);e.cx = g.x;e.cy = g.y;this.ed(e);}, this);},
  showEllipse(a, b = {}){let c, d;if (!Array.isArray(a)){if (a.x && a.y){a = [a];} else {return;};};const e = Object.assign({}, this.optionAttr);a.forEach(function(h, i){const f = this.ia(h);if (f === true){return;}const g = this.ie(h.cx, f);e.cx = g.x;e.cy = g.y;this.ed(e);}, this);},
  showLine(a){if (!Array.isArray(a)){return;};const b = Object.assign({}, this.optionAttr);let c, d;a.forEach(function(g, h){const e = this.ia(g);if (e === true){return;}const f = this.ie(g.x, e);if (h === 0){this.beginLineX = f.x;this.beginLineY = f.y;};b.x1 = this.beginLineX;b.x2 = f.x;b.y1 = this.beginLineY;b.y2 = f.y;this.fc(b);this.beginLineX = f.x;this.beginLineY = f.y;}, this);},
  showRect(a, b = {}){let c, d;if (!Array.isArray(a)){if (a.x && a.y){a = [a];} else {return;};};const e = Object.assign({}, this.optionAttr);a.forEach(function(h, i){const f = this.ia(h);if (f === true){return;}if (e.width){e.height = e.width;};if (!e.width){e.width = 4;e.height = 4;};const g = this.ie(h.x, f);e.x = g.x - (e.width / 2);e.y = g.y - (e.height / 2);this.eg(e);}, this);},
  showFreeTable(a){this.ba();const b = this.jc(a);const c = ['<table style=' + b + '">'];if (a.caption){c.push(`<caption>${a.caption || ''}</caption>`);};if (a.th){c.push('<thead><tr>');c.push(this.jd(a.th));c.push('</tr></thead>');};c.push('<tbody>');c.push(this.je(a.data));c.push('</tbody></table>');this.tableBox.innerHTML = c.join('');},
  show(a = {}){this.bg(a);if (!a.type){a.type = 'line';};const lowerCase = a.type.toLowerCase();if (lowerCase === 'addline'){return this.la(a);};if (lowerCase === 'addcircle'){return this.ka(a);};if (lowerCase === 'addellipse'){return this.kb(a);};if (lowerCase === 'addrect'){return this.kc(a);};if (lowerCase === 'path'){return this.fd(a);};this.sortX = this.ag(a.data || []);this.sortY = this.ag(a.data || [], 'y');this.is(a);this.ip(a);this.iq(a);if (a.panel){this.ir();this.fa(a);};this.eb();const b = 'show' + lowerCase.replace(/^[a-z]/, lowerCase.substr(0, 1).toUpperCase());if (this[b] && !a.hideData){this[b](this.sortX, a.option);};if (lowerCase === 'line'){this.ib(a.data, a.extendLine);};this.sortX = null, this.sortY = null;},
  showText(a, b){if (b){if (!Array.isArray(b)){b = [b];};b.forEach(function(d, e){const c = {x: d.x, y: d.y};if (d.attr){Object.assign(c, d.attr);};this.ef(c, d.text);}, this);return;};if (!Array.isArray(a)){return;};let f, g;a.forEach(function(d, e){const h = this.ia(d);if (h === true){return;}const i = this.ie(d.x, d.y);const c = {x: i.x, y: i.y};if (d.attr){Object.assign(c, d.attr);};this.ef(c, d.text);}, this);},
  showTable(a){this.ja();const b = this.jc(a);const c = ['<table style=' + b + '">'];c.push(`<caption>${a.caption || ''}</caption>`);c.push('<thead><tr>');c.push(this.jd(a.th));c.push('</tr></thead><tbody>');c.push(this.je(a.data));c.push('</tbody></table>');const d = c.join('');this.tableBox.innerHTML = c.join('');},
  randomOne(a, b, c = 0){if (c === 0){return Math.trunc((b - a) * Math.random()) + a;};const d = 10**c;return Math.trunc((b - a) * Math.random() * d) / d + a;},
  randomIndices(a, b, c, d){if (a > b){return [];};const e = [];let f = 0;while (f < c){const index = this.randomOne(a, b);if (d && e.includes(index)){continue;};e.push(index);f++;};return e;},
  getTensorScalar(...a){const b = [];for( let k = 0; k < a.length; k++){const c = a[k].dataSync();if (c.length === 1){b.push(this.getArray(c)[0]);continue;};const d = this.getArray(c);for (let m = 0; m < d.length; m++){b.push(d[m]);};};return b;},
  getDecimalData(a, b = {}){if (typeof b === 'number'){b = {decimal: b};};this.bd(b);if (Array.isArray(a)){const c = [];for (let k = 0; k < a.length; k++){const d = this.be(a[k], b);c.push(d);};return c;};return this.be(a, b);},
  getArray(values){if (values.shape){values = values.dataSync();};return Array.from(values).map((value) => {return value;});}
});
