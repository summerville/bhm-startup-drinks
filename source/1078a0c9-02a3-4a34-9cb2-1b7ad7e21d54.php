<?php 
$to1 = "kdallas";
$to2 = "BHMStartupDrinks.com";
$to = $to1;
$to.="@";
$to.=$to2;
$subject = "Add to mailing list for BHM Startup Drinks";
$headers = "From: kdallas@BHMStartupDrinks.com";
$message = "";
$sent = false;
foreach ($_POST as $k => $v) 
{
if($k == "email") {
	$sent = true;
}
	if ($k != "x" && $k != "y")
	{
		$message .= "$k = $v \r\n"; 
	}
}
if ($sent)
{
$sent = mail($to, $subject, $message, $headers);
}
if ($sent == false)
{
$sent = mail($to, $subject, $message, $headers, '-fkdallas@BHMStartupDrinks.com');
}
if($sent) 
{header('Location:http://www.bhmstartupdrinks.com/Thank-you-for-your-support!.html');
print "<p>Your mail was sent successfully"; 
print "Please click <a href='http://www.bhmstartupdrinks.com/Thank-you-for-your-support!.html'>here</a> to return to the Web site "; 
print "</p>";}
else
{print "<p>Sorry, we encountered an error processing your request<br><br>"; 
print "Please click <a href='javascript:history.back()'>here</a> to return to the Web site "; 
print " and try again.</p>"; }
?>
