function pagination(htmlId, data) {
    let contentBody = `
            <li class="page-item">
                <a class="page-link" onclick="displayProducts('http://localhost:8081/products?page=', 0)" aria-label="Previous">
                    <span aria-hidden="true">Frist</span>
                </a>
            </li>`;

            if (data.number != 0) {
                contentBody += `<li class="page-item">
                                    <a class="page-link" onclick="displayProducts('http://localhost:8081/products?page=', ${data.number - 1})"  aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>`
            }

            for(let i = 0; i < data.totalPages; i++) {
                // i là trang hiện tại, nếu đứng ở trang nào thì chỉ cho xuất hiện trang đó + 2 trang tiếp theo -->
                if (i == data.number || i == data.number + 1 || i == data.number + 2 
                    || (data.number == data.totalPages - 2 && i == data.number - 1)
                    || (data.number == data.totalPages - 1 && (i == data.number - 2 || i == data.number - 1))) {
                    contentBody += `<li class="page-item">
                                        <a class="page-link ${data.number == i ? 'active' : ''}" onclick="displayProducts('http://localhost:8081/products?page=', ${i})">${i + 1}</a>
                                    </li>`
                }
            };
            
            if (data.number != data.totalPages - 1) {
                contentBody += `<li class="page-item">
                                    <a class="page-link" onclick="displayProducts('http://localhost:8081/products?page=', ${data.number + 1})" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>`
            }

            contentBody += `<li class="page-item">
                                <a class="page-link" onclick="displayProducts('http://localhost:8081/products?page=', ${data.totalPages - 1})"" aria-label="Previous">
                                    <span aria-hidden="true">Last</span>
                                </a>
                            </li>`
          $(htmlId).html(contentBody);
}