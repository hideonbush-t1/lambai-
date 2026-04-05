import { useEffect, useState } from 'react';

export const useAntiCheat = (maxViolations = 3, onForceSubmit: () => void) => {
  const [violations, setViolations] = useState(0);

  useEffect(() => {
    const handleBlur = () => {
      setViolations((prev) => {
        const next = prev + 1;
        if (next >= maxViolations) {
          alert("Bạn đã vi phạm quy chế thi quá 3 lần. Hệ thống sẽ tự động nộp bài!");
          onForceSubmit();
        } else {
          alert(`Cảnh báo gian lận lần ${next}/${maxViolations}: Không được rời khỏi phòng thi!`);
        }
        return next;
      });
    };

    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [onForceSubmit]);

  return violations;
};