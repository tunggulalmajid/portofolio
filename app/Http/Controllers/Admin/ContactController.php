<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        $contacts = Contact::ordered()->paginate(15);

        return Inertia::render('Admin/Contact/Index', [
            'contacts' => $contacts,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Contact/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'type'      => 'required|string|max:50',
            'label'     => 'required|string|max:100',
            'value'     => 'required|string|max:255',
            'url'       => 'nullable|string|max:255',
            'icon'      => 'nullable|string|max:100',
            'is_active' => 'boolean',
            'order'     => 'integer|min:0',
        ]);

        Contact::create($validated);

        return redirect()->route('admin.contacts.index')->with('success', 'Contact created successfully.');
    }

    public function edit(Contact $contact): Response
    {
        return Inertia::render('Admin/Contact/Edit', [
            'contact' => $contact,
        ]);
    }

    public function update(Request $request, Contact $contact): RedirectResponse
    {
        $validated = $request->validate([
            'type'      => 'required|string|max:50',
            'label'     => 'required|string|max:100',
            'value'     => 'required|string|max:255',
            'url'       => 'nullable|string|max:255',
            'icon'      => 'nullable|string|max:100',
            'is_active' => 'boolean',
            'order'     => 'integer|min:0',
        ]);

        $contact->update($validated);

        return redirect()->route('admin.contacts.index')->with('success', 'Contact updated successfully.');
    }

    public function destroy(Contact $contact): RedirectResponse
    {
        $contact->delete();

        return redirect()->route('admin.contacts.index')->with('success', 'Contact deleted successfully.');
    }
}
