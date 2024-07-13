import serverW from "./js/server.js";

let section_no;
let question_no;

const titles = [
  "Business and Goals",
  "Design and Branding",
  "Content",
  "Functionality and Features",
  "Technical Requirements",
  "Maintenance and Updates",
  "SEO and Analytics",
  "Timeline and Budget",
  "Additional Information",
];

const data = {
  0: [
    [
      "What is the primary purpose of the website?",
      "(e.g., informational, e-commerce, portfolio, blog, etc.)",
    ],
    [
      "What are your business goals for this website?",
      "(e.g., increase sales, generate leads, provide information, etc.)",
    ],
    [
      "Who is your target audience?",
      "(e.g., age, gender, interests, location, etc.)",
    ],
    [
      "What are the key features you need on the website?",
      "(e.g., contact form, booking system, e-commerce functionality, blog, etc.)",
    ],
  ],
  1: [
    [
      "Do you have an existing brand or style guide?",
      "(e.g., logo, color scheme, fonts, etc.)",
    ],
    ["Can you provide examples of websites you like and why?"],
    [
      "What kind of look and feel do you want for your website?",
      "(e.g., modern, traditional, minimalist, vibrant, etc.)",
    ],
  ],
  2: [
    [
      "Do you have existing content that will be used on the website?",
      "(e.g., text, images, videos, etc.)",
    ],
    ["Will you need help creating or curating content?"],
    [
      "How many pages do you anticipate needing?",
      "(e.g., Home, About, Services, Contact, etc.)",
    ],
  ],
  3: [
    [
      "What specific functionality do you require?",
      "(e.g., user login, online payments, blog, social media integration, etc.)",
    ],
    [
      "Do you need any special features?",
      "(e.g., appointment booking, custom forms, interactive maps, etc.)",
    ],
  ],
  4: [
    [
      "Do you have a preferred platform or CMS?",
      "(e.g., WordPress, Shopify, custom-built, etc.)",
    ],
    [
      "Do you have a domain name and hosting provider?",
      "(If yes, get the details; if no, offer assistance in selecting and setting them up.)",
    ],
    ["Do you have any specific security requirements?"],
  ],
  5: [
    ["How often do you anticipate needing updates or changes to the website?"],
    [
      "Will you need ongoing maintenance and support?",
      "(e.g., updates, backups, security checks, etc.)",
    ],
  ],
  6: [
    ["Do you have any SEO (Search Engine Optimization) requirements?"],
    [
      "Will you need analytics setup to track website performance?",
      "(e.g., Google Analytics, other tracking tools)",
    ],
  ],
  7: [
    ["What is your desired launch date for the website?"],
    ["What is your budget for this project?"],
  ],
  8: [
    [
      "Are there any competitors' websites you want to stand out from or align with?",
    ],
    [
      "Do you have any specific legal or compliance requirements?",
      "(e.g., GDPR, accessibility standards, etc.)",
    ],
    [
      "Is there anything else you want to share about your vision or expectations?",
    ],
  ],
};

function start() {
  const container = document.querySelector(".container");
  container.addEventListener("click", () => {
    container.classList.add("active");
    setTimeout(() => {
      addContent();
    }, 2000);
  });
}
start();

function addContent() {
  const box = document.querySelector(".box");
  const dialog_box = document.createElement("div");

  dialog_box.classList.add("dialog");

  dialog_box.innerHTML = `<div class="top"><h1 class="title"></h1><h2 class="question"></h2><span  class="examples"></span></div><input type="text" /><button><i class="fa-solid fa-chevron-left"></i></button><button>Next</button>`;

  box.innerHTML = "";
  box.appendChild(dialog_box);
  createContent(dialog_box);
}

