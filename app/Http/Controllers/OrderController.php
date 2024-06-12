<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Reports;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return Inertia::render(
            'Orders/Index', [
                'orders' => $orders
            ]
        );
    }

    public function show(Order $order)
    {
        return Inertia::render(
            'Orders/Show', [
                'order' => $order
            ]
        );
    }

    public function create()
    {
        return Inertia::render('Orders/Create');
    }

    public function store(Request $request)
    {
        $order = Order::create($request->all());

        Reports::create(
            [
                'user_id' => auth()->user()->id,
                'description' => auth()->user()->name . ' created an order',
                'date' => now(),
                'name' => 'Order Create',
            ]
        );
        return redirect()->route('orders.show', $order);
    }
}
