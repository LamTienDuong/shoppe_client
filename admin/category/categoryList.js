function selectOptionCategory(htmlId, categoryId) {
    $.ajax({
        type: 'GET', // Sử dụng phương thức GET để yêu cầu dữ liệu từ server.
        url: 'http://localhost:8080/categorys', // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.
        success: function (data) {
            let contentSelect = `<label class="form-label">Chọn danh mục <span class="text-danger text_error">(*)</span></label>
                                <select  class="form-select" id="classIdSelect">
                                    <option value="">Chọn danh mục</option>`;
            let categorys = data;
            categorys.forEach((category) => {
                contentSelect += `<option value="${category.id}" ${category.id == categoryId ? 'selected' : ''}>${category.name}</option>`
            });
            contentSelect += "</select>"
            $(`#${htmlId}`).html(contentSelect);   
        },
        error: function (error) {
        }   
    });
}