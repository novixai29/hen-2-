"use strict";


/* ==========================================================
   نقش الحنة — HENNA TRACE

   عدّل بيانات الدعوة من هذا القسم فقط
========================================================== */

const eventConfig = {

  fatherName: "كريم جاسم",

  groomName: "علي",

  dayName: "الجمعة",

  dateText: "30 أكتوبر 2026",

  dateDay: "30",

  dateMonth: "أكتوبر",

  dateYear: "2026",

  timeText: "7:00 مساءً",

  venue: "قاعة النخيل",

  city: "بغداد",

  address: "بغداد - شارع فلسطين",

  /*
    توقيت العراق +03:00
  */
  eventDate: "2026-10-30T19:00:00+03:00",

  /*
    مدة الموعد داخل ملف Calendar
  */
  eventDurationHours: 4,

  /*
    ضع رابط Google Maps الحقيقي هنا
  */
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Baghdad",

  /*
    إذا تركته فارغاً يستخدم رابط الصفحة الحالية
  */
  invitationUrl: "",

  calendarTitle:
    "حنة علي",

  calendarDescription:
    "يسر السيد كريم جاسم دعوتكم لحضور ليلة حنة ابنه علي ومشاركتنا فرحة هذه الليلة."

};


/* ==========================================================
   READY
========================================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    applyInvitationData();

    setupIntro();

    setupRevealAnimations();

    setupHennaPath();

    setupCountdown();

    setupMap();

    setupCalendar();

    setupShare();

  }
);


/* ==========================================================
   APPLY DATA
========================================================== */

function applyInvitationData() {

  const elements =
    document.querySelectorAll(
      "[data-bind]"
    );


  elements.forEach((element) => {

    const key =
      element.dataset.bind;


    if (key === "fatherFull") {

      element.textContent =
        `السيد ${eventConfig.fatherName}`;

      return;

    }


    if (
      Object.prototype.hasOwnProperty.call(
        eventConfig,
        key
      )
    ) {

      element.textContent =
        eventConfig[key];

    }

  });


  document.title =
    `نقش الحنة | حنة ${eventConfig.groomName}`;

}


/* ==========================================================
   INTRO
========================================================== */

function setupIntro() {

  const intro =
    document.getElementById("intro");

  const button =
    document.getElementById(
      "openInvitation"
    );


  if (!intro || !button) {
    return;
  }


  document.body.classList.add(
    "intro-active"
  );


  const openIntro = () => {

    if (
      intro.classList.contains(
        "is-open"
      )
    ) {
      return;
    }


    intro.classList.add(
      "is-open"
    );

    document.body.classList.remove(
      "intro-active"
    );


    window.setTimeout(
      () => {

        if (intro.parentNode) {
          intro.remove();
        }

      },
      1600
    );

  };


  button.addEventListener(
    "click",
    openIntro
  );

}


/* ==========================================================
   REVEAL
========================================================== */

function setupRevealAnimations() {

  const elements =
    document.querySelectorAll(
      "[data-reveal]"
    );


  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (reduceMotion) {

    elements.forEach(
      (element) => {

        element.classList.add(
          "is-visible"
        );

      }
    );

    return;

  }


  if (
    !("IntersectionObserver" in window)
  ) {

    elements.forEach(
      (element) => {

        element.classList.add(
          "is-visible"
        );

      }
    );

    return;

  }


  const observer =
    new IntersectionObserver(

      (entries, currentObserver) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            entry.target.classList.add(
              "is-visible"
            );


            currentObserver.unobserve(
              entry.target
            );

          }
        );

      },

      {
        threshold: 0.12,

        rootMargin:
          "0px 0px -40px 0px"
      }

    );


  elements.forEach(
    (element) => {

      observer.observe(element);

    }
  );

}


/* ==========================================================
   HENNA SCROLL PATH
========================================================== */

function setupHennaPath() {

  const container =
    document.getElementById(
      "hennaJourney"
    );

  const path =
    document.getElementById(
      "journeyPath"
    );


  if (!container || !path) {
    return;
  }


  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  const pathLength =
    path.getTotalLength();


  path.style.strokeDasharray =
    pathLength;

  path.style.strokeDashoffset =
    pathLength;


  if (reduceMotion) {

    path.style.strokeDashoffset =
      "0";

    return;

  }


  let ticking = false;


  function updatePath() {

    const rect =
      container.getBoundingClientRect();


    const windowHeight =
      window.innerHeight;


    /*
      تبدأ النقشة عندما يدخل القسم
      وتكتمل قرب نهاية القسم
    */
    const totalDistance =
      rect.height +
      windowHeight * 0.45;


    const travelled =
      windowHeight * 0.72 -
      rect.top;


    let progress =
      travelled /
      totalDistance;


    progress =
      Math.max(
        0,
        Math.min(
          progress,
          1
        )
      );


    const offset =
      pathLength *
      (1 - progress);


    path.style.strokeDashoffset =
      offset;


    ticking = false;

  }


  function requestUpdate() {

    if (ticking) {
      return;
    }


    ticking = true;


    window.requestAnimationFrame(
      updatePath
    );

  }


  window.addEventListener(
    "scroll",
    requestUpdate,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    requestUpdate
  );


  updatePath();

}


