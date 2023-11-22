function display(id) {
    $.ajax({
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"), // Đính kèm token trong tiêu đề
        },
        type: 'GET',
        url: `http://localhost:8080/products/${id}`,
        success: function (data) {

            let content =
                `<h1 class="text-center mb-3">Chi tiết sản phẩm</h1>
             <div class="container my-5">
                 <div class="row">
                     <div class="col-md-6 d-flex justify-content-center">
                         <img src="${data.image}" width="60%wh" height="100%">
                     </div>
                     <div class="col-md-6">
                         <div class="row">
                             <div class="col-6">
                                 <p class="fw-bold">Mã sản phẩm:</p>
                                 <p class="fw-bold">Tên sản phẩm:</p>
                                 <p class="fw-bold">Giá gốc:</p>
                                 <p class="fw-bold">Giá bán:</p>
                                 <p class="fw-bold">Số lượng:</p>
                                 <p class="fw-bold">Loại hàng:</p>
                                 <p class="fw-bold">Mô tả</p>
                                 <p class="fw-bold">Số lượng</p>
                             </div>
                             <div class="col-6">
                                 <p>${data.id}</p>
                                 <p>${data.title}</p>
                                 <p>${data.price} VNĐ</p>
                                 <p>${data.discount} VNĐ</p>
                                 <p id="data-quantity">${data.quantity}</p>
                                 <p>${data.category?.name}</p>
                                 <p>${data.description}</p>
                                 <div>
                                     <button class="btn btn-white" onclick="minus()"><i class="fa-solid fa-minus"></i></button>
                                     <input id="input-quantity" type="text" id="detail-product-quantity" oninput="testInput(${data.quantity})" value="1" style="width: 50px; height: 32px; border: 1px solid #cccccc; text-align:center;">
                                     <button class="btn btn-white" onclick="plus()"><i class="fa-solid fa-plus"></i></i></button>
                                 </div>
                             </div>
                         </div>
                         <div class="row">
                             <div>
                                 <button type="button" id="liveToastBtn" class="btn btn-primary" onclick="insertCard(${data.id})">
                                     <span>
                                         <i class="fa-solid fa-bag-shopping"></i>
                                         Thêm vào giỏ hàng
                                     </span>
                                 </button>
                                 <button type="submit" onclick="buy(${data.id})" class="btn btn-primary">
                                     Mua ngay
                                 </button>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>`;

            $('#content-detail').html(content);
            getUserId();
        },
        error: function (err) { }
    });
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

function minus() {
    let quantity = Number($('#input-quantity').val()) - 1;
    if (quantity < 1) {
        quantity = 1;
    }
    $('#input-quantity').val(quantity);
}

function plus() {
    let quantity = Number($('#input-quantity').val()) + 1;
    $('#input-quantity').val(quantity);
}

function testInput(data_quantity) {
    let quantity = $('#input-quantity').val();

    // Nếu sô lượng nhập vào ko phải số thì số lượng = 1
    if (!Number(quantity)) {
        $('#input-quantity').val(1);
    }
    // Nếu số lượng nhập vào lớn hơn sp trong kho thì = sp trong kho
    if (quantity > data_quantity) {
        $('#input-quantity').val(data_quantity);
    }

}

async function insertCard(id) {
    let quantity = $('#input-quantity').val();

    // tạo đối tượng gửi lên server
    idAndQuantity = {
        id: id,
        quantity: quantity
    }


    let userId = await getUserId();


    $.ajax({
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
        type: 'POST',
        data: JSON.stringify(idAndQuantity),
        url: `http://localhost:8080/detail/${userId}`,
        success: function (data) {

            $('.toast-body').text('Thêm sản phẩm vào giỏ hàng thành công')
            display(id);

        },
        error: function (data) { 
            $('.toast-body').text('Lỗi!!')
        }
    });


}



async function buy(id) {
    let quantity = $('#input-quantity').val();

    // tạo đối tượng gửi lên server
    idAndQuantity = {
        id: id,
        quantity: quantity
    }


    let userId = await getUserId();


    $.ajax({
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
        type: 'POST',
        data: JSON.stringify(idAndQuantity),
        url: `http://localhost:8080/detail/${userId}`,
        success: function (data) {
            window.location.href = "http://127.0.0.1:5500/cart/cart.html";
            display(id);

        },
        error: function (data) { 
            $('.toast-body').text('Lỗi!!')
        }
    });


}






