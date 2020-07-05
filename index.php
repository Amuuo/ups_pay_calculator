<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="css/index.css">
    <link href="jQueryAssets/jquery.ui.core.min.css" rel="stylesheet" type="text/css">
    <link href="jQueryAssets/jquery.ui.theme.min.css" rel="stylesheet" type="text/css">
    <link href="jQueryAssets/jquery.ui.button.min.css" rel="stylesheet" type="text/css">    
    <script src="jQueryAssets/jquery-1.11.1.min.js"></script>
    <script src="jQueryAssets/jquery.ui-1.10.4.button.min.js"></script>
  </head>
  <body>
    <header>
      <img id="logo" src="img/ups_logo.png">
    </header>  
    <main>

      <div id="Checkboxes1">
        <input type="checkbox" id="Checkbox1">
        <label for="Checkbox1">Hourly</label>
        <input type="checkbox" id="Checkbox2">
        <label for="Checkbox2">Management</label>
      </div>
      <div class="employee_record">
        <div class="identifier">Name</div>
          <div class="value">Adam Williams</div>
        <div class="identifier">Hourly Rate</div>
          <div class="value">$14.00</div>
        <div class="shift_input_container">
          <div id="shift_start_container">
            <label for="shift_start_input">Shift Start</label>
            <input id="shift_start_input" class="shift_input" type="time"></input>
          </div>
          <div id="shift_end_container">
            <label for="shift_end_input">Shift End<br></label>
            <input id="shift_end_input" class="shift_input" type="time" ></input>
          </div>
          <input id="shift_submit_button" type="button" value="Enter"></input>
        </div>
    </div>
      <input type="button" id="show_button" value="Hide Employee Data"></input>
    </main>

  </body>  
<script src="js/index.js"></script>
</html>