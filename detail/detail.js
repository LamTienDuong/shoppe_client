function display(id) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/products/${id}`,
        success: function(data) {
            
            let content = 
             `<h1 class="text-center mb-3">Chi tiết sản phẩm</h1>
             <div class="container mt-5">
                 <div class="row">
                     <div class="col-md-6 d-flex justify-content-center">
                         <img src="data:image/jpeg;base64,${data.image}" width="60%wh" height="100%">
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
                                 <p>${data.price}</p>
                                 <p>${data.discount}</p>
                                 <p>${data.quantity}</p>
                                 <p>${data.category.name}</p>
                                 <p>${data.description}</p>
                                 <div>
                                     <button class="btn btn-white" onclick="minus()"><i class="fa-solid fa-minus"></i></button>
                                     <input id="input-quantity" type="text" id="detail-product-quantity" value=0 style="width: 50px; height: 32px; border: 1px solid #cccccc; text-align:center;">
                                     <button class="btn btn-white" onclick="plus()"><i class="fa-solid fa-plus"></i></i></button>
                                 </div>
                             </div>
                         </div>
                         <div class="row">
                             <div>
                                 <button id="liveToastBtn" type="button" class="btn btn-primary" onclick="insertCard()">
                                     <span>
                                         <i class="fa-solid fa-bag-shopping"></i>
                                         Thêm vào giỏ hàng
                                     </span>
                                 </button>
                                 <button type="submit" class="btn btn-primary" onclick="buyProduct('buyProduct')">
                                     Mua ngay
                                 </button>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>`;

             $('#content-detail').html(content);
        },
        error: function(err) {}
    });
};

function minus() {
    let quantity = Number($('#input-quantity').val()) - 1;
    if (quantity < 0) {
        quantity = 0;
    }
    $('#input-quantity').val(quantity);
}

function plus() {
    let quantity = Number($('#input-quantity').val()) + 1;
    $('#input-quantity').val(quantity);
}

function insertCard() {
    window.location.href = "http://127.0.0.1:5500/cart/cart.html";
}



    
