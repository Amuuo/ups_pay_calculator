
<?php

  $conn = new mysqli("localhost", "root", "", "ups");
              
  if($conn->connect_error)
    die("Connection failed: " . $conn->connect_error);         

  $query = "SELECT * FROM ups.employee INNER JOIN ups.address a ON a.id = e.address_id";

  if(!($results = $conn->query($query)))
    echo "Could not receive the results of query";
  
  //$result->fetch_assoc()
  echo $results->fetch_assoc();
  echo json_encode($results->fetch_assoc());
  
?>
