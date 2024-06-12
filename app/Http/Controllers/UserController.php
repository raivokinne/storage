<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Reports;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $users = User::query();

        if ($search) {
            $users->where('name', 'like', '%' . $search . '%');
        }

        $users = $users->latest()->paginate(10);

        return Inertia::render(
            'Users/Index',
            [
                'users' => UserResource::collection($users),
                'filters' => $request->only('search'),
            ]
        );
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        $users = User::where('name', 'like', '%' . $search . '%')->paginate(10);

        return Inertia::render(
            'Users/Index',
            [
                'users' => UserResource::collection($users),
                'filters' => $request->only('search'),
            ]
        );
    }

    public function show(User $user)
    {
        return Inertia::render(
            'Users/Profile/Show',
            [
                'user' => $user,
                'auth' => Auth::user(),
            ]
        );
    }

    public function edit(User $user)
    {
        return Inertia::render(
            'Users/Edit',
            [
                'user' => new UserResource($user),
            ]
        );
    }

    public function update(Request $request, User $user)
    {
        $request->validate(
            [
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
                'password' => ['nullable', 'string', 'min:8', 'confirmed'],
                'role' => ['required', 'string', 'max:255'],
            ]
        );

        $data = $request->all();

        if ($request->password) {
            $data['password'] = bcrypt($request->password);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        Reports::create(
            [
                'user_id' => auth()->user()->id,
                'description' => $user->name . ' was updated by ' . auth()->user()->name,
                'date' => now(),
                'name' => 'User Update',
            ]
        );

        // Pass the user parameter correctly here
        return redirect()->route('users.show', ['user' => $user->id]);
    }

    public function destroy(User $user)
    {
        $user->delete();
        Reports::create(
            [
                'user_id' => auth()->user()->id,
                'description' => $user->name . ' was deleted by ' . auth()->user()->name,
                'date' => now(),
                'name' => 'User Delete',
            ]
        );
        // Pass the user parameter correctly here
        return redirect()->route('users.index');
    }
}
