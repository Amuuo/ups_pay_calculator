
<?php
  
//==============================================================================

  function addTblCell(&$data) {
    return "<td>$data</td>";
  }    
  
  function addTableHeaderRow(&$conn, $tbl_name) {
    
    $results = $conn->query("SHOW COLUMNS FROM $tbl_name");          
    
    echo "<thead><tr id=\"header_row\">";          
    while ($row = mysqli_fetch_array($results))
      echo addTblCell($row['Field']);
    
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
  $table_str = "pay_view";

  if($conn->connect_error)
    die("Connection failed: " . $conn->connect_error);         
  
  if(!($results = $conn->query("SELECT * FROM $table_str")))
    echo "Could not receive the results of query";
  
  
  echo "<table id=\"employee_table\" align=\"center\">";
  
  addTableHeaderRow($conn, "pay_view");
  
  while($row = $results->fetch_assoc()) {
    echo "<tr>";          
    $format_pay_rate = number_format($row["pay"], 2);
    echo "<td align=\"center\">{$row["id"]}</td>";
    echo addTblCell($row["name"]);    
    echo "<td id=\"pay\">\${$format_pay_rate}</td>";        
    echo "</tr>";
  }
  echo "</table>";

  $conn = null;

//==============================================================================
?>  
