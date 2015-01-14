<?php

//Connect To Database
$hostname='bhm032212956222.db.5150072.hostedresource.com';

//Try using the read-only user name and password once everything is working
$username='bhm032212956222';
$password='Gr3atW0rk';
$dbname='bhm032212956222';

$usertable='mapdata';
//$yourfield = 'your_field';

$link = mysql_connect($hostname,$username, $password) OR DIE ('Unable to connect to database');
mysql_select_db($dbname, $link) or DIE ('Cannot select the database');

//Grab records from database

$query = "SELECT * FROM $usertable";

$result = mysql_query($query, $link) or DIE ('Errant query:  ' . $query);

$posts = array();

if(mysql_num_rows($result)) {
    while($post = mysql_fetch_assoc($result)) {
        $posts[] = array($post);
    }
}

//Output into JSON format

header('Content-type: application/json');
//echo json_encode(array($posts));

$finishedstring = json_encode(array($posts));

$finishedstring = substr($finishedstring, 3, (strlen($finishedstring)-6));

echo $finishedstring;



//Disconnect from database
@mysql_close($link);

?> 