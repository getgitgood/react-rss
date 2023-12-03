import { useEffect, useState } from 'react';
import classes from './PasswordStrengthDisplay.module.scss';

export default function PasswordStrengthDisplay({
  password
}: {
  password: string;
}) {
  const [strengthCount, setStrengthCount] = useState(0);

  useEffect(() => {
    let strength = 0;
    if (password.match(/[a-z]+/)) strength += 1;
    if (password.match(/[A-Z]+/)) strength += 1;
    if (password.match(/[0-9]+/)) strength += 1;
    if (password.match(/[$@#&!]+/)) strength += 1;
    if (password.length > 5) strength += 1;

    setStrengthCount(strength);
  }, [password]);

  const strengthText = [
    'Very Weak',
    'Weak',
    'Not so strong',
    'Strong',
    'Very Strong'
  ][strengthCount];

  const calculatePasswordClassName = () => {
    if (strengthCount <= 2) {
      return classes.weak;
    }
    if (strengthCount > 2 && strengthCount < 4) {
      return classes.normal;
    }
    if (strengthCount >= 4) {
      return classes.strong;
    }
  };

  return (
    <div className={classes.password_field}>
      <span
        className={`${classes.password_text} ${calculatePasswordClassName()}`}
      >
        {strengthText}
      </span>
    </div>
  );
}
