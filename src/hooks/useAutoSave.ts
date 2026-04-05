import { useCallback } from 'react';
import debounce from 'lodash/debounce';

export const useAutoSave = (onSave: (data: any) => void) => {
  // Chờ 1.5 giây sau khi người dùng ngừng chọn đáp án mới gửi lên Server
  const debouncedSave = useCallback(
    debounce((data: any) => {
      onSave(data);
      console.log("Auto-saved to Server:", data);
    }, 1500),
    [onSave]
  );

  return { debouncedSave };
};