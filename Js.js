const textDoc = document.getElementById("text_Area");
let activeDropDown; //active dropdown box being used

let ce = document.querySelector("[contenteditable]");
ce.addEventListener("paste", function (e) {
  e.preventDefault();
  var text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
});

function exportHTML() {
  let header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" +
    "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
  let footer = "</body></html>";
  let sourceHTML =
    header + document.getElementById("text_Container").innerHTML + footer;

  let source =
    "data:application/vnd.ms-word;charset=utf-8," +
    encodeURIComponent(sourceHTML);
  let fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = `${
    document.getElementById("documentName").value
  } .doc`;
  fileDownload.click();
  document.body.removeChild(fileDownload);
}

function printDiv() {
  let divContents = document.getElementById("text_Container").innerHTML;
  let a = window.open("", "", "height=1375p, width=1063");
  a.document.write("<html>");
  a.document.write("<body >");
  a.document.write(divContents);
  a.document.write("</body></html>");
  a.document.close();
  a.print();
}

function renderDropdown(targetId) {
  let toggleElements = document.getElementsByClassName("visible");

  for (let i = 0; i < toggleElements.length; i++) {
    toggleElements[0].classList.add("hidden");
    toggleElements[0].classList.remove("visible");
  }

  document.getElementById(targetId).classList.remove("hidden");
  document.getElementById(targetId).classList.add("visible");

  if (activeDropDown == targetId) {
    document.getElementById(targetId).classList.remove("visible");
    document.getElementById(targetId).classList.add("hidden");

    activeDropDown = null;
  } else {
    activeDropDown = targetId;
  }
}

function displayModal(toggle) {
  if (toggle) {
    document.getElementById("main_Modal").classList.remove("hidden");
  } else if (toggle == false) {
    document.getElementById("main_Modal").classList.add("hidden");
  }
}

//For tabbing text
textDoc.addEventListener(
  "keydown",
  function (e) {
    if (e.keyCode === 9) {
      const start = this.selectionStart;
      const end = this.selectionEnd;
      const target = e.target;
      const value = target.value;

      target.value = value.substring(0, start) + "\t" + value.substring(end);

      this.selectionStart = this.selectionEnd = start + 1;
      e.preventDefault();
    }
  },
  false
);

function insertShape(target) {
  let shape = target.children[0].cloneNode(true);

  shape.style.height = "50px";
  shape.style.width = "50px";
  shape.classList.add("on_Page");

  textDoc.appendChild(shape);
  displayModal(false);
}

function formatTextStyling(command, value) {
  document.execCommand(command, false, value);
}
function _setColor(color) {
  document.execCommand("styleWithCSS", false, true);
  document.execCommand("foreColor", false, color);
}
function _setFont(fontType) {
  textDoc.style.fontFamily = fontType;
  document.getElementById("fontStyleTitle").innerText = fontType;
}
function _setFontSize(size) {
  textDoc.style.fontSize = `${size}pt`;
  document.getElementById("fontSizeTitle").innerText = `${size}pt`;
}
function setLineSpacing(space) {
  textDoc.style.lineHeight = space;
}

function _populateFonts(font) {
  const fontList = [
    "Arial",
    "Arial Black",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Impact",
    "Times New Roman",
    "Courier",
    "Lucida Console",
    "Luminari",
    "Comic Sans MS",
  ].sort();

  for (let i = 0; i < fontList.length; i++) {
    document.getElementById(
      "fontList"
    ).innerHTML += `<li style='font-family: ${fontList[i]};' onclick='_setFont("${fontList[i]}")'> ${fontList[i]} &emsp;</li>`;
  }
}
function _populateFontSizes(size) {
  for (let i = 3; i < 76; i++) {
    document.getElementById(
      "font_Sizes"
    ).innerHTML += `<li onclick='_setFontSize("${i}")'> ${i} &emsp;</li>`;
  }
}

function _populateDropdownColors() {
  const colors = [
    ["red", "#FF0000"],
    ["orange", "#FF7F00"],
    ["yellow", "#FFFF00"],
    ["green", "#00FF00"],
    ["blue", "#0000FF"],
    ["indigo", "#4B0082"],
    ["violet", "#9400D3"],
    ["black", "#000000"],
    ["white", "#FFFFFF"],
  ];

  for (i = 0; i < colors.length; i++) {
    document.getElementById(
      "colorGridWrapper"
    ).innerHTML += `<button style='width: 20px; height:20px; background-color:${colors[i][0]}' class='color_Box' onclick='-setColor("${colors[i][0]}")'></button>`;
  }
}

_populateDropdownColors();
_populateFonts();
_populateFontSizes();
