<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:2|max:255',
            'email' => 'required|email|max:255',
            'projectType' => 'nullable|string|max:100',
            'budget' => 'nullable|string|max:100',
            'description' => 'required|string|min:10|max:5000',
        ]);

        // Log the contact form submission
        Log::info('Contact form submission', [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'projectType' => $validated['projectType'] ?? 'Not specified',
            'budget' => $validated['budget'] ?? 'Not specified',
        ]);

        // Send email notification
        try {
            Mail::send('emails.contact', ['data' => $validated], function ($message) use ($validated) {
                $message->to(config('mail.contact_email', 'hello@lol.consulting'))
                    ->subject('New Contact Form Submission - ' . ($validated['projectType'] ?? 'General Inquiry'))
                    ->replyTo($validated['email'], $validated['name']);
            });

            return back()->with('success', 'Thank you for your message! We\'ll get back to you within 24 hours.');
        } catch (\Exception $e) {
            Log::error('Failed to send contact form email', [
                'error' => $e->getMessage(),
                'email' => $validated['email'],
            ]);

            return back()->with('error', 'There was an error sending your message. Please try again or email us directly at hello@lol.consulting');
        }
    }
}
