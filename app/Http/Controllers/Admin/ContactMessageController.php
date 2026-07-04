<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    public function index(): Response
    {
        $messages = ContactMessage::latest()
            ->paginate(20)
            ->through(fn($message) => [
                'id' => $message->id,
                'name' => $message->name,
                'email' => $message->email,
                'message' => $message->message,
                'is_read' => $message->is_read,
                'read_at' => $message->read_at?->format('M d, Y g:i A'),
                'created_at' => $message->created_at->format('M d, Y g:i A'),
            ]);

        $stats = [
            'total' => ContactMessage::count(),
            'unread' => ContactMessage::where('is_read', false)->count(),
            'today' => ContactMessage::whereDate('created_at', today())->count(),
        ];

        return Inertia::render('Admin/ContactMessage/Index', [
            'messages' => $messages,
            'stats' => $stats,
        ]);
    }

    public function show(ContactMessage $contactMessage): Response
    {
        // Mark as read when viewing
        if (!$contactMessage->is_read) {
            $contactMessage->markAsRead();
        }

        return Inertia::render('Admin/ContactMessage/Show', [
            'message' => [
                'id' => $contactMessage->id,
                'name' => $contactMessage->name,
                'email' => $contactMessage->email,
                'message' => $contactMessage->message,
                'ip_address' => $contactMessage->ip_address,
                'user_agent' => $contactMessage->user_agent,
                'is_read' => $contactMessage->is_read,
                'read_at' => $contactMessage->read_at?->format('F j, Y \\a\\t g:i A'),
                'created_at' => $contactMessage->created_at->format('F j, Y \\a\\t g:i A'),
            ],
        ]);
    }

    public function markAsRead(ContactMessage $contactMessage): RedirectResponse
    {
        $contactMessage->markAsRead();
        return back()->with('success', 'Message marked as read.');
    }

    public function destroy(ContactMessage $contactMessage): RedirectResponse
    {
        $contactMessage->delete();
        return redirect()->route('admin.contact-messages.index')
            ->with('success', 'Message deleted successfully.');
    }
}
