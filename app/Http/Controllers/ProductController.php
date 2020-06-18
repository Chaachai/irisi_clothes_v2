<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Product;
use App\GCategory;
use App\Category;
use SebastianBergmann\Environment\Console;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        return $products->toJson();
    }

    public function getProductsByKeywords($keyword)
    {
        Log::debug('keyword ========== ' . $keyword);
        $regExp = '%' . $keyword . '%';
        $products = Product::where('description', 'LIKE', $regExp)->get();
        Log::debug('Results for keyword ========== ' . $products);
        return $products->toJson();
    }

    public function getProductsByGCategory($g_cat_id)
    {
        
        $res = [];
        $categories = Category::all();
        $products = Product::all();

        foreach ($categories as $category) {
            if ($category->g_category_id == $g_cat_id) {
                foreach ($products as $product) {
                    if ($product->category_id == $category->id) {
                        array_push($res, $product);
                    }
                }
            }
        }

        return json_encode($res);
        // return $categories->toJson();
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
        $product = Product::where('id', $id)->first();
        return response()->json($product);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
    }
}
