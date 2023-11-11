function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise(function(myResolve, myReject) {
        reader.onload = function () {
            return  myResolve(reader.result); // when successful
        };
        reader.onerror = function () {
            return myReject(error); ;
        };
        });
 }
 
