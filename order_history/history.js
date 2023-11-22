function display(userId) {
    $.ajax({
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"), // Đính kèm token trong tiêu đề
        },
        type: 'GET',
        url: `http://localhost:8080/history/${userId}`,
        success: function(data) {
            let modal = ``;
            let content =``;
            data.forEach(element => {
                content += `<div class="row mt-2">
                                <div class="col-md-2 d-flex">
                                    <p class="mx-2">${element.orderDate}</p>
                                </div>
                                <div class="col-md-3 d-flex">
                                    <p class="mx-2">${element.user?.name}</p>
                                </div>
                                <div class="col-md-2 d-flex">
                                    <p class="mx-2">${element.user?.phoneNumber}</p>
                                </div>
                                <div class="col-md-3 d-flex">
                                    <p class="mx-2">${element.user?.address}</p>
                                </div>
                                <div class="col-md-2  d-flex">
                                    <button class="btn btn-primary mx-1" onclick="showDetail(${element.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Chi tiết</button>
                                    <button class="btn btn-danger mx-1" onclick="deleteOrder(${element.id})">Xóa</button>
                                </div>
                            </div>`;
                
            });

            $('#content-history').html(content);
 
        },
        error: function(error) {

        }
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
};



async function deleteOrder(oderId) {
    let userId = await getUserId();
    $.ajax({
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"), // Đính kèm token trong tiêu đề
        },
        type: 'DELETE',
        url: `http://localhost:8080/oders/${oderId}`,
        success: function (data) {
            display(userId);
        },
        error: function (error) {

        }
    });
}

async function showDetail(oderId) {
    let userId = await getUserId();
 
    $.ajax({
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"), // Đính kèm token trong tiêu đề
        },
        type: 'GET',
        url: `http://localhost:8080/oders/${oderId}`,
        success: function (data) {
            let price;
            let quantity;
            let total_price = 0;
            let content = ``;
            data.forEach(element => {
                content+= 
                            `<div class="row d-flex align-items-center">
                                <div class="col-md-3 fw-bold d-flex">
                                    <img src="${element.product.image}" alt="${element.product.category.name}" width="100px">
                                </div>
                                <div class="col-md-3 fw-bold d-flex">
                                    <p class="mx-2">${element.product.category.name}</p>
                                </div>
                                <div class="col-md-3 fw-bold d-flex">
                                    <p>${element.product.price.toLocaleString('de-DE')} VNĐ</p>
                                </div>
                                <div class="col-md-3 fw-bold d-flex">
                                    <p>${element.quantity}</p>
                                </div>
                            </div>`;
                price = `${element.product.price}`;
                quantity = `${element.quantity}`;
                total_price = total_price + price * quantity;
                debugger
            });
            $('#total-price').text(total_price.toLocaleString('de-DE')+"vnd");
            $('#modal-body').html(content);
            
        },
        error: function (error) {

        }
    });
}