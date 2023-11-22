function display(userId) {
    $.ajax({
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"), // Đính kèm token trong tiêu đề
        },
        type: 'GET',
        url: `http://localhost:8080/cart/${userId}`,
        success: function (data) {
            
            let contentCart = ``;

            data.forEach(element => {
                let price = element.product.price;

                contentCart += `<div class="row d-flex">
                <div class="col-md-1 d-flex align-items-center">
                    <input  onclick="changeCheckbox()" class="item-checkbox" type="checkbox" data-values="${element.id},${element.quantity}">
                </div>
                <div class="col-md-3 d-flex align-items-center">
                    <img id="detail" src="${element.product.image}" alt="${element.product.category.name}" width="100px">
                    <p class="mx-2">${element.product.category.name}</p>
                </div>
                <div class="col-md-2 d-flex justify-content-center align-items-center">
                    <p>${element.product.price.toLocaleString('de-DE')} VNĐ</p>
                </div>
                <div class="col-md-2 d-flex justify-content-center align-items-center">
                   <p>${element.quantity}</p>
                </div>
                <div class="col-md-2 d-flex justify-content-center align-items-center ">
                   <p>${(element.quantity * element.product.price).toLocaleString('de-DE')} VNĐ</p>
                </div>
                <div class="col-md-2 d-flex justify-content-center align-items-center">
                    <button class="btn btn-danger delete-cart-product" data-bs-toggle="modal" data-bs-target="#modal-delete-cart-product"  onclick="showDeleteCartProduct(${element.id}, '${element.product.category.name}')">Xóa</button>
                </div>
            </div>`;

            });

            contentCart += `</div>`;

            $('#content-cart').html(contentCart);
        },
        error: function (error) {

        }
    })
};


function getUserId() {
    return new Promise((resolve, reject) => {
        $.ajax({
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"), // Đính kèm token trong tiêu đề
            },
            type: 'GET',
            url: `http://localhost:8080/api/user`,
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
             }
        });
    
    });
}


function showDeleteCartProduct(idCartProduct, nameCartProduct) {
    $('#name-cart-product-delete').text(nameCartProduct);
    $('#id-cart-product-delete').val(idCartProduct);
}

async function buyProduct() {
    let products = [];
    let userId = await getUserId();
    $('.item-checkbox').each(function () {
        if ($(this).prop('checked')) {
            let values = $(this).data('values').split(',');
            let cartProductId = values[0];
            let cartProductPrice = values[1];
            debugger
            // Thêm id sản phẩm vào mảng để gửi lên server
            products.push(cartProductId);
        }
    });
    

    $.ajax({
        headers: {
            Accept: 'application/json', // Đặt kiểu dữ liệu được chấp nhận từ server là JSON.
            'Content-Type': 'application/json', // Đặt kiểu dữ liệu được gửi lên server là JSON.
            Authorization: "Bearer " + localStorage.getItem("accessToken") // Đính kèm token trong tiêu đề
        },
        type: 'POST',
        data: JSON.stringify({arrayProduct: products}),
        url: `http://localhost:8080/cart/${userId}`,
        success: function() {
            display(userId);
            $('#totalPrice').text('');
        },
        error: function(error) {}
    });
}

