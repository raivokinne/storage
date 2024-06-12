<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\ShelfController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\IsAdmin;
use App\Http\Middleware\IsSorter;
use App\Http\Middleware\IsWorker;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::middleware('guest')->group(
    function () {
        Route::get('/', [AuthController::class, 'create'])->name('login');
        Route::post('/login', [AuthController::class, 'store'])->name('login.store');
    }
);

Route::middleware('auth')->group(
    function () {
        Route::get('/reports', [ReportsController::class, 'index'])->name('reports.index');
        Route::get('/reports/{reports}/show', [ReportsController::class, 'show'])->name('reports.show');
        Route::get('/reports/{reports}/edit', [ReportsController::class, 'edit'])->name('reports.edit');
        Route::delete('/reports/{reports}/destroy', [ReportsController::class, 'destroy'])->name('reports.destroy');
        Route::put('/reports/{reports}/update', [ReportsController::class, 'update'])->name('reports.update');
        Route::get('/reports/create', [ReportsController::class, 'create'])->name('reports.create');
        Route::post('/reports', [ReportsController::class, 'store'])->name('reports.store');

        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::get('/users/{user}/show', [UserController::class, 'show'])->name('users.show');

        Route::delete('/logout', [AuthController::class, 'destroy'])->name('logout');

        Route::get(
            '/dashboard',
            function () {
                return Inertia::render('Dashboard/Index');
            }
        )->name('dashboard');
    }
);

Route::middleware([IsAdmin::class, IsWorker::class])->group(
    function () {
        Route::get('/products', [ProductController::class, 'index'])->name('products.index');
        Route::get('/products/{product}/show', [ProductController::class, 'show'])->name('products.show');
        Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
        Route::delete('/products/{product}/destroy', [ProductController::class, 'destroy'])->name('products.destroy');
        Route::put('/products/{product}/update', [ProductController::class, 'update'])->name('products.update');
        Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    }
);

Route::middleware([IsAdmin::class, IsSorter::class])->group(
    function () {
        Route::get('/shelves', [ShelfController::class, 'index'])->name('shelf.index');
        Route::get('/shelves/{shelf}/show', [ShelfController::class, 'show'])->name('shelf.show');
        Route::get('/shelves/{shelf}/edit', [ShelfController::class, 'edit'])->name('shelf.edit');
        Route::put('/shelves/{shelf}/update', [ShelfController::class, 'update'])->name('shelf.update');
        Route::post('/shelves', [ShelfController::class, 'store'])->name('shelf.store');
        Route::get('/shelves/create', [ShelfController::class, 'create'])->name('shelf.create');
    }
);

Route::get('/api/user', function () {
    return Auth::user();
});

Route::middleware(IsAdmin::class)->group(
    function () {
        Route::get('/register', [AuthController::class, 'register'])->name('register');
        Route::post('/register', [AuthController::class, 'registerStore'])->name('register.store');

        Route::get('/users/{users}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::post('/users/search', [UserController::class, 'search'])->name('users.search');
        Route::delete('/users/{users}/destroy', [UserController::class, 'destroy'])->name('users.destroy');
        Route::put('/users/{users}/update', [UserController::class, 'update'])->name('users.update');
    }
);
