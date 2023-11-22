$("#form-login").submit(function (event) {
    event.preventDefault(); // Không bị load lại trang
    // $('#form-add-student').s ubmit();
    //   $("#error-score").text(""); //clear hết message lỗi
    const usernameOrEmail = $("#username-or-email").val();
    const password = $("#password").val();
  
    // Add vào list
    const user = {
      usernameOrEmail: usernameOrEmail,
      password: password
    };

        $.ajax({
      headers: {
          Accept: 'application/json', 
          'Content-Type': 'application/json', 
      },
      type: 'POST', // Sử dụng phương thức POST để gửi dữ liệu lên server.
      data: JSON.stringify(user), // Chuyển đổi đối tượng 'student' thành chuỗi JSON để gửi lên server.
      url: `http://localhost:${localStorage.getItem('port')}/api/auth/login`, // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.
      success: function (data) {
        // data => 
        localStorage.setItem('accessToken', data.accessToken);
        debugger
        const roleList = [];
        data.roleList.forEach(element => {
          roleList.push(element.authority);
        });
debugger
        localStorage.setItem('roleList', roleList);
        if (localStorage.getItem('roleList').includes('admin')) {
            debugger
            window.location.href = "index.html";
        } else {
            window.location.href = "../../user/html/index.html";
        }
      },
      error: function (error) {
        if(error.status == 401) {
          $('#error-message').text('Thông tin đăng nhập chưa chính xác');
        } else {
          $('#error-message').text('Hệ thống đang gặp lỗi, xin thử lại sau!');
        }
      }
  });
  });