<?php
ini_set("allow_url_fopen", 1);
header('Content-Type: application/json');

$file_json = "../../../resources/ListOfCitys.json";

$fin = array();

if(file_exists($file_json)){
    
    $gestor = fopen($file_json, "r");
    $filebuf = fread($gestor, filesize($file_json));
    fclose($gestor);
    
    $datos  = json_decode($filebuf);
    foreach($datos as $d){
        
        $name='';
        if(isset($_POST['sName'])){
            $name = $_POST['sName'];
        }
        if(isset($_GET['sName'])){
            $name = $_GET['sName'];
        }
        
        $busqueda = strpos(strtolower($d->sName),strtolower($name));
        if($busqueda === false){}else{
            
            
            $buffero1 = array();
            $buffero1['sISOCode']   = $d->sISOCode;
            $buffero1['sName']      = $d->sName;
            /*$buffero1['url']        = $d->url;*/
            $buffero1['foto']       = $d->foto;
            
            
            //$n = str_replace(strtolower($name),'<b>'.strtolower($d->sName).'</b>',strtolower($d->sName));
            $fin[]=$buffero1;
        }
    }
    

}

if(count($fin) == 0){
            $buffero1 = array();
            $buffero1['sISOCode']   = '';
            $buffero1['sName']      = 'Sin resultados';
         
            $fin[]=$buffero1;
}


echo json_encode($fin);



?>