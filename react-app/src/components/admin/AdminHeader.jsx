import { useAuth } from "../../contexts/AuthContext";
import { usePermissions } from "../../hooks/usePermissions";
import { Menu, User, LogOut, Building2 } from "lucide-react";
export default function AdminHeader({ onMenuClick, onLogout }) {
  const { currentUser, userData } = useAuth();
  const permissions = usePermissions();
  return (
    <div className="px-4 sm:px-6 lg:px-8 h-16">
      <div className="flex items-center justify-between h-full">
        {}
        <div className="lg:hidden flex items-center gap-2 mx-auto">
          <Building2 className="w-5 h-5 text-neutral-700" />
          <h1
            className="text-base font-bold text-neutral-900"
            style={{
              fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
            }}
          >
            ESF Catalão
          </h1>
        </div>
        {}
        <div className="hidden lg:block flex-1" />
        {}
        <div className="hidden sm:flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-md flex items-center justify-center border border-neutral-300 ${permissions.getRoleColor()}`}
          >
            <User className="w-5 h-5" />
          </div>
          <div>
            <p
              className="text-sm font-semibold text-neutral-900"
              style={{
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              }}
            >
              {userData?.displayName || "Administrador"}
            </p>
            <p
              className="text-xs text-neutral-600"
              style={{
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              }}
            >
              {currentUser?.email}
            </p>
          </div>
          <span
            className={`ml-2 text-xs font-semibold px-3 py-1.5 rounded-md border ${permissions.getRoleColor()}`}
          >
            {permissions.getRoleLabel()}
          </span>
        </div>
        {}
        <button
          onClick={onLogout}
          className="sm:hidden p-2 text-error hover:bg-error/10 rounded-md transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
