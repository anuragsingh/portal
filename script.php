<?php
header('Access-Control-Allow-Origin: *');
$img = $_POST['my_hidden'];
//echo $img;die;
//$upload_dir = somehow_get_upload_dir();
//$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
//$file = $upload_dir."image_name.png";
$file = "image_name_".time().".png";
$success = file_put_contents($file, $data);
//header('Location: '.$_POST['return_url']);
//echo 'done';
?>