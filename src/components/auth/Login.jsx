
// src/components/auth/Login.jsx - Modern Professional Design
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import { styles, THEME_COLORS } from '../../styles/styles';

const LoginSignup = () => {
  const { signup, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = login(form.email, form.password);
      if (!result.success) setError(result.error);
    } else {
      if (!form.name || !form.email || !form.password) {
        setError('Please fill all required fields');
        return;
      }
      if (!selectedRole) {
        setError('Please select a role');
        return;
      }
      const result = signup({ ...form, role: selectedRole });
      if (!result.success) setError(result.error);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  // Role selection screen
  if (!isLogin && !selectedRole) {
    return (
      <div style={localStyles.container}>
        <div style={localStyles.card}>
          <div style={localStyles.logoContainer}>
            <span style={localStyles.logo}>✈️</span>
          </div>
          
          <h1 style={localStyles.title}>Choose Your Role</h1>
          <p style={localStyles.subtitle}>
            How will you use MyTrip today?
          </p>

          <div style={localStyles.roleGrid}>
            {/* Sender Card */}
            <div
              onClick={() => handleRoleSelect(ROLES.SENDER)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleRoleSelect(ROLES.SENDER)}
              role="button"
              tabIndex={0}
              style={localStyles.roleCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.3)';
                e.currentTarget.style.borderColor = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = THEME_COLORS.neutral.gray200;
              }}
            >
              <div style={localStyles.roleIconWrapper}>
                <span style={localStyles.roleIcon}>📦</span>
              </div>
              <h3 style={localStyles.roleTitle}>I'm a Sender</h3>
              <p style={localStyles.roleDescription}>
                Need someone to deliver an item for you
              </p>
              <ul style={localStyles.featureList}>
                <li>✓ Post delivery requests</li>
                <li>✓ Browse available travelers</li>
                <li>✓ Track your deliveries</li>
                <li>✓ Rate your experience</li>
              </ul>
              <div style={{...localStyles.selectButton, background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'}}>
                Select Sender
              </div>
            </div>

            {/* Traveler Card */}
            <div
              onClick={() => handleRoleSelect(ROLES.TRAVELER)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleRoleSelect(ROLES.TRAVELER)}
              role="button"
              tabIndex={0}
              style={localStyles.roleCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.3)';
                e.currentTarget.style.borderColor = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = THEME_COLORS.neutral.gray200;
              }}
            >
              <div style={localStyles.roleIconWrapper}>
                <span style={localStyles.roleIcon}>🧳</span>
              </div>
              <h3 style={localStyles.roleTitle}>I'm a Traveler</h3>
              <p style={localStyles.roleDescription}>
                Traveling and can carry items
              </p>
              <ul style={localStyles.featureList}>
                <li>✓ Post your travel plans</li>
                <li>✓ Browse delivery requests</li>
                <li>✓ Earn while traveling</li>
                <li>✓ Build your reputation</li>
              </ul>
              <div style={{...localStyles.selectButton, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>
                Select Traveler
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsLogin(true)}
            style={localStyles.backToLoginButton}
          >
            Already have an account? <strong>Login</strong>
          </button>
        </div>
      </div>
    );
  }

  // Login/Signup form
  return (
    <div style={localStyles.container}>
      <div style={localStyles.formCard}>
        <div style={localStyles.logoContainer}>
          <span style={localStyles.logoSmall}>✈️</span>
        </div>

        <h1 style={localStyles.formTitle}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p style={localStyles.formSubtitle}>
          {isLogin
            ? 'Enter your credentials to continue'
            : `Sign up as ${selectedRole === ROLES.SENDER ? 'Sender' : 'Traveler'}`}
        </p>

        {error && (
          <div style={localStyles.errorBanner}>
            <span style={localStyles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={localStyles.form}>
          {!isLogin && (
            <div style={localStyles.inputGroup}>
              <label style={localStyles.label}>Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                style={localStyles.input}
                required
              />
            </div>
          )}

          <div style={localStyles.inputGroup}>
            <label style={localStyles.label}>Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              style={localStyles.input}
              required
            />
          </div>

          <div style={localStyles.inputGroup}>
            <label style={localStyles.label}>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              style={localStyles.input}
              required
            />
          </div>

          {!isLogin && (
            <div style={localStyles.inputGroup}>
              <label style={localStyles.label}>Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+254 712 345 678"
                style={localStyles.input}
              />
            </div>
          )}

          <button
            type="submit"
            style={localStyles.submitButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }}
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div style={localStyles.footer}>
          <span style={localStyles.footerText}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </span>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setSelectedRole(null);
              setError('');
            }}
            style={localStyles.footerButton}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>

        {!isLogin && (
          <button
            onClick={() => setSelectedRole(null)}
            style={localStyles.changeRoleButton}
          >
            ← Change Role
          </button>
        )}
      </div>
    </div>
  );
};

