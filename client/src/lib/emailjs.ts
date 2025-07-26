import emailjs from '@emailjs/browser';

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
    console.log('[EmailJS] Sending approval notification via client...');
    
    // Get EmailJS configuration from server
    const configResponse = await fetch('/api/emailjs-config');
    if (!configResponse.ok) {
      throw new Error('Failed to get EmailJS configuration');
    }
    
    const config = await configResponse.json();
    const { publicKey, serviceId, templateId } = config;
    
    // Initialize EmailJS with public key
    emailjs.init(publicKey);
    
    const templateParams = {
      to_email: data.to_email,
      client_name: data.client_name,
      client_email: data.client_email,
      business_name: data.business_name,
      template_type: data.template_type.charAt(0).toUpperCase() + data.template_type.slice(1),
      approved_sections: data.approved_sections || 'None',
      pending_edits: data.pending_edits || 'None',
      general_instructions: data.general_instructions || 'None',
      submission_date: new Date(data.submission_date).toLocaleString(),
      message: `Client Approval Form Submission for ${data.business_name}`
    };

    console.log('[EmailJS] Template params:', templateParams);
    console.log('[EmailJS] Using service:', serviceId, 'template:', templateId);

    const result = await emailjs.send(
      serviceId,
      templateId,
      templateParams
    );

    console.log('[EmailJS] Email sent successfully:', result.status, result.text);
    return true;
  } catch (error) {
    console.error('[EmailJS] Failed to send email:', error);
    return false;
  }
}