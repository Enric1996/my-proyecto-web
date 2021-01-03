<?php
//echo json_encode("products_dao.class.singleton.php");
//exit;

class productDAO {
    static $_instance;

    private function __construct() {

    }

    public static function getInstance() {
        if(!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function create_product_DAO($db, $arrArgument) {
        $prodname = $arrArgument['prodname'];
        $prodprice = $arrArgument['prodprice'];
        $date_reception = $arrArgument['date_reception'];
        $date_expiration = $arrArgument['date_expiration'];
        $promotion = $arrArgument['promotion'];
        $country = $arrArgument['country'];
        $city = $arrArgument['city'];
        $food = $arrArgument['food'];
        $proddesc = $arrArgument['proddesc'];
        $prodpic = $arrArgument['prodpic'];
        $cat1 = $arrArgument['cat1'];
        $cat2 = $arrArgument['cat2'];
        $cat3 = $arrArgument['cat3'];
        $cat4 = $arrArgument['cat4'];
        
     /*   echo json_encode($arrArgument);
        echo json_encode($arrArgument['cat1']);
        echo json_encode($arrArgument['cat2']);
        echo json_encode($arrArgument['cat3']);
        echo json_encode($arrArgument['cat4']);
        exit;*/
        
        

        
/*
            if ($cat1 === 'Famili')
                $cat1 = 1;
            if ($cat2 === 'Fashion')
                $cat2 = 1;
            if ($cat3 === 'Friends')
                $cat3 = 1;
            if ($cat4 === 'Terrace')
                $cat4 = 1;
  */  
        
        
        
        
        $sql = "INSERT INTO `products`(`prodname`, `prodprice`, `date_reception`,"
                ."`date_expiration`, `cat1`, `cat2`, `cat3`, `cat4`, `promotion`, `country`, `food`,"
                ."`city`, `proddesc`, `prodpic`) VALUES ('$prodname','$prodprice',"
                ."'$date_reception','$date_expiration','$cat1','$cat2','$cat3','$cat4',"
                ."'$promotion','$country','$food','$city','$proddesc','$prodpic')";
        
        /*$sql = "INSERT INTO products (prodname, prodref, prodprice, date_reception,"
                . " date_expiration, cat1, cat2, cat3, cat4, packaging, country, province,"
                . " city, proddesc, prodpic) VALUES ('$prodname', '$prodref',"
                . " '$prodprice', '$date_reception', '$date_expiration', '$cat1', "
                . " '$cat2', '$cat3', '$cat4', '$packaging', '$country', '$province',"
                . " '$city', '$proddesc', '$prodpic')";*/

        return $db->ejecutar($sql);
    }

    public function obtain_countries_DAO($url){
          $ch = curl_init();
          curl_setopt ($ch, CURLOPT_URL, $url);
          curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
          curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 5);
          $file_contents = curl_exec($ch);

          $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
          curl_close($ch);
          $accepted_response = array(200, 301, 302);
          if(!in_array($httpcode, $accepted_response)){
            return FALSE;
          }else{
            return ($file_contents) ? $file_contents : FALSE;
          }
    }

    public function obtain_provinces_DAO(){
          $json = array();
          $tmp = array();

          $provincias = simplexml_load_file($_SERVER['DOCUMENT_ROOT'].'/FW-PHP-MVC-OO-JS-JQuery/resources/provinciasypoblaciones.xml');
          $result = $provincias->xpath("/lista/provincia/nombre | /lista/provincia/@id");
          for ($i=0; $i<count($result); $i+=2) {
            $e=$i+1;
            $provincia=$result[$e];

            $tmp = array(
              'id' => (string) $result[$i], 'nombre' => (string) $provincia
            );
            array_push($json, $tmp);
          }
              return $jsons;

    }

    public function obtain_cities_DAO($arrArgument){
          $json = array();
          $tmp = array();

          $filter = (string)$arrArgument;
          $xml = simplexml_load_file($_SERVER['DOCUMENT_ROOT'].'/FW-PHP-MVC-OO-JS-JQuery/resources/provinciasypoblaciones.xml');
          $result = $xml->xpath("/lista/provincia[@id='$filter']/localidades");

          for ($i=0; $i<count($result[0]); $i++) {
              $tmp = array(
                'poblacion' => (string) $result[0]->localidad[$i]
              );
              array_push($json, $tmp);
          }
          return $json;
    }
}//End productDAO
