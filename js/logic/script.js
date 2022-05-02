const isaNumber = /[0-9]|\./;
const isaLetter = /[a-z]/gi;
const genModel = ['g', 'f', 'h']; //GMA VIN model designations
const genDealer = /[7]|\./; //GMA dealer get (700 code dealer codes)

function ascii(a) { return a.charCodeAt(0); };

$(document).on("mouseenter", ".radHvr", function() {
    if ($(this).is(':checked')) {
        $(this).prop('checked', false);
    } else {
        $(this).prop('checked', true);
    };
});

$("input").on("click keyup focus blur", function(e) {
    var id = this.id;
    var type = e.type;
    switch (type) {
        case "click":
            switch (id) {
                case "dCode":
                    $("#vin").val("");
                    break;
                case "vin":
                    $("#dCode").val("");
                    break;
            }
            break;
        case "keyup":
            $("#" + id).val($(this).val().toUpperCase());
            var key = e.keyCode;
            key = (key === 9 || key === 13);
            var val = this.value;
            if (key) {
                dataSbmt({ val: val, id: id });
            }
            break;
        case "focus":
            $("#" + id).val(" ");
            break;
        case "blur":
            $("#" + id).val("");
            break;
    }
    $('#id').keyup(function() {
        $(this).val($(this).val().toUpperCase());
    });
})

function windowOpen(url) {
    window.open(url, '_blank',
        'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=500,top=100,width=1000,height=800')
    return false;
}

$("#submit").unbind().click(function(e) {
    var qry;
    var dCode = $("#dCode").val();
    var vin = $("#vin").val();

    if (dCode != "") {
        qry = { val: dCode, id: "dCode" }
    } else {
        qry = { val: vin, id: "vin" }
    };
    dataSbmt(qry);
});

function dataSbmt(params) {
    var val = params.val;
    var id = params.id
    switch (id) {
        case "dCode":
            var dCdLtrTst = val.slice(0, 2);
            var dCdNbrTst = val.slice(2, 5);
            var dCdTst1 = isaLetter.test(dCdLtrTst);
            if (dCdLtrTst === "CA") {
                dCdNbrTst = parseInt(val.slice(2, 4));
            }
            var dCdTst2 = isaNumber.test(dCdNbrTst);
            var dCdTst = (dCdTst1 && dCdTst2);
            if (dCdTst) {
                qry = { "dCode": val }
            } else {
                alertModal("Dealer Code<br>Not Valid");
                $("#dCode").val("");
                return
            }
            break;

        case "vin":
            var vinLow = 6;
            var vinHigh = 17;
            var validVin = (val.length >= vinLow && val.length <= vinHigh);
            if (!validVin) {
                alertModal("Please Enter a Valid VIN");
                $("#vin").val("");
                return;
            }
            qry = { "vin": val }
            break;
    }
    getData(qry)
}

function getData(params) {
    var val;
    var req;
    jQuery.each(params, function(key, obj) {
        req = key;
        val = obj;
    });
    $("#" + req).val("");
    switch (req) {
        case "dCode":
            openDealer(val);
            break;
        case "vin":
            var myTst = val.charAt(9).toLowerCase();
            var params = {
                val: val,
                mdlTst: val.charAt(3).toLowerCase(),
                myVal: ascii(myTst)
            }
            openVin(params);
            break;
    }
}

function openVin(params) {
    var vin = params.val;
    var mdlTst = params.mdlTst;
    var myVal = params.myVal;
    var myValTst = myVal > 106; // greater than 2018
    var mixGenTst = myVal < 107 && myVal > 101; // 2015 - 2018
    if ($.inArray(mdlTst, genModel) !== -1 && myValTst) {
        var url = "https://gds.genesistechinfo.com/ereport/diaglist.aspx?uid=GDS&cpcodeB28AA&vin=" + vin + "&device=GDSM";
        windowOpen(url);
    } else if ($.inArray(mdlTst, genModel) !== -1 && mixGenTst) {
        $('#eReportChoice').modal('show');
        $('#manChoice').unbind().click(function() {
            event.preventDefault();
            if (!$('input[name=manSel]:checked').val()) {
                alertModal('Manufacturer Not Selected');
                return;
            }
            var manSelect = $('input[name=manSel]:checked').val().trim();
            $("input[type='radio'][name='manSel']").prop("checked", false);
            $('#eReportChoice').modal('hide');
            // console.log(manSelect);
            if (manSelect === 'gma') {
                var url = "https://gds.genesistechinfo.com/ereport/diaglist.aspx?uid=GDS&cpcodeB28AA&vin=" + vin + "&device=GDSM";
            }
            if (manSelect === 'hma') {
                var url = "https://gds.hyundaitechinfo.com:447/eReport/diaglist.aspx?uid=GDS&cpcode=B28AA&vin=" + vin + "&device=GDSM";
            }
            windowOpen(url);
        })
    } else {
        var url = "https://gds.hyundaitechinfo.com:447/eReport/diaglist.aspx?uid=GDS&cpcode=B28AA&vin=" + vin + "&device=GDSM";
        windowOpen(url);
    }
};

function openDealer(val) {
    var gma = genDealer.test(val[2]);
    if (gma) {
        var url = "https://gds.genesistechinfo.com/ereport/diaglist.aspx?uid=GDS&cpcodeB28AA" + val + "&device=GDSM";
    } else {
        var url = "https://gds.hyundaitechinfo.com:447/eReport/diaglist.aspx?uid=GDS&cpcode=B28AA" + val + "&device=GDSM";
    }
    windowOpen(url);
};

function alertModal(data) {
    $("#alertModal").modal('toggle');
    var text = $("<p>");
    text.addClass('mt-3')
    var textTest = data.indexOf('<br>') !== -1;
    if (textTest) {
        text.html(data);
    } else {
        text.text(data);
    }
    text.css('text-align', 'center');
    $("#alertData").empty();
    $("#alertData").append(text);

    $("#alertClose").unbind().click(function() {
        $("#alertModal").modal('toggle');
    });
}
