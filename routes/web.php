<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('05_page/map');
});


Route::get('/{page}', function ($page) {
    if($page == 'ty'){
        Session::flash('download.in.the.next.request', '/dl');
    }
    if($page == 'dl'){
        $file= public_path(). "/download/info.pdf";

        $headers = array(
            'Content-Type: application/pdf',
        );
        return Response::download($file, 'iesniegums.pdf', $headers);
        return view('05_page/ty');
    }

    if(View::exists('05_page/'.$page)){
        return view('05_page/'.$page);
    }else{
        return view('05_page/landing');
    }
});