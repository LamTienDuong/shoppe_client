
let idProduct;
function comfirmDeleteProduct(id, name) {
    idProduct = id;
    $("#nameProduct").text(name);
}

function deleteProduct() {
    $.ajax({
        type: 'DELETE', 
        url: `http://localhost:8080/products/${idProduct}`, 
        success: function (data) {
            $("#modal_delete_product").modal("hide");
            displayProducts();
            $(".toast_delete").toast("show");
        },
        error: function (error) {
        }
    });
}