/* ==========================================================
   COUNTDOWN
========================================================== */

function setupCountdown() {

  const daysElement =
    document.getElementById(
      "days"
    );

  const hoursElement =
    document.getElementById(
      "hours"
    );

  const minutesElement =
    document.getElementById(
      "minutes"
    );

  const secondsElement =
    document.getElementById(
      "seconds"
    );

  const countdown =
    document.getElementById(
      "countdown"
    );

  const started =
    document.getElementById(
      "eventStarted"
    );


  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {
    return;
  }


  const target =
    new Date(
      eventConfig.eventDate
    );


  if (
    Number.isNaN(
      target.getTime()
    )
  ) {

    console.warn(
      "Invalid eventDate"
    );

    return;

  }


  function update() {

    const now =
      new Date();


    const difference =
      target.getTime() -
      now.getTime();


    if (difference <= 0) {

      daysElement.textContent =
        "00";

      hoursElement.textContent =
        "00";

      minutesElement.textContent =
        "00";

      secondsElement.textContent =
        "00";


      if (countdown) {
        countdown.hidden = true;
      }


      if (started) {
        started.hidden = false;
      }


      return false;

    }


    const oneDay =
      1000 * 60 * 60 * 24;

    const oneHour =
      1000 * 60 * 60;

    const oneMinute =
      1000 * 60;


    const days =
      Math.floor(
        difference /
        oneDay
      );


    const hours =
      Math.floor(
        (
          difference %
          oneDay
        ) /
        oneHour
      );


    const minutes =
      Math.floor(
        (
          difference %
          oneHour
        ) /
        oneMinute
      );


    const seconds =
      Math.floor(
        (
          difference %
          oneMinute
        ) /
        1000
      );


    daysElement.textContent =
      formatNumber(days);

    hoursElement.textContent =
      formatNumber(hours);

    minutesElement.textContent =
      formatNumber(minutes);

    secondsElement.textContent =
      formatNumber(seconds);


    return true;

  }


  const active =
    update();


  if (!active) {
    return;
  }


  const timer =
    window.setInterval(
      () => {

        const stillActive =
          update();


        if (!stillActive) {

          window.clearInterval(
            timer
          );

        }

      },
      1000
    );

}


/* ==========================================================
   FORMAT
========================================================== */

function formatNumber(number) {

  return String(number)
    .padStart(
      2,
      "0"
    );

}


/* ==========================================================
   MAP
========================================================== */

function setupMap() {

  const mapButton =
    document.getElementById(
      "mapButton"
    );


  if (!mapButton) {
    return;
  }


  mapButton.href =
    eventConfig.mapUrl;

}


/* ==========================================================
   CALENDAR
========================================================== */

function setupCalendar() {

  const button =
    document.getElementById(
      "calendarButton"
    );


  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    downloadCalendar
  );

}


