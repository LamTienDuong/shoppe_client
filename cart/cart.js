function display(userId) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/cart/${userId}`,
        success: function (data) {

            let contentCart = ``;

            data.forEach(element => {
                let price = element.product.price;


                contentCart += `<div class="row d-flex">
                <div class="col-md-1 d-flex align-items-center">
                    <input class="item-checkbox" type="checkbox">
                </div>
                <div class="col-md-3 d-flex align-items-center">
                    <img id="detail" src="data:image/jpeg;base64,${element.product.image}" alt="${element.product.category.name}" width="100px">
                    <p class="mx-2">${element.product.description}</p>
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
                    <button class="btn btn-danger" onclick=deleteCartProduct(${element.id})>Xóa</button>
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

