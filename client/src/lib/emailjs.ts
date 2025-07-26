// EmailJS integration using server-side API
interface ClientApprovalEmailData {
  to_email: string;
  client_name: string;
  client_email: string;
  business_name: string;
  template_type: string;
  approved_sections: string;
  pending_edits: string;
  general_instructions: string;
  submission_date: string;
}

export async function sendClientApprovalEmail(data: ClientApprovalEmailData): Promise<boolean> {
  try {
    console.log('[EmailJS] Sending approval notification via server...');
    
    const response = await fetch('/api/send-emailjs-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('[EmailJS] Email sent successfully:', result);
      return true;
    } else {
      const error = await response.json();
      console.error('[EmailJS] Failed to send email:', error);
      return false;
    }
  } catch (error) {
    console.error('[EmailJS] Network error:', error);
    return false;
  }
}