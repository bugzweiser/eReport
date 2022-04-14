<?php
    // include_once "connections/connection.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <TITLE>eReport Portal</TITLE>
    <link rel="icon" href="favicon.ico" />
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Custom CSS -->
    <link rel="stylesheet" type="text/css" href="style/common/reset.css">
    <!-- jQuery -->
    <script src="js/common/jquery.js"></script>
     <!-- bootstrap js-->
    <script src="js/common/bootstrap.js"></script>
    <!-- Bootstap CSS -->
    <link rel="stylesheet" type="text/css" href="style/common/bootstrap.css">
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="style/common/font-awesome/css/font-awesome.min.css">
    <!--google fonts--->
    <link href="https://fonts.googleapis.com/css?family=Alfa+Slab+One|Press+Start+2P|Jura&display=swap" rel="stylesheet">
    <!---Custom CSS-->
    <link rel="stylesheet" type="text/css" href="style/direct/style.css">
</head>

<body>
    <div class="container">
        <div class="row align-items-center vh-100">
            <div class="col-xl-6 mx-auto">
                <div class="card border border-dark dropShadow bgLtBlueGrad">
                    <div class="card-body">
                        <!-- <form id="request"> -->
                            <div class="row mb-2">
                                <div class="col-12 d-flex justify-content-end">
                                    <img src="img/logoBlue.jpg" alt="logoBlue.jpg" style="width: 25%;"> 
                                </div>
                            </div>
                            <div class="form-row border border-dark rounded dropShadow bgLtGrey p-3 mb-3">
                                <div class="col-xl-4 mb-2">
                                    <label class="bold" for="dCode">Dealer Code</label>
                                    <input type="text" class="form-control border border-dark inpHoverBdr" id="dCode" name='dCode' placeholder="xx123" maxlength="5" autocomplete="off">
                                </div>
                                <div class="col-xl-8 mb-2">
                                    <label class="bold" for="vin">VIN</label>
                                    <input type="text" class="form-control border border-dark inpHoverBdr" id="vin" name='vin' placeholder='enter VIN (all, 6, or 8)' maxlength="17" autocomplete="off">
                                </div>
                            </div>               
                            <div class="row mb-1">
                                <div class="col-xl-12">
                                    <button class="btn btn-primary btn-block bold dropShadow" type="submit" id="submit">Submit</button>
                                </div>
                            </div>
                            <div class="row d-flex justify-content-center">
                                <small class="text-danger italic bold">enter vin or dealer code and press submit (GMA or HMA)</small>
                            </div>
                        <!-- </form> -->
                    </div>
                </div>
            </div>
        </div>

        <!-- eReport choice modal -->
        <div class="modal fade" id="eReportChoice" role="dialog" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content bgLtBlueGrad">   
                    <div class="modal-body">
                        <button type="button" class="close" data-dismiss="modal" title="Close Window" style='float: right;'>&times;</button><br>
                        <label class="d-flex justify-content-center bold" >Select Manufacturer for eReport</label>
                        <div class="form-control form-inline inpHoverBdr d-flex justify-content-center mb-2">
                            <input class="radHvr" id="gma" type="radio" name="manSel" value="gma">
                            <label class="ml-1 bldHvr" for="gma">GMA</label>
                            <input class="radHvr ml-3" id="hma" type="radio" name="manSel" value="hma">
                            <label class="ml-1 bldHvr" for="hma">HMA</label>
                        </div>
                        <button id="manChoice" class="btn btn-secondary btn-sm mt-1" title="click to choose manufacture" style='float: right;'>Submit</button>
                    </div>
                </div> 
            </div>
        </div>
        
        <div class="modal fade" id="alertModal" role="dialog" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered modal-sm" id='alrtMdl' style="width: 250px;">
                <div class="modal-content border border-dark dropShadow" id="alertModalPlot">
                    <div class="modal-body bgLtYellow" id="alertModalBody">
                        <div class="col-12 border border-dark rounded bgLtBlueGrad">
                            <h6 class="bold" id='alertData'></h6>    
                        </div>
                        <button class="btn btn-primary btn-block bold mt-2" id="alertClose">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<!-- required js -->
<script src="js/common/moment.min.js"></script>
<script src="js/common/jquery-ui.min.js"></script>
<script src="js/logic/script.js"></script>
</html>
