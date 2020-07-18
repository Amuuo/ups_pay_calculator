
<?php
  
//==============================================================================

  function addTblCell(&$data) {
    echo "<td>$data</td>";
  }    
  
  function addTableHeaderRow(&$conn, $tbl_name) {
    
    $results = $conn->query("SHOW COLUMNS FROM $tbl_name");          
    
    echo "<thead><tr id=\"header_row\">";          
    while ($row = mysqli_fetch_array($results))
      addTblCell($row['Field']);
    
    echo "</tr></thead>";
  }

  function addTableRow($row) {
    echo "<tr>";
    
    for ($i = 0; $i < $row.length; $i++)
      addTblCell($row[$i]);
    
    echo "</tr>";
  }

//==============================================================================


  $conn = new mysqli("localhost", "root", "", "ups");
              
  if($conn->connect_error)
    die("Connection failed: " . $conn->connect_error);         
  
  if(!($results = $conn->query("SELECT * FROM employee")))
    echo "Could not receive the results of query";
  
  
  echo "<table id=\"employee_table\" align=\"center\">";
  
  addTableHeaderRow($conn, "employee");
  
  while($row = $results->fetch_assoc()) {
    echo "<tr>";          
    $format_pay_rate = number_format($row["pay_rate"], 2);
    echo "<td align=\"center\">{$row["id"]}</td>";
    echo "<td>{$row["first_name"]}</td>";
    echo "<td>{$row["last_name"]}</td>";
    echo "<td id=\"pay\">\${$format_pay_rate}</td>";
    echo "<td>{$row["address_id"]}</td>";
    echo "<td>{$row["email"]}</td>";
    echo "</tr>";
  }
  echo "</table>";

//==============================================================================
?>  
