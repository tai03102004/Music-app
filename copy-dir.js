const fs = require("fs-extra");

const listFolderCopy = [
    {
        sourceDirectory:"views",
        targetDirectory:"dist/views",
    },{
        sourceDirectory:"public",
        targetDirectory:"dist/public",
    }
]

listFolderCopy.forEach( item => {
    fs.copy(item.sourceDirectory, item.targetDirectory,(err)=>{
        if (err) {
            console.error(`Lỗi sao chép thư mục ${item.sourceDirectory}:`, err);
        } else {
            console.error(`Sap chép tự mục thành công ${item.sourceDirectory}`);
        }
    })
});