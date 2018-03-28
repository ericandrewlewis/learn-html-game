const iframe = document.querySelector(".document-display-iframe");
const editor = CodeMirror(document.querySelector(".codemirror-root"), {
  value: "<road></road>",
  mode: "htmlmixed",
  theme: "one-dark",
  tabSize: 2,
  showCursorWhenSelecting: true,
  undoDepth: 1000,
  autofocus: true
});

const updateIframeDoc = html => {
  iframe.contentWindow.document.body.innerHTML = html;
};

updateIframeDoc(editor.doc.getValue());

iframe.contentWindow.document.head.innerHTML = `<style>
body { background-color: #00B516; }
road { display: block; background-image: url(road.svg); height: 100px; background-repeat: repeat; margin-bottom: 1rem; }
</style>`;

editor.on("change", (instance, changeObj) => {
  updateIframeDoc(instance.doc.getValue());
});
