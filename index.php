
<!DOCTYPE html>
<html>


<head>
  <link rel="stylesheet" href="css/index.css">  
  <script src="jQueryAssets/jquery-1.11.1.min.js"></script>  
</head>

<body>

  <header>
    <img id="logo" src="img/ups_logo.png">
  </header>  
  <main>

    <div id="hourly_rate_container" class="blue_bubble_background">
      <div class="identifier">Hourly Rate</div>
       $<input id="hourly_rate_input" type="number" value="14.50" min="0.00" max="10000.00" step="1.00"></input>/hr 
    </div>
    <div class="employee_record blue_bubble_background">
      <p class="inline_paragraph">Shift</p>
      <div class="shift_input_container">
        <div class="shift_start_container">          
          <input id="shift_start_input" class="shift_input" type="time" value="17:00"></input>
        </div>
        <p>  -  </p>
        <div class="shift_end_container">          
          <input id="shift_end_input" class="shift_input" type="time"></input>
        </div>
<<<<<<< HEAD
=======
        <input class="shift_submit_button" type="button" value="Save Shift"></input>
>>>>>>> dd5ff1f... removed modifiy_form_divs()
      </div>
      <input class="shift_input_button" type="button" value="Save Shift"></input>
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

  </main>
    <footer>
      <div id="footer">
        <p>Adam Williams &copy; 2020</p>
      </div>
    </footer>
</body>  
<script src="js/index_classes.js"></script>
<script src="js/index.js"></script>
<script src="js/index_functions.js"></script>
</html>

