function viewDetail(id) {
    $.ajax({
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"), // Đính kèm token trong tiêu đề
        },
        type: 'GET', // Sử dụng phương thức GET để yêu cầu dữ liệu từ server.
        url: `http://localhost:${localStorage.getItem('port')}/products/${id}`, // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.
        success: function (data) {
            let product = data;

            $("#image_detail").attr("src", `${product.image}`);
            $("#id_detail").text(product.id);
            $("#title_detail").text(product.title);
            $("#price_detail").text(product.price + " VNĐ");
            $("#discount_detail").text(product.discount + " VNĐ");
            $("#quantity_detail").text(product.quantity + " cái");
            $("#category_detail").text(product.category.name);
            $("#description_detail").text(product.description);

        },
        error: function (error) {
        }
    });
}