const textareas = document.querySelectorAll(".codemirror-readonly");

for (let i = 0; i < textareas.length; i++) {
  const editor = CodeMirror.fromTextArea(textareas[i], {
    mode: "text/html",
    theme: "one-dark",
    tabSize: 2,
    readOnly: true
  });
}

const iframe = document.querySelector(".document-display-iframe");
const editor = CodeMirror.fromTextArea(
  document.querySelector(".codemirror-editor"),
  {
    value: ``,
    mode: "text/html",
    theme: "one-dark",
    tabSize: 2,
    showCursorWhenSelecting: true,
    undoDepth: 1000,
    autofocus: true,
    autoCloseTags: true,
    viewportMargin: Infinity
  }
);

editor.on("change", function(cm) {
  if ("<road></road>" === cm.getValue()) {
    console.log("yay");
  }
});

const updateIframeDoc = html => {
  iframe.contentWindow.document.body.innerHTML = html;
};

updateIframeDoc(editor.doc.getValue());

iframe.contentWindow.document.head.innerHTML = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css" />
<style>

* {
  box-sizing: border-box;
}
body {
  background-color: #00B516;
}
road {
  display: block;
  height: 150px;
  background-image: url(road.svg);
  background-repeat: repeat;
  background-size: 75px;
  margin-bottom: 1rem;
  padding-top: 85px;
  overflow: hidden;
}
road:nth-child(1) {
  margin-top: 1rem;
}
car {
  display: inline-block;
  height: 60px;
  width: 120px;
  background-image: url(car.svg);
  background-repeat: no-repeat;
  background-size: 110px;
}
car[style="blue"] {
  background-image: url(car-blue.svg);
}
</style>`;

editor.on("change", (instance, changeObj) => {
  updateIframeDoc(instance.doc.getValue());
});
