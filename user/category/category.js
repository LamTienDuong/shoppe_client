function selectOptionCategory(htmlId) {
  $.ajax({
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"), // Đính kèm token trong tiêu đề
    },
    type: "GET", // Sử dụng phương thức GET để yêu cầu dữ liệu từ server.
    url: `http://localhost:${localStorage.getItem('port')}/categorys`, // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.
    success: function (categorys) {
      //200-299
      let contentSelect = `<li class="list-group-item">
                                  <i class="fa-solid fa-list"></i>
                                  <Strong>Danh mục</Strong>
                                </li>`;

      categorys.forEach((category) => {
        contentSelect += `
            <li class="list-group-item">
                <input class="form-check-input" id="search-name${category.id}" type="checkbox" name="category" value="${category.id}">
                <label class="form-check-label" for="search-name${category.id}">${category.name}</label>
            </li>
            `;
      });

      contentSelect += '</select>'

      $(htmlId).html(contentSelect);
    },
    error: function (error) {
      //!= 200-299
    },
  });
}