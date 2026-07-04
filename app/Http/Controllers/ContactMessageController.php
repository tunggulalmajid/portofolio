<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class ContactMessageController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        // Rate limiting: 3 messages per hour per IP
        $key = 'contact-message:' . $request->ip();
        
        if (RateLimiter::tooManyAttempts($key, 3)) {
            $seconds = RateLimiter::availableIn($key);
            return response()->json([
                'success' => false,
                'message' => "Too many messages. Please try again in " . ceil($seconds / 60) . " minutes."
            ], 429);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:5000',
        ]);

        // Create contact message (save to database only)
        ContactMessage::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'message' => $validated['message'],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        // Increment rate limiter
        RateLimiter::hit($key, 3600); // 1 hour

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully! I will get back to you soon.'
        ]);
    }
}
