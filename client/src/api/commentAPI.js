import axios from "axios";

const commentAPI = {
    createNewComment(params) {
        return axios.post("/comments", params);
      },
    deleteComment(id) {
        return axios.delete(`/comments/${id}`);
      },
};

export default commentAPI;