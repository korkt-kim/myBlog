export const state = () => ({
    isOpened: false,
    title: "",
    content: ""
  });
  
  export const mutations = {
    openDialog(state, { title = "", content = "" }) {
      state.isOpened = true;
      state.title = title;
      state.content = content;
    },
    closeDialog(state) {
      state.isOpened = false;
    }
  };
  