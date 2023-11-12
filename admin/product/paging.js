function pagination(totalPage, number) {
    let contentPaging = `<nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-end">
                                <li class="page-item" onclick="displayProducts(${number - 1})">
                                    <span class="page-link"><<</span>
                                </li>`
    for (let i = 0; i < totalPage; i++) {
        contentPaging += `<li class="page-item ${i == number ? "active" : ''}" onclick="displayProducts(${i})"><span class="page-link" href="">${i+1}</span></li>`;
    }
    contentPaging += ` <li class="page-item" onclick="displayProducts(${number + 1})">
                            <span class="page-link">>></span>
                        </li></ul></nav>`;
    $("#pagination_admin").html(contentPaging);
};