async function createContent(container) {
  const title = container.childNodes[0].childNodes[0];
  const question = container.childNodes[0].childNodes[1];
  const examples = container.childNodes[0].childNodes[2];
  const input = container.childNodes[2];
  const button = document.querySelectorAll(".dialog button");
  input.focus();

  setTimeout(() => {
    container.style.opacity = 1;
  }, 200);

  await serverW.getTable("position").then((result) => {
    section_no = result[0].section_no;
    question_no = result[0].question_no;
  });

  const content = data[section_no][question_no][0];
  const eg = data[section_no][question_no][1];

  contentAnimation(title, titles[section_no]);
  question.innerHTML = content;
  if (eg != undefined) examples.innerHTML = eg;
  showAnswer(question.innerHTML, input);
  updateContent();

  if (section_no == 8 && question_no == 2) button[1].innerHTML = "Done";
  else button[1].innerHTML = "Next";
}

// await serverW.updatePosition(8, 2).then((response) => console.log(response));

async function updateContent() {
  const button = document.querySelectorAll(".dialog button");
  const title = document.querySelector(".dialog .title");
  const question = document.querySelector(".dialog .question");
  const example = document.querySelector(".dialog span");
  const input = document.querySelector(".dialog input");

  button.forEach((e) => {
    e.addEventListener("click", async () => {
      if (!e.classList.contains("inactive") && e.innerHTML != "Done") {
        if (
          e.childNodes[0].classList == undefined &&
          section_no < Object.keys(data).length &&
          question_no < data[section_no].length
        ) {
          ++question_no;
          disableButtons(button);

          if (
            question_no == data[section_no].length &&
            section_no < Object.keys(data).length - 1
          ) {
            section_no++;
            question_no = 0;
            disableButtons(button);
          }
        } else if (
          e.childNodes[0].classList != undefined &&
          question_no >= 0 &&
          section_no >= 0
        ) {
          if (question_no > 0) {
            --question_no;
            disableButtons(button);
          } else if (question_no <= 0 && section_no > 0) {
            --section_no;
            question_no = data[section_no].length - 1;
            disableButtons(button);
          }
        }

        if (section_no == 8 && question_no == 2) button[1].innerHTML = "Done";
        else button[1].innerHTML = "Next";

        saveAnswer(question, input);

        if (title.innerHTML != titles[section_no])
          contentAnimation(title, titles[section_no]);
        if (question.innerHTML != data[section_no][question_no][0])
          contentAnimation(question, data[section_no][question_no][0]);
        if (data[section_no][question_no].length == 1) example.innerHTML = "";
        else if (example.innerHTML != data[section_no][question_no][1]) {
          disappearnAppear(example);
          setTimeout(() => {
            example.innerHTML = data[section_no][question_no][1];
          }, 500);
        }

        await serverW.updatePosition(section_no, question_no);
        input.focus();
        showAnswer(data[section_no][question_no][0], input);
        enableButtons(button);
      }
    });
  });
}

function contentAnimation(container, string) {
  let delay = 0;

  if (container.innerHTML != "") {
    let prev_string = container.innerHTML.split("");
    let tmp = prev_string.slice();
    delay = tmp.length * 10;

    tmp.forEach((c, i) => {
      setTimeout(() => {
        if (container.innerHTML != "") {
          prev_string.pop();
          container.innerHTML = prev_string.join("");
        }
      }, 10 * i);
    });
  }

  string.split("").forEach((c, i) => {
    const interval = 25 * i;
    setTimeout(() => {
      container.innerHTML = string.substring(0, i + 1);
    }, delay + interval);
  });
}

function cursorAnimation() {
  const body = document.querySelector("body");
  const cursor = document.querySelector(".cursor");

  body.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursor.style.opacity = "1";
  });
}
cursorAnimation();

function disappearnAppear(e) {
  e.style.opacity = "0";
  setTimeout(() => {
    e.style.opacity = "1";
  }, 1250);
}

function disableButtons(button) {
  button.forEach((e) => {
    e.classList.add("inactive");
  });
}

function enableButtons(button) {
  button.forEach((e) => {
    setTimeout(() => {
      e.classList.remove("inactive");
    }, 500);
  });
}

async function saveAnswer(question, input) {
  await serverW.updateAnswer(question.innerHTML, input.value);
}

async function showAnswer(question, input) {
  await serverW.getAnswer(question).then((result) => {
    input.value = result.answer;
  });
}
