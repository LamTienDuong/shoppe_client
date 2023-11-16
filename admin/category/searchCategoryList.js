function searchOptionCategory(htmlId, categoryId) {
    $.ajax({
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"), // Đính kèm token trong tiêu đề
        },
        type: 'GET', // Sử dụng phương thức GET để yêu cầu dữ liệu từ server.
        url: `http://localhost:${localStorage.getItem('port')}/categorys`, // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.
        success: function (data) {
            let contentSelect = `<select class="form-select" id="category_id_search">
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