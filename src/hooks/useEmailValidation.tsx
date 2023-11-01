import { useState } from 'react';

export function useEmailVerification(
  email: string,
  emailcode: string,
  errors: any
) {
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isEmailCodeValid, setIsEmailCodeValid] = useState(false);

  const handleSendEmailCode = () => {
    if (!email || errors.email) return;

    console.log('클릭됨');

    // 인증번호 전송 로직

    // 인증번호 전송 성공 시, 인증번호 입력 창 노출
    setIsEmailChecked(true);
  };

  // 이메일 인증번호 유효성 검사
  const handleCheckEmailValidate = () => {
    // 인증번호 유효성 검사 로직
    const isCodeValid = true;

    // 코드가 유효한 경우, 인증번호 입력 창 숨기고 인증 완료 메시지 노출
    if (isCodeValid) {
      setIsEmailChecked(false);
      setIsEmailCodeValid(true);
    }
  };

  return {
    isEmailChecked,
    isEmailCodeValid,
    handleSendEmailCode,
    handleCheckEmailValidate,
  };
}
