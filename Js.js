let textDoc = document.getElementById("text_Area")

let activeDropDown;//active dropdown box being used 

let fontList = [
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
    "Comic Sans MS"
].sort();

let colors = [
    ["red","#FF0000"],
    ["orange","#FF7F00"],
    ["yellow","#FFFF00"],
    ["green","#00FF00"],       
    ["blue","#0000FF"],        
    ["indigo","#4B0082"],        
    ["violet","#9400D3"],
    ["black","#000000"],
    ["white","#FFFFFF"],
]

//found this code snipped online.
//ISSUE: Discovered this last minute. When pasting in text into a content editable, it brought in stylings that made the app unable to function properly with editing. This snippet makes text copied in, have no stylings
let ce = document.querySelector('[contenteditable]')
ce.addEventListener('paste', function (e) {
  e.preventDefault()
  var text = e.clipboardData.getData('text/plain')
  document.execCommand('insertText', false, text)
})

function exportHTML(){//export to word document
    let header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
        "xmlns:w='urn:schemas-microsoft-com:office:word' "+
        "xmlns='http://www.w3.org/TR/REC-html40'>"+
        "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    let footer = "</body></html>";
    let sourceHTML = header+document.getElementById("text_Container").innerHTML+footer;
       
    let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    let fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `${document.getElementById("documentName").value} .doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
}

function printDiv() {//print text area
            let divContents = document.getElementById("text_Container").innerHTML;
            let a = window.open('', '', 'height=1375p, width=1063');
            a.document.write('<html>');
            a.document.write('<body >');
            a.document.write(divContents);
            a.document.write('</body></html>');
            a.document.close();
            a.print();
}

function dropDown(targetId){

    //clear all visible elements each time a dropdown is selected (start fresh, reset)
    let toggleElements = document.getElementsByClassName("visible")
    for(let i = 0; i < toggleElements.length;i++){
        toggleElements[0].classList.add("hidden")
        toggleElements[0].classList.remove("visible")
    }

    //add visible class to see the popupbox
    document.getElementById(targetId).classList.remove("hidden")
    document.getElementById(targetId).classList.add("visible")


    if(activeDropDown == targetId){//if the popup box is chosen thats already open, close it
        document.getElementById(targetId).classList.remove("visible")
        document.getElementById(targetId).classList.add("hidden")

        activeDropDown = null;//reset active popup box
    }else{
        activeDropDown = targetId//set active popup box. Check for this by using the if statement above. If element is already being used. Close it out
    }

}
function displayModal(toggle){
    if(toggle){
        document.getElementById("main_Modal").classList.remove("hidden")
    }else if(toggle == false){
        document.getElementById("main_Modal").classList.add("hidden")
    }
}

textDoc.addEventListener('keydown',function(e) {//for tabbing in text area
    if(e.keyCode === 9) { // tab was pressed
        // get caret position/selection
        let start = this.selectionStart;
        let end = this.selectionEnd;

        let target = e.target;
        let value = target.value;

        // set textarea value to: text before caret + tab + text after caret
        target.value = value.substring(0, start)
                    + "\t"
                    + value.substring(end);

        // put caret at right position again (add one for the tab)
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent the focus lose
        e.preventDefault();
    }
},false);




function insertShape(e){
    let shape = e.children[0].cloneNode(true)

    shape.style.height ="50px"
    shape.style.width ="50px"
    shape.classList.add("on_Page")

    textDoc.appendChild(shape)
    displayModal(false)

}

function format(command, value) { 
  document.execCommand(command, false, value);
}

function setColor(color) {
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, color);
}
function setFont(fontType){
    textDoc.style.fontFamily = fontType;
    document.getElementById("fontStyleTitle").innerText = fontType;
}
function setFontSize(size){
    textDoc.style.fontSize = `${size}pt`;
    document.getElementById("fontSizeTitle").innerText = `${size}pt`;
}
function setLineSpacing(space){
    textDoc.style.lineHeight = space;
    console.log("hi")
}




function buildFonts(font){
    for(let i = 0; i < fontList.length; i++){
        document.getElementById("fontList").innerHTML += `<li style='font-family: ${fontList[i]};' onclick='setFont("${fontList[i]}")'> ${fontList[i]} &emsp;</li>`
    }
}
function buildFontSizes(size){
    for(let i = 3; i < 76; i++){
        document.getElementById("font_Sizes").innerHTML += `<li onclick='setFontSize("${i}")'> ${i} &emsp;</li>`
    }
}

function buildColors(){//populate colors dropdown with colors

    for(i = 0; i < colors.length;i++){
        document.getElementById("colorGridWrapper").innerHTML += `<button style='width: 20px; height:20px; background-color:${colors[i][0]}' class='color_Box' onclick='setColor("${colors[i][0]}")'></button>`
    }
}

buildColors();
buildFonts();
buildFontSizes();



/* TESTING FUNCTIONS SANDBOX BELOW */
/* ================================*/

