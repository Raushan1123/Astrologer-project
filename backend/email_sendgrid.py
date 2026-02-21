"""
SendGrid Email Integration for Railway Deployment

This module provides email sending functionality using SendGrid API,
which works on Railway (unlike SMTP which is blocked).

Usage:
1. Install: pip install sendgrid
2. Set environment variables:
   - SENDGRID_API_KEY
   - SENDGRID_FROM_EMAIL
   - SENDGRID_FROM_NAME
3. Replace send_email() in main.py with this implementation
"""

import os
import logging
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

logger = logging.getLogger(__name__)


async def send_email_sendgrid(to_email: str, subject: str, body: str) -> bool:
    """
    Send email using SendGrid API
    
    Args:
        to_email: Recipient email address
        subject: Email subject
        body: HTML email body
        
    Returns:
        bool: True if email sent successfully, False otherwise
    """
    try:
        # Get SendGrid configuration from environment
        sendgrid_api_key = os.environ.get('SENDGRID_API_KEY', 'JXCCLF53CXVN2JQPGANHSFKV')
        from_email = os.environ.get('SENDGRID_FROM_EMAIL', 'indirapandey2526@gmail.com')
        from_name = os.environ.get('SENDGRID_FROM_NAME', 'Acharyaa Indira Pandey Astrology')
        
        # Check if SendGrid is configured
        if not sendgrid_api_key:
            logger.warning("SendGrid API key not configured - skipping email")
            return False
        
        # Create email message
        message = Mail(
            from_email=(from_email, from_name),
            to_emails=to_email,
            subject=subject,
            html_content=body
        )
        
        # Send email via SendGrid
        sg = SendGridAPIClient(sendgrid_api_key)
        response = sg.send(message)
        
        # Log success
        logger.info(
            f"✅ Email sent to {to_email} via SendGrid "
            f"(Status: {response.status_code})"
        )
        return True
        
    except Exception as e:
        logger.error(f"❌ Failed to send email via SendGrid: {str(e)}")
        return False


# Example usage in main.py:
"""
from email_sendgrid import send_email_sendgrid as send_email

# In your endpoint:
background_tasks.add_task(
    send_email,
    booking.email,
    "Booking Confirmation",
    email_body
)
"""

