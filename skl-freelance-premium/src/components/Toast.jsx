import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-slide-up flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg border min-w-[320px] max-w-[420px]"
          style={{
            background: toast.type === 'success' ? '#ecfdf5' : toast.type === 'error' ? '#fef2f2' : '#eff6ff',
            borderColor: toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#ef4444' : '#3b82f6',
          }}
        >
          {toast.type === 'success' && <CheckCircle size={20} className="text-emerald-600 shrink-0" />}
          {toast.type === 'error' && <AlertCircle size={20} className="text-red-500 shrink-0" />}
          {toast.type === 'info' && <Info size={20} className="text-blue-500 shrink-0" />}
          <p className="text-sm font-medium text-charcoal-800 flex-1">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 text-charcoal-400 hover:text-charcoal-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
