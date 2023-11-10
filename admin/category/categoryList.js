function selectOptionCategory(htmlId, categoryId) {
    $.ajax({
        type: 'GET', // Sử dụng phương thức GET để yêu cầu dữ liệu từ server.
        url: 'http://localhost:8080/categorys', // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.
        success: function (data) {
            let contentSelect = `<select  class="form-select" id="classIdSelect">
                                    <option value="">Chọn lớp</option>`;
            let categorys = data;
            categorys.forEach((category) => {
                
            });
        },
        error: function (error) {
            // Hàm này được gọi khi có lỗi trong quá trình gửi yêu cầu hoặc nhận phản hồi.
            // Biến 'error' chứa thông tin về lỗi, bạn có thể xử lý lỗi ở đây hoặc thông báo cho người dùng.
        }
    });

}