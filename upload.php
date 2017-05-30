<?php
if ( !empty( $_FILES ) ) {
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    $result = move_uploaded_file( $tempPath, $uploadPath );
    $answer = array( 'result' => $result, 'answer' => 'File transfer completed', 'uploadPath' => $uploadPath, 'temp_path' => $tempPath );
    $json = json_encode( $answer );
    echo $json;
} else {
    echo 'No files';
}
?>