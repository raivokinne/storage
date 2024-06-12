<?php

namespace App\Http\Controllers;

use App\Models\Reports;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Login');
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'email' => 'required|email|min:3|max:255',
                'password' => 'required'
            ]
        );

        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            $request->session()->regenerate();
            $request->session()->regenerateToken();

            Reports::create(
                [
                    'user_id' => auth()->user()->id,
                    'description' => auth()->user()->name . ' logged in',
                    'date' => now(),
                    'name' => 'Login',
                ]
            );

            return redirect()->route('dashboard');
        }

        if (!auth()->attempt($credentials)) {
            return back()->withErrors(
                [
                    'email' => 'The provided credentials do not match our records.',
                ]
            );
        }

        return back()->withErrors(
            [
                'email' => 'The provided credentials do not match our records.',
            ]
        );
    }

    public function destroy(Request $request)
    {
        Reports::create(
            [
                'user_id' => auth()->user()->id,
                'description' => auth()->user()->name . ' logged out',
                'date' => now(),
                'name' => 'Logout',
            ]
        );

        User::where('id', auth()->user()->id)->update(
            [
                'status' => 'inactive',
            ]
        );
        auth()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('login');
    }

    public function register()
    {
        return Inertia::render('Auth/Register');
    }

    public function registerStore(Request $request)
    {
        $formData = $request->validate(
            [
                'name' => 'required|min:3|max:255',
                'email' => 'required|email|min:3|max:255|unique:users,email',
                'password' => 'required|min:3|max:255|confirmed',
                'role' => 'required|string'
            ]
        );

        $formData['password'] = bcrypt($formData['password']);

        $user = User::create($formData);

        event(new Registered($user));

        auth()->login($user);

        Reports::create(
            [
                'user_id' => auth()->user()->id,
                'description' => auth()->user()->name . ' registered',
                'date' => now(),
                'name' => 'Register',
            ]
        );

        return redirect()->route('dashboard');
    }
}
