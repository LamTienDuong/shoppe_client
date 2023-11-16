function display_statistic_category() {
    $.ajax({
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"), // Đính kèm token trong tiêu đề
        },
        type: 'GET',
        url: `http://localhost:${localStorage.getItem("port")}/categorys/quantity`,
        success: function (data) {
            // Xử lý dữ liệu từ server
            var labels = data.map(item => item[2]);
            var values = data.map(item => item[0]);
            debugger;
            var ctx = document.getElementById('myPieChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: values,
                        backgroundColor: ['red', 'green', 'blue', 'orange'],
                    }],
                },
                options: {
                    title: {
                        display: true,
                        text: 'Thống kê số lượng sản phẩm' // Thay đổi đây
                    }
                }
            });
        },
        error: function (error) {
        }
    });
}
