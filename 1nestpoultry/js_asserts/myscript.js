/* ==========================================================
   myscript.js — 1Nest Poultry Farm (Part 3)
   One file shared by every page. Each function first checks
   that its elements exist, so it only runs on the right page.
   ========================================================== */

/* ---------- Product data (shown on services.html) ----------
   Prices come from your Part 2 price tables. Edit freely. */
const products = [
    { name: "Small eggs",    category: "Eggs",    price: 70,  image: "images/Small eggs.jpg", alt: "Tray of fresh eggs",
      description: "Fresh eggs from our free-range hens, in the small size." },
    { name: "Medium eggs",   category: "Eggs",    price: 90,  image: "images/Medium eggs.jpg", alt: "Tray of fresh eggs",
      description: "Fresh eggs from our free-range hens, in the medium size." },
    { name: "Large eggs",    category: "Eggs",    price: 110, image: "images/Tray of eggs.jpg", alt: "Tray of fresh eggs",
      description: "Fresh eggs from our free-range hens, in the large size." },
    { name: "Jumbo eggs",    category: "Eggs",    price: 160, image: "images/Jumbo eggs.jpg", alt: "Tray of fresh eggs",
      description: "Fresh eggs from our free-range hens, in the jumbo size." },
    { name: "Live chicken",  category: "Chicken", price: 110, image: "images/Flock.jpg", alt: "Free-range hens on the farm",
      description: "A live bird raised free range on our farm." },
    { name: "Mixed portion", category: "Chicken", price: 160, image: "images/Mixed portions.jpg", alt: "Fresh chicken on a wooden board",
      description: "A mixed pack of fresh chicken pieces." },
    { name: "Wings",         category: "Chicken", price: 80,  image: "images/Wings.png", alt: "Fresh chicken on a wooden board",
      description: "Fresh chicken wings." },
    { name: "Thighs",        category: "Chicken", price: 90,  image: "images/Thigh.png", alt: "Fresh chicken on a wooden board",
      description: "Fresh chicken thighs." },
    { name: "Breast",        category: "Chicken", price: 70,  image: "images/Breast.jpg", alt: "Fresh chicken on a wooden board",
      description: "Fresh chicken breast." }
];

/* ---------- Helpers ---------- */
function closeOnBackdrop(dialog) {
    // Closes the dialog only when the dark area OUTSIDE the box is clicked
    dialog.addEventListener("click", function (e) {
        const box = dialog.getBoundingClientRect();
        const outside = e.clientX < box.left || e.clientX > box.right ||
                        e.clientY < box.top  || e.clientY > box.bottom;
        if (e.target === dialog && outside) dialog.close();
    });
}

function initDialogs() {
    document.querySelectorAll("dialog").forEach(closeOnBackdrop);
    document.querySelectorAll("[data-close]").forEach(function (btn) {
        btn.addEventListener("click", function () { btn.closest("dialog").close(); });
    });
}

/* ---------- 0. Mobile navigation (all pages) ---------- */
function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;

    function setOpen(open) {
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        nav.classList.toggle("open", open);
    }

    toggle.addEventListener("click", function () {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setOpen(false);
    });
    // If the window is widened to desktop size, reset the menu
    window.matchMedia("(min-width: 769px)").addEventListener("change", function (e) {
        if (e.matches) setOpen(false);
    });
}

