function displayProducts() {
    $.ajax({
        type: 'GET', // Sử dụng phương thức GET để yêu cầu dữ liệu từ server.
        url: 'http://localhost:8080/products', // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.
        success: function (data) {
            let tableContent = ``;
            let products = data.content;
            products.forEach((product, index) => {
                tableContent += `<tr><th scope="row">${index + 1}</th>
                                    <td>${product.title}</td>
                                    <td>${product.price}</td>
                                    <td>${product.discount}</td>
                                    <td>${product.quantity}</td>
                                    <td><img src="data:image/jpeg;base64,${product.image}" width="100" height="100"></td>
                                    <td>${product.category.name}</td>
                                    <td>
                                        <button type="button" class="btn btn-info">Chỉnh sửa</button>
                                        <button type="button" onclick="viewDetail(${product.id})" data-bs-toggle="modal" data-bs-target="#modal_detail_product" class="btn btn-warning">Chi tiết</button>
                                        <button type="button" onclick="comfirmDeleteProduct(${product.id}, '${product.title}')" data-bs-toggle="modal" data-bs-target="#modal_delete_product" class="btn btn-danger" >Xóa</button>
                                    </td> </tr>`
            });
            $("#productList_content").html(tableContent);
        },
        error: function (error) {
        }
    });
}