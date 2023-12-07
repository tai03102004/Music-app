// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        if (e.target.files.length) {
            const image = URL.createObjectURL(e.target.files[0]);

            uploadImagePreview.src = image;
        }
    });
}
// End Upload Image

// Upload Audio
const uploadAudio= document.querySelector("[upload-audio]");
if(uploadImage) {
    const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
    const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
    const source = uploadAudioPlay.querySelector("source");
    uploadAudioInput.addEventListener("change", (e) => {
        if (e.target.files.length) {
            const audio = URL.createObjectURL(e.target.files[0]);

            source.src = audio;

            // load file của src
            uploadAudioPlay.load();
            
        }
    });
}
// End Upload Audio