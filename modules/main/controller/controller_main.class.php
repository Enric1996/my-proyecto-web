 <?php
session_start();
include (__DIR__ . "/../../../utils/common.inc.php");
$path = $_SERVER['DOCUMENT_ROOT'] . '';
define('SITE_ROOT', $path);

if ($_GET["idProduct"]) {
    $id = $_GET["idProduct"];
    $path_model = SITE_ROOT . '/modules/products/model/model/';
    $arrValue = loadModel($path_model, "products_model", "details_products",$id);
    
    if ($arrValue[0]) {
        loadView('modules/products/view/', 'details_products.php', $arrValue[0]);
    } else {
        $message = "NOT FOUND PRODUCT";
        loadView('view/inc/', '404.php', $message);
    }
} else {
    $path_model = SITE_ROOT . '/modules/products/model/model/';
    $arrValue = loadModel($path_model, "products_model", "list_products");
    
    if ($arrValue) {
        loadView('modules/products/view/', 'list_products.php', $arrValue);
    } else {
        $message = "NOT PRODUCTS";
        loadView('view/inc/', '404.php', $message);
    }
}