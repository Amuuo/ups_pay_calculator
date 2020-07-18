
<?php

  $conn = new mysqli("localhost", "root", "", "ups");
  $query = "SELECT * FROM ups.employee
            INNER JOIN ups.address ON employee.address_id = address.id;";
  $result = mysqli_query($conn, $query);
  //$result->fetch_assoc()
  echo json_encode($result);
?>
