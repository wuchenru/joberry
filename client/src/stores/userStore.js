import { makeAutoObservable, flow } from "mobx";
import { userAPI } from "@/api";

const nullUser = {
  name: null,
  email: null,
};
const nullProfile = {
  ...nullUser,
  company: null,
  about: null,
  gender: null,
  occupation: null,
  posts:null,
  berries: null,
  comments: null,
};

class UserStore {
  loading = false;
  currentUser = nullUser;
  userProfile = nullProfile;
  otherUser = {};

  constructor() {
    makeAutoObservable(this);
  }

  verifyUser = flow(function* () {
    this.loading = true;
    try {
      const data = yield userAPI.verifyUser();
      if (data) {
        this.currentUser = data;
      }
    } catch (error) {}
    this.loading = false;
  });

  getProfile = flow(function* () {
    this.loading = true;
    try {
      const data = yield userAPI.getProfile();
      if (data) {
        this.userProfile = data;
      }
    } catch (error) {}
    this.loading = false;
  });

  getUserInfo = flow(function* (id) {
    this.loading = true;
    try {
      const data = yield userAPI.getProfile();
      if (data) {
        this.otherUser = data;
      }
    } catch (error) {}
    this.loading = false;
  });

  updateProfile = flow(function* () {
    this.loading = true;
    try {
      const data = yield userAPI.updateProfile(this.userProfile);
      if (data) {
        this.userProfile = data;
      }
    } catch (error) {}
    this.loading = false;
  });

  deleteAccount = flow(function* () {
    this.loading = true;
    try {
      const data = yield userAPI.deleteAccount();
      if (data) {
        this.currentUser = nullUser;
        this.userProfile = nullProfile;
      }
    } catch (error) {}
    this.loading = false;
  });
}
const userStore = new UserStore();
export default userStore;