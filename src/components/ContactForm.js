'use client'; 
import { useState } from 'react';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/sendEmails', {  // Asegúrate de que esta ruta es correcta
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        subject,
        text: message,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      setStatus('Email sent successfully');
    } else {
      setStatus(result.error || 'Failed to send email');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Subject:
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </label>
      <label>
        Message:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </label>
      <button type="submit">Send Email</button>
      {status && <p>{status}</p>}
    </form>
  );
}