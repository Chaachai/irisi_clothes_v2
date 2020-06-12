<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('brandss', 'BrandController');
Route::resource('g_categories', 'GCategoryController');
Route::resource('categories', 'CategoryController');
Route::resource('discounts', 'DiscountController');
Route::resource('products', 'ProductController');
Route::resource('roles', 'RoleController');


Route::get('prodcat/{g_cat_id}', 'ProductController@getProductsByGCategory');
