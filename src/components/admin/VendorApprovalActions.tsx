'use client';

import React, { useActionState, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { approveVendor, rejectVendor } from '@/lib/actions/admin-vendors';
import type { ActionResult } from '@/lib/actions/auth';

const initialState: ActionResult = {};

export function VendorApprovalActions({ vendorId }: { vendorId: string }) {
  const [showReject, setShowReject] = useState(false);
  const boundApprove = approveVendor.bind(null, vendorId);
  const boundReject = rejectVendor.bind(null, vendorId);

  const [approveState, approveAction, isApproving] = useActionState(boundApprove, initialState);
  const [rejectState, rejectAction, isRejecting] = useActionState(boundReject, initialState);

  return (
    <div className="space-y-4">
      <form action={approveAction} className="space-y-2">
        <label className="block text-xs font-semibold text-[#6B7263]">
          Certification ID to issue (optional)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            name="certificationId"
            placeholder="e.g. NPOP/IND/2026/00123"
            className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
          />
          <button
            type="submit"
            disabled={isApproving}
            className="px-4 py-2.5 bg-[#3F7D46] hover:bg-[#2A5C31] disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-colors flex items-center space-x-2 shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approve Vendor</span>
          </button>
        </div>
        {approveState.error && <p className="text-xs text-red-600">{approveState.error}</p>}
      </form>

      {!showReject ? (
        <button
          onClick={() => setShowReject(true)}
          className="text-sm font-medium text-red-600 hover:underline"
        >
          Reject this vendor
        </button>
      ) : (
        <form action={rejectAction} className="space-y-2">
          <label className="block text-xs font-semibold text-[#6B7263]">Rejection Reason</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="reason"
              required
              placeholder="e.g. Certification documents unclear"
              className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isRejecting}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-colors flex items-center space-x-2 shrink-0"
            >
              <XCircle className="w-4 h-4" />
              <span>Confirm Reject</span>
            </button>
          </div>
          {rejectState.error && <p className="text-xs text-red-600">{rejectState.error}</p>}
        </form>
      )}
    </div>
  );
}
