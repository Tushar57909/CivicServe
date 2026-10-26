import { AdminDispute } from '../types';

export const INITIAL_DISPUTES: AdminDispute[] = [
  {
    id: 'DSP-9041',
    bookingId: 'BK-2026-7810',
    customerName: 'Rohit Bansal',
    workerName: 'Suresh Nair',
    serviceName: 'Waterproofing Dampness Polymer Injection',
    amount: 1899,
    reason: 'Customer reported paint discoloration on corner after 48 hours. Worker requested site visit to inspect surface curing.',
    status: 'under_investigation',
    createdAt: '2026-08-21T14:30:00Z',
    priority: 'medium'
  },
  {
    id: 'DSP-9038',
    bookingId: 'BK-2026-7640',
    customerName: 'Kavita Chawla',
    workerName: 'Farooq Mohammed',
    serviceName: 'High-Security Door Lock Fitting',
    amount: 349,
    reason: 'Billing clarification: Extra keys charged at standard retail without prior SMS estimate approval.',
    status: 'resolved_refund',
    createdAt: '2026-08-20T11:15:00Z',
    priority: 'low'
  }
];
