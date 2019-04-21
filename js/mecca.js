
    //Dealer Lookup
    function getHDealer() {
        window.open("_blank").location.href = "http://gds.hyundaitechinfo.com/eReport/diaglist.aspx?uid=GDS&cpcode=B28AA" + document.getElementById("dealerH").value;
        return false;
    }

    //VIN Lookup
    function getHVin() {
        window.open("_blank").location.href = "http://gds.hyundaitechinfo.com/eReport/diaglist.aspx?uid=GDS&cpcode=B28AA&vin=" + document.getElementById("vinH").value;
        return false;
    }
    //Genesis Dealer Lookup
    function getGDealer() {
        window.open("_blank").location.href = "https://gds.genesistechinfo.com/ereport/diaglist.aspx?uid=GDS&cpcode=B28AA"+ document.getElementById("dealerG").value + "&device=GDSM";
        return false;
    }
    
    //Genesis VIN Lookup
    function getGVin() {
        window.open("_blank").location.href = "https://gds.genesistechinfo.com/ereport/diaglist.aspx?uid=GDS&cpcodeB28AA&vin=" + document.getElementById("vinG").value + "&device=GDSM";
        return false;
    }