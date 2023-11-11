let idUpdate;
function comfirmUpdateProduct(id) {
    idUpdate = id;
    $('[id^=error-update-]').text("");
    $.ajax({
        type: 'GET', // Sử dụng phương thức GET để yêu cầu dữ liệu từ server.
        url: `http://localhost:8080/employees/${id}`, // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.
        success: function (data) {
            const employee = data;

            $("#title_update").val(employee.name);
            $("#birthDate_update").val(employee.birthDate);
            $("#gender_update").val(employee.gender.toString()).change();
            $("#salary_update").val(employee.salary);
            $("#phoneNumber_update").val(employee.phoneNumber);
            selectOptionDepartment2("#select_option_update", employee.department.id);
        },
        error: function (error) {
            
        }
    });

}