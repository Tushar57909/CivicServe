import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { StarRating } from '../common/StarRating';
import { ShieldCheck } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId?: string;
  workerId?: string;
  workerName: string;
  serviceName?: string;
  serviceItemName?: string;
  onSubmit?: (rating: number, comment: string) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  bookingId,
  workerId,
  workerName,
  serviceName,
  serviceItemName,
  onSubmit
}) => {
  const { submitWorkerReview } = useApp();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [onTimeArrival, setOnTimeArrival] = useState(true);
  const [accuratePricing, setAccuratePricing] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    if (onSubmit) {
      onSubmit(rating, comment);
    } else if (workerId && bookingId) {
      submitWorkerReview(workerId, bookingId, rating, comment);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit Verified Review"
      subtitle={`Rate your completed service with ${workerName}`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans">
        {/* Rating Picker */}
        <div className="text-center py-3 bg-warm-100 rounded-2xl">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Overall Experience Rating
          </label>
          <div className="flex justify-center">
            <StarRating
              rating={rating}
              size="lg"
              interactive={true}
              onRatingChange={(newRating) => setRating(newRating)}
            />
          </div>
          <span className="text-xs text-slate-600 font-medium mt-1 block">
            {rating === 5 ? 'Exceptional Service (5/5)' : rating === 4 ? 'Very Good (4/5)' : 'Satisfactory (3/5)'}
          </span>
        </div>

        {/* Civic Trust Checklist */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            Civic Trust Verification Checks:
          </label>
          <label className="flex items-center gap-2 text-xs cursor-pointer p-2.5 rounded-xl bg-warm-50 border border-warm-200">
            <input
              type="checkbox"
              checked={onTimeArrival}
              onChange={(e) => setOnTimeArrival(e.target.checked)}
              className="rounded text-slate-900 focus:ring-slate-900"
            />
            <span>Worker arrived strictly within the scheduled time slot</span>
          </label>

          <label className="flex items-center gap-2 text-xs cursor-pointer p-2.5 rounded-xl bg-warm-50 border border-warm-200">
            <input
              type="checkbox"
              checked={accuratePricing}
              onChange={(e) => setAccuratePricing(e.target.checked)}
              className="rounded text-slate-900 focus:ring-slate-900"
            />
            <span>Pricing was completely transparent with zero unexpected add-ons</span>
          </label>
        </div>

        {/* Written Review */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
            Your Detailed Feedback
          </label>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Share details about the quality of workmanship, cleanliness, and professionalism..."
            className="w-full text-xs sm:text-sm p-3 rounded-2xl border border-warm-300 focus:border-slate-900 focus:outline-none text-slate-900 bg-warm-50"
          />
        </div>

        {/* Verified Badge Note */}
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>This review will carry a "Verified Booking" badge linked to your OTP record.</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-warm-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!comment.trim()}
            className="px-5 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow disabled:opacity-50 transition-all"
          >
            Publish Verified Review
          </button>
        </div>
      </form>
    </Modal>
  );
};
