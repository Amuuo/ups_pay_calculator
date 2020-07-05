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
    </main>
  <script type="text/javascript">
    $(document).ready(() => {
	    $( "#Checkboxes1" ).buttonset(); 
    });
    </script>
  </body>  
<script src="js/index.js"></script>
</html>