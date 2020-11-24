const selectFileDialog = document.getElementById("select-file-dialog");
const selectFile = document.getElementById("select-file");
const uploadPanel = document.getElementById("upload-panel");

// This is the backend url
const uploadUrl = "https://localhost:5001/api/Upload";

// https://stackoverflow.com/a/20357650/844372
["draginit", "dragstart", "dragover", "dragend", "drag", "drop"].forEach(eventName =>{
    document.addEventListener(eventName, (e) =>{
        e.preventDefault();
        e.stopPropagation();
    }, false);
});

selectFileDialog.addEventListener("change", setFileToUpload, false);

function setFileToUpload(){
    if(this.files){
        uploadFiles(this.files);
    }
}

uploadPanel.addEventListener("drop", (e) =>{
    e.preventDefault();
    e.stopPropagation();

    const dt = e.dataTransfer;
    const files = dt.files;

    if(files){
        uploadFiles(files);
    }
    
}, false);

uploadPanel.addEventListener("click", ()=>{
    selectFileDialog.click();
});

uploadPanel.addEventListener("dragover", ()=>{
    uploadPanel.classList.add("upload-panel-dragover");
});

["dragleave", "drop"].forEach(eventName =>{
    uploadPanel.addEventListener(eventName, (e)=>{
        uploadPanel.classList.remove("upload-panel-dragover");
    });
});

function uploadFiles(files){
    const form = new FormData();

    [...files].forEach(f => {
            
        // "file" -> name of the IFormData parameter in the controller
        form.append("file", f);
    });

    fetch(uploadUrl, {
        method: "POST",
        headers: {
            "Accept":"*/*",
        },
        body: form
    }).then(response => {
        if(!response.ok){
            console.log("Upload error: ", response);
        }
    }).catch(error => console.log("ERROR: ", error));
}
