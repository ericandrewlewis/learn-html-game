const iframe = document.querySelector(".document-display-iframe");
const editor = CodeMirror(document.querySelector(".codemirror-root"), {
  value: "<road></road>",
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
body {
  background-color: #00B516;
}
road {
  display: block;
  height: 100px;
  background-image: url(road.svg);
  background-repeat: repeat;
  margin-bottom: 1rem;
}
road:nth-child(1) {
  margin-top: 1rem;
}
</style>`;

editor.on("change", (instance, changeObj) => {
  updateIframeDoc(instance.doc.getValue());
});
