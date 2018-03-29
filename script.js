const iframe = document.querySelector(".document-display-iframe");
const editor = CodeMirror(document.querySelector(".codemirror-root"), {
  value: `<road>\n  <car style="blue"></car>\n</road>`,
  mode: "text/html",
  theme: "one-dark",
  tabSize: 2,
  showCursorWhenSelecting: true,
  undoDepth: 1000,
  autofocus: true,
  autoCloseTags: true
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
