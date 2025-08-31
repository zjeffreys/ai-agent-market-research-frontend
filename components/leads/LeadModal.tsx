'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Usage:
// import LeadModal from '@/components/leads/LeadModal';
// <LeadModal />

interface LeadForm {
  email: string;
  company: string;
  size: string;
  vertical: string;
}

export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadForm>();

  const onSubmit = async (data: LeadForm) => {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSubmitted(true);
      reset();
    }
  };

  const close = () => {
    setOpen(false);
    setSubmitted(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Request Enterprise Beta
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
            {submitted ? (
              <div className="text-center">
                <p className="mb-4">Thanks! We&apos;ll be in touch.</p>
                <button
                  onClick={close}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    {...register('email', {
                      required: true,
                      pattern: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                    })}
                    type="email"
                    placeholder="Work email"
                    className="w-full rounded border p-2"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">Valid email required.</p>
                  )}
                </div>
                <div>
                  <input
                    {...register('company', { required: true })}
                    placeholder="Company"
                    className="w-full rounded border p-2"
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-600">Company is required.</p>
                  )}
                </div>
                <div>
                  <input
                    {...register('size', { required: true })}
                    placeholder="Company size"
                    className="w-full rounded border p-2"
                  />
                  {errors.size && (
                    <p className="mt-1 text-sm text-red-600">Size is required.</p>
                  )}
                </div>
                <div>
                  <input
                    {...register('vertical', { required: true })}
                    placeholder="Industry vertical"
                    className="w-full rounded border p-2"
                  />
                  {errors.vertical && (
                    <p className="mt-1 text-sm text-red-600">Vertical is required.</p>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={close}
                    className="rounded border px-4 py-2 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
