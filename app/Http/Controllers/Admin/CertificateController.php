<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    public function index(): Response
    {
        $certificates = Certificate::ordered()->paginate(10);

        return Inertia::render('Admin/Certificate/Index', [
            'certificates' => $certificates,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Certificate/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'issuer'         => 'required|string|max:255',
            'issue_date'     => 'required|date',
            'expiry_date'    => 'nullable|date|after:issue_date',
            'credential_id'  => 'nullable|string|max:255',
            'credential_url' => 'nullable|url|max:255',
            'image'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'category'       => 'nullable|string|max:100',
            'order'          => 'integer|min:0',
            'is_active'      => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('certificates', 'public');
        }

        Certificate::create($validated);

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate created successfully.');
    }

    public function edit(Certificate $certificate): Response
    {
        return Inertia::render('Admin/Certificate/Edit', [
            'certificate' => $certificate,
        ]);
    }

    public function update(Request $request, Certificate $certificate): RedirectResponse
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'issuer'         => 'required|string|max:255',
            'issue_date'     => 'required|date',
            'expiry_date'    => 'nullable|date|after:issue_date',
            'credential_id'  => 'nullable|string|max:255',
            'credential_url' => 'nullable|url|max:255',
            'image'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'category'       => 'nullable|string|max:100',
            'order'          => 'integer|min:0',
            'is_active'      => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($certificate->image) {
                Storage::disk('public')->delete($certificate->image);
            }
            $validated['image'] = $request->file('image')->store('certificates', 'public');
        }

        $certificate->update($validated);

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate updated successfully.');
    }

    public function destroy(Certificate $certificate): RedirectResponse
    {
        if ($certificate->image) {
            Storage::disk('public')->delete($certificate->image);
        }

        $certificate->delete();

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate deleted successfully.');
    }
}
