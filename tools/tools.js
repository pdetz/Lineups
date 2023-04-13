function ToolButton({ css='', ...props }) {
  return e("button", { className: "tools" + css, ...props })
}

function FileInputButton({ text, onLoad, css='' }) {
  const fileInputRef = React.useRef(null);

  function handleButtonClick() {
    fileInputRef.current.click();
  }

  function handleFileInputChange(event) {
    const files = event.target.files;
    const fileContents = [];
  
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = function (event) {
        fileContents.push(event.target.result);
  
        if (fileContents.length === files.length) {
          onLoad(fileContents);
        }
      };
      reader.readAsText(files[i]);
    }
  }
  

  return (
    e("span", { className: "upload" + css },
      e("input", { className:"upload", ref: fileInputRef, onChange: handleFileInputChange, type:"file", accept: ".hy3,.HY3", multiple:true}),
      e(ToolButton, { onClick: handleButtonClick }, text)
    )
  )
}