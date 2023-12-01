let idUpdate;
let image_raw;
function comfirmUpdateProduct(id) {
    idUpdate = id;
    $('[id^=error-update-]').text("");
    $.ajax({
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"), // Đính kèm token trong tiêu đề
        },
        type: 'GET', // Sử dụng phương thức GET để yêu cầu dữ liệu từ server.
        url: `http://localhost:${localStorage.getItem('port')}/products/${id}`, // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.
        success: function (data) {
            const product = data;
            image_raw = product.image;
            $("#update_title").val(product.title);
            $("#update_price").val(product.price);
            $("#update_image_raw").attr("src", `${product.image}`);
            $("#update_discount").val(product.discount);
            $("#update_quantity").val(product.quantity);
            $("#update_description").val(product.description);
            selectOptionCategory("select_option_update", product.category.id);
        },
        error: function (error) {
        }
    });
}
async function updateProduct() {
    selectOptionCategory("select_option_update");
    let title = $("#update_title").val();
    let price = $("#update_price").val();
    let discount = $("#update_discount").val();
    let quantity = $("#update_quantity").val();
    let files = document.getElementById('update_image').files;
    let description = $("#update_description").val();
    let categoryid = $("#select_option_update #classIdSelect").val();
    let image;
    debugger;
    if (files.length != 0 && files != undefined) {
        image = await getBase64(files[0]);
    }
    if (image == undefined) {
        image = image_raw;
    }
    const product = {
        title: title,
        price: price,
        discount: discount,
        quantity: quantity,
        image: image,
        description: description,
        category: {
            id: categoryid
        }
    }
    debugger;
    $.ajax({
        headers: {
            Accept: 'application/json', // Đặt kiểu dữ liệu được chấp nhận từ server là JSON.
            'Content-Type': 'application/json', // Đặt kiểu dữ liệu được gửi lên server là JSON.
            Authorization: "Bearer " + localStorage.getItem("accessToken"), // Đính kèm token trong tiêu đề
        },
        type: 'PUT',
        data: JSON.stringify(product),
        url: `http://localhost:${localStorage.getItem('port')}/products/${idUpdate}`,
        success: function () {
            $("#modal_update_product").modal("hide");
            displayProducts();
            $("input").val("");
            $(".toast_update").toast("show");
        },
        error: function (error) {
            const messageList = JSON.parse(error.responseText);
            debugger;
            messageList.forEach((item) => {
                $(`#error-update-${item.filed.replace('.', '')}`).text(item.message);
            });
        }
    });
}