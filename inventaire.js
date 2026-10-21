// Licorne 416 — Inventaire d'arrivée interactif multilingue
(function () {
  const root = document.getElementById('inventaire-app');
  if (!root) return;

  const STORAGE_KEY = 'licorne416_inventaire_v1';
  const REF_CACHE_KEY = 'licorne416_inventaire_ref_v3';
  const MAX_PHOTO_SIDE = 1600;
  const API_URL = "https://script.google.com/macros/s/AKfycbyMsIkALXAba5BF507T8-jJsPo2aglb4XhAZlZJ7VzCsJDUiJkA_YHhY1sNxv_fkuvr/exec";

  const T = {
    fr: {
      loading: "Chargement de l'inventaire…",
      load_error: "Impossible de charger l'inventaire pour le moment.",
      retry: "Réessayer",
      id_title: "Qui mène l'inspection ?",
      id_intro: "Quelques infos pour commencer, puis partez à la découverte de l'appartement pièce par pièce. Votre progression est sauvegardée automatiquement : vous pouvez fermer la page et revenir quand vous voulez.",
      prenom: "Prénom", nom: "Nom", arrivee: "Arrivée", depart: "Départ",
      start: "Commencer l'exploration 🗺️",
      id_error: "Merci de remplir tous les champs.",
      date_error: "La date de départ doit être après la date d'arrivée.",
      welcome_back: "Bonjour {name} ! 👋",
      saved_hint: "Progression sauvegardée sur cet appareil.",
      edit_info: "✏️ Mes infos",
      rooms_title: "Choisissez une pièce à inspecter",
      progress: "{done} / {total} équipements vérifiés",
      level_0: "Prêt pour l'aventure ? 🎒",
      level_1: "Explorateur en herbe 🧭",
      level_2: "Presque au sommet 🏔️",
      level_3: "Inspecteur en chef 🏆",
      room_done: "Terminé",
      room_todo: "{n} à vérifier",
      finish: "Terminer et envoyer 🚀",
      back_rooms: "← Toutes les pièces",
      all_good: "✨ Tout est en ordre ici",
      next_room: "Pièce suivante →",
      to_recap: "Voir le récapitulatif →",
      mobile: "📦 Mobile", fixed: "📌 Fixe",
      expected: "Attendu : {n}", free_qty: "À compter",
      all_there: "Tout y est",
      missing: "{n} manquant(s)", extra: "{n} en plus",
      st_ok: "✅ OK", st_sale: "🧽 Sale", st_abime: "💔 Abîmé",
      photo_prompt: "📸 Une petite photo nous aide beaucoup !",
      add_photo: "Ajouter une photo",
      uploading: "Envoi de la photo…",
      photo_error: "La photo n'a pas pu être envoyée. Réessayez.",
      comment_ph: "Précisez si besoin (ex : 2 assiettes ébréchées)",
      recap_title: "Dernière vérification",
      recap_checked: "vérifiés", recap_missing: "manquants", recap_damaged: "sales / abîmés", recap_photos: "photos",
      recap_incomplete: "Pièces pas encore terminées : {rooms}. Les équipements non vérifiés resteront vides.",
      recap_anomalies: "Points signalés",
      recap_none: "Aucune anomalie, bravo ! 🙌",
      send: "Envoyer mon inventaire 🚀",
      sending: "Envoi en cours…",
      send_error: "Oups, l'envoi a échoué. Votre inventaire reste sauvegardé.",
      back: "← Retour",
      done_title: "Merci {name} ! 🎉",
      done_desc: "Votre inventaire a bien été transmis. Excellent séjour à Belle Plagne !",
      new_inv: "Commencer un nouvel inventaire",
      confirm_reset: "Effacer cet inventaire et en commencer un nouveau ?"
    },
    en: {
      loading: "Loading the inventory…",
      load_error: "The inventory can't be loaded right now.",
      retry: "Try again",
      id_title: "Who's leading the inspection?",
      id_intro: "A few details to start, then explore the flat room by room. Your progress is saved automatically.",
      prenom: "First name", nom: "Last name", arrivee: "Arrival", depart: "Departure",
      start: "Start exploring 🗺️",
      id_error: "Please fill in all fields.",
      date_error: "Departure must be after arrival.",
      welcome_back: "Hi {name}! 👋",
      saved_hint: "Progress saved on this device.",
      edit_info: "✏️ My details",
      rooms_title: "Pick a room to inspect",
      progress: "{done} / {total} items checked",
      level_0: "Ready for the adventure? 🎒",
      level_1: "Budding explorer 🧭",
      level_2: "Almost at the summit 🏔️",
      level_3: "Chief inspector 🏆",
      room_done: "Done",
      room_todo: "{n} to check",
      finish: "Finish and send 🚀",
      back_rooms: "← All rooms",
      all_good: "✨ Everything's fine here",
      next_room: "Next room →",
      to_recap: "See summary →",
      mobile: "📦 Movable", fixed: "📌 Fixed",
      expected: "Expected: {n}", free_qty: "To count",
      all_there: "All there",
      missing: "{n} missing", extra: "{n} extra",
      st_ok: "✅ OK", st_sale: "🧽 Dirty", st_abime: "💔 Damaged",
      photo_prompt: "📸 A quick photo really helps!",
      add_photo: "Add a photo",
      uploading: "Uploading photo…",
      photo_error: "The photo couldn't be sent. Please try again.",
      comment_ph: "Add details if needed (e.g. 2 chipped plates)",
      recap_title: "Final check",
      recap_checked: "checked", recap_missing: "missing", recap_damaged: "dirty / damaged", recap_photos: "photos",
      recap_incomplete: "Rooms not finished yet: {rooms}.",
      recap_anomalies: "Reported issues",
      recap_none: "No issues at all, well done! 🙌",
      send: "Send my inventory 🚀",
      sending: "Sending…",
      send_error: "Oops, sending failed. Your inventory is still saved.",
      back: "← Back",
      done_title: "Thank you {name}! 🎉",
      done_desc: "Your inventory has been sent. Enjoy your stay in Belle Plagne!",
      new_inv: "Start a new inventory",
      confirm_reset: "Delete this inventory and start a new one?"
    },
    nl: {
      loading: "Inventaris laden…",
      load_error: "De inventaris kan nu niet worden geladen.",
      retry: "Opnieuw proberen",
      id_title: "Wie leidt de inspectie?",
      id_intro: "Een paar gegevens om te beginnen, ontdek daarna het appartement kamer per kamer.",
      prenom: "Voornaam", nom: "Achternaam", arrivee: "Aankomst", depart: "Vertrek",
      start: "Start de verkenning 🗺️",
      id_error: "Vul alle velden in.",
      date_error: "Vertrek moet na aankomst zijn.",
      welcome_back: "Hallo {name}! 👋",
      saved_hint: "Voortgang opgeslagen op dit apparaat.",
      edit_info: "✏️ Mijn gegevens",
      rooms_title: "Kies een ruimte om te inspecteren",
      progress: "{done} / {total} items gecontroleerd",
      level_0: "Klaar voor het avontuur? 🎒",
      level_1: "Beginnende ontdekker 🧭",
      level_2: "Bijna op de top 🏔️",
      level_3: "Hoofdinspecteur 🏆",
      room_done: "Klaar",
      room_todo: "nog {n}",
      finish: "Afronden en versturen 🚀",
      back_rooms: "← Alle ruimtes",
      all_good: "✨ Alles in orde hier",
      next_room: "Volgende ruimte →",
      to_recap: "Naar het overzicht →",
      mobile: "📦 Verplaatsbaar", fixed: "📌 Vast",
      expected: "Verwacht: {n}", free_qty: "Te tellen",
      all_there: "Alles aanwezig",
      missing: "{n} ontbreekt", extra: "{n} extra",
      st_ok: "✅ OK", st_sale: "🧽 Vuil", st_abime: "💔 Beschadigd",
      photo_prompt: "📸 Een foto helpt ons enorm!",
      add_photo: "Foto toevoegen",
      uploading: "Foto uploaden…",
      photo_error: "De foto kon niet worden verzonden.",
      comment_ph: "Details indien nodig",
      recap_title: "Laatste controle",
      recap_checked: "gecontroleerd", recap_missing: "ontbrekend", recap_damaged: "vuil / beschadigd", recap_photos: "foto's",
      recap_incomplete: "Nog niet afgeronde ruimtes: {rooms}.",
      recap_anomalies: "Gemelde punten",
      recap_none: "Geen problemen, top! 🙌",
      send: "Inventaris versturen 🚀",
      sending: "Bezig met versturen…",
      send_error: "Oeps, verzenden mislukt.",
      back: "← Terug",
      done_title: "Bedankt {name}! 🎉",
      done_desc: "Uw inventaris is verzonden. Fijn verblijf in Belle Plagne!",
      new_inv: "Nieuwe inventaris starten",
      confirm_reset: "Deze inventaris wissen en een nieuwe starten?"
    },
    de: {
      loading: "Inventar wird geladen…",
      load_error: "Das Inventar kann gerade nicht geladen werden.",
      retry: "Erneut versuchen",
      id_title: "Wer leitet die Inspektion?",
      id_intro: "Ein paar Angaben zum Start, dann erkunden Sie die Wohnung Raum für Raum.",
      prenom: "Vorname", nom: "Nachname", arrivee: "Ankunft", depart: "Abreise",
      start: "Erkundung starten 🗺️",
      id_error: "Bitte alle Felder ausfüllen.",
      date_error: "Die Abreise muss nach der Ankunft liegen.",
      welcome_back: "Hallo {name}! 👋",
      saved_hint: "Fortschritt auf diesem Gerät gespeichert.",
      edit_info: "✏️ Meine Angaben",
      rooms_title: "Wählen Sie einen Raum",
      progress: "{done} / {total} Gegenstände geprüft",
      level_0: "Bereit fürs Abenteuer? 🎒",
      level_1: "Junger Entdecker 🧭",
      level_2: "Fast am Gipfel 🏔️",
      level_3: "Chefinspektor 🏆",
      room_done: "Fertig",
      room_todo: "noch {n}",
      finish: "Abschließen und senden 🚀",
      back_rooms: "← Alle Räume",
      all_good: "✨ Hier ist alles in Ordnung",
      next_room: "Nächster Raum →",
      to_recap: "Zur Zusammenfassung →",
      mobile: "📦 Beweglich", fixed: "📌 Fest",
      expected: "Erwartet: {n}", free_qty: "Zu zählen",
      all_there: "Alles da",
      missing: "{n} fehlt", extra: "{n} mehr",
      st_ok: "✅ OK", st_sale: "🧽 Schmutzig", st_abime: "💔 Beschädigt",
      photo_prompt: "📸 Ein kurzes Foto hilft uns sehr!",
      add_photo: "Foto hinzufügen",
      uploading: "Foto wird hochgeladen…",
      photo_error: "Das Foto konnte nicht gesendet werden.",
      comment_ph: "Details bei Bedarf",
      recap_title: "Letzte Kontrolle",
      recap_checked: "geprüft", recap_missing: "fehlend", recap_damaged: "schmutzig / beschädigt", recap_photos: "Fotos",
      recap_incomplete: "Noch nicht fertige Räume: {rooms}.",
      recap_anomalies: "Gemeldete Punkte",
      recap_none: "Keine Probleme, bravo! 🙌",
      send: "Inventar senden 🚀",
      sending: "Wird gesendet…",
      send_error: "Hoppla, das Senden ist fehlgeschlagen.",
      back: "← Zurück",
      done_title: "Danke {name}! 🎉",
      done_desc: "Ihr Inventar wurde gesendet. Schönen Aufenthalt in Belle Plagne!",
      new_inv: "Neues Inventar beginnen",
      confirm_reset: "Dieses Inventar löschen und ein neues beginnen?"
    }
  };

  const ROOM_ICONS = [
    ['entr', '🚪'], ['cabine', '🛏️'], ['sdb', '🛁'], ['bain', '🛁'], ['wc', '🛁'], ['séjour', '🛋️'], ['salon', '🛋️'],
    ['terrasse', '☀️'], ['balcon', '☀️'], ['literie', '🛌'], ['vaisselle', '🍽️'], ['électro', '🔌'], ['electro', '🔌'],
    ['cuisine', '🍳'], ['chambre', '🛏️']
  ];

  let rooms = null;
  let allItems = [];
  let loadFailed = false;
  let sending = false;
  let sendError = '';
  let formError = '';
  const pendingUploads = {};
  const photoErrors = {};
  let state = loadDraft() || freshState();

  function freshState() {
    return { view: 'identity', prenom: '', nom: '', arrivee: '', depart: '', room: 0, items: {} };
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? Object.assign(freshState(), JSON.parse(raw)) : null;
    } catch (e) {
      return null;
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function lang() {
    const l = localStorage.getItem('licorne_lang');
    return T[l] ? l : 'fr';
  }

  function t(key, vars) {
    let s = (T[lang()] && T[lang()][key]) || T.fr[key] || key;
    if (vars) Object.keys(vars).forEach(k => { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  }

  function roomName(room) {
    const l = lang();
    if (room && room.names && room.names[l]) return room.names[l];
    return room ? room.name : '';
  }

  function itemName(item) {
    const l = lang();
    if (item && item.names && item.names[l]) return item.names[l];
    return item ? (item.names && item.names.fr ? item.names.fr : item.name) : '';
  }

  function itemRoomName(item) {
    const l = lang();
    if (item && item.roomNames && item.roomNames[l]) return item.roomNames[l];
    return item ? item.room : '';
  }

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function fmtDate(iso) {
    const d = new Date(iso + 'T12:00:00');
    return isNaN(d) ? iso : d.toLocaleDateString(lang() === 'en' ? 'en-GB' : lang(), { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function roomIcon(nameOrRoom) {
    const n = (typeof nameOrRoom === 'object' ? (nameOrRoom.name || '') : String(nameOrRoom || '')).toLowerCase();
    const match = ROOM_ICONS.find(([kw]) => n.includes(kw));
    return match ? match[1] : '📦';
  }

  function record(item) {
    return state.items[item.key] || null;
  }

  function isChecked(item) {
    const r = record(item);
    return !!(r && r.state);
  }

  function currentQty(item) {
    const r = record(item);
    if (r && typeof r.qty === 'number') return r.qty;
    return item.expected;
  }

  function roomStats(room) {
    const done = room.items.filter(isChecked).length;
    return { done, total: room.items.length, complete: done === room.items.length };
  }

  function globalStats() {
    let checked = 0, missing = 0, damaged = 0, photos = 0;
    allItems.forEach(item => {
      const r = record(item);
      if (!r || !r.state) return;
      checked++;
      if (r.state !== 'ok') damaged++;
      photos += (r.photos || []).length;
      const qty = currentQty(item);
      if (item.mobile && item.expected != null && qty != null && qty < item.expected) missing += item.expected - qty;
    });
    return { checked, total: allItems.length, missing, damaged, photos };
  }

  function updateItem(item, patch) {
    const current = state.items[item.key] || { qty: null, state: null, comment: '', photos: [] };
    state.items[item.key] = Object.assign({}, current, patch);
    save();
  }

  function go(view, roomIndex) {
    state.view = view;
    if (roomIndex !== undefined) state.room = roomIndex;
    formError = '';
    sendError = '';
    save();
    render();
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setRooms(list) {
    rooms = list.filter(r => r.items && r.items.length);
    allItems = [];
    rooms.forEach(r => r.items.forEach(i => {
      i.roomNames = r.names;
      allItems.push(i);
    }));
    if (state.room >= rooms.length) state.room = 0;
  }

  async function loadReference() {
    loadFailed = false;
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      setRooms(data.rooms || []);
      localStorage.setItem(REF_CACHE_KEY, JSON.stringify(data.rooms || []));
    } catch (e) {
      const cached = localStorage.getItem(REF_CACHE_KEY);
      if (cached) setRooms(JSON.parse(cached));
      else loadFailed = true;
    }
    render();
  }

  async function compressImage(file) {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
      const scale = Math.min(1, MAX_PHOTO_SIDE / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.82));
      return blob || file;
    } catch (e) {
      return file;
    }
  }

  async function uploadPhotos(item, files) {
    delete photoErrors[item.key];
    for (const file of files) {
      pendingUploads[item.key] = (pendingUploads[item.key] || 0) + 1;
      refreshItem(item);
      try {
        const blob = await compressImage(file);
        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.readAsDataURL(blob);
        });

        const res = await fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify({
            action: "upload_photo",
            base64: base64,
            mimeType: blob.type || 'image/jpeg',
            filename: file.name
          })
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        if (!data.url) throw new Error(data.error || 'no url');
        const url = data.url;
        const r = record(item);
        updateItem(item, { photos: ((r && r.photos) || []).concat(url) });
      } catch (e) {
                photoErrors[item.key] = true;
      }
      pendingUploads[item.key]--;
      refreshItem(item);
    }
  }

  const BTN_PRIMARY = "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 text-[#1b2b48] font-black text-xs sm:text-sm uppercase tracking-wide px-6 py-3.5 rounded-2xl transition shadow-lg disabled:opacity-60";
  const BTN_GHOST = "bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs px-4 py-3 rounded-xl transition";
  const INPUT = "w-full bg-white/95 text-[#1b2b48] font-semibold rounded-2xl px-4 py-3.5 text-sm border-2 border-transparent focus:border-amber-400 outline-none transition";

  function progressBar(done, total) {
    const pct = total ? Math.round((done / total) * 100) : 0;
    return `<div class="h-3 w-full bg-white/10 rounded-full overflow-hidden">
      <div class="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500" style="width:${pct}%"></div>
    </div>`;
  }

  function levelLabel(pct) {
    if (pct >= 100) return t('level_3');
    if (pct >= 50) return t('level_2');
    if (pct > 0) return t('level_1');
    return t('level_0');
  }

  function viewLoading() {
    if (loadFailed) {
      return `<div class="text-center space-y-4 py-8">
        <div class="text-5xl">🏔️</div>
        <p class="text-sm text-slate-200">${t('load_error')}</p>
        <button type="button" data-action="retry-load" class="${BTN_GHOST}">${t('retry')}</button>
      </div>`;
    }
    return `<div class="text-center py-10 space-y-3">
      <div class="text-5xl animate-bounce">🦄</div>
      <p class="text-sm text-slate-300">${t('loading')}</p>
    </div>`;
  }

  function viewIdentity() {
    return `<div class="space-y-5">
      <div class="space-y-2">
        <h4 class="text-lg sm:text-xl font-black text-amber-300">🕵️ ${t('id_title')}</h4>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${t('id_intro')}</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label class="space-y-1.5 block"><span class="text-[11px] font-bold text-slate-300 uppercase tracking-wide">${t('prenom')}</span>
        <input type="text" data-field="prenom" autocomplete="given-name" value="${esc(state.prenom)}" class="${INPUT}"></label>
        <label class="space-y-1.5 block"><span class="text-[11px] font-bold text-slate-300 uppercase tracking-wide">${t('nom')}</span>
        <input type="text" data-field="nom" autocomplete="family-name" value="${esc(state.nom)}" class="${INPUT}"></label>
        <label class="space-y-1.5 block"><span class="text-[11px] font-bold text-slate-300 uppercase tracking-wide">📅 ${t('arrivee')}</span>
        <input type="date" data-field="arrivee" value="${esc(state.arrivee)}" class="${INPUT}"></label>
        <label class="space-y-1.5 block"><span class="text-[11px] font-bold text-slate-300 uppercase tracking-wide">📅 ${t('depart')}</span>
        <input type="date" data-field="depart" value="${esc(state.depart)}" class="${INPUT}"></label>
      </div>
      ${formError ? `<p class="text-xs text-red-300 font-bold">${formError}</p>` : ''}
      <div class="flex justify-end">
        <button type="button" data-action="start" class="${BTN_PRIMARY}">${t('start')}</button>
      </div>
    </div>`;
  }

  function viewRooms() {
    const g = globalStats();
    const pct = g.total ? Math.round((g.checked / g.total) * 100) : 0;
    const cards = rooms.map((room, i) => {
      const s = roomStats(room);
      const ring = s.complete
        ? 'border-emerald-400/60 bg-emerald-500/10'
        : s.done ? 'border-amber-400/50 bg-amber-500/10' : 'border-white/15 bg-white/5';
      return `<button type="button" data-action="open-room" data-room="${i}" class="relative text-left p-4 rounded-2xl border ${ring} hover:bg-white/10 active:scale-95 transition space-y-2">
        ${s.complete ? '<span class="absolute top-2 right-2 text-lg">🏅</span>' : ''}
        <div class="text-3xl">${roomIcon(room.name)}</div>
        <p class="font-black text-white text-sm leading-tight">${esc(roomName(room))}</p>
        <p class="text-[11px] font-bold ${s.complete ? 'text-emerald-300' : 'text-amber-300/90'}">
          ${s.complete ? '✓ ' + t('room_done') : t('room_todo', { n: s.total - s.done })}
        </p>
        <div class="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div class="h-full ${s.complete ? 'bg-emerald-400' : 'bg-amber-400'} rounded-full" style="width:${Math.round((s.done / s.total) * 100)}%"></div>
        </div>
      </button>`;
    }).join('');

    return `<div class="space-y-5">
      <div class="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h4 class="text-lg sm:text-xl font-black text-amber-300">${t('welcome_back', { name: esc(state.prenom) })}</h4>
          <p class="text-[11px] text-slate-400">💾 ${t('saved_hint')}</p>
        </div>
        <button type="button" data-action="edit-identity" class="${BTN_GHOST}">${t('edit_info')}</button>
      </div>
      <div class="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
        <div class="flex items-center justify-between text-xs font-bold">
          <span class="text-white">${levelLabel(pct)}</span>
          <span class="text-amber-300">${pct}%</span>
        </div>
        ${progressBar(g.checked, g.total)}
        <p class="text-[11px] text-slate-400">${t('progress', { done: g.checked, total: g.total })}</p>
      </div>
      <p class="text-xs font-black text-amber-300 uppercase tracking-wider">${t('rooms_title')}</p>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">${cards}</div>
      <div class="flex justify-end pt-2">
        <button type="button" data-action="recap" class="${BTN_PRIMARY}">${t('finish')}</button>
      </div>
    </div>`;
  }

  function chip(index, value, label, active) {
    const styles = {
      ok: 'bg-emerald-500/25 border-emerald-400/70 text-emerald-200',
      sale: 'bg-amber-500/25 border-amber-400/70 text-amber-200',
      abime: 'bg-red-500/25 border-red-400/70 text-red-200'
    };
    const cls = active ? styles[value] + ' shadow-md scale-[1.02]' : 'bg-white/5 border-white/15 text-slate-300 hover:bg-white/10';
    return `<button type="button" data-action="set-state" data-i="${index}" data-value="${value}" class="text-[11px] sm:text-xs font-bold py-2.5 px-1 rounded-xl border transition active:scale-95 ${cls}">${label}</button>`;
  }

  function itemCard(item) {
    const index = allItems.indexOf(item);
    const r = record(item) || {};
    const checked = !!r.state;
    const qty = currentQty(item);
    const damaged = r.state === 'sale' || r.state === 'abime';
    const uploading = pendingUploads[item.key] > 0;

    let qtyBlock = '';
    if (item.mobile) {
      let delta = '';
      if (item.expected != null && qty != null && qty !== item.expected) {
        delta = qty < item.expected
          ? `<span class="text-[11px] font-black text-amber-300 bg-amber-500/15 px-2 py-1 rounded-lg">⚠️ ${t('missing', { n: item.expected - qty })}</span>`
          : `<span class="text-[11px] font-bold text-sky-300 bg-sky-500/15 px-2 py-1 rounded-lg">${t('extra', { n: qty - item.expected })}</span>`;
      }
      qtyBlock = `<div class="flex items-center gap-2 flex-wrap mt-3">
        <div class="flex items-center bg-white/10 rounded-xl overflow-hidden border border-white/15">
          <button type="button" data-action="qty-minus" data-i="${index}" class="w-10 h-10 text-lg font-black text-white hover:bg-white/10 active:bg-white/20">−</button>
          <input type="number" inputmode="numeric" min="0" data-qty="${index}" value="${qty == null ? '' : qty}" placeholder="?" class="w-14 h-10 bg-transparent text-center text-white font-black text-base outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none">
          <button type="button" data-action="qty-plus" data-i="${index}" class="w-10 h-10 text-lg font-black text-white hover:bg-white/10 active:bg-white/20">+</button>
        </div>
        ${item.expected != null && qty !== item.expected ? `<button type="button" data-action="qty-all" data-i="${index}" class="text-[11px] font-bold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-2 rounded-lg border border-emerald-400/30">👌 ${t('all_there')}</button>` : ''}
        ${delta}
      </div>`;
    }

    let photoBlock = '';
    if (damaged) {
      const thumbs = (r.photos || []).map((url, p) => `
        <div class="relative">
          <a href="${esc(url)}" target="_blank" rel="noopener"><img src="${esc(url)}" alt="" class="w-16 h-16 object-cover rounded-xl border border-white/20"></a>
          <button type="button" data-action="remove-photo" data-i="${index}" data-p="${p}" class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-black leading-none">×</button>
        </div>`).join('');
      photoBlock = `<div class="mt-3 bg-black/20 border border-white/10 rounded-xl p-3 space-y-2.5">
        ${!(r.photos || []).length ? `<p class="text-[11px] font-bold text-amber-200">${t('photo_prompt')}</p>` : ''}
        <div class="flex items-center gap-2 flex-wrap">
          ${thumbs}
          <label class="w-16 h-16 rounded-xl border-2 border-dashed border-amber-400/60 text-amber-300 flex flex-col items-center justify-center cursor-pointer hover:bg-amber-500/10 transition text-center" title="${t('add_photo')}">
            <span class="text-xl">${uploading ? '⏳' : '📸'}</span>
            <span class="text-[9px] font-bold leading-tight px-1">${uploading ? '' : '+'}</span>
            <input type="file" accept="image/*" multiple data-photo="${index}" class="hidden">
          </label>
        </div>
        ${uploading ? `<p class="text-[11px] text-slate-300">${t('uploading')}</p>` : ''}
        ${photoErrors[item.key] ? `<p class="text-[11px] text-red-300 font-bold">${t('photo_error')}</p>` : ''}
        <input type="text" data-comment="${index}" value="${esc(r.comment || '')}" placeholder="${esc(t('comment_ph'))}" class="w-full bg-white/90 text-[#1b2b48] text-xs font-medium rounded-xl px-3 py-2.5 outline-none border-2 border-transparent focus:border-amber-400">
      </div>`;
    }

    const border = !checked ? 'border-white/10 bg-white/5'
      : damaged ? 'border-red-400/40 bg-red-500/5'
      : 'border-emerald-400/40 bg-emerald-500/5';

    return `<div id="inv-item-${index}" class="rounded-2xl p-4 border transition ${border}">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="font-bold text-white text-sm leading-snug">${esc(itemName(item))}</p>
          <p class="text-[11px] text-slate-400 mt-0.5">${item.mobile ? t('mobile') : t('fixed')} · ${item.expected != null ? t('expected', { n: item.expected }) : t('free_qty')}</p>
        </div>
        <span class="text-lg shrink-0 transition ${checked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}">${damaged ? '📝' : '✅'}</span>
      </div>
      ${qtyBlock}
      <div class="grid grid-cols-3 gap-2 mt-3">
        ${chip(index, 'ok', t('st_ok'), r.state === 'ok')}
        ${chip(index, 'sale', t('st_sale'), r.state === 'sale')}
        ${chip(index, 'abime', t('st_abime'), r.state === 'abime')}
      </div>
      ${photoBlock}
    </div>`;
  }

  function viewRoom() {
    const room = rooms[state.room];
    const s = roomStats(room);
    const nextIndex = rooms.findIndex((r, i) => i !== state.room && !roomStats(r).complete);

    return `<div class="space-y-4">
      <button type="button" data-action="rooms" class="${BTN_GHOST}">${t('back_rooms')}</button>
      <div class="flex items-center gap-3">
        <span class="text-4xl">${roomIcon(room.name)}</span>
        <div class="flex-1 min-w-0">
          <h4 class="text-lg sm:text-xl font-black text-white uppercase">${esc(roomName(room))}</h4>
          <p class="text-[11px] font-bold text-amber-300" data-room-progress>${t('progress', { done: s.done, total: s.total })}</p>
        </div>
        ${s.complete ? '<span class="text-3xl">🏅</span>' : ''}
      </div>
      <div data-room-bar>${progressBar(s.done, s.total)}</div>
      ${!s.complete ? `<button type="button" data-action="all-good" class="w-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 font-black text-xs sm:text-sm py-3 rounded-2xl transition active:scale-[0.98]">${t('all_good')}</button>` : ''}
      <div class="space-y-3">${room.items.map(itemCard).join('')}</div>
      <div class="flex items-center justify-between gap-3 pt-2 flex-wrap">
        <button type="button" data-action="rooms" class="${BTN_GHOST}">${t('back_rooms')}</button>
        ${nextIndex >= 0
          ? `<button type="button" data-action="open-room" data-room="${nextIndex}" class="${BTN_PRIMARY}">${t('next_room')}</button>`
          : `<button type="button" data-action="recap" class="${BTN_PRIMARY}">${t('to_recap')}</button>`}
      </div>
    </div>`;
  }

  function viewRecap() {
    const g = globalStats();
    const incomplete = rooms.filter(r => !roomStats(r).complete).map(r => esc(roomName(r)));
    const anomalies = allItems.filter(item => {
      const r = record(item);
      if (!r || !r.state) return false;
      const qty = currentQty(item);
      return r.state !== 'ok' || (item.mobile && item.expected != null && qty != null && qty < item.expected);
    }).map(item => {
      const r = record(item);
      const qty = currentQty(item);
      const tags = [];
      if (item.mobile && item.expected != null && qty < item.expected) tags.push(`⚠️ ${t('missing', { n: item.expected - qty })}`);
      if (r.state === 'sale') tags.push(t('st_sale'));
      if (r.state === 'abime') tags.push(t('st_abime'));
      if ((r.photos || []).length) tags.push(`📸 ${r.photos.length}`);
      return `<li class="flex items-start justify-between gap-3 py-2 border-b border-white/5 last:border-0">
        <span class="text-white text-xs"><span class="text-slate-400">${esc(itemRoomName(item))} ·</span> ${esc(itemName(item))}${r.comment ? `<span class="block text-[11px] text-slate-400 italic">${esc(r.comment)}</span>` : ''}</span>
        <span class="text-[11px] font-bold text-amber-200 text-right shrink-0">${tags.join(' · ')}</span>
      </li>`;
    }).join('');

    const stat = (value, label, color) => `<div class="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
      <p class="text-2xl font-black ${color}">${value}</p><p class="text-[10px] uppercase font-bold text-slate-400 tracking-wide">${label}</p></div>`;

    return `<div class="space-y-5">
      <button type="button" data-action="rooms" class="${BTN_GHOST}">${t('back')}</button>
      <h4 class="text-lg sm:text-xl font-black text-amber-300">🧾 ${t('recap_title')}</h4>
      <div class="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-slate-200 space-y-1">
        <p><strong class="text-amber-300">${esc(state.prenom)} ${esc(state.nom)}</strong></p>
        <p>📅 ${esc(fmtDate(state.arrivee))} → ${esc(fmtDate(state.depart))}</p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        ${stat(`${g.checked}/${g.total}`, t('recap_checked'), 'text-emerald-300')}
        ${stat(g.missing, t('recap_missing'), 'text-amber-300')}
        ${stat(g.damaged, t('recap_damaged'), 'text-red-300')}
        ${stat(g.photos, t('recap_photos'), 'text-sky-300')}
      </div>
      ${incomplete.length ? `<p class="text-xs text-amber-200 bg-amber-500/10 border border-amber-400/30 rounded-xl p-3">⏳ ${t('recap_incomplete', { rooms: incomplete.join(', ') })}</p>` : ''}
      <div class="space-y-2">
        <p class="text-xs font-black text-amber-300 uppercase tracking-wider">${t('recap_anomalies')}</p>
        ${anomalies ? `<ul class="bg-white/5 border border-white/10 rounded-2xl px-4 py-1">${anomalies}</ul>` : `<p class="text-sm text-emerald-300 font-bold">${t('recap_none')}</p>`}
      </div>
      ${sendError ? `<div class="text-xs text-red-300 font-bold">${sendError}</div>` : ''}
      <div class="flex justify-end">
        <button type="button" data-action="send" class="${BTN_PRIMARY}" ${sending ? 'disabled' : ''}>${sending ? t('sending') : t('send')}</button>
      </div>
    </div>`;
  }

  function viewDone() {
    return `<div class="text-center space-y-4 py-8">
      <div class="text-6xl animate-bounce">🎉</div>
      <h4 class="text-xl sm:text-2xl font-black text-amber-300">${t('done_title', { name: esc(state.prenom) })}</h4>
      <p class="text-sm text-slate-200 max-w-md mx-auto">${t('done_desc')}</p>
      <button type="button" data-action="reset" class="${BTN_GHOST}">${t('new_inv')}</button>
    </div>`;
  }

  function render() {
    let html;
    if (state.view === 'done') html = viewDone();
    else if (!rooms) html = viewLoading();
    else if (state.view === 'identity') html = viewIdentity();
    else if (state.view === 'room') html = viewRoom();
    else if (state.view === 'recap') html = viewRecap();
    else html = viewRooms();
    root.innerHTML = html;
  }

  function refreshItem(item) {
    const index = allItems.indexOf(item);
    const el = document.getElementById('inv-item-' + index);
    if (!el || state.view !== 'room') return;
    el.outerHTML = itemCard(item);
    const room = rooms[state.room];
    const s = roomStats(room);
    const progress = root.querySelector('[data-room-progress]');
    const bar = root.querySelector('[data-room-bar]');
    if (progress) progress.textContent = t('progress', { done: s.done, total: s.total });
    if (bar) bar.innerHTML = progressBar(s.done, s.total);
    if (s.complete && root.querySelector('[data-action="all-good"]')) render();
  }

  function confetti() {
    const emojis = ['🎉', '❄️', '⭐', '🦄', '🏔️', '✨'];
    for (let i = 0; i < 40; i++) {
      const span = document.createElement('span');
      span.textContent = emojis[i % emojis.length];
      span.style.cssText = `position:fixed;top:-40px;left:${Math.random() * 100}vw;font-size:${18 + Math.random() * 18}px;z-index:100;pointer-events:none;transition:transform ${2 + Math.random() * 2}s ease-in, opacity 4s;`;
      document.body.appendChild(span);
      requestAnimationFrame(() => {
        span.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${window.innerHeight + 80}px) rotate(${Math.random() * 720}deg)`;
        span.style.opacity = '0.2';
      });
      setTimeout(() => span.remove(), 4500);
    }
  }

  function startInventory() {
    ['prenom', 'nom', 'arrivee', 'depart'].forEach(f => {
      const el = root.querySelector(`[data-field="${f}"]`);
      if (el) state[f] = el.value.trim();
    });
    save();
    if (!state.prenom || !state.nom || !state.arrivee || !state.depart) {
      formError = t('id_error');
      return render();
    }
    if (state.depart < state.arrivee) {
      formError = t('date_error');
      return render();
    }
    go('rooms');
  }

  async function send() {
    if (sending) return;
    sending = true;
    sendError = '';
    render();

    const items = allItems.filter(isChecked).map(item => {
      const r = record(item);
      const damaged = r.state !== 'ok';
      return {
        key: item.key,
        qty: item.mobile ? currentQty(item) : item.expected,
        state: r.state,
        comment: damaged ? r.comment || '' : '',
        photos: damaged ? r.photos || [] : []
      };
    });

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ action: "submit_inventory", prenom: state.prenom, nom: state.nom, arrivee: state.arrivee, depart: state.depart, items })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.error) throw new Error(data.error || 'HTTP ' + res.status);
      sending = false;
      go('done');
      confetti();
    } catch (e) {
      sending = false;
      const subject = encodeURIComponent("Inventaire Licorne 416 - " + state.prenom + " " + state.nom);
      const bodyText = items.map(i => {
        if (i.state === 'ok') return null;
        return "- " + i.key + " : " + i.state + (i.comment ? " (" + i.comment + ")" : "");
      }).filter(x => x).join("\n");
      const mailBody = encodeURIComponent("Bonjour Jérôme,\n\nVoici mon inventaire :\n" + (bodyText || "Tout est OK !") + "\n\nBonne journée,\n" + state.prenom);

      sendError = t('send_error') + `<br><br><a href="mailto:jerome.pouteau@gmail.com?subject=${subject}&body=${mailBody}" class="inline-block mt-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-white font-bold text-xs border border-white/20">✉️ L'envoyer par Email à Jérôme</a>`;
      render();
    }
  }

  root.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    const item = btn.dataset.i !== undefined ? allItems[Number(btn.dataset.i)] : null;

    switch (action) {
      case 'retry-load': loadReference(); render(); break;
      case 'start': startInventory(); break;
      case 'edit-identity': go('identity'); break;
      case 'rooms': go('rooms'); break;
      case 'open-room': go('room', Number(btn.dataset.room)); break;
      case 'recap': go('recap'); break;
      case 'send': send(); break;
      case 'reset':
        if (confirm(t('confirm_reset'))) {
          state = freshState();
          save();
          render();
        }
        break;
      case 'all-good':
        rooms[state.room].items.forEach(it => {
          if (!isChecked(it)) updateItem(it, { state: 'ok', qty: it.expected });
        });
        render();
        break;
      case 'set-state': {
        const value = btn.dataset.value;
        const r = record(item);
        updateItem(item, { state: value, qty: r && typeof r.qty === 'number' ? r.qty : item.expected });
        refreshItem(item);
        if (value !== 'ok' && !((record(item).photos || []).length)) {
          const input = root.querySelector(`[data-photo="${allItems.indexOf(item)}"]`);
          if (input) input.click();
        }
        break;
      }
      case 'qty-minus':
      case 'qty-plus':
      case 'qty-all': {
        const r = record(item);
        const base = currentQty(item) == null ? 0 : currentQty(item);
        const qty = action === 'qty-all' ? item.expected : Math.max(0, base + (action === 'qty-plus' ? 1 : -1));
        updateItem(item, { qty, state: (r && r.state) || 'ok' });
        refreshItem(item);
        break;
      }
      case 'remove-photo': {
        const photos = (record(item).photos || []).slice();
        photos.splice(Number(btn.dataset.p), 1);
        updateItem(item, { photos });
        refreshItem(item);
        break;
      }
    }
  });

  root.addEventListener('input', e => {
    const el = e.target;
    if (el.dataset.field) {
      state[el.dataset.field] = el.value;
      save();
    } else if (el.dataset.comment !== undefined) {
      updateItem(allItems[Number(el.dataset.comment)], { comment: el.value });
    }
  });

  root.addEventListener('change', e => {
    const el = e.target;
    if (el.dataset.qty !== undefined) {
      const item = allItems[Number(el.dataset.qty)];
      const r = record(item);
      const parsed = parseInt(el.value, 10);
      updateItem(item, { qty: isNaN(parsed) ? null : Math.max(0, parsed), state: (r && r.state) || 'ok' });
      refreshItem(item);
    } else if (el.dataset.photo !== undefined && el.files && el.files.length) {
      uploadPhotos(allItems[Number(el.dataset.photo)], Array.from(el.files));
    }
  });

  window.invRender = render;

  render();
  loadReference();
})();
