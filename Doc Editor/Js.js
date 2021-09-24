/*
EXPORT TEXT AREA TO WORD DOCJMENT / DONWLOAD
-https://www.codexworld.com/export-html-to-word-doc-docx-using-javascript/

IDEAS:
-take snapshot of document text every so often for a redo functionality. Maybe after every space so each word itself is saved

*/

let colorBoxHidden = true
let currentOpenBox;

let fontList = [
    "Arial",
    "Arial Black",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Impact",
    "Times New Roman",
    "Didot",
    "Georgia",
    "American Typewriter",
    "Andalé Mono",
    "Courier",
    "Lucida Console",
    "Monaco",
    "Bradley Hand",
    "Brush Script MT",
    "Luminari",
    "Comic Sans MS"
]

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

    // for(let i = 0; i < document.getElementsByClassName("popup_Selector").length; i++){//this is to help toggle. Existing popup boxes close when another is chosen
    //     document.getElementsByClassName("popup_Selector")[i].classList.add("hidden")
    // }//start by hiding all popup boxes

    if(colorBoxHidden){ // viewing a popup box
        document.getElementById(targetId).classList.remove("hidden")
        colorBoxHidden = false
    }
    else{ // removing a popup box by adding hidden class
        document.getElementById(targetId).classList.add("hidden")
        colorBoxHidden = true
    }
}




function format(command, value) { 
  document.execCommand(command, false, value);
}

function setColor(color) {
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, color);
}
function setFont(fontType){
    document.getElementById("text_Area").style.fontFamily = fontType;
    document.getElementById("fontStyleTitle").innerText = fontType;
}
function setFontSize(size){
    document.getElementById("text_Area").style.fontSize = `${size}pt`;
    document.getElementById("fontSizeTitle").innerText = `${size}pt`;
}
function setLineSpacing(space){
    document.getElementById("text_Area").style.lineHeight = space;
    console.log("hi")
}




function buildFonts(font){
    for(let i = 0; i < fontList.length; i++){
        document.getElementById("fontList").innerHTML += `<li onclick='setFont("${fontList[i]}")'> ${fontList[i]} </li>`
    }
}
function buildFontSizes(size){
    for(let i = 3; i < 75; i++){
        document.getElementById("font_Sizes").innerHTML += `<li onclick='setFontSize("${i}")'> ${i} </li>`
    }
}

function buildColors(){//populate colors dropdown with colors

    for(i = 0; i < colors.length;i++){
        document.getElementById("colorGridWrapper").innerHTML += `<button style='width: 20px; height:20px; background-color:${colors[i][0]}' class='color_Box' onclick='setColor("${colors[i][0]}")'></button>`
    }

    console.log(colors[0])
}

buildColors();
buildFonts();
buildFontSizes();