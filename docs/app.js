(function () {
  "use strict";

  var FAVORITES_KEY = "show-de-barber:favorites";
  var CHECKINS_KEY = "show-de-barber:check-ins";
  var RECENT_KEY = "show-de-barber:recent-searches";
  var ONBOARDING_KEY = "show-de-barber:onboarding-complete";

  var BARBERS = [
    { slug: "casa-otavio", name: "Casa Otávio", neighborhood: "Pinheiros", city: "São Paulo", address: "Rua dos Pinheiros, 487", rating: 9.8, reviews: 248, price: 65, distance: 1.2, specialties: ["Fade", "Barba", "Degradê"], cover: "photo-1503951914875-452162b0f3f1", avatar: "photo-1585747860715-2ba37e788b70", verified: true, description: "Um espaço de cuidado e estilo no coração de Pinheiros. Técnica afiada, conversa boa e café passado na hora.", hours: "Ter a sáb · 09h às 20h", phone: "+5511998765432" },
    { slug: "barbearia-navalha", name: "Navalha & Cia.", neighborhood: "Vila Madalena", city: "São Paulo", address: "Rua Harmonia, 122", rating: 9.7, reviews: 186, price: 55, distance: 2.4, specialties: ["Barba completa", "Clássico", "Sobrancelha"], cover: "photo-1621605815971-fbc98d665033", avatar: "photo-1622287162716-f311baa1a2b8", verified: true, description: "Barbearia de bairro com alma, precisão e respeito à tradição. Seu ritual, do seu jeito.", hours: "Seg a sáb · 10h às 21h", phone: "+5511987654321" },
    { slug: "estudio-sete", name: "Estúdio Sete", neighborhood: "Jardins", city: "São Paulo", address: "Alameda Franca, 707", rating: 9.9, reviews: 92, price: 90, distance: 3.8, specialties: ["Degradê", "Design", "Corte autoral"], cover: "photo-1599351431202-1e0f0137899a", avatar: "photo-1503951914875-452162b0f3f1", verified: true, description: "Estética contemporânea e atendimento com hora marcada para quem leva o próprio estilo a sério.", hours: "Seg a sex · 09h às 19h", phone: "+5511976543210" },
    { slug: "barba-brava", name: "Barba Brava", neighborhood: "Moema", city: "São Paulo", address: "Av. Pavão, 362", rating: 9.6, reviews: 157, price: 70, distance: 5.1, specialties: ["Barba", "Fade", "Infantil"], cover: "photo-1512690459411-b9245aed614b", avatar: "photo-1621605815971-fbc98d665033", verified: true, description: "Corte bem feito, cerveja gelada e um time que entende que estilo é coisa pessoal.", hours: "Ter a dom · 10h às 20h", phone: "+5511965432109" },
    { slug: "dom-rafael", name: "Dom Rafael", neighborhood: "Leblon", city: "Rio de Janeiro", address: "Rua Dias Ferreira, 211", rating: 9.8, reviews: 203, price: 85, distance: 0.9, specialties: ["Clássico", "Barba completa", "Navalha"], cover: "photo-1621605815971-fbc98d665033", avatar: "photo-1512690459411-b9245aed614b", verified: true, description: "A barbearia carioca onde a elegância encontra o jeito leve de viver o Rio.", hours: "Seg a sáb · 09h às 20h", phone: "+5521998765432" },
    { slug: "corte-carioca", name: "Corte Carioca", neighborhood: "Botafogo", city: "Rio de Janeiro", address: "Rua Voluntários da Pátria, 190", rating: 9.7, reviews: 118, price: 60, distance: 2.6, specialties: ["Degradê", "Corte infantil", "Design"], cover: "photo-1620331311520-246422fd82f9", avatar: "photo-1622287162716-f311baa1a2b8", verified: false, description: "Cultura de rua, atendimento próximo e muito capricho em cada acabamento.", hours: "Seg a sáb · 10h às 19h", phone: "+5521987654321" },
    { slug: "senhor-barbado", name: "Senhor Barbado", neighborhood: "Savassi", city: "Belo Horizonte", address: "Rua Pernambuco, 845", rating: 9.6, reviews: 74, price: 58, distance: 1.8, specialties: ["Barba", "Fade", "Sobrancelha"], cover: "photo-1621605815971-fbc98d665033", avatar: "photo-1585747860715-2ba37e788b70", verified: true, description: "Um lugar para desacelerar, renovar o visual e sair se sentindo em casa.", hours: "Ter a sáb · 09h às 19h", phone: "+5531998765432" },
    { slug: "o-cavalheiro", name: "O Cavalheiro", neighborhood: "Batel", city: "Curitiba", address: "Al. Dr. Carlos de Carvalho, 810", rating: 9.5, reviews: 67, price: 75, distance: 3.3, specialties: ["Clássico", "Navalha", "Barba"], cover: "photo-1503951914875-452162b0f3f1", avatar: "photo-1599351431202-1e0f0137899a", verified: true, description: "Tradição curitibana, serviço impecável e atenção a cada detalhe.", hours: "Seg a sáb · 09h às 20h", phone: "+5541998765432" },
    { slug: "linha-fina", name: "Linha Fina", neighborhood: "Moinhos de Vento", city: "Porto Alegre", address: "Rua Padre Chagas, 310", rating: 9.4, reviews: 53, price: 68, distance: 2.1, specialties: ["Fade", "Design", "Barba"], cover: "photo-1621605815971-fbc98d665033", avatar: "photo-1621605815971-fbc98d665033", verified: false, description: "Precisão nos traços e personalidade em cada corte. Vem como você é.", hours: "Seg a sáb · 10h às 20h", phone: "+5551998765432" },
    { slug: "black-anchor", name: "Black Anchor", neighborhood: "Batel", city: "Curitiba", address: "Rua Bispo Dom José, 2211", rating: 9.3, reviews: 41, price: 80, distance: 4.2, specialties: ["Barba completa", "Clássico", "Fade"], cover: "photo-1512690459411-b9245aed614b", avatar: "photo-1585747860715-2ba37e788b70", verified: true, description: "Uma experiência premium sem cerimônia, feita por quem domina a navalha.", hours: "Ter a sáb · 10h às 21h", phone: "+5541987654321" },
    { slug: "bigode-club", name: "Bigode Club", neighborhood: "Funcionários", city: "Belo Horizonte", address: "Rua Alagoas, 1540", rating: 9.2, reviews: 38, price: 45, distance: 1.4, specialties: ["Corte infantil", "Fade", "Sobrancelha"], cover: "photo-1620331311520-246422fd82f9", avatar: "photo-1512690459411-b9245aed614b", verified: false, description: "Cortes atuais, preço honesto e aquele papo que melhora qualquer tarde.", hours: "Seg a sáb · 09h às 18h", phone: "+5531987654321" },
    { slug: "santo-corte", name: "Santo Corte", neighborhood: "Pinheiros", city: "São Paulo", address: "Rua Fradique Coutinho, 912", rating: 9.1, reviews: 29, price: 50, distance: 1.7, specialties: ["Degradê", "Corte autoral", "Barba"], cover: "photo-1599351431202-1e0f0137899a", avatar: "photo-1622287162716-f311baa1a2b8", verified: true, description: "Liberdade para testar, profissionais atentos e resultado sem deixar na sorte.", hours: "Ter a sáb · 10h às 20h", phone: "+5511954321098" }
  ];

  var CITIES = [
    { slug: "sao-paulo", name: "São Paulo" },
    { slug: "rio-de-janeiro", name: "Rio de Janeiro" },
    { slug: "belo-horizonte", name: "Belo Horizonte" },
    { slug: "curitiba", name: "Curitiba" },
    { slug: "porto-alegre", name: "Porto Alegre" }
  ];
  var PERIODS = ["semana", "mes", "geral"];
  var PERIOD_LABEL = { semana: "Esta semana", mes: "Este mês", geral: "Geral" };
  var WEEKLY_SCORE = { "casa-otavio": 9.9, "barbearia-navalha": 9.8, "estudio-sete": 9.9, "barba-brava": 9.7, "dom-rafael": 9.9, "corte-carioca": 9.8, "senhor-barbado": 9.7, "o-cavalheiro": 9.6, "linha-fina": 9.5, "black-anchor": 9.4, "bigode-club": 9.4, "santo-corte": 9.3 };
  var MONTHLY_SCORE = { "casa-otavio": 9.8, "barbearia-navalha": 9.8, "estudio-sete": 9.9, "barba-brava": 9.6, "dom-rafael": 9.8, "corte-carioca": 9.7, "senhor-barbado": 9.7, "o-cavalheiro": 9.5, "linha-fina": 9.5, "black-anchor": 9.4, "bigode-club": 9.3, "santo-corte": 9.2 };
  var DAY_INDEX = { Seg: 1, Ter: 2, Qua: 3, Qui: 4, Sex: 5, "Sáb": 6, Dom: 0 };
  var POPULAR = ["Fade", "Pinheiros, São Paulo", "Barba completa", "Rio de Janeiro"];
  var HOME_SPECIALTIES = ["Fade", "Barba", "Degradê", "Clássico", "Design", "Corte infantil"];
  var SEARCH_SPECIALTIES = ["Fade", "Degradê", "Barba", "Barba completa", "Clássico", "Design", "Corte infantil", "Sobrancelha", "Navalha"];
  var QUICK_TAGS = ["Pontualidade", "Atendimento", "Qualidade do corte", "Ambiente", "Preço justo"];
  var GALLERY_WORKS = [
    { image: "photo-1503951914875-452162b0f3f1", type: "Depois", label: "Fade alto" },
    { image: "photo-1621605815971-fbc98d665033", type: "Antes", label: "Antes do degradê" },
    { image: "photo-1599351431202-1e0f0137899a", type: "Depois", label: "Barba e acabamento" },
    { image: "photo-1622287162716-f311baa1a2b8", type: "Vídeo", label: "Finalização na navalha" },
    { image: "photo-1512690459411-b9245aed614b", type: "Antes", label: "Antes do corte" }
  ];
  var GALLERY_FILTERS = ["Todos", "Antes", "Depois", "Vídeos"];
  var TEAM = [
    { name: "Caio Mendes", role: "Barbeiro principal", specialties: "Fade · Design", rating: 9.9, image: "photo-1503951914875-452162b0f3f1" },
    { name: "João Pedro", role: "Barbeiro", specialties: "Clássico · Barba", rating: 9.7, image: "photo-1622287162716-f311baa1a2b8" },
    { name: "André Luiz", role: "Barbeiro", specialties: "Corte autoral · Navalha", rating: 9.8, image: "photo-1585747860715-2ba37e788b70" }
  ];
  var PROFILE_REVIEWS = [
    { name: "Lucas Ferreira", initials: "LF", date: "há 3 dias", score: 10, comment: "O Caio entendeu exatamente o que eu queria e ainda sugeriu um acabamento que fez toda a diferença. Ambiente incrível, café bom e zero pressa. Virei cliente.", tags: ["Qualidade do corte", "Atendimento", "Pontualidade"], reply: "Valeu demais, Lucas! Foi um prazer. Te esperamos para o próximo." },
    { name: "Marina Costa", initials: "MC", date: "há 1 semana", score: 9.8, comment: "Levei meu filho pela primeira vez e foi muito tranquilo. Equipe super atenciosa, ele saiu feliz e já pediu para voltar. Recomendo muito!", tags: ["Corte infantil", "Ambiente", "Atendimento"] },
    { name: "Rafael Lima", initials: "RL", date: "há 2 semanas", score: 9.5, comment: "Acabamento impecável e atendimento no horário. Preço justo pela qualidade, e o espaço é muito bonito sem ser pretensioso.", tags: ["Pontualidade", "Preço justo", "Qualidade do corte"] }
  ];
  var HISTORY = [
    { name: "Casa Otávio", when: "12 set 2026", score: "10,0", comment: "Atendimento impecável. Voltarei!", slug: "casa-otavio" },
    { name: "Dom Rafael", when: "28 ago 2026", score: "9,5", comment: "Corte excelente, ambiente muito bom.", slug: "dom-rafael" },
    { name: "Navalha & Cia.", when: "03 ago 2026", score: "9,0", comment: "Ótimo fade e papo melhor ainda.", slug: "barbearia-navalha" }
  ];
  var DASH_REVIEWS = [
    { name: "Lucas Ferreira", score: "10,0", body: "O Caio entendeu exatamente o que eu queria. Virei cliente." },
    { name: "Marina Costa", score: "9,8", body: "Levei meu filho e foi muito tranquilo. Já pediu para voltar." },
    { name: "Rafael Lima", score: "9,5", body: "Acabamento impecável, atendimento no horário." }
  ];
  var MONTHS = [{ h: "48%", l: "ABR" }, { h: "62%", l: "MAI" }, { h: "56%", l: "JUN" }, { h: "77%", l: "JUL" }, { h: "69%", l: "AGO" }, { h: "92%", l: "SET" }];
  var ONBOARDING = [
    { icon: "scissors", eyebrow: "SEU PRÓXIMO CORTE", title: "Encontre o lugar\ncom a sua cara.", copy: "Explore barbearias por bairro, cidade, especialidade e preço. Veja o trabalho antes de sentar na cadeira." },
    { icon: "star", eyebrow: "OPINIÃO DE QUEM FOI", title: "Avaliações que\nvalem de verdade.", copy: "Notas de 1 a 10, comentários detalhados e fotos feitas por clientes depois do atendimento." },
    { icon: "shield-check", eyebrow: "BADGE OF HONOUR", title: "Excelência que\nnão se compra.", copy: "Nota média 9,5 ou mais e pelo menos 15 avaliações. O selo dourado é conquistado na prática." }
  ];
  var NAV = [
    { href: "/busca", label: "Explorar" },
    { href: "/ranking/sao-paulo", label: "Top 10" },
    { href: "/hall-da-fama", label: "Hall da Fama" },
    { href: "/cliente", label: "Minha área" },
    { href: "/como-funciona", label: "Como funciona" }
  ];

  var ui = {
    menuOpen: false,
    dockOpen: false,
    dockQuery: "",
    onboardingStep: 0,
    home: { specialty: "Todas as especialidades", badgeOnly: false, minRating: "Qualquer nota", maxDistance: "10", maxPrice: "250", openOnly: false, loading: false },
    search: { query: "", city: "Todas as cidades", specialty: "Todas", rating: "0", price: "250", distance: "10", badgeOnly: false, openOnly: false, mapMode: false, selectedSlugs: [], loading: false },
    customerTab: "favorites",
    profile: blankProfile(),
    auth: { name: "", email: "", password: "", notice: "", errors: {} },
    dash: {
      saved: false,
      replied: [],
      replyText: "",
      photoNames: [],
      teamName: "",
      teamSpecialty: "",
      members: [
        { id: 1, name: "Caio Mendes", specialty: "Fade · Design" },
        { id: 2, name: "João Pedro", specialty: "Clássico · Barba" },
        { id: 3, name: "André Luiz", specialty: "Corte autoral · Navalha" }
      ],
      profile: {
        name: "Casa Otávio",
        phone: "(11) 99876-5432",
        whatsapp: "(11) 99876-5432",
        address: "Rua dos Pinheiros, 487",
        specialties: "Fade, Barba, Degradê",
        hours: "Ter a sáb · 09h às 20h",
        about: "Um espaço de cuidado e estilo no coração de Pinheiros."
      }
    }
  };

  var route = { path: "", query: {}, key: "" };
  var renderedKey = null;
  var loadToken = 0;
  var toastSeq = 1;

  function blankProfile() {
    return { bookingOpen: false, bookingSent: false, reviewSent: false, photoName: "", tags: [], score: "9", comment: "", errors: {}, galleryFilter: "Todos", lightbox: null, reported: [] };
  }

  function icon(name, size, opts) {
    opts = opts || {};
    var fill = opts.fill || "none";
    var sw = opts.strokeWidth == null ? 2 : opts.strokeWidth;
    var cls = opts.className ? ' class="' + opts.className + '"' : "";
    var style = opts.color ? ' style="color:' + opts.color + '"' : "";
    var body = (typeof SDB_ICONS !== "undefined" && SDB_ICONS[name]) || "";
    return '<svg' + cls + style + ' xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="' + fill + '" stroke="currentColor" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + "</svg>";
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function imageUrl(id, width) {
    return "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=" + (width || 900) + "&q=85";
  }

  function photo(id, alt, width, eager) {
    return '<img src="' + escapeHtml(imageUrl(id, width)) + '" alt="' + escapeHtml(alt) + '"' + (eager ? "" : ' loading="lazy"') + ">";
  }

  function hasBadge(barber) { return barber.rating >= 9.5 && barber.reviews >= 15; }

  function findBarber(slug) {
    for (var i = 0; i < BARBERS.length; i++) if (BARBERS[i].slug === slug) return BARBERS[i];
    return null;
  }

  function cityNames() {
    var seen = {};
    var names = [];
    BARBERS.forEach(function (barber) {
      if (!seen[barber.city]) { seen[barber.city] = true; names.push(barber.city); }
    });
    return names;
  }

  function isOpenNow(barber, at) {
    at = at || new Date();
    var match = String(barber.hours).match(/^(.*?) · (\d{2})h às (\d{2})h$/);
    if (!match) return false;
    var range = match[1].split(" a ").map(function (day) { return day.charAt(0).toUpperCase() + day.slice(1); });
    if (range.length !== 2) return false;
    var first = DAY_INDEX[range[0]];
    var last = DAY_INDEX[range[1]];
    if (first === undefined || last === undefined) return false;
    var days = [];
    var length = first <= last ? last - first + 1 : (7 - first) + last + 1;
    for (var index = 0; index < length; index++) days.push((first + index) % 7);
    var hour = at.getHours() + at.getMinutes() / 60;
    return days.indexOf(at.getDay()) !== -1 && hour >= Number(match[2]) && hour < Number(match[3]);
  }

  function scoreFor(slug, rating, period) {
    if (period === "semana") return WEEKLY_SCORE[slug] == null ? rating : WEEKLY_SCORE[slug];
    if (period === "mes") return MONTHLY_SCORE[slug] == null ? rating : MONTHLY_SCORE[slug];
    return rating;
  }

  function storageGet(key) { try { return localStorage.getItem(key); } catch (error) { return null; } }
  function storageSet(key, value) { try { localStorage.setItem(key, value); } catch (error) {} }
  function readJson(key, fallback) {
    try {
      var raw = storageGet(key);
      if (raw == null) return fallback;
      var parsed = JSON.parse(raw);
      return parsed == null ? fallback : parsed;
    } catch (error) { return fallback; }
  }
  function readFavorites() {
    var list = readJson(FAVORITES_KEY, []);
    return Array.isArray(list) ? list : [];
  }
  function writeFavorites(list) { storageSet(FAVORITES_KEY, JSON.stringify(list)); }
  function readCheckIns() {
    var list = readJson(CHECKINS_KEY, []);
    return Array.isArray(list) ? list : [];
  }
  function writeCheckIns(list) { storageSet(CHECKINS_KEY, JSON.stringify(list)); }
  function readRecent() {
    var list = readJson(RECENT_KEY, []);
    return Array.isArray(list) ? list.slice(0, 5) : [];
  }
  function isCheckedIn(slug) { return readCheckIns().some(function (record) { return record.slug === slug; }); }
  function ensureCustomerFavorites() {
    if (storageGet(FAVORITES_KEY) === null) writeFavorites(["casa-otavio", "dom-rafael"]);
  }

  function hashTo(path, query) {
    var href = "#" + path;
    var parts = [];
    if (query) Object.keys(query).forEach(function (key) {
      if (query[key] == null || query[key] === "") return;
      parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(query[key]));
    });
    return parts.length ? href + "?" + parts.join("&") : href;
  }

  function safeDecode(value) { try { return decodeURIComponent(String(value).replace(/\+/g, " ")); } catch (error) { return String(value); } }

  function parseRoute() {
    var raw = String(location.hash || "").replace(/^#/, "");
    if (!raw || raw === "/") return { path: "/", query: {}, key: "/" };
    var qIndex = raw.indexOf("?");
    var path = qIndex === -1 ? raw : raw.slice(0, qIndex);
    var qs = qIndex === -1 ? "" : raw.slice(qIndex + 1);
    if (path.charAt(0) !== "/") path = "/" + path;
    if (path.length > 1 && path.charAt(path.length - 1) === "/") path = path.slice(0, -1);
    var query = {};
    if (qs) qs.split("&").forEach(function (part) {
      if (!part) return;
      var eq = part.indexOf("=");
      var key = safeDecode(eq === -1 ? part : part.slice(0, eq));
      var value = safeDecode(eq === -1 ? "" : part.slice(eq + 1));
      query[key] = value;
    });
    return { path: path, query: query, key: path + (qs ? "?" + qs : "") };
  }

  function setPath(path, value) {
    var parts = path.split(".");
    var target = ui;
    for (var i = 0; i < parts.length - 1; i++) target = target[parts[i]];
    target[parts[parts.length - 1]] = value;
  }

  function showToast(message, kind) {
    kind = kind || "success";
    var stack = document.getElementById("toasts");
    if (!stack) return;
    var el = document.createElement("div");
    el.className = "toast toast--" + kind;
    el.setAttribute("role", "status");
    el.innerHTML = icon(kind === "success" ? "check" : "info", 15) + "<span></span><button type=\"button\" aria-label=\"Dispensar notificação\">" + icon("x", 14) + "</button>";
    el.querySelector("span").textContent = message;
    el.querySelector("button").addEventListener("click", function () { el.remove(); });
    stack.appendChild(el);
    var id = toastSeq++;
    el.setAttribute("data-toast", String(id));
    window.setTimeout(function () { if (el.parentNode) el.remove(); }, 3600);
  }

  function startLoading(which, ms) {
    var token = ++loadToken;
    ui[which].loading = true;
    window.setTimeout(function () {
      if (token !== loadToken) return;
      ui[which].loading = false;
      if ((which === "home" && route.path === "/") || (which === "search" && route.path === "/busca")) render();
    }, ms);
  }

  function resetSearchFromRoute() {
    ui.search.query = route.query.q || "";
    ui.search.city = "Todas as cidades";
    ui.search.specialty = "Todas";
    ui.search.rating = "0";
    ui.search.price = "250";
    ui.search.distance = "10";
    ui.search.badgeOnly = route.query.badge === "1";
    ui.search.openOnly = false;
    ui.search.mapMode = route.query.mapa === "1";
    ui.search.selectedSlugs = [];
  }

  function syncRoute() {
    var next = parseRoute();
    var entered = next.key !== route.key;
    route = next;
    if (entered) {
      ui.menuOpen = false;
      ui.dockOpen = false;
      if (route.path === "/") startLoading("home", 450);
      if (route.path === "/busca") {
        resetSearchFromRoute();
        startLoading("search", 350);
      }
      if (route.path.indexOf("/barbearia/") === 0) ui.profile = blankProfile();
      if (route.path === "/login" || route.path === "/cadastro") ui.auth = { name: "", email: "", password: "", notice: "", errors: {} };
    }
    render();
  }

  function go(href) {
    if (location.hash === href) syncRoute();
    else location.hash = href;
  }

  function render() {
    var focus = document.activeElement;
    var focusId = focus && focus.id && document.getElementById("app") && document.getElementById("app").contains(focus) ? focus.id : "";
    var selStart = null;
    var selEnd = null;
    if (focus && focusId && typeof focus.selectionStart === "number") {
      selStart = focus.selectionStart;
      selEnd = focus.selectionEnd;
    }
    var scrollX = window.scrollX;
    var scrollY = window.scrollY;
    var keyChanged = renderedKey !== route.key;
    document.getElementById("app").innerHTML = shell(view());
    document.title = titleFor();
    if (keyChanged) {
      renderedKey = route.key;
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(scrollX, scrollY);
    }
    if (focusId) {
      var next = document.getElementById(focusId);
      if (next) {
        try { next.focus({ preventScroll: true }); } catch (error) { next.focus(); }
        if (selStart != null && next.setSelectionRange) {
          try { next.setSelectionRange(selStart, selEnd); } catch (error) {}
        }
      }
    }
  }

  function titleFor() {
    var path = route.path;
    var suffix = " | Show de Barber";
    if (path === "/") return "Show de Barber — Encontre seu próximo corte";
    if (path === "/busca") return "Explorar" + suffix;
    if (path.indexOf("/barbearia/") === 0) {
      var barber = findBarber(safeDecode(path.split("/")[2] || ""));
      return (barber ? barber.name : "Barbearia") + suffix;
    }
    if (path === "/hall-da-fama") return "Hall da Fama" + suffix;
    if (path.indexOf("/ranking/") === 0) return "Top 10" + suffix;
    if (path === "/comparar") return "Comparar barbearias" + suffix;
    if (path === "/login") return "Entrar" + suffix;
    if (path === "/cadastro") return "Criar conta" + suffix;
    if (path === "/cliente") return "Minha área" + suffix;
    if (path === "/dashboard") return "Painel da barbearia" + suffix;
    if (path === "/como-funciona") return "Como funciona" + suffix;
    return "Página não encontrada" + suffix;
  }

  function view() {
    var path = route.path;
    if (path === "/") return viewHome();
    if (path === "/busca") return viewSearch();
    if (path.indexOf("/barbearia/") === 0) return viewProfile(safeDecode(path.split("/")[2] || ""));
    if (path === "/hall-da-fama") return viewHall();
    if (path.indexOf("/ranking/") === 0) return viewRanking(safeDecode(path.split("/")[2] || ""));
    if (path === "/comparar") return viewCompare();
    if (path === "/login") return viewAuth(false);
    if (path === "/cadastro") return viewAuth(true);
    if (path === "/cliente") return viewCustomer();
    if (path === "/dashboard") return viewDashboard();
    if (path === "/como-funciona") return viewHow();
    return viewNotFound();
  }

  function shell(content) {
    return header() + '<main id="main">' + content + "</main>" + footer();
  }

  function isActive(href) {
    if (href.indexOf("/ranking/") === 0) return route.path.indexOf("/ranking/") === 0;
    return route.path === href;
  }

  function header() {
    var links = NAV.map(function (link) {
      return '<a href="' + hashTo(link.href) + '" class="main-nav__link' + (isActive(link.href) ? " is-active" : "") + '"' + (isActive(link.href) ? ' aria-current="page"' : "") + ">" + link.label + "</a>";
    }).join("");
    return '<header class="site-header"><div class="site-header__inner">' +
      '<a class="brand" href="#/" aria-label="Show de Barber, início"><span class="brand__icon">' + icon("scissors", 19) + "</span><span>SHOW DE <b>BARBER</b><i>ESTILO QUE DEIXA MARCA</i></span></a>" +
      '<button type="button" class="mobile-menu" aria-label="' + (ui.menuOpen ? "Fechar menu" : "Abrir menu") + '" data-action="toggle-menu">' + icon(ui.menuOpen ? "x" : "menu", 21) + "</button>" +
      '<nav class="main-nav' + (ui.menuOpen ? " main-nav--open" : "") + '">' + links +
      '<a href="#/dashboard" class="main-nav__business">Sou barbearia <span>↗</span></a>' +
      '<a href="#/login" class="button button--sm nav-login">Entrar <span>↗</span></a></nav></div></header>';
  }

  function footer() {
    return '<footer class="site-footer"><div class="site-footer__top"><a class="brand brand--footer" href="#/"><span class="brand__icon">' + icon("scissors", 19) + '</span><span>SHOW DE <b>BARBER</b><i>ESTILO QUE DEIXA MARCA</i></span></a><p>O próximo grande corte começa<br>com uma boa escolha.</p></div><div class="site-footer__bottom"><span>© 2026 Show de Barber · Feito para quem leva estilo a sério.</span><div><a href="#/como-funciona">Sobre a plataforma</a><a href="#/hall-da-fama">Hall da Fama</a></div></div></footer>';
  }

  function eyebrow(text, gold) {
    return '<span class="eyebrow' + (gold ? " eyebrow--gold" : "") + '"><span class="eyebrow__line"></span> ' + text + "</span>";
  }

  function btn(label, opts) {
    opts = opts || {};
    var cls = "button" + (opts.variant ? " button--" + opts.variant : "") + (opts.size ? " button--" + opts.size : "") + (opts.className ? " " + opts.className : "");
    var attrs = opts.attrs || "";
    if (opts.href) {
      var external = opts.external ? ' target="_blank" rel="noreferrer"' : "";
      return '<a class="' + cls + '" href="' + opts.href + '"' + external + attrs + ">" + label + "</a>";
    }
    return '<button type="' + (opts.type || "button") + '" class="' + cls + '"' + (opts.disabled ? " disabled" : "") + attrs + ">" + label + "</button>";
  }

  function honourBadge(compact, extra) {
    return '<span class="honour-badge' + (compact ? " honour-badge--compact" : "") + (extra ? " " + extra : "") + '">' + icon("award", compact ? 13 : 15, { strokeWidth: 1.8 }) + "<span>" + (compact ? "HONOUR" : "BADGE OF HONOUR") + "</span></span>";
  }

  function verifiedMark() {
    return '<span class="verified-mark" aria-label="Barbearia verificada">✓</span>';
  }

  function star(size) { return icon("star", size, { fill: "currentColor" }); }

  function openStatus(barber, extra) {
    var open = isOpenNow(barber);
    return '<span class="open-status' + (extra ? " " + extra : "") + (open ? " is-open" : "") + '"' + (extra ? ' aria-live="polite"' : "") + "><i></i>" + (open ? "Aberto agora" : "Fechado agora") + "</span>";
  }

  function options(items, current) {
    return items.map(function (item) {
      var value = item && item.value != null ? item.value : item;
      var label = item && item.label != null ? item.label : item;
      return '<option value="' + escapeHtml(value) + '"' + (String(value) === String(current) ? " selected" : "") + ">" + escapeHtml(label) + "</option>";
    }).join("");
  }

  function skeletons(count) {
    var html = '<div class="barber-grid">';
    for (var i = 0; i < count; i++) html += '<div class="barber-skeleton"><span class="skeleton skeleton-image"></span><span class="skeleton skeleton-title"></span><span class="skeleton skeleton-line"></span><span class="skeleton skeleton-meta"></span></div>';
    return html + "</div>";
  }

  function mapArt(extraClass, label, pins) {
    var roads = "<i></i><i></i><i></i><i></i>" + (pins ? "<i></i>" : "");
    return '<div class="map-art' + (extraClass ? " " + extraClass : "") + '" aria-hidden="true"><div class="map-art__roads">' + roads + "</div>" + (pins || "") + '<div class="map-art__label">' + escapeHtml(label) + "</div></div>";
  }

  function barberCard(barber, opts) {
    opts = opts || {};
    var favorites = readFavorites();
    var favorite = favorites.indexOf(barber.slug) !== -1;
    var badge = hasBadge(barber);
    var compare = "";
    if (opts.compare) {
      var selected = ui.search.selectedSlugs.indexOf(barber.slug) !== -1;
      var disabled = ui.search.selectedSlugs.length >= 3 && !selected;
      compare = '<button type="button" class="card-compare' + (selected ? " is-selected" : "") + '" data-action="toggle-compare" data-slug="' + barber.slug + '"' + (disabled ? " disabled" : "") + ' aria-pressed="' + selected + '">' + icon("scale", 13) + " " + (selected ? "Selecionada" : "Comparar") + "</button>";
    }
    return '<article class="barber-card"><a href="' + hashTo("/barbearia/" + barber.slug) + '" class="barber-card__image">' +
      photo(barber.cover, "Interior da " + barber.name, 800) +
      (badge ? honourBadge(true, "barber-card__badge") : "") +
      openStatus(barber) +
      '<span class="barber-card__price">A partir de <b>R$ ' + barber.price + "</b></span></a>" +
      '<div class="barber-card__body"><div class="barber-card__heading"><div><a href="' + hashTo("/barbearia/" + barber.slug) + '" class="barber-card__name">' + escapeHtml(barber.name) + "</a>" + (barber.verified ? verifiedMark() : "") + '</div><span class="barber-card__rating">' + star(14) + " " + barber.rating.toFixed(1) + "</span></div>" +
      '<p class="barber-card__location">' + icon("map-pin", 13) + " " + escapeHtml(barber.neighborhood) + ", " + escapeHtml(barber.city) + " <span>· " + barber.distance.toFixed(1) + " km</span></p>" +
      '<div class="barber-card__bottom"><span>' + barber.reviews + ' avaliações</span><div class="barber-card__tags">' + barber.specialties.slice(0, 2).map(function (tag) { return "<span>" + escapeHtml(tag) + "</span>"; }).join("") + "</div>" + compare +
      '<button type="button" class="favorite-button' + (favorite ? " is-favorite" : "") + '" aria-label="' + (favorite ? "Remover dos favoritos" : "Adicionar aos favoritos") + '" aria-pressed="' + favorite + '" data-action="toggle-favorite" data-slug="' + barber.slug + '" data-toast="card">' + icon("heart", 17, { fill: favorite ? "currentColor" : "none" }) + "</button></div></div></article>";
  }

  function homeList() {
    return BARBERS.filter(function (barber) {
      var specialty = ui.home.specialty === "Todas as especialidades" || barber.specialties.indexOf(ui.home.specialty) !== -1;
      var badge = !ui.home.badgeOnly || hasBadge(barber);
      var rating = ui.home.minRating === "Qualquer nota" || barber.rating >= Number(ui.home.minRating);
      return specialty && badge && rating && barber.distance <= Number(ui.home.maxDistance) && barber.price <= Number(ui.home.maxPrice) && (!ui.home.openOnly || isOpenNow(barber));
    });
  }

  function suggestionsHtml() {
    if (!ui.dockOpen) return "";
    var query = ui.dockQuery.trim();
    var recent = readRecent().slice(0, 3);
    var suggestions = query ? POPULAR.filter(function (item) { return item.toLowerCase().indexOf(query.toLowerCase()) !== -1; }) : POPULAR.slice();
    var html = '<div class="search-suggestions"><div class="search-suggestions__heading">' + (!query && recent.length ? "BUSCAS RECENTES" : "SUGESTÕES POPULARES") + "</div>";
    if (!query) recent.forEach(function (item) {
      html += '<button type="button" data-action="dock-search" data-value="' + escapeHtml(item) + '">' + icon("clock-3", 14) + "<span>" + escapeHtml(item) + "</span></button>";
    });
    suggestions.forEach(function (item) {
      html += '<button type="button" data-action="dock-search" data-value="' + escapeHtml(item) + '">' + icon("trending-up", 14) + "<span>" + escapeHtml(item) + "</span></button>";
    });
    if (!suggestions.length) html += '<span class="search-suggestions__empty">Pressione Enter para buscar “' + escapeHtml(query) + "”.</span>";
    html += '<button type="button" class="search-suggestions__close" data-action="close-suggestions">Fechar sugestões</button></div>';
    return html;
  }

  function quickFilter(iconName, field, current, items, label) {
    var mark = iconName === "price" ? '<span class="price-filter-mark">R$</span>' : icon(iconName, 15);
    return '<div class="quick-filter">' + mark + '<select id="' + field.replace(/\./g, "-") + '" data-field="' + field + '" aria-label="' + escapeHtml(label) + '">' + options(items, current) + "</select>" + icon("chevron-down", 13) + "</div>";
  }

  function viewHome() {
    var list = homeList();
    var grid = ui.home.loading ? skeletons(6) : (list.length ? '<div class="barber-grid">' + list.slice(0, 6).map(function (barber) { return barberCard(barber); }).join("") + "</div>" : '<div class="empty-state">' + icon("search", 25) + "<b>Nenhum corte por aqui ainda.</b><span>Tente outra busca ou ajuste os filtros.</span></div>");
    var weekly = BARBERS.filter(hasBadge).slice(0, 3).map(function (barber, index) {
      return '<a href="' + hashTo("/barbearia/" + barber.slug) + '" class="weekly-item"><span class="weekly-item__rank">0' + (index + 1) + '</span><div class="weekly-item__image">' + photo(barber.cover, "", 440) + '</div><div class="weekly-item__info"><span class="weekly-item__badge">' + icon("shield-check", 12) + " BADGE OF HONOUR</span><h3>" + escapeHtml(barber.name) + "</h3><span>" + escapeHtml(barber.neighborhood) + " · " + escapeHtml(barber.city) + '</span></div><div class="weekly-item__score"><b>' + barber.rating.toFixed(1) + "</b>" + star(13) + '</div>' + icon("arrow-up-right", 17, { className: "weekly-item__arrow" }) + "</a>";
    }).join("");
    return '<section class="hero"><div class="hero__backdrop"></div><div class="hero__grain"></div><div class="hero__content page-shell"><div class="hero__copy">' +
      eyebrow("A COMUNIDADE DE BARBEARIA DO BRASIL") +
      "<h1>Seu próximo<br>corte tem <em>endereço.</em></h1><p>Trabalho de verdade. Opinião de quem foi.<br class=\"desktop-break\"> Encontre o lugar certo para se sentir você.</p>" +
      '<div class="hero__proof"><div class="avatar-stack"><span>R</span><span>M</span><span>D</span><span>+</span></div><span>Mais de <b>18 mil pessoas</b> encontraram seu corte.</span></div></div>' +
      '<div class="hero__side-note"><span class="hero__side-number">01 — 26</span><span>Curadoria feita<br>pela comunidade</span>' + icon("arrow-down-right", 18) + "</div></div>" +
      '<div class="search-dock page-shell"><form class="search-dock__main" id="dock-form">' + icon("map-pin", 18) +
      '<label for="search-place"><span>ONDE</span><input id="search-place" data-field="dockQuery" value="' + escapeHtml(ui.dockQuery) + '" placeholder="Bairro, cidade ou especialidade" autocomplete="off"></label>' +
      '<button type="submit" aria-label="Pesquisar" class="search-dock__button">' + icon("search", 19) + "<span>Encontrar meu corte</span></button></form>" +
      suggestionsHtml() +
      '<button type="button" data-action="toggle-home-badge" class="search-dock__badge' + (ui.home.badgeOnly ? " is-selected" : "") + '" aria-pressed="' + ui.home.badgeOnly + '"><span class="badge-orbit">' + icon("shield-check", 15) + "</span><span><b>Só Badge of Honour</b><small>Excelência comprovada</small></span><span class=\"switch\"><i></i></span></button></div></section>" +
      onboardingHtml() +
      '<section class="home-section page-shell" id="explorar"><div class="section-heading"><div>' + eyebrow("FEITO PARA O SEU ESTILO") + '<h2>O próximo grande<br class="mobile-break"> corte começa aqui.</h2></div><a href="#/busca" class="text-link">Explorar todas ' + icon("arrow-up-right", 16) + "</a></div>" +
      '<div class="discovery-bar"><span class="discovery-bar__label">' + icon("sliders-horizontal", 15) + " ENCONTRE O SEU</span>" +
      quickFilter("star", "home.minRating", ui.home.minRating, [{ value: "Qualquer nota", label: "Qualquer nota" }, { value: "9.5", label: "9,5 ou mais" }, { value: "9", label: "9,0 ou mais" }], "Nota mínima") +
      quickFilter("sparkles", "home.specialty", ui.home.specialty, ["Todas as especialidades"].concat(HOME_SPECIALTIES), "Especialidade") +
      quickFilter("map-pin", "home.maxDistance", ui.home.maxDistance, [{ value: "10", label: "Até 10 km" }, { value: "5", label: "Até 5 km" }, { value: "3", label: "Até 3 km" }], "Distância") +
      quickFilter("price", "home.maxPrice", ui.home.maxPrice, [{ value: "250", label: "Qualquer preço" }, { value: "60", label: "Até R$ 60" }, { value: "80", label: "Até R$ 80" }], "Preço máximo") +
      '<button type="button" data-action="toggle-home-badge" class="filter-pill' + (ui.home.badgeOnly ? " is-active" : "") + '" aria-pressed="' + ui.home.badgeOnly + '">' + (ui.home.badgeOnly ? icon("check", 14) : icon("shield-check", 14)) + " Badge of Honour</button>" +
      '<button type="button" data-action="toggle-home-open" class="filter-pill' + (ui.home.openOnly ? " is-active" : "") + '" aria-pressed="' + ui.home.openOnly + '">' + icon("clock-3", 14) + ' Aberto agora</button><a href="#/busca" class="discovery-bar__advanced">Mais filtros ' + icon("arrow-right", 14) + "</a></div>" +
      '<div class="results-meta"><span>' + list.length + ' lugares que valem a visita</span><span><span class="live-dot"></span> Atualizado agora</span></div>' + grid +
      '<div class="center-action"><a class="button button--outline" href="#/busca">Ver todos os resultados ' + icon("arrow-right", 16) + "</a></div></section>" +
      '<section class="honour-feature"><div class="honour-feature__grid page-shell"><div class="honour-feature__copy">' + eyebrow("O SELO QUE NÃO SE COMPRA", true) + "<h2>Excelência não<br>precisa de <em>filtro.</em></h2><p>Nota 9,5 ou mais. Pelo menos 15 avaliações reais. A Badge of Honour é conquistada corte a corte — e renovada todos os meses.</p><a class=\"text-link text-link--gold\" href=\"#/hall-da-fama\">Conheça os melhores " + icon("arrow-up-right", 16) + '</a><div class="honour-feature__stats"><div><strong>9,5+</strong><span>NOTA MÍNIMA</span></div><div><strong>15</strong><span>AVALIAÇÕES REAIS</span></div><div><strong>0</strong><span>ATALHOS</span></div></div></div>' +
      '<div class="honour-feature__seal"><div class="seal"><div class="seal__inner">' + icon("shield-check", 35, { strokeWidth: 1.2 }) + "<span>BADGE OF</span><b>HONOUR</b><i>EXCELÊNCIA RECONHECIDA</i></div></div><span class=\"seal-note\">CONQUISTADA, NUNCA COMPRADA</span><div class=\"honour-feature__tick\">" + icon("check", 13) + " Renovação mensal</div></div></div></section>" +
      '<section class="home-section home-section--weekly page-shell"><div class="section-heading"><div>' + eyebrow("A COMUNIDADE ESCOLHEU") + "<h2>Melhores da semana.</h2></div><a href=\"#/hall-da-fama\" class=\"text-link\">Ver Hall da Fama " + icon("arrow-up-right", 16) + '</a></div><div class="weekly-grid">' + weekly + "</div></section>" +
      '<section class="map-teaser"><div class="page-shell map-teaser__inner"><div>' + eyebrow("O BAIRRO, DO SEU JEITO") + "<h2>Tem um bom corte<br>perto de você.</h2><p>Explore barbearias ao redor, compare avaliações e encontre seu próximo lugar favorito.</p>" + btn("Explorar o mapa " + icon("map-pin", 16), { href: "#/busca?mapa=1" }) + "</div>" +
      '<div class="map-art" aria-label="Mapa ilustrativo de barbearias próximas"><div class="map-art__roads"><i></i><i></i><i></i><i></i><i></i></div><span class="map-pin map-pin--one">' + icon("map-pin", 17) + "<b>9,8</b></span><span class=\"map-pin map-pin--two\">" + icon("map-pin", 17) + "<b>9,7</b></span><span class=\"map-pin map-pin--three\">" + icon("map-pin", 17) + '<b>9,5</b></span><span class="map-art__you">VOCÊ ESTÁ AQUI</span><div class="map-art__label">PINHEIROS · SÃO PAULO</div><div class="map-art__zoom">+<br>−</div></div></div></section>' +
      '<section class="final-cta page-shell"><div>' + eyebrow("SUA PRÓXIMA HISTÓRIA COMEÇA AQUI") + "<h2>Um bom corte muda<br><em>o seu dia inteiro.</em></h2></div>" + btn("Encontrar minha barbearia " + icon("arrow-up-right", 17), { href: "#/busca", size: "lg" }) + '<span class="final-cta__index">SHOW DE BARBER / 2026</span></section>';
  }

  function onboardingHtml() {
    if (storageGet(ONBOARDING_KEY)) return "";
    var step = Math.max(0, Math.min(ONBOARDING.length - 1, ui.onboardingStep));
    var slide = ONBOARDING[step];
    var title = slide.title.split("\n").map(function (line) { return escapeHtml(line) + "<br>"; }).join("");
    var dots = ONBOARDING.map(function (item, index) {
      return '<button type="button" data-action="onboarding-goto" data-step="' + index + '" aria-label="Etapa ' + (index + 1) + '"' + (index === step ? ' aria-current="step" class="active"' : "") + "></button>";
    }).join("");
    var nextLabel = step === ONBOARDING.length - 1 ? "Começar a explorar " + icon("check", 15) : "Continuar " + icon("arrow-right", 15);
    return '<div class="onboarding-backdrop"><section class="onboarding" role="dialog" aria-modal="true" aria-labelledby="onboarding-title"><button type="button" class="onboarding__close" data-action="onboarding-skip" aria-label="Fechar apresentação">' + icon("x", 18) + '</button><div class="onboarding__visual"><div class="onboarding__seal">' + icon(slide.icon, 36, { strokeWidth: 1.4, fill: slide.icon === "star" ? "currentColor" : "none" }) + '</div><span>SHOW DE BARBER · 0' + (step + 1) + '/03</span></div><div class="onboarding__content">' + eyebrow(slide.eyebrow, true) + '<h2 id="onboarding-title">' + title + "</h2><p>" + escapeHtml(slide.copy) + '</p><div class="onboarding__dots">' + dots + '</div><div class="onboarding__actions"><button type="button" data-action="onboarding-skip">Pular apresentação</button>' + btn(nextLabel, { attrs: ' data-action="onboarding-next"' }) + "</div></div></section></div>";
  }

  function searchList() {
    var query = ui.search.query.toLowerCase();
    return BARBERS.filter(function (barber) {
      var text = (barber.name + " " + barber.neighborhood + " " + barber.city + " " + barber.specialties.join(" ")).toLowerCase();
      return text.indexOf(query) !== -1 && (ui.search.city === "Todas as cidades" || barber.city === ui.search.city) && (ui.search.specialty === "Todas" || barber.specialties.indexOf(ui.search.specialty) !== -1) && barber.rating >= Number(ui.search.rating) && barber.price <= Number(ui.search.price) && barber.distance <= Number(ui.search.distance) && (!ui.search.badgeOnly || hasBadge(barber)) && (!ui.search.openOnly || isOpenNow(barber));
    });
  }

  function viewSearch() {
    var filtered = searchList();
    var body;
    if (ui.search.mapMode) {
      var pins = filtered.slice(0, 6).map(function (barber, index) {
        var top = 20 + ((index * 17) % 65);
        var left = 14 + ((index * 23) % 72);
        var pinClass = ["one", "two", "three"][index % 3];
        return '<a href="' + hashTo("/barbearia/" + barber.slug) + '" class="map-pin map-pin--' + pinClass + '" style="top:' + top + "%;left:" + left + '%">' + icon("map-pin", 15) + "<b>" + barber.rating.toFixed(1) + "</b></a>";
      }).join("");
      body = '<div class="map-art map-art--large"><div class="map-art__roads"><i></i><i></i><i></i><i></i><i></i></div>' + pins + '<div class="map-art__label">MAPA DE BARBEARIAS · BRASIL</div></div>';
    } else if (ui.search.loading) body = skeletons(6);
    else if (filtered.length) body = '<div class="barber-grid">' + filtered.map(function (barber) { return barberCard(barber, { compare: true }); }).join("") + "</div>";
    else body = '<div class="empty-state">' + icon("search", 25) + "<b>Nenhuma barbearia encontrada.</b><span>Experimente ampliar os filtros da sua busca.</span>" + btn("Limpar filtros", { variant: "outline", attrs: ' data-action="clear-search"' }) + "</div>";
    var selected = ui.search.selectedSlugs;
    var compareBar = !ui.search.mapMode && selected.length ? '<div class="compare-bar"><span>' + icon("scale", 15) + " " + selected.length + ' de 3 barbearias selecionadas</span><button type="button" class="compare-clear" data-action="clear-compare">Limpar</button><a class="' + (selected.length < 2 ? "is-disabled" : "") + '" aria-disabled="' + (selected.length < 2) + '" href="' + (selected.length >= 2 ? hashTo("/comparar", { barbers: selected.join(",") }) : "#/busca") + '">Comparar ' + selected.length + " " + icon("scale", 14) + "</a></div>" : "";
    return '<div class="page-shell inner-page"><div class="page-topline"><a href="#/">Início</a><span>/</span>Explorar barbearias</div><div class="inner-page__intro">' + eyebrow("DO SEU BAIRRO AO SEU PRÓXIMO CORTE") + '<h1 class="page-title">Encontre o seu lugar.</h1><p>Pesquise, compare e escolha com confiança. Cada nota vem de quem sentou na cadeira.</p></div>' +
      '<div class="search-results__bar"><span>' + filtered.length + ' barbearias encontradas</span><div class="search-results__actions"><button type="button" class="filter-pill' + (ui.search.openOnly ? " is-active" : "") + '" aria-pressed="' + ui.search.openOnly + '" data-action="toggle-search-open">Aberto agora</button><button type="button" class="filter-pill" data-action="toggle-map">' + icon("map", 14) + " " + (ui.search.mapMode ? "Ver lista" : "Ver mapa") + "</button></div></div>" +
      '<div class="search-page-layout"><aside class="filter-panel"><h3>' + icon("sliders-horizontal", 15) + ' Filtros</h3><div class="filter-row">' +
      '<div class="filter-group"><h4>Buscar</h4><input id="search-query" type="text" data-field="search.query" value="' + escapeHtml(ui.search.query) + '" placeholder="Nome, bairro, cidade..."></div>' +
      '<div class="filter-group"><h4>Cidade</h4><select data-field="search.city" aria-label="Cidade">' + options(["Todas as cidades"].concat(cityNames()), ui.search.city) + "</select></div>" +
      '<div class="filter-group"><h4>Especialidade</h4><select data-field="search.specialty" aria-label="Especialidade">' + options(["Todas"].concat(SEARCH_SPECIALTIES), ui.search.specialty) + "</select></div>" +
      '<div class="filter-group"><h4>Nota mínima · ' + Number(ui.search.rating).toFixed(1) + '</h4><input type="range" min="0" max="10" step="0.5" data-field="search.rating" value="' + escapeHtml(ui.search.rating) + '" aria-label="Nota mínima"></div>' +
      '<div class="filter-group"><h4>Preço máximo · R$ ' + escapeHtml(ui.search.price) + '</h4><input type="range" min="30" max="250" step="5" data-field="search.price" value="' + escapeHtml(ui.search.price) + '" aria-label="Preço máximo"></div>' +
      '<div class="filter-group"><h4>Distância · até ' + escapeHtml(ui.search.distance) + ' km</h4><input type="range" min="1" max="10" step="1" data-field="search.distance" value="' + escapeHtml(ui.search.distance) + '" aria-label="Distância"></div></div>' +
      '<label class="filter-check"><input type="checkbox" data-field="search.badgeOnly"' + (ui.search.badgeOnly ? " checked" : "") + "> " + icon("shield-check", 14) + " Só Badge of Honour</label></aside>" +
      '<div class="search-results__content">' + body + compareBar + "</div></div></div>";
  }

  function rankRow(barber, index, score) {
    return '<a href="' + hashTo("/barbearia/" + barber.slug) + '" class="hall-rank"><span class="hall-rank__num">' + (index + 1 < 10 ? "0" : "") + (index + 1) + '</span><div class="hall-rank__image">' + photo(barber.cover, "", 320) + '</div><div class="hall-rank__info">' + (hasBadge(barber) ? honourBadge(true) : "") + "<strong>" + escapeHtml(barber.name) + " " + (barber.verified ? verifiedMark() : "") + "</strong><span>" + escapeHtml(barber.neighborhood) + (score == null ? ", " + escapeHtml(barber.city) : "") + " · " + barber.reviews + ' avaliações</span></div><span class="hall-rank__score">' + (score == null ? barber.rating : score).toFixed(1) + " " + star(12) + "</span>" + icon("arrow-up-right", 16, { color: "#85837a" }) + "</a>";
  }

  function viewHall() {
    var selected = route.query.cidade || "Todas as cidades";
    var honorees = BARBERS.filter(hasBadge).filter(function (barber) { return selected === "Todas as cidades" || barber.city === selected; }).sort(function (a, b) { return b.rating - a.rating || b.reviews - a.reviews; });
    var cities = '<a href="#/hall-da-fama" class="' + (selected === "Todas as cidades" ? "active" : "") + '">Brasil</a>' + cityNames().map(function (city) {
      return '<a href="' + hashTo("/hall-da-fama", { cidade: city }) + '" class="' + (selected === city ? "active" : "") + '">' + escapeHtml(city) + "</a>";
    }).join("");
    var list = honorees.length ? honorees.map(function (barber, index) { return rankRow(barber, index, null); }).join("") : '<div class="empty-state">' + star(25) + "<b>Nenhuma casa com o selo por aqui.</b><span>A Badge of Honour aparece com nota 9,5 e pelo menos 15 avaliações.</span></div>";
    return '<section class="hall-hero"><div class="page-shell hall-hero__inner"><div>' + eyebrow("EXCELÊNCIA RECONHECIDA", true) + "<h1>Hall da Fama.</h1><p>Os lugares que fazem tudo com excelência. Conquistaram o selo na cadeira, diante de clientes de verdade.</p></div><span class=\"hall-hero__number\">" + (honorees.length < 10 ? "0" : "") + honorees.length + '</span></div></section><section class="page-shell inner-page"><div class="section-heading"><div>' + eyebrow((selected === "Todas as cidades" ? "BRASIL" : selected.toUpperCase()) + " · SETEMBRO 2026") + "<h2>Os melhores da casa.</h2></div>" + honourBadge(false) + '</div><nav class="city-rank-filter" aria-label="Filtrar ranking por cidade">' + cities + '</nav><div class="weekly-grid">' + list + '</div><div class="hall-explainer"><h3>Não é indicação paga. É reconhecimento.</h3><p>A Badge of Honour é concedida automaticamente a barbearias que mantêm média igual ou superior a 9,5 e pelo menos 15 avaliações válidas. A elegibilidade é recalculada todo mês.</p><a href="#/como-funciona" class="text-link">Entenda os critérios ' + icon("arrow-up-right", 15) + "</a></div></section>";
  }

  function viewRanking(slug) {
    var city = null;
    for (var i = 0; i < CITIES.length; i++) if (CITIES[i].slug === slug) city = CITIES[i];
    if (!city) return viewNotFound();
    var period = PERIODS.indexOf(route.query.periodo) === -1 ? "geral" : route.query.periodo;
    var ranking = BARBERS.filter(function (barber) { return barber.city === city.name; }).sort(function (a, b) {
      return scoreFor(b.slug, b.rating, period) - scoreFor(a.slug, a.rating, period);
    }).slice(0, 10);
    var cityNav = CITIES.map(function (item) {
      return '<a href="' + hashTo("/ranking/" + item.slug, { periodo: period }) + '" class="' + (item.slug === slug ? "active" : "") + '">' + escapeHtml(item.name) + "</a>";
    }).join("");
    var periodNav = PERIODS.map(function (item) {
      return '<a href="' + hashTo("/ranking/" + slug, { periodo: item }) + '" class="' + (period === item ? "active" : "") + '">' + PERIOD_LABEL[item] + "</a>";
    }).join("");
    var rows = ranking.map(function (barber, index) { return rankRow(barber, index, scoreFor(barber.slug, barber.rating, period)); }).join("");
    return '<section class="hall-hero"><div class="page-shell hall-hero__inner"><div>' + eyebrow("RANKING DA COMUNIDADE", true) + "<h1>Top 10 de<br>" + escapeHtml(city.name) + ".</h1><p>As barbearias mais bem avaliadas de " + escapeHtml(city.name) + ', escolhidas por quem já sentou na cadeira.</p></div><span class="hall-hero__number">10</span></div></section><section class="page-shell inner-page"><div class="ranking-controls"><nav class="city-rank-filter" aria-label="Escolher cidade">' + cityNav + '</nav><nav class="period-filter" aria-label="Período do ranking">' + periodNav + '</nav></div><div class="section-heading"><div>' + eyebrow(PERIOD_LABEL[period].toUpperCase() + " · ATUALIZADO AGORA") + '<h2>Quem está fazendo bonito.</h2></div><a href="#/hall-da-fama" class="text-link">Hall da Fama ' + icon("arrow-up-right", 15) + '</a></div><div class="weekly-grid">' + rows + "</div>" + (ranking.length ? "" : '<div class="empty-state">' + star(25) + "<b>Este ranking está chegando.</b><span>Novas barbearias aparecem quando a comunidade avalia.</span></div>") + '<p class="ranking-note">O ranking é calculado com avaliações mockadas para esta demonstração. A Badge of Honour continua seguindo a média geral e o mínimo de 15 avaliações.</p></section>';
  }

  function viewCompare() {
    var slugs = String(route.query.barbers || "").split(",").filter(Boolean).slice(0, 3);
    var selected = slugs.map(findBarber).filter(Boolean);
    if (selected.length < 2) {
      return '<div class="page-shell inner-page"><div class="page-topline"><a href="#/busca">' + icon("arrow-left", 12) + ' Voltar à busca</a></div><div class="empty-state compare-empty">' + star(28) + "<h1>Compare lado a lado.</h1><span>Selecione duas ou três barbearias nos resultados para comparar nota, preço e localização.</span><a href=\"#/busca\" class=\"text-link\">Escolher barbearias " + icon("arrow-up-right", 15) + "</a></div></div>";
    }
    var rows = [
      { label: "Nota da comunidade", render: function (barber) { return '<span class="compare-rating">' + star(14) + " " + barber.rating.toFixed(1) + " <small>" + barber.reviews + " avaliações</small></span>"; } },
      { label: "Badge of Honour", render: function (barber) { return hasBadge(barber) ? honourBadge(true) : '<span class="compare-muted">' + icon("x", 14) + " Ainda não elegível</span>"; } },
      { label: "Preço inicial", render: function (barber) { return "<b>A partir de R$ " + barber.price + "</b>"; } },
      { label: "Distância", render: function (barber) { return "<span>" + icon("map-pin", 13) + " " + barber.distance.toFixed(1) + " km</span>"; } },
      { label: "Funcionamento", render: function (barber) { return openStatus(barber); } },
      { label: "Especialidades", render: function (barber) { return '<span class="compare-specialties">' + escapeHtml(barber.specialties.join(" · ")) + "</span>"; } }
    ];
    var headerCells = selected.map(function (barber) {
      return '<a href="' + hashTo("/barbearia/" + barber.slug) + '" class="compare-barber"><div class="compare-cover">' + photo(barber.cover, "", 500) + "</div><strong>" + escapeHtml(barber.name) + " " + (barber.verified ? verifiedMark() : "") + "</strong><span>" + escapeHtml(barber.neighborhood) + ", " + escapeHtml(barber.city) + '</span><span class="compare-profile-link">Ver perfil ' + icon("arrow-up-right", 12) + "</span></a>";
    }).join("");
    var body = rows.map(function (row) {
      return '<div class="compare-row"><strong>' + row.label + "</strong>" + selected.map(function (barber) { return "<div>" + row.render(barber) + "</div>"; }).join("") + "</div>";
    }).join("");
    return '<div class="page-shell inner-page"><div class="page-topline"><a href="#/busca">' + icon("arrow-left", 12) + ' Voltar à busca</a></div><div class="inner-page__intro">' + eyebrow("ESCOLHA COM MAIS CERTEZA") + '<h1 class="page-title">Lado a lado.</h1><p>Dados públicos, avaliações da comunidade e o seu próximo lugar favorito.</p></div><div class="compare-table" style="--compare-columns:' + selected.length + '"><div class="compare-header"><div class="compare-label">O QUE IMPORTA</div>' + headerCells + "</div>" + body + "</div></div>";
  }

  function galleryPhotos(barber) {
    return [{ image: barber.cover, type: "Depois", label: "Corte da semana" }].concat(GALLERY_WORKS);
  }

  function viewProfile(slug) {
    var barber = findBarber(slug);
    if (!barber) return viewNotFound();
    var badge = hasBadge(barber);
    var favorite = readFavorites().indexOf(barber.slug) !== -1;
    var checked = isCheckedIn(barber.slug);
    var open = isOpenNow(barber);
    var photos = galleryPhotos(barber);
    var visible = photos.map(function (photoItem, index) { return { image: photoItem.image, type: photoItem.type, label: photoItem.label, index: index }; }).filter(function (photoItem) {
      if (ui.profile.galleryFilter === "Todos") return true;
      if (ui.profile.galleryFilter === "Vídeos") return photoItem.type === "Vídeo";
      return photoItem.type === ui.profile.galleryFilter;
    });
    var gallery = '<div class="gallery-toolbar">' + GALLERY_FILTERS.map(function (item) {
      return '<button type="button" class="' + (ui.profile.galleryFilter === item ? "active" : "") + '" data-action="gallery-filter" data-filter="' + escapeHtml(item) + '" aria-pressed="' + (ui.profile.galleryFilter === item) + '">' + escapeHtml(item) + "</button>";
    }).join("") + '</div><div class="gallery">' + visible.map(function (photoItem) {
      return '<button type="button" class="gallery__item" data-action="open-photo" data-index="' + photoItem.index + '" aria-label="' + escapeHtml(photoItem.type + ": " + photoItem.label) + '">' + photo(photoItem.image, photoItem.label + " da " + barber.name, 700) + (photoItem.type === "Vídeo" ? '<span class="gallery__play">' + icon("play", 16, { fill: "currentColor" }) + '</span>' : "") + '<span class="gallery__label">' + (photoItem.type === "Vídeo" ? "VÍDEO" : photoItem.type.toUpperCase()) + "</span></button>";
    }).join("") + "</div>";
    var active = ui.profile.lightbox == null ? null : photos[ui.profile.lightbox];
    var lightbox = "";
    if (active) {
      lightbox = '<div class="lightbox" role="dialog" aria-modal="true" aria-label="' + escapeHtml(active.label + " · " + barber.name) + '"><button type="button" class="lightbox__close" aria-label="Fechar galeria" data-action="close-photo">' + icon("x", 18) + '</button><button type="button" class="lightbox__arrow lightbox__arrow--left" aria-label="Foto anterior" data-action="move-photo" data-step="-1">' + icon("arrow-left", 18) + '</button><div class="lightbox__image">' + photo(active.image, active.label + " da " + barber.name, 1500, true) + '</div><div class="lightbox__caption">' + (active.type === "Vídeo" ? icon("play", 13, { fill: "currentColor" }) : "") + " " + escapeHtml(active.label) + " · " + ((ui.profile.lightbox || 0) + 1) + " de " + photos.length + (active.type === "Vídeo" ? "<span>Prévia demonstrativa</span>" : "") + '</div><button type="button" class="lightbox__arrow lightbox__arrow--right" aria-label="Próxima foto" data-action="move-photo" data-step="1">' + icon("arrow-right", 18) + "</button></div>";
    }
    var team = '<div class="staff-list">' + TEAM.map(function (member) {
      return '<article class="staff-card"><div class="staff-card__avatar">' + photo(member.image, member.name, 100) + "</div><strong>" + escapeHtml(member.name) + "</strong><span>" + escapeHtml(member.role) + "</span><small>" + escapeHtml(member.specialties) + '</small><b class="staff-card__rating">' + star(11) + " " + member.rating.toFixed(1) + "</b></article>";
    }).join("") + "</div>";
    var reviews = PROFILE_REVIEWS.map(function (review) {
      var reported = ui.profile.reported.indexOf(review.name) !== -1;
      return '<article class="review-card"><div class="review-card__top"><div class="review-person"><span class="review-avatar">' + review.initials + "</span><span><strong>" + escapeHtml(review.name) + "</strong><small>" + review.date + ' · Cliente verificado</small></span></div><span class="review-score">' + review.score.toFixed(1) + "</span></div><p>" + escapeHtml(review.comment) + '</p><div class="review-tags">' + review.tags.map(function (tag) { return "<span>" + escapeHtml(tag) + "</span>"; }).join("") + '</div><div class="review-actions"><button type="button" data-action="report-review" data-name="' + escapeHtml(review.name) + '"' + (reported ? " disabled" : "") + ">" + icon("flag", 12) + " " + (reported ? "Reportada" : "Reportar avaliação") + "</button></div>" + (review.reply ? '<div class="barber-reply"><b>Resposta da ' + escapeHtml(barber.name) + "</b>" + escapeHtml(review.reply) + "</div>" : "") + "</article>";
    }).join("");
    var errors = ui.profile.errors || {};
    var form = ui.profile.reviewSent
      ? '<div class="auth-notice">' + icon("check", 15) + " Avaliação registrada no protótipo. Obrigado por fortalecer a comunidade!</div>"
      : '<form id="review-form" data-slug="' + barber.slug + '" novalidate><div class="review-form__field"><label for="score">Sua nota <span>(1 a 10)</span></label><div class="rating-range"><input id="score" type="range" min="1" max="10" step="0.1" data-field="profile.score" value="' + escapeHtml(ui.profile.score) + '"><output>' + Number(ui.profile.score || 0).toFixed(1) + '</output></div></div><div class="review-form__field"><label for="comment">Sua experiência</label><textarea id="comment" data-field="profile.comment" placeholder="O que mais gostou? Como foi o atendimento?">' + escapeHtml(ui.profile.comment) + "</textarea>" + (errors.comment ? '<span class="form-error">' + escapeHtml(errors.comment) + "</span>" : "") + '</div><div class="review-form__field"><label>O que se destacou?</label><div class="review-tags">' + QUICK_TAGS.map(function (tag) {
          var on = ui.profile.tags.indexOf(tag) !== -1;
          return '<button type="button" data-action="toggle-tag" data-tag="' + escapeHtml(tag) + '" class="' + (on ? "selected-review-tag" : "") + '">' + (on ? icon("check", 11) : "") + escapeHtml(tag) + "</button>";
        }).join("") + "</div>" + (errors.tags ? '<span class="form-error">' + escapeHtml(errors.tags) + "</span>" : "") + '</div><div class="review-form__field"><label for="review-photo">Foto do corte (opcional)</label><label class="upload-trigger" for="review-photo">' + icon("upload", 14) + " " + escapeHtml(ui.profile.photoName || "Adicionar foto") + '</label><input id="review-photo" type="file" accept="image/*" hidden></div>' + btn("Enviar avaliação " + icon("arrow-up-right", 14), { type: "submit", className: "review-submit", disabled: !checked }) + "</form>";
    var booking = "";
    if (ui.profile.bookingOpen) {
      var today = new Date();
      var minDate = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");
      booking = '<div class="booking-overlay" role="presentation"><div class="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><h2 id="booking-title">' + (ui.profile.bookingSent ? "Pedido enviado." : "Seu próximo corte.") + "</h2>" + (ui.profile.bookingSent
        ? "<p>Pedido de horário enviado para " + escapeHtml(barber.name) + ". A confirmação chega pelo WhatsApp.</p>" + btn("Fechar", { className: "w-full", attrs: ' data-action="close-booking"' })
        : "<p>Escolha um horário. A barbearia confirma sua reserva em seguida.</p><label for=\"booking-date\">Data</label><input id=\"booking-date\" type=\"date\" min=\"" + minDate + "\"><label for=\"booking-time\">Horário preferido</label><select id=\"booking-time\"><option>09:00</option><option>10:30</option><option>12:00</option><option>14:00</option><option>15:30</option><option>17:00</option><option>18:30</option></select><div class=\"booking-modal__actions\">" + btn("Voltar", { variant: "outline", attrs: ' data-action="close-booking"' }) + btn("Solicitar horário", { attrs: ' data-action="send-booking"' }) + "</div>") + "</div></div>";
    }
    return '<div class="profile-cover">' + photo(barber.cover, "Ambiente da " + barber.name, 1800, true) + '</div><div class="page-shell profile-content"><div class="page-topline"><a href="#/busca">Explorar</a><span>/</span>' + escapeHtml(barber.city) + "<span>/</span>" + escapeHtml(barber.name) + '</div><div class="profile-head"><div class="profile-avatar">' + photo(barber.avatar, "Marca da " + barber.name, 240, true) + '</div><div class="profile-title"><h1>' + escapeHtml(barber.name) + " " + (barber.verified ? verifiedMark() : "") + "</h1><p>" + escapeHtml(barber.neighborhood) + ", " + escapeHtml(barber.city) + " · Barbearia desde 2018</p>" + openStatus(barber, "profile-open-status") + '</div><div class="profile-head__actions">' +
      btn(icon("calendar-days", 15) + " Agendar horário", { attrs: ' data-action="open-booking"' }) +
      btn(icon("message-circle", 15) + " WhatsApp", { variant: "outline", href: "https://wa.me/" + barber.phone, external: true }) +
      btn(icon("check", 15) + " " + (checked ? "Check-in feito" : "Fazer check-in"), { variant: checked ? "subtle" : "outline", attrs: ' data-action="check-in" data-slug="' + barber.slug + '" aria-pressed="' + checked + '"' }) +
      '</div></div><div class="profile-stats"><div class="profile-rating"><strong>' + barber.rating.toFixed(1) + "</strong><span><b>EXCELENTE</b>" + barber.reviews + " avaliações</span></div>" + (badge ? '<div class="profile-stat">' + honourBadge(false) + "<small>CONQUISTADA PELA COMUNIDADE</small></div>" : "") + '<div class="profile-stat"><b>R$ ' + barber.price + "–" + (barber.price + 45) + '</b><small>PREÇO MÉDIO</small></div><div class="profile-stat"><b>' + barber.distance.toFixed(1) + ' km</b><small>DE VOCÊ</small></div><button type="button" class="favorite-button profile-favorite' + (favorite ? " is-favorite" : "") + '" aria-pressed="' + favorite + '" data-action="toggle-favorite" data-slug="' + barber.slug + '" data-toast="profile">' + icon("heart", 18, { fill: favorite ? "currentColor" : "none" }) + " " + (favorite ? "Salvo" : "Salvar") + "</button></div>" +
      '<div class="profile-columns"><div class="profile-main"><section><h2>Sobre a casa</h2><p class="profile-about">' + escapeHtml(barber.description) + ' Cada atendimento é pensado para valorizar o seu estilo, com profissionais que escutam antes de começar e entregam capricho até no último detalhe.</p><div class="specialty-list">' + barber.specialties.concat(["Corte clássico", "Sobrancelha"]).map(function (item) { return "<span>" + escapeHtml(item) + "</span>"; }).join("") + "</div></section><section><h2>Trabalhos recentes</h2>" + gallery + "</section><section><h2>Quem vai cuidar do seu corte</h2>" + team + '</section><section><div class="section-heading"><div><h2>Quem já sentou na cadeira.</h2><p class="profile-about">Avaliações de clientes verificados após o atendimento.</p></div><span class="profile-rating"><strong style="font-size:22px">' + barber.rating.toFixed(1) + "</strong>" + star(14) + "</span></div>" + reviews + '</section><section class="review-form" id="avaliar"><h2>Já veio? Conte como foi.</h2><p>Sua opinião ajuda alguém a encontrar o próximo corte.</p>' + (checked ? "" : '<div class="review-checkin-gate">' + icon("check", 16) + '<span>Faça check-in na barbearia para liberar sua avaliação.</span>' + btn("Fazer check-in", { size: "sm", attrs: ' data-action="check-in" data-slug="' + barber.slug + '"' }) + "</div>") + form + "</section></div>" +
      '<aside class="profile-aside"><h3>Visite a casa</h3><div class="profile-aside__line">' + icon("map-pin", 15) + "<span>" + escapeHtml(barber.address) + "<br>" + escapeHtml(barber.neighborhood) + ", " + escapeHtml(barber.city) + '</span></div><a class="profile-map-link" href="https://maps.google.com/?q=' + encodeURIComponent(barber.address + ", " + barber.city) + '" target="_blank" rel="noreferrer" aria-label="Ver ' + escapeHtml(barber.name) + ' no mapa"><div class="map-art profile-map"><div class="map-art__roads"><i></i><i></i><i></i><i></i></div><span class="map-pin map-pin--one">' + icon("map-pin", 15) + "<b>" + barber.rating.toFixed(1) + "</b></span><div class=\"map-art__label\">" + escapeHtml(barber.neighborhood.toUpperCase()) + " · " + escapeHtml(barber.city.toUpperCase()) + '</div></div></a><div class="profile-aside__line">' + icon("clock-3", 15) + "<span>" + escapeHtml(barber.hours) + '<br><small class="' + (open ? "text-open" : "") + '">' + (open ? "Aberto agora" : "Fechado agora") + ' · horário local</small></span></div><div class="profile-aside__line">' + icon("phone", 15) + "<span>+55 " + escapeHtml(barber.phone.slice(2)) + '</span></div><div class="profile-aside__line">' + icon("users", 15) + "<span>Atendimento com hora marcada</span></div>" +
      btn(icon("check", 15) + " " + (checked ? "Check-in feito" : "Fazer check-in"), { variant: checked ? "subtle" : "outline", className: "w-full", attrs: ' data-action="check-in" data-slug="' + barber.slug + '" aria-pressed="' + checked + '"' }) +
      btn(icon("calendar-days", 15) + " Agendar agora", { className: "w-full", attrs: ' data-action="open-booking"' }) +
      btn(icon("message-circle", 15) + " Chamar no WhatsApp", { variant: "outline", className: "w-full", href: "https://wa.me/" + barber.phone, external: true }) +
      '<a href="#/como-funciona" class="profile-aside__line">' + icon("shield-check", 15) + "<span>Como funciona a Badge of Honour " + icon("arrow-up-right", 12) + "</span></a></aside></div></div>" + lightbox + booking;
  }

  function viewAuth(creating) {
    var errors = ui.auth.errors || {};
    return '<section class="auth-page"><div class="auth-art">' + eyebrow("SHOW DE BARBER", true) + "<h2>Estilo bom é<br>estilo compartilhado.</h2><p>Encontre seu próximo lugar favorito. Ou seja esse lugar.</p></div><div class=\"auth-panel\"><form class=\"auth-form\" id=\"auth-form\" data-mode=\"" + (creating ? "signup" : "login") + "\" novalidate>" + eyebrow("SUA COMUNIDADE, DE UM JEITO NOVO") + "<h1>" + (creating ? "Chega mais." : "Bom ter você de volta.") + "</h1><p>" + (creating ? "Crie sua conta e salve as barbearias que fazem seu estilo." : "Entre para acompanhar seus lugares e avaliações favoritos.") + "</p>" +
      (creating ? '<label for="auth-name">Seu nome</label><input id="auth-name" data-field="auth.name" autocomplete="name" placeholder="Como podemos te chamar?" value="' + escapeHtml(ui.auth.name) + '">' : "") +
      '<label for="auth-email">E-mail</label><input id="auth-email" type="email" data-field="auth.email" autocomplete="email" placeholder="voce@email.com" value="' + escapeHtml(ui.auth.email) + '">' + (errors.email ? '<span class="form-error">' + escapeHtml(errors.email) + "</span>" : "") +
      '<label for="auth-password">Senha</label><input id="auth-password" type="password" data-field="auth.password" autocomplete="' + (creating ? "new-password" : "current-password") + '" placeholder="No mínimo 6 caracteres" value="' + escapeHtml(ui.auth.password) + '">' + (errors.password ? '<span class="form-error">' + escapeHtml(errors.password) + "</span>" : "") +
      btn((creating ? "Criar minha conta" : "Entrar") + " " + icon("arrow-up-right", 15), { type: "submit", className: "w-full" }) +
      '<div class="auth-separator">ou continue com</div><div class="social-login"><button type="button" data-action="auth-social" data-provider="google">G  Google</button><button type="button" data-action="auth-social" data-provider="whatsapp">◉  WhatsApp</button></div>' +
      (ui.auth.notice ? '<div class="auth-notice">' + icon("mail", 13) + " " + escapeHtml(ui.auth.notice) + "</div>" : "") +
      '<div class="auth-switch">' + (creating ? "Já tem uma conta? " : "Ainda não faz parte? ") + '<a href="' + (creating ? "#/login" : "#/cadastro") + '">' + (creating ? "Entre por aqui" : "Criar conta") + "</a></div></form></div></section>";
  }

  function viewCustomer() {
    ensureCustomerFavorites();
    var favoriteSlugs = readFavorites();
    var favorites = BARBERS.filter(function (barber) { return favoriteSlugs.indexOf(barber.slug) !== -1; });
    var tab = ui.customerTab === "history" ? "history" : "favorites";
    var favoritesHtml = favorites.length
      ? '<div class="barber-grid">' + favorites.map(function (barber) { return "<div>" + barberCard(barber) + '<button type="button" class="remove-favorite" data-action="toggle-favorite" data-slug="' + barber.slug + '" data-toast="silent">' + icon("heart", 13) + " Remover dos favoritos</button></div>"; }).join("") + "</div>"
      : '<div class="empty-state">' + icon("heart", 25) + '<b>Seus favoritos aparecem por aqui.</b><a href="#/busca" class="text-link">Explorar barbearias</a></div>';
    var suggestions = BARBERS.filter(function (barber) { return favoriteSlugs.indexOf(barber.slug) === -1 && barber.specialties.indexOf("Fade") !== -1; }).slice(0, 3);
    var history = '<section class="history-list"><h2>Seus últimos cortes.</h2>' + HISTORY.map(function (review) {
      return '<article class="history-item"><span class="history-item__icon">' + icon("calendar-days", 15) + '</span><div><a href="' + hashTo("/barbearia/" + review.slug) + '"><b>' + escapeHtml(review.name) + "</b></a><small>" + review.when + "</small><p>" + escapeHtml(review.comment) + '</p></div><span class="review-score">' + review.score + " " + star(12) + "</span></article>";
    }).join("") + "</section>";
    var panel = tab === "favorites"
      ? '<div class="section-heading"><div><h2>Seus lugares.</h2><p class="profile-about">Barbearias guardadas para o próximo corte.</p></div></div>' + favoritesHtml + '<div class="recommendation-block"><div class="section-heading"><div>' + eyebrow("ESCOLHAS QUE COMBINAM COM VOCÊ") + "<h2>Talvez você curta.</h2></div></div><div class=\"barber-grid\">" + suggestions.map(function (barber) { return barberCard(barber); }).join("") + "</div></div>"
      : history;
    var checkins = readCheckIns();
    var checkinHtml = checkins.length
      ? '<div class="checkin-list">' + checkins.map(function (record) {
          var barber = findBarber(record.slug);
          if (!barber) return "";
          var when = "";
          var date = new Date(record.date);
          if (!isNaN(date.getTime())) when = date.toLocaleDateString("pt-BR");
          return '<article class="checkin-row"><span>' + icon("calendar-check", 16) + '</span><div><a href="' + hashTo("/barbearia/" + barber.slug) + '"><b>' + escapeHtml(barber.name) + "</b></a><small>" + icon("map-pin", 11) + " " + escapeHtml(barber.neighborhood) + ", " + escapeHtml(barber.city) + " · " + when + '</small></div><span class="checkin-verified">Visita confirmada</span></article>';
        }).join("") + "</div>"
      : '<div class="checkin-empty">' + icon("calendar-check", 19) + '<span>Seus check-ins aparecem aqui depois da visita.</span><a href="#/busca">Encontrar uma barbearia</a></div>';
    return '<div class="page-shell inner-page"><div class="dashboard-welcome"><div>' + eyebrow("SUA ÁREA") + '<h1 class="page-title">Bom dia, Rafael.</h1><p class="profile-about">Seu estilo, seus lugares, suas escolhas.</p></div>' + btn("Encontrar barbearias " + icon("arrow-up-right", 15), { variant: "outline", href: "#/busca" }) + '</div><div class="customer-tabs"><button type="button" class="' + (tab === "favorites" ? "active" : "") + '" data-action="customer-tab" data-tab="favorites">' + icon("heart", 14) + " Favoritos <span>" + favorites.length + '</span></button><button type="button" class="' + (tab === "history" ? "active" : "") + '" data-action="customer-tab" data-tab="history">' + icon("calendar-days", 14) + ' Meu histórico <span>3</span></button></div>' + panel + '</div><section class="customer-checkins page-shell"><div class="customer-checkins__heading"><div>' + eyebrow("SUA PRESENÇA NA COMUNIDADE") + '<h2>Check-ins recentes.</h2></div>' + btn(icon("bell", 13) + " Testar notificação", { variant: "outline", size: "sm", attrs: ' data-action="notify-demo"' }) + "</div>" + checkinHtml + "</section>";
  }

  function viewDashboard() {
    var profile = ui.dash.profile;
    var field = function (label, key, extra) {
      return "<label" + (extra || "") + ">" + label + '<input data-field="dash.profile.' + key + '" value="' + escapeHtml(profile[key]) + '"></label>';
    };
    var reviews = DASH_REVIEWS.map(function (review) {
      var published = ui.dash.replied.indexOf(review.name) !== -1;
      var open = ui.dash.replied.indexOf(review.name + "-form") !== -1;
      var reply = published
        ? '<div class="dashboard-inline-reply">' + icon("check", 12) + " Resposta salva: “Obrigado por escolher a gente!”</div>"
        : '<button type="button" data-action="dash-reply" data-name="' + escapeHtml(review.name) + '">' + icon("message-square", 11) + " Responder</button>" + (open ? '<div class="reply-entry"><input data-field="dash.replyText" value="' + escapeHtml(ui.dash.replyText) + '" placeholder="Sua resposta pública..."><button type="button" data-action="dash-publish" data-name="' + escapeHtml(review.name) + '">Publicar</button></div>' : "");
      return '<div class="dashboard-review"><b>' + escapeHtml(review.name) + '</b> <span class="review-score">' + review.score + "</span><p>" + escapeHtml(review.body) + "</p>" + reply + "</div>";
    }).join("");
    var team = ui.dash.members.map(function (member) {
      return '<div class="manage-team-row"><span>' + icon("user-round", 14) + "</span><div><b>" + escapeHtml(member.name) + "</b><small>" + escapeHtml(member.specialty) + '</small></div><button type="button" aria-label="Remover ' + escapeHtml(member.name) + '" data-action="dash-remove" data-id="' + member.id + '">' + icon("trash-2", 13) + "</button></div>";
    }).join("");
    return '<div class="page-shell inner-page"><div class="dashboard-welcome"><div>' + eyebrow("PAINEL DA BARBEARIA") + '<h1 class="page-title">Bom dia, Casa Otávio.</h1><p class="profile-about">Veja como sua comunidade está recebendo o seu trabalho.</p></div>' + honourBadge(false) + '</div><div class="dashboard-grid"><div class="metric-card"><span>Nota média</span><strong>9,8 ' + star(16) + '</strong><small>↑ 0,2 este mês</small></div><div class="metric-card"><span>Avaliações</span><strong>248</strong><small>↑ 18 novas este mês</small></div><div class="metric-card"><span>Visualizações</span><strong>3.842</strong><small>↑ 12% este mês</small></div><div class="metric-card"><span>Posição na região</span><strong>#01</strong><small>Pinheiros · São Paulo</small></div></div><div class="dashboard-layout"><div>' +
      '<section class="dashboard-panel"><h2>Como sua comunidade avalia <span class="panel-caption">ÚLTIMOS 6 MESES</span></h2><div class="chart-bars">' + MONTHS.map(function (month) { return '<i style="height:' + month.h + '" data-label="' + month.l + '"></i>'; }).join("") + '</div><div class="chart-legend"><span><i></i> Nota média · 9,8</span><span>' + icon("trending-up", 12) + " +0,2 no período</span></div></section>" +
      '<section class="dashboard-panel"><h2>Avaliações recentes <span class="new-reviews">3 novas</span></h2>' + reviews + "</section></div><aside>" +
      '<section class="dashboard-panel"><h2>Editar perfil</h2><div class="dashboard-fields">' + field("Nome da barbearia", "name", ' class="span-2"') + field("Telefone", "phone") + field("WhatsApp", "whatsapp") + field("Endereço", "address", ' class="span-2"') + field("Especialidades", "specialties", ' class="span-2"') + field("Horários", "hours", ' class="span-2"') + '<label class="span-2">Sobre<textarea data-field="dash.profile.about">' + escapeHtml(profile.about) + '</textarea></label><label class="span-2">Fotos dos trabalhos<input id="dash-photos" type="file" accept="image/*" multiple></label></div>' + (ui.dash.photoNames.length ? '<span class="photo-caption">' + ui.dash.photoNames.length + " foto(s) selecionada(s)</span>" : "") + btn(icon("save", 13) + " " + (ui.dash.saved ? "Alterações salvas" : "Salvar alterações"), { className: "save-profile", attrs: ' data-action="dash-save"' }) + (ui.dash.saved ? '<span class="save-caption">' + icon("check", 11) + " Perfil atualizado no protótipo</span>" : "") + "</section>" +
      '<section class="dashboard-panel dashboard-badge">' + icon("shield-check", 20) + "<h2>Sua Badge of Honour está ativa.</h2><p>Nota 9,8 e 248 avaliações. Continue fazendo um trabalho incrível.</p><small>PRÓXIMA REVISÃO · 01 OUT 2026</small></section>" +
      '<section class="dashboard-panel region-rank"><h2>Seu ranking na região</h2><b>#1 <span>Pinheiros, São Paulo</span></b><div>' + icon("eye", 13) + " No top 1% da sua cidade</div></section>" +
      '<section class="dashboard-panel"><h2>Equipe profissional</h2><div class="manage-team-list">' + team + '</div><form class="team-add-form" id="team-form"><input aria-label="Nome do profissional" data-field="dash.teamName" value="' + escapeHtml(ui.dash.teamName) + '" placeholder="Nome do profissional"><input aria-label="Especialidades do profissional" data-field="dash.teamSpecialty" value="' + escapeHtml(ui.dash.teamSpecialty) + '" placeholder="Especialidades">' + btn(icon("plus", 14), { type: "submit", size: "sm", attrs: ' aria-label="Adicionar profissional"' }) + "</form></section></aside></div></div>";
  }

  function viewHow() {
    return '<div class="page-shell inner-page"><div class="page-topline"><a href="#/">Início</a><span>/</span>Como funciona</div><section class="how-hero">' + eyebrow("MAIS CONFIANÇA, MENOS ACHISMO") + '<h1 class="page-title">O seu próximo corte,<br><em>sem dúvida.</em></h1><p>A gente aproxima pessoas de boas barbearias. Com trabalhos reais, avaliações de quem foi e um selo que significa alguma coisa.</p></section><div class="how-steps"><article class="how-step"><span>01 / ENCONTRE</span><h3>Descubra no seu ritmo.</h3><p>Busque por bairro, cidade ou especialidade. Compare preços, fotos reais e detalhes antes de escolher.</p></article><article class="how-step"><span>02 / ESCOLHA</span><h3>Confie em quem já foi.</h3><p>Leia avaliações verificadas e veja notas detalhadas sobre corte, atendimento, pontualidade e ambiente.</p></article><article class="how-step"><span>03 / VALORIZE</span><h3>Compartilhe sua experiência.</h3><p>Depois do atendimento, dê sua nota de 1 a 10, conte como foi e ajude a comunidade a escolher melhor.</p></article></div><section class="how-badge"><div class="how-badge__icon">' + icon("shield-check", 30) + "</div><div>" + eyebrow("BADGE OF HONOUR", true) + "<h2>Excelência que se conquista.</h2><p>O selo dourado é atribuído automaticamente. Nenhuma barbearia pode comprar, solicitar ou impulsionar a elegibilidade.</p><div class=\"criteria-list\"><div class=\"criteria-item\"><strong>9,5+</strong><span>Nota média mínima</span></div><div class=\"criteria-item\"><strong>15</strong><span>Avaliações verificadas</span></div><div class=\"criteria-item\"><strong>30 dias</strong><span>Revisão automática</span></div></div></div></section><section class=\"how-values\"><div>" + icon("users", 18) + "<b>Gente de verdade</b><span>Avaliações após experiências reais.</span></div><div>" + star(18) + "<b>Notas detalhadas</b><span>De 1 a 10, com comentário e contexto.</span></div><div>" + icon("check", 18) + "<b>Transparência</b><span>Critérios públicos, iguais para todos.</span></div></section><div class=\"how-end\"><div><h2>Agora, é só encontrar seu lugar.</h2><p>Seu próximo corte favorito está mais perto do que parece.</p></div>" + btn("Explorar barbearias " + icon("arrow-up-right", 15), { href: "#/busca" }) + "</div></div>";
  }

  function viewNotFound() {
    return '<div class="page-shell inner-page not-found"><div class="empty-state">' + icon("search", 25) + '<b>Essa página não está no mapa.</b><span>O link pode ter mudado. Volte para a home ou explore as barbearias.</span><a class="text-link" href="#/">Ir para o início ' + icon("arrow-up-right", 15) + "</a></div></div>";
  }

  function submitDock(value) {
    var clean = String(value != null ? value : ui.dockQuery).trim();
    if (clean) {
      var recent = readRecent().filter(function (item) { return item.toLowerCase() !== clean.toLowerCase(); });
      recent.unshift(clean);
      storageSet(RECENT_KEY, JSON.stringify(recent.slice(0, 5)));
    }
    ui.dockOpen = false;
    ui.dockQuery = clean;
    var query = {};
    if (clean) query.q = clean;
    if (ui.home.badgeOnly) query.badge = "1";
    go(hashTo("/busca", query));
  }

  function toggleFavorite(slug, mode) {
    var list = readFavorites();
    var had = list.indexOf(slug) !== -1;
    writeFavorites(had ? list.filter(function (item) { return item !== slug; }) : list.concat([slug]));
    if (mode !== "silent") {
      var barber = findBarber(slug);
      if (mode === "profile") showToast(had ? "Barbearia removida dos favoritos." : "Barbearia salva nos favoritos.");
      else if (barber) showToast(had ? barber.name + " removida dos favoritos." : barber.name + " salva nos favoritos.");
    }
    render();
  }

  function doCheckIn(slug) {
    var records = readCheckIns().filter(function (record) { return record.slug !== slug; });
    records.unshift({ slug: slug, date: new Date().toISOString() });
    writeCheckIns(records);
    var barber = findBarber(slug);
    showToast("Check-in feito em " + (barber ? barber.name : "barbearia") + ". Agora você pode avaliar sua visita.");
    render();
  }

  function submitReview(slug) {
    var errors = {};
    var score = Number(ui.profile.score);
    if (!(score >= 1 && score <= 10)) errors.score = "Escolha uma nota de 1 a 10.";
    if (String(ui.profile.comment || "").trim().length < 10) errors.comment = "Conte um pouco mais sobre sua experiência (mínimo de 10 caracteres).";
    if (!ui.profile.tags.length) errors.tags = "Escolha pelo menos uma característica do atendimento.";
    ui.profile.errors = errors;
    if (!isCheckedIn(slug)) {
      showToast("Faça check-in na barbearia antes de enviar sua avaliação.", "info");
      render();
      return;
    }
    if (errors.comment || errors.tags || errors.score) { render(); return; }
    ui.profile.reviewSent = true;
    showToast("Sua avaliação foi registrada. Obrigado por compartilhar! ");
    render();
  }

  function submitAuth(creating) {
    var errors = {};
    var email = String(ui.auth.email || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Digite um e-mail válido.";
    if (String(ui.auth.password || "").length < 6) errors.password = "Use pelo menos 6 caracteres.";
    ui.auth.errors = errors;
    if (errors.email || errors.password) { ui.auth.notice = ""; render(); return; }
    ui.auth.notice = "Pronto, " + (creating ? "cadastro" : "acesso") + " simulado para " + email + ". Nenhuma conta real foi criada.";
    render();
  }

  function finishOnboarding() { storageSet(ONBOARDING_KEY, "1"); ui.onboardingStep = 0; render(); }

  function onClick(event) {
    if (event.target.classList && event.target.classList.contains("booking-overlay")) { ui.profile.bookingOpen = false; render(); return; }
    if (event.target.classList && event.target.classList.contains("lightbox")) { ui.profile.lightbox = null; render(); return; }
    var link = event.target.closest ? event.target.closest("a[href^='#']") : null;
    if (link && link.classList.contains("is-disabled")) { event.preventDefault(); return; }
    var el = event.target.closest ? event.target.closest("[data-action]") : null;
    if (!el) {
      if (link) {
        var menuWasOpen = ui.menuOpen;
        ui.menuOpen = false;
        ui.dockOpen = false;
        if (link.getAttribute("href") === location.hash && menuWasOpen) render();
      }
      return;
    }
    var action = el.getAttribute("data-action");
    var slug = el.getAttribute("data-slug");
    if (action === "toggle-menu") { ui.menuOpen = !ui.menuOpen; render(); return; }
    if (action === "toggle-home-badge") { ui.home.badgeOnly = !ui.home.badgeOnly; render(); return; }
    if (action === "toggle-home-open") { ui.home.openOnly = !ui.home.openOnly; render(); return; }
    if (action === "close-suggestions") { ui.dockOpen = false; render(); return; }
    if (action === "dock-search") { submitDock(el.getAttribute("data-value") || ""); return; }
    if (action === "toggle-search-open") { ui.search.openOnly = !ui.search.openOnly; render(); return; }
    if (action === "toggle-map") { ui.search.mapMode = !ui.search.mapMode; render(); return; }
    if (action === "clear-search") { resetSearchFromRoute(); ui.search.query = ""; ui.search.badgeOnly = false; ui.search.mapMode = false; render(); return; }
    if (action === "clear-compare") { ui.search.selectedSlugs = []; render(); return; }
    if (action === "toggle-compare") {
      var selected = ui.search.selectedSlugs;
      var index = selected.indexOf(slug);
      if (index !== -1) selected.splice(index, 1);
      else if (selected.length < 3) selected.push(slug);
      render();
      return;
    }
    if (action === "toggle-favorite") { toggleFavorite(slug, el.getAttribute("data-toast")); return; }
    if (action === "check-in") { doCheckIn(slug); return; }
    if (action === "open-booking") { ui.profile.bookingOpen = true; ui.profile.bookingSent = false; render(); return; }
    if (action === "close-booking") { ui.profile.bookingOpen = false; render(); return; }
    if (action === "send-booking") { ui.profile.bookingSent = true; render(); return; }
    if (action === "toggle-tag") {
      var tag = el.getAttribute("data-tag");
      var at = ui.profile.tags.indexOf(tag);
      if (at === -1) ui.profile.tags.push(tag); else ui.profile.tags.splice(at, 1);
      render();
      return;
    }
    if (action === "gallery-filter") { ui.profile.galleryFilter = el.getAttribute("data-filter"); render(); return; }
    if (action === "open-photo") { ui.profile.lightbox = Number(el.getAttribute("data-index")); render(); return; }
    if (action === "close-photo") { ui.profile.lightbox = null; render(); return; }
    if (action === "move-photo") {
      var total = GALLERY_WORKS.length + 1;
      var current = ui.profile.lightbox || 0;
      ui.profile.lightbox = (current + Number(el.getAttribute("data-step")) + total) % total;
      render();
      return;
    }
    if (action === "report-review") {
      var name = el.getAttribute("data-name");
      if (ui.profile.reported.indexOf(name) === -1) ui.profile.reported.push(name);
      showToast("Recebemos seu reporte e vamos analisar esta avaliação.", "info");
      render();
      return;
    }
    if (action === "customer-tab") { ui.customerTab = el.getAttribute("data-tab") === "history" ? "history" : "favorites"; render(); return; }
    if (action === "notify-demo") { showToast("Casa Otávio respondeu sua avaliação. Sua nota continua em 10,0.", "info"); return; }
    if (action === "auth-social") {
      ui.auth.notice = el.getAttribute("data-provider") === "google" ? "Login Google simulado. A integração OAuth será conectada futuramente." : "Login por WhatsApp simulado. A confirmação será conectada futuramente.";
      render();
      return;
    }
    if (action === "dash-reply") {
      var formKey = el.getAttribute("data-name") + "-form";
      if (ui.dash.replied.indexOf(formKey) === -1) ui.dash.replied.push(formKey);
      else ui.dash.replied = ui.dash.replied.filter(function (item) { return item !== formKey; });
      render();
      return;
    }
    if (action === "dash-publish") {
      var reviewName = el.getAttribute("data-name");
      ui.dash.replied = ui.dash.replied.filter(function (item) { return item !== reviewName + "-form"; });
      if (ui.dash.replied.indexOf(reviewName) === -1) ui.dash.replied.push(reviewName);
      ui.dash.replyText = "";
      render();
      return;
    }
    if (action === "dash-save") {
      ui.dash.saved = true;
      render();
      window.setTimeout(function () { ui.dash.saved = false; if (route.path === "/dashboard") render(); }, 3000);
      return;
    }
    if (action === "dash-remove") {
      var id = Number(el.getAttribute("data-id"));
      var member = null;
      ui.dash.members = ui.dash.members.filter(function (item) { if (item.id === id) member = item; return item.id !== id; });
      showToast((member ? member.name : "Profissional") + " removido da equipe.", "info");
      render();
      return;
    }
    if (action === "onboarding-skip") { finishOnboarding(); return; }
    if (action === "onboarding-goto") { ui.onboardingStep = Number(el.getAttribute("data-step")) || 0; render(); return; }
    if (action === "onboarding-next") {
      if (ui.onboardingStep >= ONBOARDING.length - 1) finishOnboarding();
      else { ui.onboardingStep += 1; render(); }
    }
  }

  function onField(event) {
    var el = event.target;
    if (!el || !el.getAttribute || (el.isConnected === false)) return;
    if (el.type === "file") {
      if (event.type !== "change") return;
      if (el.id === "review-photo") ui.profile.photoName = el.files && el.files[0] ? el.files[0].name : "";
      if (el.id === "dash-photos") ui.dash.photoNames = el.files ? Array.prototype.map.call(el.files, function (file) { return file.name; }) : [];
      render();
      return;
    }
    var field = el.getAttribute("data-field");
    if (!field) return;
    if (el.type === "checkbox" || el.tagName === "SELECT") {
      if (event.type !== "change") return;
    } else if (el.type === "range") {
      setPath(field, el.value);
      var group = el.closest ? el.closest(".filter-group, .rating-range") : null;
      if (group) {
        var heading = group.querySelector("h4");
        var output = group.querySelector("output");
        if (output) output.textContent = Number(el.value).toFixed(1);
        if (heading && field === "search.rating") heading.textContent = "Nota mínima · " + Number(el.value).toFixed(1);
        if (heading && field === "search.price") heading.textContent = "Preço máximo · R$ " + el.value;
        if (heading && field === "search.distance") heading.textContent = "Distância · até " + el.value + " km";
      }
      if (event.type === "change") render();
      return;
    } else if (event.type !== "input") return;
    setPath(field, el.type === "checkbox" ? el.checked : el.value);
    if (field === "dockQuery") ui.dockOpen = true;
    render();
  }

  function onSubmit(event) {
    var form = event.target;
    if (!form || !form.id) return;
    if (form.id === "dock-form") { event.preventDefault(); submitDock(); }
    if (form.id === "review-form") { event.preventDefault(); submitReview(form.getAttribute("data-slug")); }
    if (form.id === "auth-form") { event.preventDefault(); submitAuth(form.getAttribute("data-mode") === "signup"); }
    if (form.id === "team-form") {
      event.preventDefault();
      var name = String(ui.dash.teamName || "").trim();
      var specialty = String(ui.dash.teamSpecialty || "").trim();
      if (!name || !specialty) return;
      ui.dash.members.push({ id: Date.now(), name: name, specialty: specialty });
      ui.dash.teamName = "";
      ui.dash.teamSpecialty = "";
      showToast("Profissional adicionado à equipe.");
      render();
    }
  }

  function onKey(event) {
    if (event.key === "Escape") {
      var dirty = false;
      if (ui.profile.lightbox !== null) { ui.profile.lightbox = null; dirty = true; }
      if (ui.profile.bookingOpen) { ui.profile.bookingOpen = false; dirty = true; }
      if (ui.menuOpen) { ui.menuOpen = false; dirty = true; }
      if (ui.dockOpen) { ui.dockOpen = false; dirty = true; }
      if (route.path === "/" && !storageGet(ONBOARDING_KEY)) { storageSet(ONBOARDING_KEY, "1"); dirty = true; }
      if (dirty) render();
      return;
    }
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    var target = event.target;
    if (target && target.matches && target.matches("input, textarea, select, [contenteditable=true]")) return;
    if (event.key === "/") {
      var search = document.querySelector("#search-place, #search-query");
      if (search) { event.preventDefault(); search.focus(); }
    } else if (event.key === "?") showToast("Atalhos: / foca a busca · Esc fecha menus e janelas.", "info");
  }

  function onFocusIn(event) {
    if (event.target && event.target.id === "search-place" && !ui.dockOpen && route.path === "/") {
      ui.dockOpen = true;
      render();
    }
  }

  document.addEventListener("click", onClick);
  document.addEventListener("input", onField);
  document.addEventListener("change", onField);
  document.addEventListener("submit", onSubmit);
  document.addEventListener("focusin", onFocusIn);
  window.addEventListener("hashchange", syncRoute);
  window.addEventListener("keydown", onKey);
  window.setInterval(function () {
    if (route.path === "/" || route.path === "/busca" || route.path.indexOf("/barbearia/") === 0 || route.path === "/comparar") render();
  }, 30000);
  syncRoute();
})();
