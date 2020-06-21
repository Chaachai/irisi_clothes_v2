<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\CartItem;
use App\Product;
use App\Photo;

class CartItemController extends Controller
{


    public function getItemsByCart($cart_id){
        $items = CartItem::where('cart_id', $cart_id)->get();
        return $items->toJson();
    }



    public function getItemsWithPhoto($cart_id){
        $items = CartItem::where('cart_id', $cart_id)->get();
        $products = Product::all();
        $photos = Photo::all();

        $mPhotos = [];
        $mProducts = [];
        foreach ($items as $item) {
            foreach ($photos as $photo) {
                if($photo->product_id == $item->product_id && $photo->color == $item->color){
                    array_push($mPhotos, $photo);
                }
            }
            foreach ($products as $product) {
                if ($product->id == $item->product_id) {
                    array_push($mProducts, $product);
                }
            }
        }

        $mItems = [];
        for($i = 0; $i < sizeof($items); $i++){
            $obj = array(
                'mId' => $items[$i]->id, 
                'mImage' => $mPhotos[$i]->image,
                'mProduct' => $mProducts[$i]->name,
                'mDescription' => $mProducts[$i]->description,
                'mColor' => $items[$i]->color,
                'mSize' => $items[$i]->size,
                'mPrice' => $mProducts[$i]->unit_price,
                'mQuantity' => $items[$i]->quantity
            );
            array_push($mItems, $obj);
        }

        // Log::debug('keyword ========== ' . json_encode($mItems));

        return json_encode($mItems);
        
    } 


    public function calculateTotalAmount($cart_id){
        $items = CartItem::where('cart_id', $cart_id)->get();
        $products = Product::all();
        $sum = 0;
        foreach ($items as $item) {
            foreach ($products as $product) {
                if ($product->id == $item->product_id) {
                    $sum += ($item->quantity * $product->unit_price); 
                }
            }
        }
        Log::debug('sum ========== ' . $sum);
        return $sum;
    }


    

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        //create the post using Post Model
        // CartItem::create([
        //     'color' => $request->color,
        //   'size' => $request->size,
        //   'cart_id' => $request->cart_id,
        //   'product_id' => $request->product_id
        // ]);
        
        $cart_item = new CartItem();
        $cart_item->color = $request->input('color');
        $cart_item->size = $request->input('size');
        $cart_item->cart_id = $request->input('cart_id');
        $cart_item->product_id = $request->input('product_id');
        // Log::debug('request ========== ' . $request);
    	$cart_item->save();

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $cart_item = CartItem::findOrFail($id);
		return response()->json([
			'cart_item' => $cart_item,
		]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */


    public function updateCartItem($data){


        $item =  CartItem::where('id', $data->id)->get();
 
        $item->quantity = $data->quantity ;
 
        CartItem::where('id', $data->id)->update($item->all());
 
 
      }


    public function update(Request $request, $id)
    {
        // $input = $request->all();
		// $cart_item = CartItem::findOrFail($id);
		// $cart_item->update($input);
		// return response()->json();

        // $data = $request;

        // Log::debug('REQUEST ========== ' .$request);
        Log::debug('ID ========== ' .$id);
        CartItem::where('id', $id)->update(['quantity'=>$request->input('quantity')]);
        // CartItem::where('id', $id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $item = CartItem::findOrFail($id);
        $item->delete();

    }
}
