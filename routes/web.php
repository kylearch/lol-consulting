<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;
use App\Http\Controllers\ContactController;

Route::get('/', fn () => Inertia::render('Landing'));
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');

// Preview routes for sub-apps (static content)
Route::get('/preview/privates', function () {
    return response()->file(public_path('preview/privates/privates-dashboard.html'));
})->name('preview.privates');

Route::get('/preview/brandr', function () {
    return response()->file(public_path('preview/brandr/index.html'));
})->name('preview.brandr');

Route::get('/preview/therapy', function () {
    return response()->file(public_path('preview/therapy/index.html'));
})->name('preview.therapy');

Route::get('/preview/todos', function () {
    return response()->file(public_path('preview/todos/index.html'));
})->name('preview.todos');

Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