const localStyles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '24px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
    padding: '48px',
    maxWidth: '900px',
    width: '100%',
    animation: 'slideUp 0.5s ease-out',
    position: 'relative',
    zIndex: 1
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: '24px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
    padding: '48px',
    maxWidth: '480px',
    width: '100%',
    animation: 'slideUp 0.5s ease-out'
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  logo: {
    fontSize: '80px',
    display: 'inline-block',
    animation: 'bounce 1s ease-in-out infinite',
    filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))'
  },
  logoSmall: {
    fontSize: '64px',
    display: 'inline-block'
  },
  title: {
    fontSize: '36px',
    fontWeight: '800',
    textAlign: 'center',
    margin: '0 0 12px 0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtitle: {
    fontSize: '16px',
    textAlign: 'center',
    color: THEME_COLORS.neutral.gray600,
    margin: '0 0 40px 0',
    fontWeight: '500'
  },
  formTitle: {
    fontSize: '32px',
    fontWeight: '800',
    textAlign: 'center',
    margin: '0 0 8px 0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  formSubtitle: {
    fontSize: '15px',
    textAlign: 'center',
    color: THEME_COLORS.neutral.gray500,
    margin: '0 0 32px 0',
    fontWeight: '500'
  },
  roleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  roleCard: {
    border: `3px solid ${THEME_COLORS.neutral.gray200}`,
    borderRadius: '20px',
    padding: '32px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: 'white',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    position: 'relative'
  },
  roleIconWrapper: {
    width: '80px',
    height: '80px',
    margin: '0 auto 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    borderRadius: '20px'
  },
  roleIcon: {
    fontSize: '48px'
  },
  roleTitle: {
    fontSize: '22px',
    fontWeight: '700',
    margin: '0 0 12px 0',
    textAlign: 'center',
    color: THEME_COLORS.neutral.gray900
  },
  roleDescription: {
    fontSize: '15px',
    color: THEME_COLORS.neutral.gray600,
    textAlign: 'center',
    margin: '0 0 20px 0',
    lineHeight: '1.6'
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 24px 0',
    fontSize: '14px',
    color: THEME_COLORS.neutral.gray700
  },
  selectButton: {
    padding: '14px',
    fontSize: '15px',
    fontWeight: '600',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: THEME_COLORS.neutral.gray700
  },
  input: {
    padding: '14px 16px',
    fontSize: '15px',
    border: `2px solid ${THEME_COLORS.neutral.gray200}`,
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit'
  },
  submitButton: {
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    transition: 'all 0.2s',
    marginTop: '8px'
  },
  errorBanner: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: '14px 16px',
    borderRadius: '12px',
    fontSize: '14px',
    marginBottom: '20px',
    border: '2px solid #fecaca',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500'
  },
  errorIcon: {
    fontSize: '18px'
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  footerText: {
    fontSize: '14px',
    color: THEME_COLORS.neutral.gray600
  },
  footerButton: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    padding: '0'
  },
  backToLoginButton: {
    width: '100%',
    padding: '14px',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: THEME_COLORS.neutral.gray600,
    border: `2px solid ${THEME_COLORS.neutral.gray200}`,
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  changeRoleButton: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: THEME_COLORS.neutral.gray600,
    border: 'none',
    cursor: 'pointer',
    marginTop: '16px'
  }
};

export default LoginSignup;





















