'use client';

import React, { useActionState, useState, useTransition } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { approveProduct, rejectProduct } from '@/lib/actions/admin-products';
import type { ActionResult } from '@/lib/actions/auth';

const initialState: ActionResult = {};

export function ProductApprovalActions({ productId }: { productId: string }) {
  const [showReject, setShowReject] = useState(false);
  const [isApproving, startApprove] = useTransition();
  const [approveError, setApproveError] = useState<string | null>(null);

  const boundReject = rejectProduct.bind(null, productId);
  const [rejectState, rejectAction, isRejecting] = useActionState(boundReject, initialState);

  return (
    <div className="space-y-3">
      <button
        onClick={() => {
          setApproveError(null);
          startApprove(async () => {
            const result = await approveProduct(productId);
            if (result.error) setApproveError(result.error);
          });
        }}
        disabled={isApproving}
        className="w-full px-4 py-2.5 bg-[#3F7D46] hover:bg-[#2A5C31] disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        <CheckCircle2 className="w-4 h-4" />
        <span>{isApproving ? 'Approving…' : 'Approve Product'}</span>
      </button>
      {approveError && <p className="text-xs text-red-600">{approveError}</p>}

      {!showReject ? (
        <button
          onClick={() => setShowReject(true)}
          className="text-sm font-medium text-red-600 hover:underline"
        >
          Reject this product
        </button>
      ) : (
        <form action={rejectAction} className="space-y-2">
          <input
            type="text"
            name="reason"
            required
            placeholder="Rejection reason"
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-red-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isRejecting}
            className="w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <XCircle className="w-4 h-4" />
            <span>Confirm Reject</span>
          </button>
          {rejectState.error && <p className="text-xs text-red-600">{rejectState.error}</p>}
        </form>
      )}
    </div>
  );
}
