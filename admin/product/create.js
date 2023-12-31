$("#btn_add_product").click(function (event) {
    selectOptionCategory("select_option_create");
});

$("#form-add-product").submit(async function (event) {
    event.preventDefault(); // Không bị load lại trang

    $('[id^=error-add-]').text("");
    let title = $("#add_name").val();
    let price = $("#add_price").val();
    let discount = $("#add_discount").val();
    let quantity = $("#add_quantity").val();
    let files = document.getElementById('add_image').files;
    let description = $("#add_description").val();
    let categoryid = $("#classIdSelect").val();
    let image;
    if (files.length != 0) {
        image = await getBase64(files[0]);
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
            Accept: 'application/json', 
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        },
        type: 'POST', 
        data: JSON.stringify(product), 
        url: `http://localhost:${localStorage.getItem('port')}/products`, // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.
        success: function () {
            $("#modal_add_product").modal("hide");
            displayProducts();
            $("input").val('');
            $(".toast_create").toast("show");
        },
        error: function (error) {
            const messageList = JSON.parse(error.responseText);
            messageList.forEach((item) => {
                $(`#error-add-${item.filed.replace('.', '')}`).text(item.message);
            });
            debugger;
        }
    });
})



$("#btn_add_cancel").click(function(event) {
    debugger
    // Khi hủy thì những giấu đỏ xẽ bị xóa.
    $("input").val('');
    debugger
    $('[id^=error-add-]').text("");
})