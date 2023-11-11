function viewDetail(id) {
    $.ajax({
        type: 'GET', // Sử dụng phương thức GET để yêu cầu dữ liệu từ server.
        url: `http://localhost:8080/products/${id}`, // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.
        success: function (data) {
            let product = data;

            $("#image_detail").attr("src", `${product.image}`);
            $("#id_detail").text(product.id);
            $("#title_detail").text(product.title);
            $("#price_detail").text(product.price);
            $("#discount_detail").text(product.discount);
            $("#quantity_detail").text(product.quantity);
            $("#category_detail").text(product.category.name);
            $("#description_detail").text(product.description);

        },
        error: function (error) {
            // Hàm này được gọi khi có lỗi trong quá trình gửi yêu cầu hoặc nhận phản hồi.
            // Biến 'error' chứa thông tin về lỗi, bạn có thể xử lý lỗi ở đây hoặc thông báo cho người dùng.
        }
    });
}