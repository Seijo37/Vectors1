// mapa.js — Lògica del Mapa del curs de Fluids i Superfluids
// Basat en l'esquema, la distribució i el funcionament de https://github.com/xalvarezc/estat_solid
(function () {
  'use strict';

  const CLAU_DESA = 'mapa_fluids_uab_v1';
  const RUTA = { apunts: '', sims: '../simuladors/' };
  const NOMS_ESTAT = { ok: 'Ho entenc', dubte: 'Tinc dubtes', perdut: "M'he perdut" };
  const ICONA_ESTAT = { ok: '✓', dubte: '?', perdut: '!' };
  const COLOR = { ok: '#2F855A', parcial: '#9AD0B0', dubte: '#E0A526', perdut: '#C53030', afectat: '#DD6B20' };
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const ICONA = {
    fletxa: '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    sim: '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M6.5 5.3l4.2 2.7-4.2 2.7z" fill="currentColor"/></svg>'
  };

  // Índex dels conceptes i graf de dependències
  const TEMES = MAPA.temes;
  const LINIES = MAPA.linies;
  const C = {};
  const ORDRE = [];
  const DEP = {};
  const AVALL = {};

  LINIES.forEach(l => l.estacions.forEach(e => {
    e.linia = l;
    e.conceptes.forEach(c => {
      c.estacio = e;
      c.linia = l;
      c.cal = c.cal || [];
      c.veure = c.veure || [];
      c.ex = c.ex || [];
      C[c.id] = c;
      DEP[c.id] = [];
      ORDRE.push(c);
    });
  }));
  ORDRE.forEach(c => c.cal.forEach(r => { if (DEP[r]) DEP[r].push(c.id); }));
  ORDRE.forEach(c => {
    const vist = new Set(), cua = [...DEP[c.id]];
    while (cua.length) {
      const x = cua.shift();
      if (!vist.has(x)) { vist.add(x); DEP[x].forEach(y => cua.push(y)); }
    }
    AVALL[c.id] = vist;
  });
  const CLAU = new Set(ORDRE.filter(c => AVALL[c.id].size >= 3).map(c => c.id));

  // Índex d'exercicis
  const EX = {};
  (window.EXERCICIS || []).forEach(e => { EX[e.num] = e; });
  ORDRE.forEach(c => { c.ex = c.ex.filter(n => EX[n]); });
  const EX_MAPA = [...new Set(ORDRE.flatMap(c => c.ex))];
  const exDeLinia = l => [...new Set(l.estacions.flatMap(e => e.conceptes.flatMap(c => c.ex)))];

  // Estat de l'estudiant a localStorage
  let estat = { e: {}, n: {}, x: {}, h: [] };

  function adopta(d) {
    estat = { e: {}, n: {}, x: {}, h: [] };
    if (!d || typeof d !== 'object') return;
    if (d.e && typeof d.e === 'object') {
      Object.keys(d.e).forEach(k => { if (C[k] && NOMS_ESTAT[d.e[k]]) estat.e[k] = d.e[k]; });
    }
    if (d.n && typeof d.n === 'object') {
      Object.keys(d.n).forEach(k => { if (C[k] && typeof d.n[k] === 'string' && d.n[k].trim()) estat.n[k] = d.n[k].slice(0, 5000); });
    }
    if (d.x && typeof d.x === 'object') {
      Object.keys(d.x).forEach(k => { if (EX[k] && d.x[k]) estat.x[k] = 1; });
    }
    if (Array.isArray(d.h)) {
      estat.h = d.h.filter(x => Array.isArray(x) && x.length === 4 && (C[x[1]] || (typeof x[1] === 'string' && EX[x[1].slice(3)]))).slice(-300);
    }
  }

  function llegeix() {
    let local = null;
    try { local = JSON.parse(localStorage.getItem(CLAU_DESA)); } catch (err) { local = null; }
    adopta(local);
  }

  function desa() {
    const json = JSON.stringify(estat);
    try { localStorage.setItem(CLAU_DESA, json); } catch (err) {
      missatge('No s\'ha pogut desar al navegador (emmagatzematge ple o desactivat). Fes servir «Desa una còpia».');
    }
  }

  function marca(id, nou) {
    const ant = estat.e[id] || '';
    const seguent = ant === nou ? '' : nou;
    if (seguent) estat.e[id] = seguent; else delete estat.e[id];
    estat.h.push([Date.now(), id, ant, seguent]);
    if (estat.h.length > 300) estat.h = estat.h.slice(-300);
    desa();
    actualitza();
  }

  function marcaEx(num) {
    const ant = estat.x[num] ? 'fet' : '';
    const seguent = ant ? '' : 'fet';
    if (seguent) estat.x[num] = 1; else delete estat.x[num];
    estat.h.push([Date.now(), 'ex:' + num, ant, seguent]);
    if (estat.h.length > 300) estat.h = estat.h.slice(-300);
    desa();
    actualitza();
  }

  // Utilitats DOM
  function h(tag, attrs, ...fills) {
    const el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(k => {
      const v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v);
    });
    fills.flat().forEach(f => {
      if (f === null || f === undefined || f === false) return;
      el.append(typeof f === 'string' ? document.createTextNode(f) : f);
    });
    return el;
  }

  function s(tag, attrs, ...fills) {
    const el = document.createElementNS(SVG_NS, tag);
    if (attrs) Object.keys(attrs).forEach(k => {
      if (k === 'text') el.textContent = attrs[k];
      else if (attrs[k] !== null && attrs[k] !== undefined) el.setAttribute(k, attrs[k]);
    });
    fills.flat().forEach(f => { if (f) el.append(f); });
    return el;
  }

  const nomTema = t => (t === '00' ? 'Base · Camps i EDP' : 'Tema ' + parseInt(t, 10));
  const llista = a => a.length <= 1 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' i ' + a[a.length - 1];
  const partir = (txt, max) => {
    if (txt.length <= max) return [txt];
    const p = txt.split(' '), l1 = [];
    while (p.length && (l1.join(' ').length + p[0].length) <= max) l1.push(p.shift());
    return [l1.join(' ') || p.shift(), p.join(' ')].filter(Boolean);
  };
  const missatge = txt => { const el = document.getElementById('missatge'); if (el) el.textContent = txt; };

  // Construcció de les línies
  const arrel = document.getElementById('linies');
  const ELEM = {}, EST_EL = {}, LIN_EL = {};

  function xip(id) {
    const c = C[id];
    return h('button', {
      type: 'button', class: 'xip', 'data-id': id, style: '--c:' + c.linia.color,
      title: c.linia.curt + ' · ' + nomTema(c.estacio.tema), onclick: () => navega(id)
    }, h('span', { class: 'p ' + (estat.e[id] || '') }), c.nom);
  }

  function enllacos(c) {
    const grup = h('div', { class: 'c-enllacos' });
    (c.sims || []).forEach(sim => {
      const url = sim.u.startsWith('../') ? sim.u : RUTA.sims + sim.u;
      grup.append(h('a', { href: url, html: ICONA.sim + 'Simulador: ' + sim.t }));
    });
    return grup;
  }

  function llistaEx(nums, temaConcepte) {
    return h('ul', { class: 'ex-llista' }, nums.map(num => {
      const e = EX[num];
      const esParcial = num.startsWith('P');
      const titol = (esParcial ? '' : 'Problema ' + num + ' · ') + e.titol;
      return h('li', { class: 'ex-fila' },
        h('button', {
          type: 'button', class: 'ex-fet', 'data-ex': num, 'aria-pressed': estat.x[num] ? 'true' : 'false',
          title: 'Marca l\'exercici ' + num + ' com a fet', onclick: () => marcaEx(num)
        }, '✓ Fet'),
        e.web ? h('a', { href: e.web }, titol) : h('span', null, titol),
        e.tema !== temaConcepte ? h('span', { class: 'ex-tema', text: '(' + nomTema(e.tema) + ')' }) : null);
    }));
  }

  function construeixDetall(c) {
    const E = ELEM[c.id], d = E.detall;
    d.append(h('p', { class: 'c-desc', text: c.desc }));
    if (c.cal.length) d.append(h('div', { class: 'c-rel' }, h('span', { class: 'et', text: 'Cal haver entès abans' }), c.cal.map(xip)));
    if (DEP[c.id].length) d.append(h('div', { class: 'c-rel' }, h('span', { class: 'et', text: 'Hi recolzen' }), DEP[c.id].map(xip)));
    if (c.veure.length) d.append(h('div', { class: 'c-rel' }, h('span', { class: 'et', text: 'Relacionat' }), c.veure.map(xip)));
    d.append(enllacos(c));
    if (c.ex.length) d.append(h('div', { class: 'c-rel' }, h('span', { class: 'et', text: 'Problemes i exàmens per practicar-ho (clica per obrir al simulador)' }), llistaEx(c.ex, c.estacio.tema)));
    const ta = h('textarea', { rows: 2, placeholder: 'Apunta aquí dubtes, passos clau d\'examen o recordatoris sobre aquest concepte...' });
    ta.value = estat.n[c.id] || '';
    let t;
    ta.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (ta.value.trim()) estat.n[c.id] = ta.value.slice(0, 5000); else delete estat.n[c.id];
        desa();
      }, 400);
    });
    d.append(h('label', { class: 'c-nota' }, h('span', { text: 'Les meves notes (es desen en aquest navegador)' }), ta));
    E.ta = ta;
    E.construit = true;
  }

  function obreConcepte(id, obre) {
    const E = ELEM[id];
    if (obre && !E.construit) construeixDetall(C[id]);
    E.detall.hidden = !obre;
    E.obre.setAttribute('aria-expanded', obre ? 'true' : 'false');
    E.li.classList.toggle('obert', obre);
  }

  function construeixConcepte(c) {
    const obre = h('button', { type: 'button', class: 'c-obre', 'aria-expanded': 'false', 'aria-controls': 'd-' + c.id },
      h('span', { class: 'fletxa', html: ICONA.fletxa }),
      h('span', { class: 'c-nom', text: c.nom }),
      CLAU.has(c.id) ? h('span', { class: 'c-clau', title: 'Concepte clau: ' + AVALL[c.id].size + ' conceptes posteriors en depenen', text: '★' }) : null,
      c.ex.length ? h('span', { class: 'c-nex', 'data-id': c.id }) : null);
    const botons = h('div', { class: 'c-botons', role: 'group', 'aria-label': 'El meu estat: ' + c.nom },
      ['ok', 'dubte', 'perdut'].map(e => h('button', {
        type: 'button', 'data-e': e, 'aria-pressed': 'false', title: NOMS_ESTAT[e], onclick: () => marca(c.id, e)
      }, h('span', { class: 'ic', text: ICONA_ESTAT[e] }), h('span', { class: 'txt', text: NOMS_ESTAT[e] }))));
    const avis = h('div', { class: 'c-avis', hidden: true });
    const detall = h('div', { class: 'c-detall', id: 'd-' + c.id, hidden: true });
    const li = h('li', { class: 'concepte', id: 'c-' + c.id }, h('div', { class: 'c-fila' }, obre, botons), avis, detall);
    obre.addEventListener('click', () => obreConcepte(c.id, !li.classList.contains('obert')));
    ELEM[c.id] = { li, obre, botons, avis, detall, construit: false, ta: null };
    return li;
  }

  LINIES.forEach(l => {
    const ol = h('ol', { class: 'estacions' });
    l.estacions.forEach(e => {
      const punt = h('span', { class: 'e-punt', 'aria-hidden': 'true' });
      const minis = h('span', { class: 'e-minis', 'aria-hidden': 'true' }, e.conceptes.map(c => h('span', { 'data-id': c.id })));
      const det = h('details', { class: 'estacio', id: 'e-' + e.id },
        h('summary', null, punt,
          h('span', null, h('span', { class: 'e-nom', text: e.nom }), ' ', h('span', { class: 'e-tema', text: '· ' + nomTema(e.tema) })),
          minis),
        h('ul', { class: 'conceptes' }, e.conceptes.map(construeixConcepte)));
      ol.append(h('li', null, det));
      EST_EL[e.id] = { det, punt, minis };
    });
    const estatTxt = h('span', { class: 'l-estat' }), barra = h('span', { class: 'barra', 'aria-hidden': 'true' });
    const det = h('details', { class: 'linia', id: 'l-' + l.id, style: '--c:' + l.color, open: l.id === 'L1' },
      h('summary', null,
        h('span', { class: 'fletxa', html: ICONA.fletxa }),
        h('span', null, h('span', { class: 'l-temes', text: l.temes }), h('br'), h('span', { class: 'l-nom', text: l.nom })),
        h('span', { class: 'l-dreta' }, estatTxt, barra)),
      h('p', { class: 'l-desc', text: l.desc }),
      ol);
    arrel.append(det);
    LIN_EL[l.id] = { det, estatTxt, barra };
  });

  function calcula() {
    const perduts = ORDRE.filter(c => estat.e[c.id] === 'perdut').map(c => c.id);
    const afectat = {};
    perduts.forEach(p => AVALL[p].forEach(id => {
      if (estat.e[id] !== 'perdut') (afectat[id] = afectat[id] || []).push(p);
    }));
    return { perduts, afectat };
  }

  function agregat(conceptes, afectat) {
    const a = { total: conceptes.length, ok: 0, dubte: 0, perdut: 0, afectat: 0 };
    conceptes.forEach(c => {
      const e = estat.e[c.id];
      if (e) a[e]++;
      if (afectat[c.id]) a.afectat++;
    });
    a.cls = a.perdut ? 'perdut' : a.dubte ? 'dubte' : a.ok === a.total ? 'ok' : a.ok ? 'parcial' : '';
    a.icona = a.perdut ? '!' : a.dubte ? '?' : a.ok === a.total ? '✓' : '';
    return a;
  }

  function estatLinia(l, afectat) {
    const tots = [].concat(...l.estacions.map(e => e.conceptes));
    const a = agregat(tots, afectat);
    const perdut = tots.find(c => estat.e[c.id] === 'perdut');
    if (perdut) return { a, cls: 'perdut', txt: 'Encallada a «' + perdut.nom + '»' };
    if (a.afectat) {
      const origen = new Set();
      tots.forEach(c => (afectat[c.id] || []).forEach(p => origen.add(C[p].linia.curt)));
      return { a, cls: 'afectat', txt: 'Depèn d\'on t\'has perdut a ' + llista([...origen]) };
    }
    if (a.dubte) return { a, cls: 'dubte', txt: a.dubte === 1 ? 'Amb un dubte' : 'Amb ' + a.dubte + ' dubtes' };
    if (a.ok === a.total) return { a, cls: 'ok', txt: 'Al dia: tot entès' };
    if (a.ok) return { a, cls: '', txt: a.ok + ' de ' + a.total + ' conceptes entesos' };
    return { a, cls: '', txt: 'Encara per marcar' };
  }

  function barraDe(a, el) {
    el.textContent = '';
    ['ok', 'dubte', 'perdut'].forEach(k => {
      if (a[k]) el.append(h('span', { class: 'b-' + k, style: 'width:' + (100 * a[k] / a.total) + '%' }));
    });
    return el;
  }

  function actualitza() {
    const { perduts, afectat } = calcula();

    ORDRE.forEach(c => {
      const E = ELEM[c.id], e = estat.e[c.id] || '';
      E.li.classList.remove('ok', 'dubte', 'perdut');
      if (e) E.li.classList.add(e);
      E.botons.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.e === e ? 'true' : 'false'));
      const af = afectat[c.id];
      if (af) {
        E.avis.hidden = false;
        E.avis.textContent = '⚠ Depèn de ' + llista(af.map(p => '«' + C[p].nom + '»')) + ', on has marcat que t\'has perdut.';
      } else {
        E.avis.hidden = true;
      }
      E.li.classList.toggle('febla', e === 'dubte' || e === 'perdut' || !!af);
    });
    document.querySelectorAll('.xip[data-id]').forEach(x => { x.querySelector('.p').className = 'p ' + (estat.e[x.dataset.id] || ''); });
    document.querySelectorAll('.ex-fet[data-ex]').forEach(b => b.setAttribute('aria-pressed', estat.x[b.dataset.ex] ? 'true' : 'false'));
    document.querySelectorAll('.c-nex[data-id]').forEach(el => {
      const ex = C[el.dataset.id].ex, fets = ex.filter(n => estat.x[n]).length;
      el.textContent = fets + '/' + ex.length + ' ex.';
      el.title = fets + ' de ' + ex.length + ' exercicis fets';
      el.classList.toggle('tots', fets === ex.length);
    });

    LINIES.forEach(l => {
      let liniaFebla = false;
      l.estacions.forEach(e => {
        const a = agregat(e.conceptes, afectat), el = EST_EL[e.id];
        el.punt.className = 'e-punt ' + a.cls + (a.afectat ? ' afectat' : '');
        el.punt.textContent = a.icona;
        el.minis.querySelectorAll('span').forEach(m => {
          m.className = (estat.e[m.dataset.id] || '') + (afectat[m.dataset.id] ? ' afectat' : '');
        });
        const febla = e.conceptes.some(c => ELEM[c.id].li.classList.contains('febla'));
        el.det.classList.toggle('te-febla', febla);
        liniaFebla = liniaFebla || febla;
      });
      const st = estatLinia(l, afectat), el = LIN_EL[l.id];
      el.estatTxt.className = 'l-estat ' + st.cls;
      el.estatTxt.textContent = st.txt;
      barraDe(st.a, el.barra);
      el.det.classList.toggle('te-febla', liniaFebla);
    });

    dibuixaVista(afectat);
    situacio(perduts, afectat);
    historial();
  }

  function situacio(perduts, afectat) {
    const cos = document.getElementById('sitCos');
    cos.textContent = '';
    const a = agregat(ORDRE, afectat), marcats = a.ok + a.dubte + a.perdut;

    if (!marcats) {
      cos.append(h('p', { class: 'sit-buit' },
        'Encara no has marcat cap concepte. Desplega qualsevol línia o clica una estació del mapa superior per revisar els conceptes, obrir el simulador associat i marcar els problemes fets.'));
    } else {
      const parts = [];
      if (a.ok) parts.push(a.ok + (a.ok === 1 ? ' l\'entens' : ' els entens'));
      if (a.dubte) parts.push('en ' + a.dubte + ' tens dubtes');
      if (a.perdut) parts.push('en ' + a.perdut + ' t\'has perdut');
      cos.append(h('p', { class: 'sit-resum' }, 'Has marcat ' + marcats + ' dels ' + a.total + ' conceptes de Fluids i Superfluids: ' + llista(parts) + '.'));
      cos.append(barraDe(a, h('div', { class: 'barra', 'aria-hidden': 'true' })));
    }
    const nFets = EX_MAPA.filter(n => estat.x[n]).length;
    if (nFets) cos.append(h('p', { class: 'sit-resum sit-ex' }, 'Problemes i exàmens resolts: ' + nFets + ' dels ' + EX_MAPA.length + '.'));

    cos.append(h('ul', { class: 'sit-linies' }, LINIES.filter(l => l.id !== 'T').map(l => {
      const st = estatLinia(l, afectat);
      const ex = exDeLinia(l), fets = ex.filter(n => estat.x[n]).length;
      return h('li', { style: '--c:' + l.color },
        h('span', { class: 'nom', text: l.nom }),
        h('span', { class: 'estat-txt ' + st.cls, text: st.txt }),
        ex.length ? h('span', { class: 'ex-txt', text: fets + ' de ' + ex.length + ' exercicis fets' }) : null);
    })));

    if (perduts.length) {
      const bloc = h('div', { class: 'sit-bloc' }, h('h3', { text: perduts.length === 1 ? 'On t\'has perdut' : 'On t\'has perdut (' + perduts.length + ' punts)' }));
      perduts.forEach(p => {
        const c = C[p], av = AVALL[p];
        const linies = [...new Set([...av].map(id => C[id].linia.curt))];
        const caixa = h('div', { class: 'sit-perdut' }, h('div', { class: 'titol' }, xip(p)));
        caixa.append(h('p', null, av.size
          ? (av.size === 1 ? 'En depèn 1 concepte posterior, de ' : 'En depenen ' + av.size + ' conceptes posteriors, de ') + llista(linies) + '.'
          : 'Cap altre concepte del curs en depèn: pots continuar endavant mentre el treballes.'));
        const pendents = c.cal.filter(r => estat.e[r] !== 'ok');
        if (pendents.length) {
          caixa.append(h('p', null, 'Abans de tornar-hi, repassa:'), h('div', null, pendents.map(xip)));
        } else if (c.cal.length) {
          caixa.append(h('p', null, 'Els conceptes previs els tens marcats com a entesos: obre el simulador d\'aquest concepte per visualitzar-lo pas a pas.'));
        }
        if (c.ex.length) caixa.append(h('p', null, 'Per practicar-ho:'), llistaEx(c.ex, c.estacio.tema));
        bloc.append(caixa);
      });
      cos.append(bloc);
    }

    const dubtes = ORDRE.filter(c => estat.e[c.id] === 'dubte');
    if (dubtes.length) {
      cos.append(h('div', { class: 'sit-bloc' },
        h('h3', { text: 'Tens dubtes a' }),
        h('div', null, dubtes.map(c => xip(c.id))),
        h('p', { class: 'sit-seguir' }, 'Prova de moure els paràmetres al simulador corresponent o apunta el dubte a les notes del concepte.')));
    }
  }

  function historial() {
    const ol = document.getElementById('historialLlista');
    ol.textContent = '';
    const ult = estat.h.slice(-30).reverse();
    document.querySelector('#historial summary').textContent = 'El meu historial' + (estat.h.length ? ' (' + estat.h.length + (estat.h.length === 1 ? ' canvi)' : ' canvis)') : '');
    if (!ult.length) { ol.append(h('li', { text: 'Encara no has marcat res.' })); return; }
    const nomE = e => (e ? NOMS_ESTAT[e] : 'sense marcar');
    ult.forEach(([t, id, de, a]) => {
      const d = new Date(t);
      const data = d.toLocaleDateString('ca', { day: '2-digit', month: '2-digit' }) + ' ' + d.toLocaleTimeString('ca', { hour: '2-digit', minute: '2-digit' });
      const txt = id.slice(0, 3) === 'ex:'
        ? 'Exercici ' + id.slice(3) + ': ' + (a === 'fet' ? 'fet' : 'desmarcat')
        : (C[id] ? C[id].nom : id) + ': ' + nomE(de) + ' → ' + nomE(a);
      ol.append(h('li', null, h('span', { class: 'data', text: data }), txt));
    });
  }

  // Vista general (SVG)
  const vista = document.getElementById('vistaMapa');
  function dibuixaVista(afectat) {
    const X0 = 210, DX = 175, Y0 = 64, DY = 104, R = 14;
    const maxE = Math.max(...LINIES.map(l => l.estacions.length));
    const W = X0 + (maxE - 1) * DX + 95, H = Y0 + (LINIES.length - 1) * DY + 66;
    const pos = {};
    LINIES.forEach((l, i) => l.estacions.forEach((e, j) => { pos[e.id] = { x: X0 + j * DX, y: Y0 + i * DY }; }));

    const svg = s('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'group', 'aria-label': 'Vista general de les línies argumentals de Fluids i Superfluids' });

    const parelles = new Map();
    ORDRE.forEach(c => c.cal.forEach(r => {
      if (!C[r]) return;
      const a = C[r].estacio, b = c.estacio;
      if (a.linia !== b.linia) parelles.set(a.id + '>' + b.id, [a, b]);
    }));
    const gT = s('g', { 'aria-hidden': 'true' });
    parelles.forEach(([a, b]) => {
      const pa = pos[a.id], pb = pos[b.id], ym = (pa.y + pb.y) / 2;
      gT.append(s('path', { class: 'transf', 'data-a': a.id, 'data-b': b.id, d: 'M' + pa.x + ',' + pa.y + ' C' + pa.x + ',' + ym + ' ' + pb.x + ',' + ym + ' ' + pb.x + ',' + pb.y }));
    });
    svg.append(gT);

    const ressalta = (id, on) => gT.querySelectorAll('[data-a="' + id + '"],[data-b="' + id + '"]').forEach(p => p.classList.toggle('actiu', on));

    LINIES.forEach((l, i) => {
      const y = Y0 + i * DY, xs = l.estacions.map(e => pos[e.id].x);
      const tots = [].concat(...l.estacions.map(e => e.conceptes)), al = agregat(tots, afectat);
      const nom = partir(l.curt, 22);
      const tNom = s('text', { x: 16, y: y - 4 - (nom.length - 1) * 8, class: 'v-linia', fill: l.color });
      nom.forEach((tros, k) => tNom.append(s('tspan', { x: 16, dy: k ? 16 : 0, text: tros })));
      svg.append(tNom);
      svg.append(s('text', { x: 16, y: y + 12 + (nom.length - 1) * 8, class: 'v-recompte', text: al.ok + ' de ' + al.total + ' entesos' }));
      svg.append(s('line', { x1: xs[0], y1: y, x2: xs[xs.length - 1], y2: y, stroke: l.color, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0.9 }));

      let temaAnt = null;
      l.estacions.forEach(e => {
        if (e.tema !== temaAnt) {
          temaAnt = e.tema;
          svg.append(s('text', { x: pos[e.id].x, y: y - R - 13, 'text-anchor': 'middle', class: 'v-tema', text: nomTema(e.tema) }));
        }
      });

      l.estacions.forEach(e => {
        const p = pos[e.id], a = agregat(e.conceptes, afectat);
        const estatTxt = a.perdut ? 'hi ha punts on t\'has perdut' : a.dubte ? 'hi tens dubtes' : a.ok === a.total ? 'tot entès'
          : a.ok ? a.ok + ' de ' + a.total + ' conceptes entesos' : 'per marcar';
        const g = s('g', { class: 'est', tabindex: 0, role: 'button', 'aria-label': e.nom + ', ' + nomTema(e.tema) + ': ' + estatTxt });
        if (a.afectat) g.append(s('circle', { cx: p.x, cy: p.y, r: R + 6, fill: 'none', stroke: COLOR.afectat, 'stroke-width': 2.5, 'stroke-dasharray': '4 3' }));
        g.append(s('circle', { class: 'cercle', cx: p.x, cy: p.y, r: R, fill: COLOR[a.cls] || '#FFFFFF', stroke: l.color, 'stroke-width': 3.5 }));
        if (a.icona) g.append(s('text', { x: p.x, y: p.y + 4.5, 'text-anchor': 'middle', class: 'v-icona', fill: a.cls === 'dubte' ? '#3A2A05' : '#FFFFFF', text: a.icona }));
        const tl = s('text', { x: p.x, y: p.y + R + 17, 'text-anchor': 'middle', class: 'v-est' });
        partir(e.curt, 18).forEach((tros, k) => tl.append(s('tspan', { x: p.x, dy: k ? 13 : 0, text: tros })));
        g.append(tl, s('title', { text: e.nom + ' (' + nomTema(e.tema) + ')' }));
        g.addEventListener('click', () => navegaEstacio(e.id));
        g.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); navegaEstacio(e.id); } });
        g.addEventListener('mouseenter', () => ressalta(e.id, true));
        g.addEventListener('mouseleave', () => ressalta(e.id, false));
        g.addEventListener('focus', () => ressalta(e.id, true));
        g.addEventListener('blur', () => ressalta(e.id, false));
        svg.append(g);
      });
    });

    vista.textContent = '';
    vista.append(svg);
  }

  function flash(el) {
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 1600);
  }
  function navega(id) {
    const c = C[id];
    if (!c) return;
    if (arrel.classList.contains('nomes-febles') && !ELEM[id].li.classList.contains('febla')) posaFebles(false);
    LIN_EL[c.linia.id].det.open = true;
    EST_EL[c.estacio.id].det.open = true;
    obreConcepte(id, true);
    const li = ELEM[id].li;
    li.scrollIntoView({ behavior: 'smooth', block: 'center' });
    flash(li);
    ELEM[id].obre.focus({ preventScroll: true });
    try { history.replaceState(null, '', '#c-' + id); } catch (err) {}
  }
  function navegaEstacio(eid) {
    const e = MAPA.linies.flatMap(l => l.estacions).find(x => x.id === eid);
    if (!e) return;
    if (arrel.classList.contains('nomes-febles') && !EST_EL[eid].det.classList.contains('te-febla')) posaFebles(false);
    LIN_EL[e.linia.id].det.open = true;
    const det = EST_EL[eid].det;
    det.open = true;
    det.scrollIntoView({ behavior: 'smooth', block: 'start' });
    det.querySelector('summary').focus({ preventScroll: true });
    try { history.replaceState(null, '', '#e-' + eid); } catch (err) {}
  }

  const btnFebles = document.getElementById('btnFebles');
  function posaFebles(on) {
    arrel.classList.toggle('nomes-febles', on);
    btnFebles.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (on) {
      const n = ORDRE.filter(c => ELEM[c.id].li.classList.contains('febla')).length;
      if (!n) {
        missatge('No tens cap concepte amb dubtes ni on t\'hagis perdut.');
        arrel.classList.remove('nomes-febles');
        btnFebles.setAttribute('aria-pressed', 'false');
        return;
      }
      LINIES.forEach(l => { if (LIN_EL[l.id].det.classList.contains('te-febla')) LIN_EL[l.id].det.open = true; });
      Object.values(EST_EL).forEach(el => { if (el.det.classList.contains('te-febla')) el.det.open = true; });
    }
  }
  btnFebles.addEventListener('click', () => posaFebles(btnFebles.getAttribute('aria-pressed') !== 'true'));
  document.getElementById('btnObre').addEventListener('click', () => {
    Object.values(LIN_EL).forEach(el => { el.det.open = true; });
    Object.values(EST_EL).forEach(el => { el.det.open = true; });
  });
  document.getElementById('btnTanca').addEventListener('click', () => {
    Object.values(LIN_EL).forEach(el => { el.det.open = false; });
    Object.values(EST_EL).forEach(el => { el.det.open = false; });
    ORDRE.forEach(c => obreConcepte(c.id, false));
  });

  function refrescaNotes() {
    ORDRE.forEach(c => { const E = ELEM[c.id]; if (E.ta) E.ta.value = estat.n[c.id] || ''; });
  }

  const avui = () => new Date().toISOString().slice(0, 10);
  document.getElementById('btnDesa').addEventListener('click', () => {
    const dades = JSON.stringify({ app: 'mapa-fluids-uab', v: 1, desat: new Date().toISOString(), e: estat.e, n: estat.n, x: estat.x, h: estat.h }, null, 1);
    const url = URL.createObjectURL(new Blob([dades], { type: 'application/json' }));
    const a = h('a', { href: url, download: 'mapa_fluids_' + avui() + '.json' });
    document.body.append(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1000);
    missatge('Còpia desada en JSON.');
  });
  const fitxer = document.getElementById('fitxerCopia');
  document.getElementById('btnRecupera').addEventListener('click', () => fitxer.click());
  fitxer.addEventListener('change', () => {
    const f = fitxer.files && fitxer.files[0];
    fitxer.value = '';
    if (!f) return;
    const lector = new FileReader();
    lector.onload = () => {
      let o;
      try { o = JSON.parse(lector.result); } catch (err) { o = null; }
      if (!o || o.app !== 'mapa-fluids-uab') { missatge('Aquest fitxer no és una còpia vàlida del mapa de Fluids.'); return; }
      adopta(o);
      desa();
      refrescaNotes();
      actualitza();
      missatge('Còpia recuperada: ' + Object.keys(estat.e).length + ' conceptes marcats.');
    };
    lector.readAsText(f);
  });
  document.getElementById('btnEsborra').addEventListener('click', () => {
    if (!confirm('Segur que vols esborrar tot el teu progrés i les notes d\'aquest navegador?')) return;
    estat = { e: {}, n: {}, x: {}, h: [] };
    desa();
    refrescaNotes();
    actualitza();
    missatge('Progrés esborrat.');
  });

  window.addEventListener('storage', ev => {
    if (ev.key !== CLAU_DESA) return;
    llegeix();
    refrescaNotes();
    actualitza();
  });

  llegeix();
  actualitza();
  const ancora = decodeURIComponent(location.hash.slice(1));
  if (ancora.startsWith('c-') && C[ancora.slice(2)]) navega(ancora.slice(2));
  else if (ancora.startsWith('e-') && EST_EL[ancora.slice(2)]) navegaEstacio(ancora.slice(2));
  else if (ancora.startsWith('l-') && LIN_EL[ancora.slice(2)]) { LIN_EL[ancora.slice(2)].det.open = true; LIN_EL[ancora.slice(2)].det.scrollIntoView(); }
})();
