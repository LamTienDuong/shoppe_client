
let idProduct;
function comfirmDeleteProduct(id, name) {
    idProduct = id;
    $("#nameProduct").text(name);
}

function deleteProduct() {
    $.ajax({
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"), // Đính kèm token trong tiêu đề
        },
        type: 'DELETE', 
        url: `http://localhost:${localStorage.getItem('port')}/products/${idProduct}`, 
        success: function (data) {
            $("#modal_delete_product").modal("hide");
            displayProducts();
            $(".toast_delete").toast("show");
        },
        error: function (error) {
        }
    });
}
