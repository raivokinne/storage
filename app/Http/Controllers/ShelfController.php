<?php

namespace App\Http\Controllers;

use App\Models\Reports;
use App\Models\Shelf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class ShelfController extends Controller
{
    public function index()
    {
        $shelves = Shelf::all();
        $shelves->load('product');
        $shelves->load('user');
        return Inertia::render('Shelf/Index', compact('shelves'));
    }

    public function edit($id)
    {
        $shelf = Shelf::find($id);
        $shelf->load('product');
        $shelf->load('user');
        return Inertia::render('Shelf/Edit', compact('shelf'));
    }

    public function show($id)
    {
        $shelf = Shelf::find($id);
        $shelf->load('product');
        $shelf->load('user');
        return Inertia::render('Shelf/Show', compact('shelf'));
    }

    public function create()
    {
        $products = Product::all();
        return Inertia::render('Shelf/Create', compact('products'));
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'name' => 'required|min:3|max:255',
                'product_id' => 'required',
            ]
        );
        $shelf = new Shelf();
        $shelf->name = $request->name;
        $shelf->user_id = auth()->user()->id;
        $shelf->product_id = $request->product_id;
        $shelf->save();
        Reports::create(
            [
                'user_id' => auth()->user()->id,
                'description' => $shelf->name . ' was created by ' . auth()->user()->name,
                'date' => now(),
                'name' => 'Shelf Create',
            ]
        );
        return redirect()->route('shelf.index');
    }

    public function destroy($id)
    {
        $shelf = Shelf::find($id);
        $shelf->delete();
        Reports::create(
            [
                'user_id' => auth()->user()->id,
                'description' => $shelf->name . ' was deleted by ' . auth()->user()->name,
                'date' => now(),
                'name' => 'Shelf Delete',
            ]
        );
        return redirect()->route('shelf.index');
    }

    public function update(Request $request, $id)
    {
        $request->validate(
            [
                'name' => 'required|min:3|max:255',
                'product_id' => 'required',
            ]
        );
        $shelf = Shelf::find($id);
        $shelf->name = $request->name;
        $shelf->active = 1;
        $shelf->user_id = auth()->user()->id;
        $shelf->product_id = $request->product_id;
        $shelf->save();

        Reports::create(
            [
                'user_id' => auth()->user()->id,
                'description' => $shelf->name . ' was updated by ' . auth()->user()->name,
                'date' => now(),
                'name' => 'Shelf Update',
            ]
        );

        return redirect()->route('shelf.index');
    }
}
