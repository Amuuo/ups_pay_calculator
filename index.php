
<!DOCTYPE html>
<html>


<head>
  <link rel="stylesheet" href="css/index.css">  
  <script src="jQueryAssets/jquery-1.11.1.min.js"></script>  
</head>

<body>
  <a href="./register.php">Register</a>
  <header>
    <img id="logo" src="img/ups_logo.png">
  </header>  
  <main>

    <div class="employee_record">
      <div class="identifier">Name</div>
      <div class="value">Adam Williams</div>
      <div class="identifier">Hourly Rate</div>
      <div class="value">$14.00</div> 
      <div class="shift_input_container">
        <div class="shift_start_container">
          <label for="shift_start_input">Shift Start</label>
          <input id="shift_start_input" class="shift_input" type="time"></input>
        </div>
        <div class="shift_end_container">
          <label for="shift_end_input">Shift End<br></label>
          <input id="shift_end_input" class="shift_input" type="time" ></input>
        </div>
        <input class="shift_submit_button" type="button" value="Submit Shift"></input>
      </div>
    </div>
    <table id="pay_data">
      <tr>    
        <td style="width: 30%"></td>
        <th scope="col" col=2 style="width: 30%"> Hours</th>
        <th scope="col" style="width: 30%"> Earnings</th>
      </tr>
      <tr>
        <th scope="row">Regular</th>
        <td id="reg_hours"></td>
        <td id="reg_pay"></td>
      </tr>
      <tr>
        <th scope="row">Overtime</th>
        <td id="ot_hours" col=2></td>
        <td id="ot_pay" col=3></td>        
      </tr>
      <tr>
        <th scope="row">Total</th>
        <td id="tot_hours" col=2></td>
        <td id="tot_pay" col=3></td>
      </tr>
      <tr>
        <th scope="row">Avg Payrate</th>
        <td id="avg_payrate" colspan=2></td>
      </tr>

    </table>
    <input id    = "show_employee_button" 
           type  = "button" 
           value = "Show Employee Data">
    </input>
  <footer>
    <div id="footer">
      Adam Williams &copy; 2020
    </div>
  </footer>
  </main>
</body>  

<script src="js/index.js"></script>
</html>

