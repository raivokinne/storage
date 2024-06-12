<?php

namespace App\Http\Controllers;

use App\Models\Reports;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportsController extends Controller
{
    public function index()
    {
        return Inertia::render(
            'Reports/Index',
            [
                'reports' => Reports::all(),
            ]
        );
    }

    public function create()
    {
        return Inertia::render('Reports/Create');
    }

    public function edit($id)
    {
        $report = Reports::find($id);
        return Inertia::render('Reports/Edit', compact('report'));
    }

    public function show($id)
    {
        $report = Reports::find($id);
        return Inertia::render('Reports/Show', compact('report'));
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'name' => 'required|min:3|max:255',
                'description' => 'required|min:3|max:255',
                'date' => 'required|date',
            ]
        );

        $request['user_id'] = auth()->user()->id;

        Reports::create($request->all());

        return redirect()->route('report.index');
    }

    public function destroy($id)
    {
        $report = Reports::find($id);
        $report->delete();
        return redirect()->route('report.index');
    }

    public function update(Request $request, $id)
    {
        $request->validate(
            [
                'name' => 'required|min:3|max:255',
                'description' => 'required|min:3|max:255',
                'date' => 'required|date',
            ]
        );
        $report = Reports::find($id);
        $report->name = $request->name;
        $report->description = $request->description;
        $report->date = $request->date;
        $report->user_id = auth()->user()->id;
        $report->save();
        Reports::create(
            [
                'user_id' => auth()->user()->id,
                'description' => $report->name . ' was updated by ' . auth()->user()->name,
                'date' => now(),
                'name' => 'Report Update',
            ]
        );
        return redirect()->route('reports.index');
    }
}
