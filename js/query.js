function test(){
    var a = $("#idplaceholder").val();
    alert(a);
}

function validate(){
    imput = $("#idplaceholder");  
    output = imput.val().replace(/[a-zA-Z]|[$&+,:;=?@#|'<>.^*()%!-]/g, "");
    $(imput).val(output);
}