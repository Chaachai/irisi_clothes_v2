<?php

use App\Http\Controllers\KeywordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \Laravel\Passport\Http\Controllers\AccessTokenController;

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

Route::post('login', [AccessTokenController::class], 'issueToken')
    ->middleware(['api-login', 'throttle']);

Route::resource('brandss', 'BrandController');
Route::resource('g_categories', 'GCategoryController');
Route::resource('categories', 'CategoryController');
Route::resource('discounts', 'DiscountController');
Route::resource('products', 'ProductController');
Route::resource('roles', 'RoleController');
Route::resource('carts', 'CartController');
Route::resource('cart_items', 'CartItemController');

Route::resource('keywords', 'KeywordController');

Route::get('productByKeyword/{keyword}', 'ProductController@getProductsByKeywords');
Route::get('getCartByUser/{user_id}', 'CartController@getCartByUser');
Route::get('get_image/{photo_id}/{color}', 'PhotoController@getImageByColor');
Route::get('get_items_by_photo/{cart_id}', 'CartItemController@getItemsWithPhoto');
Route::get('updateCartItem/{data}', 'CartItemController@updateCartItem');
Route::get('calculate_amount/{cart_id}', 'CartItemController@calculateTotalAmount');


Route::get('prodcat/{g_cat_id}', 'ProductController@getProductsByGCategory');

Route::get('items_by_cart/{cart_id}', 'CartItemController@getItemsByCart');

Route::group(['middleware' => ['jwt.auth','api-header']], function () {
  
    // all routes to protected resources are registered here  
    Route::get('users/list', function(){
        $users = App\User::all();
        
        $response = ['success'=>true, 'data'=>$users];
        return response()->json($response, 201);
    });
});
Route::group(['middleware' => 'api-header'], function () {
  
    // The registration and login requests doesn't come with tokens 
    // as users at that point have not been authenticated yet
    // Therefore the jwtMiddleware will be exclusive of them

    Route::post('user/login', 'UserController@login');
    Route::post('user/register', 'UserController@register');
});


Route::get('images/{id}', 'PhotoController@getPhoto');