// Tạo biểu đồ
var ctx = document.getElementById('cookiechart').getContext('2d');
var myChart = new Chart(ctx, {
    type: "bar",
        data: {
            labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
            datasets: [{ label: "Thống kê đơn hàng theo tháng", data: null }],
            borderWidth: 1
        },
    options: {
        // Cấu hình biểu đồ
    }
});

function display_statistic_order(year) {
    debugger
    $.ajax({
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"), // Đính kèm token trong tiêu đề
        },
        type: 'GET',
        url: `http://localhost:${localStorage.getItem("port")}/oders?year=${year}`,
        success: function (data) {
            // Cập nhật dữ liệu trong biểu đồ
            myChart.data.datasets[0].data = data;
            // Cập nhật biểu đồ
            myChart.update();
        },
        error: function (error) {
        }
    });
}

function viewYearstatistic(htmlId) {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    let contentSelect = `<select name="" class="form-select" id="chose_year_statistic">
                            <option value="">Năm hiện tại</option>`;
    for (let i = currentYear; i > currentYear - 5; i--) {
        contentSelect += `<option value="${i}">${i}</option>`
    }
    contentSelect += " </select>";
    $(`#${htmlId}`).html(contentSelect);
    display_statistic_order(currentYear); // Chọn mặc định.
    $("#chose_year_statistic").change(function () {
        display_statistic_order($(this).val());
    });
}

