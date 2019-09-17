
function CheckId(number) {
    if((number.length == 7) || (number.length == 9)) {//Juridinis asmuo
        info = {"type":"J"};
        if(number.length == 7) {
            info.standart = "Senas juridinio asmens kodo standartas.";
        } else if(number.length == 9) {
            info.standart = "Naujasis juridinio asmens kodo standartas.";
            var s = Number(number[0])*1 + Number(number[1])*2 + Number(number[2])*3;
            s += Number(number[3])*4 + Number(number[4])*5 + Number(number[5])*6 + Number(number[6])*7;
            s += Number(number[7])*8;
            var checksum = s % 11;
            if(checksum == 10) {
                return "Error";
            }
            else if(checksum == Number(number[8])) {
                info.checksum = "Juridinio asmens kodo kontrolinė suma sutampa."
            } else {
                info.checksum = "KLAIDA: Juridinio asmens kodo kontrolinė suma nesutampa.";
            }
        }
        return info
    } else if(number.length == 11) { //Fizinis asmuo
        var checksum = "";
        if(Number(number[0]) >= 1 && Number(number[0]) <= 6) {
            var info = calculateBirthInfo(number);
            if(Number(info.month) < 1 || Number(info.month) > 12) {
                return "KLAIDA: Asmens kode įvestas neteisingas gimimo mėnuo."; //menesis neatitinka
            }if(Number(info.day) < 1 || Number(info.day) > 31) {
                return "KLAIDA: Asmens kode įvestas neteisinga gimimo diena.";
            }
           info.checksum = validateId(number);
        } else if(number[0] == "9") {
            info={};
            info.sex="Nežinoma";
            info.year="Nežinoma";
            info.day="";
            info.month="";
            return info;
        } else {
            info.year = "KLAIDA: Nenustatytas";
        }
        if(number[0] == "1" || number[0] == "3" || number[0] == "5") {
            info.sex = "Vyras";
        } else if(number[0] == "2" || number[0] == "4" || number[0] == "6") {
            info.sex = "Moteris";
        }
        return info;
    } else {
        return "KLAIDA: Skaičius nėra nei juridinio nei fizinio asmens kodas";
    }
}

function calculateBirthInfo(number){
    var info = {};
    if(Number(number[0]) >= 1 && Number(number[0]) <= 6) {           
        if(number[0] == "1" || number[0] == "2") {
            info.year = "18"
        } else if(number[0] == "3" || number[0] == "4") {
            info.year = "19"
        } else if(number[0] == "5" || number[0] == "6") {
            info.year = "20"
        }
        info.year += number.substring(1, 3);
        info.month = number.substring(3, 5);
        info.day = number.substring(5, 7);
        return info;
    }
}

function validateId(number){
    var s = Number(number[0])*1 + Number(number[1])*2 + Number(number[2])*3;
    s += Number(number[3])*4 + Number(number[4])*5 + Number(number[5])*6 + Number(number[6])*7;
    s += Number(number[7])*8 + Number(number[8])*9 + Number(number[9])*1;
    var checksum = s % 11;
    if(checksum == 10) {
        s = Number(number[0])*3 + Number(number[1])*4 + Number(number[2])*5;
        s += Number(number[3])*6 + Number(number[4])*7 + Number(number[5])*8;
        s += Number(number[6])*9 + Number(number[7])*1 + Number(number[8])*2 + Number(number[9])*3;
        checksum = s % 11;
        if(checksum == 10) {
            checksum = 0;
        }
    } if(checksum == Number(number[10])) {
        return checksum;
    } else {
        return "ID Netinkamas";
    }
}

function createElement(data,number){
var target = $('#container');
    if($(target).children().html()==null){
        if(typeof data ==="object"){ //Check if result valid#
            $(target).append($('<div>',{class:'mx-auto p-4 output-area'}));
            $(target).children().append($('<div>', {class: 'mx-auto p-1 image-area',style:"color:rgba(183,183,183,0.5)"}));
            if(data.type==="J"){
                scrapInfo(number,function (test){

                    $(target).children().first().append($('<div class="p-3">'+data.standart+'</div>'));
                    $(target).children().first().append($('<div class="p-3">'+data.checksum+'</div>'));
                    target = $(target).children().children().first();
                    $(target).append($('<i>', {class: 'fa fa-briefcase',style:"font-size:10vh"}));  
                    var table = $("#table");
                    if(table.children().html()!=null){
                        table.children().html(null);
                    }
                    table.append($('<table>',{class: 'table table-dark mt-5'}));
                    for(i in test){
                        table.children().append('<tr><th scope="row"></th><td>'+i+'</td><td>'+test[i]+'</td></tr>');
                    }
                });return ;
            }else{
                $(target).children().first().append($('<div class="p-3">'+data.sex+'</div>'));
                $(target).children().first().append($('<div class="bct">'+data.year+'-'+data.month+"-"+data.day+'</div>'));
                if(data.checksum!="ID Netinkamas"){
                    $(target).children().first().append($('<div class="text-success pt-3">ID Tinkamas</div>'));
                }else{
                    $(target).children().first().append($('<div class="text-danger pt-3 ">ID Neinkamas</div>'));
                }
                target = $(target).children().children().first();
                if(data.sex == "Vyras"){
                $(target).append($('<i>', {class: 'fa fa-male',style:"font-size:10vh"}));
                }else if(data.sex == "Moteris"){
                    $(target).append($('<i>', {class: 'fa fa-female',style:"font-size:10vh"}));
                }else{
                    $(target).append($('<i>', {class: 'fa fa-question',style:"font-size:10vh"}));
                }
            }  
        } else{
            $(target).children().append($('<div>'+data+'</div>'));
        }
    }else{
     $(target).html('');   
     return createElement(data,number);
    } 
}

function check(){
    var id = $("#idplaceholder").val();
    $("#table").html(null);
    $('#container').html(null);
    var data = CheckId(id);
    createElement(data,id);
}

function scrapInfo(number,callback){
    var xhr = new XMLHttpRequest();
    data = [];
    testdata = {};
    xhr.onreadystatechange = function() {

        
        if(this.readyState == 4 &&this.status == 404){   
            callback(testdata);
        } 




        if (this.readyState == 4 && this.status == 200) {
            var resp = this.response;
            var dom =new DOMParser().parseFromString(resp, "text/html");
            testdata.Pavadinimas=dom.documentElement.getElementsByClassName("page-title")[0].innerText;
        for(i = 0;i<17;i=i+2){
            var key = dom.documentElement.getElementsByClassName("info-table-culumn")[i].innerText;
            var imp = dom.documentElement.getElementsByClassName("info-table-culumn")[i+1].innerText;
           testdata[key] = imp;
        }
            callback(testdata);
        } 
      };
    xhr.open('GET', "https://abalt.lt/imone/"+number+"", true);
    xhr.send();
}

function validate(){
    imput = $("#idplaceholder");  
    output = imput.val().replace(/[a-zA-Z]|\s|[$&+,:;=?@#|_+{}"/\\[\]'<>~`.^*()%!-]/g, "");  
    $(imput).val(output);
}