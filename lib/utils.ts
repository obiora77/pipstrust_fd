import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: string | number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency, minimumFractionDigits: 2,
  }).format(Number(value))
}

export function formatDate(date: string) {
  return format(new Date(date), 'MMM dd, yyyy')
}

export function formatDateTime(date: string) {
  return format(new Date(date), 'MMM dd, yyyy HH:mm')
}

export function timeAgo(date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function getStatusColor(status: string) {
  const map: Record<string, string> = {
    pending:      'badge-pending',
    confirmed:    'badge-success',
    completed:    'badge-success',
    active:       'badge-success',
    success:      'badge-success',
    otp_verified: 'badge-info',
    processing:   'badge-info',
    rejected:     'badge-error',
    failed:       'badge-error',
    cancelled:    'badge-error',
  }
  return map[status] || 'badge-info'
}

export function getPaymentMethodLabel(method: string) {
  const map: Record<string, string> = {
    bitcoin:       'Bitcoin (BTC)',
    ethereum:      'Ethereum (ETH)',
    usdt:          'USDT (TRC20)',
    bank_transfer: 'Bank Transfer',
  }
  return map[method] || method
}

export function truncateAddress(address: string, chars = 6) {
  if (!address) return ''
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}
