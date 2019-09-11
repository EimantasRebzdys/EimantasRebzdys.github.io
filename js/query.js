function CheckId(number) {
    if((number.length == 7) || (number.length == 9)) {//Juridinis asmuo
        var juridioAsmensStandartas = "";
        var kontrolineSuma = "";

        if(number.length == 7) {
            juridioAsmensStandartas = "Senas juridinio asmens kodo standartas.";
        } else if(number.length == 9) {
            juridioAsmensStandartas = "Naujasis juridinio asmens kodo standartas.";

            var s = Number(number[0])*1 + Number(number[1])*2 + Number(number[2])*3;
            s += Number(number[3])*4 + Number(number[4])*5 + Number(number[5])*6 + Number(number[6])*7;
            s += Number(number[7])*8;
            var controlNum = s % 11;
            if(controlNum == 10) {
                return "Error";
            }
            if(controlNum == Number(number[8])) {
                kontrolineSuma = "Juridinio asmens kodo kontrolinė suma sutampa."
            } else {
                kontrolineSuma = "KLAIDA: Juridinio asmens kodo kontrolinė suma nesutampa.";
                //kontrolineSuma += "\n(Turėtų būti: " + controlNum + " Yra: " + Number(number[8]) + ")";
            }
        }
        return juridioAsmensStandartas + "\n" + kontrolineSuma;
    } else if(number.length == 11) { //Fizinis asmuo
        var lytis = "";
        var gimimoMetai = "";
        var gimimoMenuo = "";
        var gimimoDiena = "";
        var asmensKodoStandartas = "";
        var kontrolineSuma = "";

        if(Number(number[0]) >= 1 && Number(number[0]) <= 6) {
            if(number[0] == "1" || number[0] == "2") {
                gimimoMetai = "18";
            } else if(number[0] == "3" || number[0] == "4") {
                gimimoMetai = "19";
            } else if(number[0] == "5" || number[0] == "6") {
                gimimoMetai = "20";
            }
            gimimoMetai += number.substring(1, 3);
            gimimoMenuo = number.substring(3, 5);
            gimimoDiena = number.substring(5, 7);

            if(Number(gimimoMenuo) < 1 || Number(gimimoMenuo) > 12) {
                return "KLAIDA: Asmens kode įvestas neteisingas gimimo mėnuo.";
            }
            if(Number(gimimoDiena) < 1 || Number(gimimoDiena) > 31) {
                return "KLAIDA: Asmens kode įvestas neteisinga gimimo diena.";
            }
            asmensKodoStandartas = "Standartinis fizinio asmens kodas.";

            var s = Number(number[0])*1 + Number(number[1])*2 + Number(number[2])*3;
            s += Number(number[3])*4 + Number(number[4])*5 + Number(number[5])*6 + Number(number[6])*7;
            s += Number(number[7])*8 + Number(number[8])*9 + Number(number[9])*1;
            var controlNum = s % 11;
            if(controlNum == 10) {
                s = Number(number[0])*3 + Number(number[1])*4 + Number(number[2])*5;
                s += Number(number[3])*6 + Number(number[4])*7 + Number(number[5])*8;
                s += Number(number[6])*9 + Number(number[7])*1 + Number(number[8])*2 + Number(number[9])*3;
                controlNum = s % 11;
                if(controlNum == 10) {
                    controlNum = 0;
                }
            }

            if(controlNum == Number(number[10])) {
                kontrolineSuma = "Asmens kodo kontrolinė suma sutampa."
            } else {
                kontrolineSuma = "KLAIDA: Asmens kodo kontrolinė suma netampa.";
                //kontrolineSuma += "\n(Turėtų būti: " + controlNum + " Yra: " + Number(number[10]) + ")";
            }
        } else if(number[0] == "9") {
            asmensKodoStandartas = "Nestandartinis fizinio asmens kodas.";
        } else {
            gimimoMetai = "KLAIDA: Nenustatytas";
        }


        if(number[0] == "1" || number[0] == "3" || number[0] == "5") {
            lytis = "Vyras";
        } else if(number[0] == "2" || number[0] == "4" || number[0] == "6") {
            lytis = "Moteris";
        }

        return lytis + " --- " + gimimoMetai + "-" + gimimoMenuo + "-" + gimimoDiena + "\n" + asmensKodoStandartas + "\n" + kontrolineSuma;
    } else {
        return "KLAIDA: Skaičius nėra nei juridinio nei fizinio asmens kodas";
    }
}


function createElement(data){
    var target = $('#container');
    $(target).append($('<div>', {class: 'mx-auto p-1 image-area',style:"color:rgba(183,183,183,0.5)"}));
    $(target).append($('<div>'+data+'</div>'));
    //$(target).append($('<div>', {class: 'bct mt-2'}));
    //$(target).append($('<div>', {class: 'bct mt-2'}));
    //$(target).append($('<div>', {class: 'bct mt-2'}));
    target = $(target).children().first();
    $(target).append($('<i>', {class: 'fa fa-male',style:"font-size:10vh"}));  
}

function test(){
    var id = $("#idplaceholder").val();
    var data = CheckId(id);
    createElement(data);
}

function validate(){
    imput = $("#idplaceholder");  
    output = imput.val().replace(/[a-zA-Z]|\s|[$&+,:;=?@#|_+{}"/\\[\]'<>~`.^*()%!-]/g, "");  
    $(imput).val(output);
}