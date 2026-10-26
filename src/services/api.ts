const API_BASE = '/api';

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('civicserve_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export const authApi = {
  login: (email: string, password: string) =>
    fetchJson<{ success: boolean; token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),

  register: (userData: any) =>
    fetchJson<{ success: boolean; token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  getMe: () => fetchJson<{ success: boolean; user: any }>('/auth/me')
};

export const servicesApi = {
  getAll: () => fetchJson<{ success: boolean; data: any[] }>('/services'),
  getBySlug: (slug: string) => fetchJson<{ success: boolean; data: any }>(`/services/${slug}`)
};

export const workersApi = {
  getAll: (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== 'all')
    ).toString();
    return fetchJson<{ success: boolean; data: any[] }>(`/workers${query ? `?${query}` : ''}`);
  },

  getById: (id: string) => fetchJson<{ success: boolean; data: any }>(`/workers/${id}`),

  updateAvailability: (id: string, availability: string) =>
    fetchJson<{ success: boolean; message: string; data: any }>(`/workers/${id}/availability`, {
      method: 'PATCH',
      body: JSON.stringify({ availability })
    })
};

export const bookingsApi = {
  create: (bookingData: any) =>
    fetchJson<{ success: boolean; message: string; data: any }>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    }),

  getAll: (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson<{ success: boolean; data: any[] }>(`/bookings${query ? `?${query}` : ''}`);
  },

  getById: (id: string) => fetchJson<{ success: boolean; data: any }>(`/bookings/${id}`),

  updateStatus: (id: string, status: string, note?: string) =>
    fetchJson<{ success: boolean; message: string; data: any }>(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, note })
    }),

  verifyOtp: (id: string, otp: string, type: 'start' | 'completion') =>
    fetchJson<{ success: boolean; message: string; data: any }>(`/bookings/${id}/verify-otp`, {
      method: 'POST',
      body: JSON.stringify({ otp, type })
    })
};

export const reviewsApi = {
  create: (reviewData: any) =>
    fetchJson<{ success: boolean; message: string; data: any }>('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    }),

  getForWorker: (workerId: string) =>
    fetchJson<{ success: boolean; data: any[] }>(`/reviews/worker/${workerId}`)
};

export const trustApi = {
  getBreakdown: (workerId: string) =>
    fetchJson<{ success: boolean; data: any }>(`/trust/worker/${workerId}`)
};

export const complaintsApi = {
  create: (complaintData: any) =>
    fetchJson<{ success: boolean; message: string; data: any }>('/complaints', {
      method: 'POST',
      body: JSON.stringify(complaintData)
    }),

  getAll: () => fetchJson<{ success: boolean; data: any[] }>('/complaints')
};

export const adminApi = {
  getMetrics: () => fetchJson<{ success: boolean; data: any }>('/admin/metrics'),
  getKYCQueue: () => fetchJson<{ success: boolean; data: any[] }>('/admin/workers/verification'),
  auditKYC: (workerId: string, docType: string, approve: boolean) =>
    fetchJson<{ success: boolean; message: string; data: any }>(`/admin/workers/${workerId}/verify-kyc`, {
      method: 'PATCH',
      body: JSON.stringify({ docType, approve })
    }),
  approveWorker: (workerId: string) =>
    fetchJson<{ success: boolean; message: string; data: any }>(`/admin/workers/${workerId}/approve`, {
      method: 'POST'
    }),
  rejectWorker: (workerId: string, reason?: string) =>
    fetchJson<{ success: boolean; message: string; data: any }>(`/admin/workers/${workerId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    }),
  resolveDispute: (disputeId: string, resolution: string) =>
    fetchJson<{ success: boolean; message: string; data: any }>(`/admin/disputes/${disputeId}/resolve`, {
      method: 'PATCH',
      body: JSON.stringify({ resolution })
    })
};

export const jobsApi = {
  create: (jobData: any) =>
    fetchJson<{ success: boolean; message: string; data: any }>('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData)
    }),
  getAll: (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson<{ success: boolean; data: any[] }>(`/jobs${query ? `?${query}` : ''}`);
  },
  submitBid: (jobId: string, bidData: any) =>
    fetchJson<{ success: boolean; message: string; data: any }>(`/jobs/${jobId}/bids`, {
      method: 'POST',
      body: JSON.stringify(bidData)
    })
};

export const aiApi = {
  parseIntentAndMatch: (query: string) =>
    fetchJson<{ success: boolean; data: any }>('/ai/parse-intent', {
      method: 'POST',
      body: JSON.stringify({ query })
    })
};