/* ---------- 1. Dynamic products + search / filter / sort + modal ---------- */
function initProducts() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    const searchInput = document.getElementById("productSearch");
    const categorySelect = document.getElementById("categoryFilter");
    const sortSelect = document.getElementById("sortProducts");
    const resultCount = document.getElementById("resultCount");
    const modal = document.getElementById("productModal");

    // Build the category dropdown from the data
    [...new Set(products.map(function (p) { return p.category; }))].forEach(function (cat) {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });

    function openModal(p) {
        document.getElementById("modalTitle").textContent = p.name;
        document.getElementById("modalCategory").textContent = p.category;
        document.getElementById("modalDescription").textContent = p.description;
        document.getElementById("modalPrice").textContent = "R" + p.price;
        modal.showModal();
    }

    function createCard(p, index) {
        const card = document.createElement("article");
        card.className = "product-card";
        card.style.animationDelay = (index * 40) + "ms"; // cards fade in one after another

        const img = document.createElement("img");
        img.src = p.image;
        img.alt = p.alt;
        img.loading = "lazy";

        const body = document.createElement("div");
        body.className = "product-card-body";

        const title = document.createElement("h3");
        title.textContent = p.name;
        const category = document.createElement("p");
        category.className = "product-category";
        category.textContent = p.category;
        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = "R" + p.price;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-primary";
        button.textContent = "View details";
        button.addEventListener("click", function () { openModal(p); });

        body.append(title, category, price, button);
        card.append(img, body);
        return card;
    }

    function render() {
        const query = searchInput.value.trim().toLowerCase();
        const category = categorySelect.value;

        // 1. filter
        const list = products.filter(function (p) {
            const matchesCategory = category === "all" || p.category === category;
            const matchesSearch = (p.name + " " + p.description + " " + p.category).toLowerCase().includes(query);
            return matchesCategory && matchesSearch;
        });

        // 2. sort
        const sort = sortSelect.value;
        if (sort === "price-asc")  list.sort(function (a, b) { return a.price - b.price; });
        if (sort === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
        if (sort === "name")       list.sort(function (a, b) { return a.name.localeCompare(b.name); });

        // 3. draw
        grid.replaceChildren();
        list.forEach(function (p, i) { grid.appendChild(createCard(p, i)); });

        resultCount.textContent = list.length + (list.length === 1 ? " product found" : " products found");
        if (list.length === 0) {
            const empty = document.createElement("p");
            empty.className = "no-results";
            empty.textContent = "No products match your search. Try another word or choose All categories.";
            grid.appendChild(empty);
        }
    }

    searchInput.addEventListener("input", render);
    categorySelect.addEventListener("change", render);
    sortSelect.addEventListener("change", render);
    render();
}

/* ---------- 2. Accordion (FAQ) ---------- */
function initAccordion() {
    const buttons = document.querySelectorAll(".accordion-btn");
    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const willOpen = btn.getAttribute("aria-expanded") !== "true";
            // close every item first so only one is open at a time
            buttons.forEach(function (other) {
                other.setAttribute("aria-expanded", "false");
                document.getElementById(other.getAttribute("aria-controls")).classList.remove("open");
            });
            if (willOpen) {
                btn.setAttribute("aria-expanded", "true");
                document.getElementById(btn.getAttribute("aria-controls")).classList.add("open");
            }
        });
    });
}

/* ---------- 3. Gallery with lightbox (about.html) ---------- */
function initGallery() {
    const items = Array.from(document.querySelectorAll(".gallery-item"));
    const lightbox = document.getElementById("lightbox");
    if (items.length === 0 || !lightbox) return;

    const lightboxImg = document.getElementById("lightboxImg");
    const caption = document.getElementById("lightboxCaption");
    let current = 0;

    function show(index) {
        current = (index + items.length) % items.length; // wraps around at both ends
        const thumb = items[current].querySelector("img");
        lightboxImg.src = thumb.src;
        lightboxImg.alt = thumb.alt;
        caption.textContent = thumb.alt;
    }

    items.forEach(function (item, i) {
        item.addEventListener("click", function () { show(i); lightbox.showModal(); });
    });
    document.getElementById("prevImg").addEventListener("click", function () { show(current - 1); });
    document.getElementById("nextImg").addEventListener("click", function () { show(current + 1); });
    lightbox.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") show(current - 1);
        if (e.key === "ArrowRight") show(current + 1);
    });
}

