<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=windows-1252">
    <link rel="stylesheet" href="css/index.css">
    <script src="jQueryAssets/jquery-1.11.1.min.js"></script>
  </head>
  <body>
    <header> <img id="logo" src="img/ups_logo.png"> </header>

    <table id="pay_data">
      <tbody>
        <tr>
          <td style="width: 30%"><br>
          </td>
          <th scope="col" col="2" style="width: 30%"> Hours</th>
          <th scope="col" style="width: 30%"> Earnings</th>
        </tr>
        <tr>
          <th scope="row">Regular</th>
          <td id="reg_hours"><br>
          </td>
          <td id="reg_pay"><br>
          </td>
        </tr>
        <tr>
          <th scope="row">Overtime</th>
          <td id="ot_hours" col="2"><br>
          </td>
          <td id="ot_pay" col="3"><br>
          </td>
        </tr>
        <tr>
          <th scope="row">Total</th>
          <td id="tot_hours" col="2"><br>
          </td>
          <td id="tot_pay" col="3"><br>
          </td>
        </tr>
        <tr>
          <th scope="row">Avg Pay Rate</th>
          <td id="avg_payrate" colspan="2"><br>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="form_container">
      <div id="hourly_rate_container" class="blue_bubble_background">
        <div class="identifier">Hourly Rate</div>
        $<input id="hourly_rate_input" value="14.50" min="0.00" max="10000.00" step="1.00"type="number">/hr 
      </div>
      <div class="employee_record blue_bubble_background">
        <p class="inline_paragraph">Main Shift</p>
        <div class="shift_input_container"> 
          <input id="main_shift_start_input" class="shift_input" value="17:00" type="time">
          <p>-</p>
          <input id="main_shift_end_input" class="shift_input" type="time"> 
        </div>
        <input class="shift_input_button" value="Save Shift" type="button"> 
      </div>
      <div class="employee_record blue_bubble_background">
        <p class="inline_paragraph">Double Shift</p>
        <div class="shift_input_container"> 
          <input id="double_shift_start_input" class="shift_input" value="17:00" type="time">
          <p>-</p>
          <input id="doubule_shift_end_input" class="shift_input" type="time"> 
        </div>
        <input class="shift_input_button" value="Save Shift" type="button">
      </div> 
    </div>
    
    <footer>
      <div id="footer">
        <p>Adam Williams � 2020</p>
      </div>
    </footer>
    <script src="js/index_classes.js"></script>
    <script src="js/index.js"></script>
    <script src="js/index_functions.js"></script>
  </body>
</html>
