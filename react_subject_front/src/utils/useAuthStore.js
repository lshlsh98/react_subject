import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      // 저장 할 정보를 속성으로 생성
      id: null,
      email: null,
      name: null,
      token: null,
      endTime: null,

      // 함수구현(zustand로 관리 할 데이터를 처리하는 함수들을 구현)
      login: ({ id, email, name, token, endTime }) => {
        set({ id, email, name, token, endTime });
      },
      logout: () => {
        set({
          id: null,
          email: null,
          name: null,
          token: null,
          endTime: null,
        });
      },
    }),

    {
      name: "auth-key",
      storage: createJSONStorage(() => localStorage),
      // 새로고침을 해도 저장 할 데이터를 선택
      // -> 6개 데이터 중 5개만 계속 저장하고 isReady는 새로고침 시 초기화 하기 위한 설정
      // partialize를 설정하지 않으면 모든 정보를 브라우저에 계속 저장해서 유지
      partialize: (state) => {
        return {
          id: state.id,
          email: state.email,
          name: state.name,
          token: state.token,
          endTime: state.endTime,
        };
      },
    },
  ),
);

export default useAuthStore;