/* ---------- 4. Interactive map with Leaflet (contact.html) ---------- */
function initMap() {
    const mapEl = document.getElementById("map");
    if (!mapEl) return;
    if (typeof L === "undefined") {
        mapEl.textContent = "The map could not load. Please check your internet connection.";
        return;
    }

    // Coordinates taken from the Google Maps embeds used in Part 2
    const places = {
        farm:  { coords: [-24.4884, 29.3518], title: "1Nest Poultry Farm", text: "Farm office, Zebediela, Limpopo" },
        store: { coords: [-24.3590, 29.3200], title: "Central Store",      text: "Zebediela Plaza, Zebediela" }
    };

    const map = L.map("map");
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    Object.keys(places).forEach(function (key) {
        const p = places[key];
        p.marker = L.marker(p.coords).addTo(map)
            .bindPopup("<strong>" + p.title + "</strong><br>" + p.text);
    });

    const bounds = L.latLngBounds([places.farm.coords, places.store.coords]);
    map.fitBounds(bounds, { padding: [40, 40] });

    // Buttons above the map
    const buttons = document.querySelectorAll("[data-location]");
    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            buttons.forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");
            const key = btn.dataset.location;
            if (key === "both") {
                map.closePopup();
                map.flyToBounds(bounds, { padding: [40, 40] });
            } else {
                map.flyTo(places[key].coords, 14);
                places[key].marker.openPopup();
            }
        });
    });
}

/* ---------- 5. Forms: validation helpers ---------- */
const CONTACT_EMAIL = "hello@1nestpoultry.co.za"; // the email is addressed to this recipient
const FORMSPREE_ENDPOINT = ""; // optional: paste your Formspree URL to send by AJAX instead of mailto
const BULK_LIMIT = 50;         // orders above this need manual confirmation (edit to match the farm)

function fieldValue(el) {
    if (el.tagName === "FIELDSET") { const r = el.querySelector("input:checked"); return r ? r.value : ""; }
    if (el.type === "checkbox") return el.checked ? "yes" : "";
    return el.value.trim();
}

function showError(el, message) {
    const wrap = el.closest(".form-field");
    wrap.querySelector(".field-error").textContent = message;
    wrap.classList.toggle("invalid", message !== "");
    wrap.classList.toggle("valid", message === "" && fieldValue(el) !== "");
    if (el.tagName !== "FIELDSET") el.setAttribute("aria-invalid", message ? "true" : "false");
}

// rules = { elementId: function(value) -> error message, or "" when valid }
function setupValidation(rules) {
    const els = Object.keys(rules).map(function (id) { return document.getElementById(id); });
    function check(el) { const msg = rules[el.id](fieldValue(el)); showError(el, msg); return msg === ""; }
    els.forEach(function (el) {
        const instant = el.tagName === "SELECT" || el.tagName === "FIELDSET" || el.type === "checkbox";
        if (instant) {
            el.addEventListener("change", function () { el.dataset.touched = "1"; check(el); });
        } else {
            el.addEventListener("blur", function (e) {
                // If the user is clicking Submit, skip: an error message appearing now would move the button away
                if (e.relatedTarget && e.relatedTarget.type === "submit") return;
                el.dataset.touched = "1"; check(el);
            });
            el.addEventListener("input", function () { if (el.dataset.touched) check(el); });
        }
    });
    return {
        validateAll: function () {
            let first = null;
            els.forEach(function (el) { el.dataset.touched = "1"; if (!check(el) && !first) first = el; });
            if (first) (first.tagName === "FIELDSET" ? first.querySelector("input") : first).focus();
            return !first;
        },
        clear: function () {
            els.forEach(function (el) { delete el.dataset.touched; showError(el, ""); el.closest(".form-field").classList.remove("valid"); });
        }
    };
}

