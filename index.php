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
    <a href="./register.php">Register</a>
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
      <div id="pay_data">
        <p style="grid-area: hours">Hours</p>
        <p style="grid-area: pay">Earnings</p>
        <p style="grid-area: tot_id">Total</p>
        <p style="grid-area: reg_id">Regular</p>
        <p style="grid-area: ot_id">Overtime</p>
        <p id="reg_hours" style="grid-area: reg_hours"></p>
        <p id="reg_pay"   style="grid-area: reg_pay"></p>
        <p id="ot_hours"  style="grid-area: ot_hours"></p>
        <p id="ot_pay"    style="grid-area: ot_pay"></p>
        <p id="tot_hours" style="grid-area: tot_hours"></p>
        <p id="tot_pay"   style="grid-area: tot_pay"></p>
      </div>
      <?php 
        
        $conn = new mysqli("localhost", "root", "", "ups");
        
        function addTblCell(&$data) {
          echo "<td>$data</td>";
        }
        
        
        function addTablerHeaderRow(&$row, $tbl_name) {
          $results = $conn->query("SHOW COLUMNS FROM $tbl_name");          
          echo "<thead><tr>";
          while ($row = mysqli_fetch_array($results)) {
            addTblCell($row['Field']);
          }
          echo "</tr></thead>";
        }

        function addTableRow($row) {

          for ($i = 0; $i < $row.length; $i++) {
            echo "<td>$row[$i]</td>";
          }
        }
        
        
        if($conn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
        }
        echo "<p align=\"center\" style=\"color: green\">";
        echo "<strong>Connected successfully<strong></p>";        
        
        if(!($results = $conn->query("SELECT * FROM employee"))){                          
          echo "Could not receive the results of query";
        }

        echo "<table align=\"center\">";
        echo "<thead><td>ID</td><td>First Name</td><td>Last Name</td>";
        echo "<td>Pay Rate</td></thead>";
        
        while($row = $results->fetch_assoc()) {
          echo "<tr>";          
          $format_pay_rate = number_format($row["pay_rate"], 2);
          echo "<td align=\"center\">{$row["id"]}</td><td>{$row["first_name"]}</td>";
          echo "<td>{$row["last_name"]}</td><td id=\"pay\">\${$format_pay_rate}</td>";
          echo "</tr>";
        }
        echo "</table>";
      ?>   
    </main>
  </body>  
<script src="js/index.js"></script>
</html>