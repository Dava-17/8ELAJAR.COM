<?php 

$name = $_REQUEST['name'];
$email = $_REQUEST['Email'];
$message = $_REQUEST['Message'];

if (empty($name) || empty($email) || empty($message))
{
	echo "Please fill all the fields";
}
else 
{
	mail("8elajar@technologist.com", "Website Respon", $message,"From : $name <$email>");
	echo "<script type='text/javascript'>alert('Thank You For Your Message 😍😍😍');
		window.location.href = '../../Tentang Kami.html';
	</script>";
}
?>