const rules = {
    name: function (v) {
        if (!v) return "Please enter your full name.";
        if (v.length < 2) return "Your name must be at least 2 characters.";
        if (v.length > 60) return "Your name must be 60 characters or fewer.";
        if (!/^[A-Za-z\u00C0-\u00FF' -]+$/.test(v)) return "Use letters, spaces, hyphens and apostrophes only.";
        return "";
    },
    phone: function (v, required) {
        if (!v) return required ? "Please enter your phone number." : "";
        if (!/^(?:\+27|0)[1-9]\d{8}$/.test(v.replace(/[\s()-]/g, ""))) return "Enter a valid South African number, e.g. 072 345 6789 or +27 72 345 6789.";
        return "";
    },
    email: function (v, required) {
        if (!v) return required ? "Please enter your email address." : "";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email address, e.g. you@example.com.";
        return "";
    },
    required: function (v, message) { return v ? "" : message; }
};

function parseDate(v) { const p = v.split("-").map(Number); return new Date(p[0], p[1] - 1, p[2]); }
function isoDate(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }

function makeRow(list, label, value) {
    const dt = document.createElement("dt"); dt.textContent = label;
    const dd = document.createElement("dd"); dd.textContent = value;
    list.append(dt, dd);
}

/* ---------- 6. Enquiry form (enquiries.html): validate, then show cost + availability ---------- */
function initEnquiryForm() {
    const form = document.getElementById("enquiryForm");
    if (!form) return;
    const status = document.getElementById("eqStatus");
    const result = document.getElementById("enquiryResult");
    const productSelect = document.getElementById("eqProduct");
    const dateInput = document.getElementById("eqDate");

    // Product options come from the same data as the services page
    [...new Set(products.map(function (p) { return p.category; }))].forEach(function (cat) {
        const group = document.createElement("optgroup");
        group.label = cat;
        products.forEach(function (p, i) {
            if (p.category !== cat) return;
            const o = document.createElement("option");
            o.value = i; o.textContent = p.name + " - R" + p.price;
            group.appendChild(o);
        });
        productSelect.appendChild(group);
    });

    const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = isoDate(tomorrow);

    const v = setupValidation({
        eqName: function (x) { return rules.name(x); },
        eqPhone: function (x) { return rules.phone(x, true); },
        eqEmail: function (x) { return rules.email(x, false); },
        eqProduct: function (x) { return rules.required(x, "Please choose a product."); },
        eqQty: function (x) {
            if (!x) return "Please enter a quantity.";
            if (!/^\d+$/.test(x)) return "Enter a whole number, e.g. 10.";
            if (Number(x) < 1 || Number(x) > 500) return "Quantity must be between 1 and 500.";
            return "";
        },
        eqMethod: function (x) { return rules.required(x, "Please choose collection or delivery."); },
        eqDate: function (x) {
            if (!x) return "Please choose the date you need your order.";
            const d = parseDate(x), today = new Date(); today.setHours(0, 0, 0, 0);
            if (isNaN(d)) return "Enter a valid date.";
            if (d <= today) return "Choose a date from tomorrow onwards.";
            if ((d - today) / 86400000 > 90) return "Choose a date within the next 90 days.";
            if (d.getDay() === 0) return "We are closed on Sundays. Please choose Monday to Saturday.";
            return "";
        },
        eqNotes: function (x) { return x.length > 300 ? "Notes must be 300 characters or fewer." : ""; }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        status.className = "form-status";
        if (!v.validateAll()) {
            status.textContent = "Please fix the highlighted fields and try again.";
            status.classList.add("error");
            return;
        }
        const p = products[Number(productSelect.value)];
        const qty = Number(document.getElementById("eqQty").value);
        const method = form.querySelector("input[name='method']:checked").value;
        const needed = parseDate(dateInput.value);
        const firstName = document.getElementById("eqName").value.trim().split(" ")[0];

        document.getElementById("resultTitle").textContent = "Thank you, " + firstName + "! Here is your estimate";
        const list = document.getElementById("resultList");
        list.replaceChildren();
        makeRow(list, "Product", p.name + " (" + p.category + ")");
        makeRow(list, "Quantity", String(qty));
        makeRow(list, "Unit price", "R" + p.price);
        makeRow(list, "Estimated total", "R" + (p.price * qty).toLocaleString("en-ZA"));
        makeRow(list, "Needed by", needed.toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
        makeRow(list, "Method", method);
        makeRow(list, "Availability", qty > BULK_LIMIT
            ? "Large order: we will confirm availability within 1-2 business days."
            : "Available. We can prepare this order for your chosen date.");
        document.getElementById("resultNote").textContent = (method === "Delivery"
            ? "Delivery costs are not included and will be confirmed when we contact you. "
            : "Collect from the farm office or central store between 08:00 and 17:00. ") +
            "We will contact you on " + document.getElementById("eqPhone").value.trim() + " to confirm.";
        result.hidden = false;
        status.textContent = "";
        result.focus();
    });

    document.getElementById("newEnquiry").addEventListener("click", function () {
        form.reset(); v.clear(); result.hidden = true; status.className = "form-status";
        document.getElementById("eqName").focus();
    });
}

/* ---------- 7. Contact form (contact.html): validate, then build an email ---------- */
function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    const status = document.getElementById("ctStatus");
    const preview = document.getElementById("emailPreview");
    const message = document.getElementById("ctMessage");
    const counter = document.getElementById("ctCount");
    const submitBtn = form.querySelector(".submit-btn");

    message.addEventListener("input", function () { counter.textContent = message.value.length + " / 1000"; });

    const v = setupValidation({
        ctName: function (x) { return rules.name(x); },
        ctEmail: function (x) { return rules.email(x, true); },
        ctPhone: function (x) { return rules.phone(x, false); },
        ctType: function (x) { return rules.required(x, "Please choose a message type."); },
        ctMessage: function (x) {
            if (!x) return "Please type your message.";
            if (x.length < 20) return "Your message is too short (" + x.length + "/20 characters). Please add more detail.";
            if (x.length > 1000) return "Your message must be 1000 characters or fewer.";
            return "";
        },
        ctConsent: function (x) { return rules.required(x, "Please tick the box so we can contact you."); }
    });

    function showPreview(subject, body) {
        document.getElementById("previewSubject").textContent = subject;
        document.getElementById("previewBody").textContent = body;
        document.getElementById("sendMail").href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        preview.hidden = false;
        preview.focus();
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        status.className = "form-status";
        if (document.getElementById("ctWebsite").value) return; // spam trap: bots fill this hidden field
        if (!v.validateAll()) {
            status.textContent = "Please fix the highlighted fields and try again.";
            status.classList.add("error");
            return;
        }
        const data = {
            name: document.getElementById("ctName").value.trim(),
            email: document.getElementById("ctEmail").value.trim(),
            phone: document.getElementById("ctPhone").value.trim(),
            type: document.getElementById("ctType").value,
            message: message.value.trim()
        };
        const subject = "Website message: " + data.type + " - " + data.name;
        const body = ["Name: " + data.name, "Email: " + data.email, "Phone: " + (data.phone || "Not provided"),
                      "Message type: " + data.type, "", "Message:", data.message].join("\n");

        if (FORMSPREE_ENDPOINT) {
            // AJAX submission: the page does not reload
            submitBtn.disabled = true;
            status.textContent = "Sending...";
            status.classList.add("success");
            fetch(FORMSPREE_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
                .then(function (r) { if (!r.ok) throw new Error("failed"); status.textContent = "Thank you! Your message has been sent."; form.reset(); v.clear(); })
                .catch(function () { status.className = "form-status error"; status.textContent = "Sending failed. Use the email below instead."; showPreview(subject, body); })
                .finally(function () { submitBtn.disabled = false; });
        } else {
            status.textContent = "Your email is ready below. Press Send email to finish.";
            status.classList.add("success");
            showPreview(subject, body);
        }
    });

    document.getElementById("copyEmail").addEventListener("click", function () {
        const text = "To: " + CONTACT_EMAIL + "\nSubject: " + document.getElementById("previewSubject").textContent + "\n\n" + document.getElementById("previewBody").textContent;
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(function () { status.textContent = "Email text copied."; });
    });
}

/* ---------- Start everything once the page has loaded ---------- */
document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initDialogs();
    initProducts();
    initAccordion();
    initGallery();
    initMap();
    initEnquiryForm();
    initContactForm();
});