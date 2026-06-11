export interface Contact {
  id: string;
  name: string;
  email: string;
  title: string;
  content: string;
  status: ContactStatus;
  created_at: string;
  updated_at: string;
}

export type ContactStatus = 'pending' | 'in_progress' | 'resolved' | 'on_hold' | 'rejected';
export interface ContactStatusLabel {
  label: string;
  value: ContactStatus;
}

export const ContactStatusLabels: ContactStatusLabel[] = [
  { label: '대기중', value: 'pending' },
  { label: '진행중', value: 'in_progress' },
  { label: '해결됨', value: 'resolved' },
  { label: '보류', value: 'on_hold' },
  { label: '거절됨', value: 'rejected' },
];

export type ContactStatusUpdateRequest = Pick<Contact, 'id' | 'status'>;
