export interface BaseEntity {
    id: string | number;
    createdArt : Date;
    updatedAt: Date;
}


export interface User extends BaseEntity{
    name: string;
    email: string;
    phone?: string;
    location?: string;
    avatar?: string;
    status: 'active' | 'inactive'| 'pending';
    revenue: number;
    orders: number;
    singupData: string;
    lastAcvtivity: string;
}

// Table Types
export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  formatter?: (value: any) => string | React.ReactNode;
  className?: string;
}

export interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

 
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}