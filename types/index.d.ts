export interface ApiResponse<T = any> {
  data?: T;
  status: number;
  error?: string;
}

export interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
    status?: number;
  };
  message?: string;
}

export interface ApiHandlerConfig {
  resourceName: string;
  cachePaths?: string[];
  customMessages?: {
    success?: string;
    error?: string;
  };
  toastOptions?: ToastOptions;
}

declare type notification = {
  _id: string;
  title: string;
  message: string;
  type: string;
  timestamp: Date;
  onRead: boolean;
  onDismiss: boolean;
};

declare type Action = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  alert?: boolean;
};

declare interface Error {
  message: string;
  status: number;
}
