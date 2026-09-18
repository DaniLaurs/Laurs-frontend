import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  actions?: ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  backTo,
  actions,
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      {backTo && (
        <button
          onClick={() => navigate(backTo)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors mb-4"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>
      )}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {title}
            </h1>

            {subtitle && (
              <p className="text-gray-500 mt-2">
                {subtitle}
              </p>
            )}
          </div>

          {actions && (
            <div>
              {actions}
            </div>
          )}
        </div>
    </div>
  );
}