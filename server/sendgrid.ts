import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    const emailData: any = {
      to: params.to,
      from: params.from,
      subject: params.subject,
    };
    
    if (params.text) emailData.text = params.text;
    if (params.html) emailData.html = params.html;
    
    await mailService.send(emailData);
    console.log(`Email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

interface ClientApprovalEmailParams {
  notificationEmail: string;
  clientName: string;
  clientEmail: string;
  businessName: string;
  templateType: string;
  approvedSections: string[];
  pendingEdits: string[];
  generalInstructions: string;
  submissionDate: string;
}

export async function sendClientApprovalNotification(params: ClientApprovalEmailParams): Promise<boolean> {
  const subject = `Client Approval Form Submitted - ${params.businessName}`;
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #C8102E; border-bottom: 2px solid #C8102E; padding-bottom: 10px;">
        Client Approval Form Submission
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Business Information</h3>
        <p><strong>Business Name:</strong> ${params.businessName}</p>
        <p><strong>Template Type:</strong> ${params.templateType.charAt(0).toUpperCase() + params.templateType.slice(1)}</p>
        <p><strong>Submission Date:</strong> ${new Date(params.submissionDate).toLocaleString()}</p>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Client Information</h3>
        <p><strong>Name:</strong> ${params.clientName}</p>
        <p><strong>Email:</strong> ${params.clientEmail}</p>
      </div>
      
      ${params.approvedSections.length > 0 ? `
      <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
        <h3 style="color: #155724; margin-top: 0;">✅ Approved Sections</h3>
        <ul style="color: #155724;">
          ${params.approvedSections.map(section => `<li style="margin: 5px 0;">${section.charAt(0).toUpperCase() + section.slice(1)}</li>`).join('')}
        </ul>
      </div>
      ` : ''}
      
      ${params.pendingEdits.length > 0 ? `
      <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
        <h3 style="color: #856404; margin-top: 0;">⏳ Sections Needing Edits</h3>
        <ul style="color: #856404;">
          ${params.pendingEdits.map(section => `<li style="margin: 5px 0;">${section.charAt(0).toUpperCase() + section.slice(1)}</li>`).join('')}
        </ul>
      </div>
      ` : ''}
      
      ${params.generalInstructions && params.generalInstructions !== 'None' ? `
      <div style="background-color: #e2e3e5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">📝 General Instructions</h3>
        <p style="color: #333; font-style: italic;">"${params.generalInstructions}"</p>
      </div>
      ` : ''}
      
      <div style="background-color: #007BFF; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <h3 style="margin-top: 0; color: white;">Next Steps</h3>
        <p style="margin-bottom: 0;">Review the client feedback and make any necessary updates to the website template.</p>
      </div>
      
      <p style="color: #666; font-size: 12px; text-align: center; margin-top: 30px;">
        This notification was sent automatically by WebSitioPro Client Approval System
      </p>
    </div>
  `;
  
  const textContent = `
Client Approval Form Submission

Business Information:
- Business Name: ${params.businessName}
- Template Type: ${params.templateType.charAt(0).toUpperCase() + params.templateType.slice(1)}
- Submission Date: ${new Date(params.submissionDate).toLocaleString()}

Client Information:
- Name: ${params.clientName}
- Email: ${params.clientEmail}

${params.approvedSections.length > 0 ? `
Approved Sections:
${params.approvedSections.map(section => `- ${section.charAt(0).toUpperCase() + section.slice(1)}`).join('\n')}
` : ''}

${params.pendingEdits.length > 0 ? `
Sections Needing Edits:
${params.pendingEdits.map(section => `- ${section.charAt(0).toUpperCase() + section.slice(1)}`).join('\n')}
` : ''}

${params.generalInstructions && params.generalInstructions !== 'None' ? `
General Instructions:
"${params.generalInstructions}"
` : ''}

Next Steps:
Review the client feedback and make any necessary updates to the website template.

---
This notification was sent automatically by WebSitioPro Client Approval System
  `;

  return await sendEmail({
    to: params.notificationEmail,
    from: 'noreply@websitiopro.com', // You may need to verify this sender email in SendGrid
    subject,
    html: htmlContent,
    text: textContent
  });
}