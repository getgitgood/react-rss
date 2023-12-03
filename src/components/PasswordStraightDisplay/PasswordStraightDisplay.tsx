export default function generatePasswordStrength(password: string) {
  const calculatePasswordStrength = () => {
    let strength = 0;
    if (password.match(/[a-z]+/)) strength += 1;
    if (password.match(/[A-Z]+/)) strength += 1;
    if (password.match(/[0-9]+/)) strength += 1;
    if (password.match(/[$@#&!]+/)) strength += 1;
    if (password.length > 5) strength += 1;

    return {
      word: ['Very Weak', 'Weak', 'Not so strong', 'Strong', 'Very Strong'][
        strength
      ],
      strength: strength
    };
  };

  const calculatePasswordClassName = () => {
    const passwordStrength = calculatePasswordStrength().strength;
    if (passwordStrength < 2) {
      return 'weak';
    }
    if (passwordStrength > 2 && passwordStrength < 4) {
      return 'normal';
    }
    if (passwordStrength > 4) {
      return 'strong';
    }
  };
  return (
    <div className={calculatePasswordClassName()}>
      Password Strength: {calculatePasswordStrength().word}
    </div>
  );
}
