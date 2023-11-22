function selectOptionCategory(htmlId) {
    $.ajax({
        type: "GET", // Sử dụng phương thức GET để yêu cầu dữ liệu từ server.
        url: `http://localhost:${localStorage.getItem('port')}/categorys`, // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.
        success: function (categorys) {
          //200-299
          selectOptionCategoryFooter("#category-footer", categorys)
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

function selectOptionCategoryFooter(htmlId, data) {
  let contentSelect = `<ul>
                          <li>
                              Danh mục
                          </li>`;
  categorys = data
  categorys.forEach((category) => {
      contentSelect += `
          <li style="color: var(--text-primary1);" id="item-category" onclick="searchByNameProduct(0, ${category.id})">
              ${category.name}
          </li>`;
  });

  contentSelect += '</ul>'

  $(htmlId).html(contentSelect);

  $(htmlId).on('mouseenter', '#item-category', function () {
      $(this).addClass('hover-category-footer');
  });

  $(htmlId).on('mouseleave', '#item-category', function () {
      $(this).removeClass('hover-category-footer');
  });
}

