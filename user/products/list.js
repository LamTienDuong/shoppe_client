selectOptionCategory(category);

$('input[name="category"]').change(function() {
    // Gọi hàm searchByNameProduct khi có thay đổi
    searchByNameProduct();
});

function searchByNameProduct(page = 0, valueCategoryFooter = "") {
    let selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(checkbox => checkbox.value);
    $.ajax({
        type: 'GET', // Sử dụng phương thức GET để yêu cầu dữ liệu từ server.
        url: `http://localhost:${localStorage.getItem('port')}/products/list?page=` + page + '&title=' + $("#search-name").val() + '&categoryIds=' + selectedCategories.join(",") + valueCategoryFooter + '&discount=' + $("#find-discount").val(), // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.
        success: function (data) {
            pagination("#pagination", data)
            let tableContent = `<div class="row">`;
            let products = data.content;
            products.forEach((product) => {
                tableContent += `<div class="col-3" style="width: 200px; margin-right: 16px; margin-bottom: 8px;">
                                    <a href="#" class="card" id="card" style="width: 200px; height: 300px;">
                                        <img src="${product.image}" class="card-img-top" alt="...">
                                        <div class="card-body">
                                        <p class="card-title" style="font-size: 18px;">${product.title}</p>
                                        <del style="margin-right: 4px;">${product.price}</del>
                                        <span style="color: rgb(238, 77, 45);">${product.discount}</span> <br>
                                        </div>
                                    </a>
                                </div>`
            });
            tableContent += `</div>`
            $("#list_product").html(tableContent);
        },
        error: function (error) {
        }
    });
}
