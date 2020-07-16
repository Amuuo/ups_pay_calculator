<?php

  if ($_GET['id']):
    $con = mysqli_connect('localhost', 'root', '', 'ups');
    $sql = "SELECT * FROM ups.employee e WHERE e.id=$_GET[id]";
    
  endif;
?>