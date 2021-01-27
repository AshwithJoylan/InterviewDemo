export const say = (type: string) => {
  return {
    type,
  };
};

export const pass = (type: string, payload: any) => ({
  type,
  payload,
});
