function displayProducts(page) {
    searchOptionCategory("select_option_search");

    const title = $("#title_search").val();
    let category_id = $("#category_id_search").val();
    if (category_id == undefined) {
        category_id = "";
    }
    let product = {
        title: title,
    }
    const result_search = new URLSearchParams(product).toString();
    debugger

    $.ajax({
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"), // Đính kèm token trong tiêu đề
        },
        type: 'GET', // Sử dụng phương thức GET để yêu cầu dữ liệu từ server.
        url: `http://localhost:${localStorage.getItem('port')}/products?page=${page}&${result_search}&categoryId=${category_id }`, // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.
        success: function (data) {
            // Phân trang.
            let totalPage = data.totalPages;
            let number = data.number;
            pagination(totalPage, number);
            debugger;
            // Hiển thị product.
            let products = data.content;
            let tableContent = ``;
            products.forEach((product, index) => {
                tableContent += `<tr><th scope="row">${index + 1}</th>
                                    <td>${product.title}</td>
                                    <td>${product.price}</td>
                                    <td>${product.discount}</td>
                                    <td>${product.quantity}</td>
                                    <td><img src="${product.image}" width="100" height="100"></td>
                                    <td>${product.category.name}</td>
                                    <td>
                                        <button type="button" onclick="comfirmUpdateProduct(${product.id})" data-bs-toggle="modal" data-bs-target="#modal_update_product" class="btn btn-info">Chỉnh sửa</button>
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