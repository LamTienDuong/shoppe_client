function encodeImageToBase64(fileInput) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();

        reader.onload = function (e) {
            // Hình ảnh đã được đọc thành công
            var base64Data = e.target.result.split(',')[1];
            resolve(base64Data);
        };

        reader.onerror = function (e) {
            // Xử lý lỗi nếu có
            reject("Error reading the file");
        };

        // Đọc nội dung của hình ảnh và chuyển đổi thành chuỗi base64
        reader.readAsDataURL(fileInput);
    });
}