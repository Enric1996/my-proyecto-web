<?php
/*I use this to avoid header problems*/
ob_start();
session_start();
$_SESSION['module'] = "";
$_SESSION['result_prodpic'] = array();

require_once("template-food/inc/header.php");
require_once("template-food/inc/menu.php");
require_once("paths.php");

include ('utils/utils.inc.php');

if (!isset($_GET['module'])){
    require_once("modules/main/view/main.html");
} else if((isset($_GET['module'])) && (!isset($_GET['view']))){
    require_once("modules/".$_GET['module']."/controller/controller_" .$_GET['module']. ".class.php");
}

if ( (isset($_GET['module'])) && (isset($_GET['view'])) ){
    require_once("modules/".$_GET['module']."/view/".$_GET['view'].".html");
    /*require_once("modules/".$_GET['module']."/view/".$_GET['view'].".php");*/
}

require_once("template-food/inc/footer.html");