function downloadCalendar() {

  const startDate =
    new Date(
      eventConfig.eventDate
    );


  if (
    Number.isNaN(
      startDate.getTime()
    )
  ) {

    showToast(
      "تعذر إنشاء الموعد"
    );

    return;

  }


  const durationMilliseconds =
    eventConfig
      .eventDurationHours *
    60 *
    60 *
    1000;


  const endDate =
    new Date(
      startDate.getTime() +
      durationMilliseconds
    );


  const location =
    [
      eventConfig.venue,
      eventConfig.city,
      eventConfig.address
    ].join(" - ");


  const description =
    `${eventConfig.calendarDescription}\n${getInvitationUrl()}`;


  const content = [

    "BEGIN:VCALENDAR",

    "VERSION:2.0",

    "PRODID:-//Henna Trace//Invitation//AR",

    "CALSCALE:GREGORIAN",

    "METHOD:PUBLISH",

    "BEGIN:VEVENT",

    `UID:${Date.now()}@henna-trace`,

    `DTSTAMP:${toICSDate(new Date())}`,

    `DTSTART:${toICSDate(startDate)}`,

    `DTEND:${toICSDate(endDate)}`,

    `SUMMARY:${escapeICSText(eventConfig.calendarTitle)}`,

    `DESCRIPTION:${escapeICSText(description)}`,

    `LOCATION:${escapeICSText(location)}`,

    "STATUS:CONFIRMED",

    "END:VEVENT",

    "END:VCALENDAR"

  ].join("\r\n");


  const blob =
    new Blob(
      [content],
      {
        type:
          "text/calendar;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const anchor =
    document.createElement(
      "a"
    );


  anchor.href =
    url;


  anchor.download =
    `henna-${slugify(eventConfig.groomName)}.ics`;


  document.body.appendChild(
    anchor
  );


  anchor.click();


  anchor.remove();


  window.setTimeout(
    () => {

      URL.revokeObjectURL(
        url
      );

    },
    1000
  );


  showToast(
    "تم إنشاء موعد التقويم"
  );

}


/* ==========================================================
   ICS HELPERS
========================================================== */

function toICSDate(date) {

  return date
    .toISOString()
    .replace(
      /[-:]/g,
      ""
    )
    .replace(
      /\.\d{3}/,
      ""
    );

}


function escapeICSText(text) {

  return String(text)

    .replace(
      /\\/g,
      "\\\\"
    )

    .replace(
      /\n/g,
      "\\n"
    )

    .replace(
      /,/g,
      "\\,"
    )

    .replace(
      /;/g,
      "\\;"
    );

}


/* ==========================================================
   SHARE
========================================================== */

function setupShare() {

  const button =
    document.getElementById(
      "shareButton"
    );


  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    shareInvitation
  );

}


async function shareInvitation() {

  const url =
    getInvitationUrl();


  const title =
    `حنة ${eventConfig.groomName}`;


  const text =
    `يسر السيد ${eventConfig.fatherName} دعوتكم لحضور ليلة حنة ابنه ${eventConfig.groomName}، ${eventConfig.dayName} ${eventConfig.dateText} الساعة ${eventConfig.timeText}.`;


  /*
    Web Share API
  */
  if (navigator.share) {

    try {

      await navigator.share({
        title,
        text,
        url
      });


      return;

    }
    catch (error) {

      if (
        error &&
        error.name ===
        "AbortError"
      ) {
        return;
      }

    }

  }


  /*
    Clipboard fallback
  */
  const copied =
    await copyToClipboard(
      `${text}\n${url}`
    );


  if (copied) {

    showToast(
      "تم نسخ رابط الدعوة"
    );

  }
  else {

    showToast(
      "تعذر نسخ الرابط تلقائياً"
    );

  }

}


/* ==========================================================
   CLIPBOARD
========================================================== */

async function copyToClipboard(text) {

  if (
    navigator.clipboard &&
    window.isSecureContext
  ) {

    try {

      await navigator.clipboard.writeText(
        text
      );


      return true;

    }
    catch (error) {

      console.warn(
        "Clipboard API failed",
        error
      );

    }

  }


  try {

    const textarea =
      document.createElement(
        "textarea"
      );


    textarea.value =
      text;


    textarea.setAttribute(
      "readonly",
      ""
    );


    textarea.style.position =
      "fixed";

    textarea.style.opacity =
      "0";

    textarea.style.pointerEvents =
      "none";


    document.body.appendChild(
      textarea
    );


    textarea.select();


    textarea.setSelectionRange(
      0,
      textarea.value.length
    );


    const successful =
      document.execCommand(
        "copy"
      );


    textarea.remove();


    return successful;

  }
  catch (error) {

    console.warn(
      "Clipboard fallback failed",
      error
    );


    return false;

  }

}


/* ==========================================================
   INVITATION URL
========================================================== */

function getInvitationUrl() {

  if (
    eventConfig.invitationUrl &&
    eventConfig.invitationUrl.trim()
  ) {

    return eventConfig
      .invitationUrl
      .trim();

  }


  return window
    .location
    .href
    .split("#")[0];

}


/* ==========================================================
   TOAST
========================================================== */

let toastTimer = null;


function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );

  const toastText =
    document.getElementById(
      "toastText"
    );


  if (!toast || !toastText) {
    return;
  }


  toastText.textContent =
    message;


  toast.classList.add(
    "show"
  );


  if (toastTimer) {

    window.clearTimeout(
      toastTimer
    );

  }


  toastTimer =
    window.setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2500
    );

}


/* ==========================================================
   FILE NAME
========================================================== */

function slugify(value) {

  return String(value)

    .trim()

    .replace(
      /\s+/g,
      "-"
    )

    .replace(
      /[^\u0600-\u06FFa-zA-Z0-9-_]/g,
      ""
    )

    || "event";

}
