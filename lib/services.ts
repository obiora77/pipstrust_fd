import { api, unwrap, ApiResponse } from './api'

// ── Types ─────────────────────────────────────────────────────────────────────
export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  country?: string
  avatar?: string
  is_verified: boolean
  referral_code: string
  referral_count: number
  profile: UserProfile
  created_at: string
}

export interface UserProfile {
  bitcoin_address?: string
  ethereum_address?: string
  usdt_address?: string
  bank_name?: string
  bank_account_number?: string
  bank_account_name?: string
  wallet_balance: string
  total_deposited: string
  total_withdrawn: string
  total_earned: string
}

export interface InvestmentPlan {
  id: string
  name: string
  description: string
  min_amount: string
  max_amount?: string
  roi_percentage: string
  duration: number
  duration_unit: 'days' | 'weeks' | 'months'
  is_active: boolean
  is_featured: boolean
}

export interface Deposit {
  id: string
  user_email?: string
  amount: string
  payment_method: string
  transaction_hash?: string
  proof_of_payment?: string
  status: 'pending' | 'confirmed' | 'rejected'
  admin_note?: string
  confirmed_at?: string
  created_at: string
}

export interface Investment {
  id: string
  plan: InvestmentPlan
  amount: string
  roi_percentage: string
  expected_return: string
  actual_return: string
  status: 'active' | 'completed' | 'cancelled'
  starts_at: string
  ends_at: string
  completed_at?: string
  progress_percentage: number
  created_at: string
}

export interface Withdrawal {
  id: string
  amount: string
  method: string
  payout_address?: string
  bank_name?: string
  bank_account_number?: string
  bank_account_name?: string
  status: 'pending' | 'otp_verified' | 'processing' | 'completed' | 'rejected'
  admin_note?: string
  processed_at?: string
  created_at: string
}

export interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'roi' | 'referral_bonus'
  amount: string
  status: 'pending' | 'success' | 'failed'
  description: string
  reference: string
  created_at: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  is_read: boolean
  created_at: string
}

export interface DashboardSummary {
  wallet_balance: string
  total_deposited: string
  total_withdrawn: string
  total_earned: string
  active_investments: number
  completed_investments: number
  pending_deposits: number
  referral_count: number
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authService = {
  register: (data: { email: string; first_name: string; last_name: string; phone?: string; country?: string; password: string; password2: string; referral_code?: string }) =>
    api.post<ApiResponse<{ email: string }>>('/auth/register/', data),

  login: (data: { email: string; password: string }) =>
    api.post<ApiResponse<{ user: User; access: string; refresh: string }>>('/auth/login/', data),

  logout: (refresh: string) =>
    api.post('/auth/logout/', { refresh }),

  verifyEmail: (data: { email: string; code: string }) =>
    api.post<ApiResponse<{ user: User; access: string; refresh: string }>>('/auth/otp/verify-email/', data),

  resendOTP: (data: { email: string; purpose: string }) =>
    api.post('/auth/otp/resend/', data),

  requestPasswordReset: (email: string) =>
    api.post('/auth/password/reset/', { email }),

  confirmPasswordReset: (data: { email: string; code: string; new_password: string; new_password2: string }) =>
    api.post('/auth/password/reset/confirm/', data),

  changePassword: (data: { old_password: string; new_password: string; new_password2: string }) =>
    api.post('/auth/password/change/', data),

  getMe: () =>
    api.get<ApiResponse<User>>('/auth/me/'),

  updateProfile: (data: Partial<User>) =>
    api.patch<ApiResponse<User>>('/auth/me/', data),

  updateWallet: (data: Partial<UserProfile>) =>
    api.patch<ApiResponse<UserProfile>>('/auth/me/wallet/', data),
}

// ── Investments ───────────────────────────────────────────────────────────────
export const investmentService = {
  getPlans: () =>
    api.get<ApiResponse<InvestmentPlan[]>>('/investments/plans/'),

  getDashboard: () =>
    api.get<ApiResponse<DashboardSummary>>('/investments/dashboard/'),

  getInvestments: (params?: { status?: string }) =>
    api.get<ApiResponse<Investment[]>>('/investments/', { params }),

  getInvestment: (id: string) =>
    api.get<ApiResponse<Investment>>(`/investments/${id}/`),

  createInvestment: (data: { plan_id: string; deposit_id: string }) =>
    api.post<ApiResponse<Investment>>('/investments/create/', data),

  getDeposits: (params?: { status?: string }) =>
    api.get<ApiResponse<Deposit[]>>('/investments/deposits/', { params }),

  getDeposit: (id: string) =>
    api.get<ApiResponse<Deposit>>(`/investments/deposits/${id}/`),

  createDeposit: (data: FormData) =>
    api.post<ApiResponse<Deposit>>('/investments/deposits/create/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  getTransactions: (params?: { type?: string; status?: string }) =>
    api.get<ApiResponse<Transaction[]>>('/investments/transactions/', { params }),
}

// ── Withdrawals ───────────────────────────────────────────────────────────────
export const withdrawalService = {
  getWithdrawals: (params?: { status?: string }) =>
    api.get<ApiResponse<Withdrawal[]>>('/withdrawals/', { params }),

  requestWithdrawal: (data: { amount: string; method: string }) =>
    api.post<ApiResponse<{ withdrawal_id: string }>>('/withdrawals/request/', data),

  verifyOTP: (data: { withdrawal_id: string; code: string }) =>
    api.post('/withdrawals/verify-otp/', data),

  cancelWithdrawal: (id: string) =>
    api.post(`/withdrawals/${id}/cancel/`),
}

// ── Notifications ─────────────────────────────────────────────────────────────
export const notificationService = {
  getNotifications: () =>
    api.get<ApiResponse<Notification[]>>('/notifications/'),

  getUnreadCount: () =>
    api.get<ApiResponse<{ unread_count: number }>>('/notifications/unread-count/'),

  markAllRead: () =>
    api.post('/notifications/mark-all-read/'),

  markRead: (id: string) =>
    api.patch(`/notifications/${id}/read/`),
}

// ── Admin ─────────────────────────────────────────────────────────────────────
export const adminService = {
  getStats: () =>
    api.get('/admin/stats/'),

  getUsers: (params?: any) =>
    api.get('/admin/users/', { params }),

  getUser: (id: string) =>
    api.get(`/admin/users/${id}/`),

  updateUser: (id: string, data: any) =>
    api.patch(`/admin/users/${id}/`, data),

  toggleUserStatus: (id: string) =>
    api.post(`/admin/users/${id}/toggle-status/`),

  creditWallet: (data: { user_id: string; amount: string; description: string }) =>
    api.post('/admin/users/credit-wallet/', data),

  getDeposits: (params?: any) =>
    api.get('/admin/deposits/', { params }),

  depositAction: (id: string, data: { action: 'approve' | 'reject'; admin_note?: string }) =>
    api.post(`/admin/deposits/${id}/action/`, data),

  getWithdrawals: (params?: any) =>
    api.get('/admin/withdrawals/', { params }),

  withdrawalAction: (id: string, data: { action: 'approve' | 'reject'; admin_note?: string }) =>
    api.post(`/admin/withdrawals/${id}/action/`, data),

  getPlans: () =>
    api.get('/admin/plans/'),

  createPlan: (data: any) =>
    api.post('/admin/plans/', data),

  updatePlan: (id: string, data: any) =>
    api.patch(`/admin/plans/${id}/`, data),

  deletePlan: (id: string) =>
    api.delete(`/admin/plans/${id}/`),

  broadcast: (data: { subject: string; message: string; target: string }) =>
    api.post('/admin/broadcast/', data),
}