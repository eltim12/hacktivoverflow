<template>
  <nav id="navbar" class="fixed">
    <div class="nav-wrapper white fixed">
      <routerLink to="/" id="logo" class="brand-logo left">
        <img src="../assets/logo1.png" width="170px">
      </routerLink>

      <ul id="nav-mobile" class="hide-on-med-and-down right">
        <!-- <div class="container"> -->
        <!-- <div id="row"> -->
        <li v-if="isLogin === true">
          <router-link
            to="/ask"
            id="ask"
            class="waves-effect waves-hard btn white grey-text text-darken-4"
            @click.prevent="ask"
          >ask</router-link>
        </li>
        <li v-if="isLogin === true">
          <a
            id="logout"
            class="waves-effect waves-hard btn white grey-text text-darken-4"
            @click.prevent="logout"
          >logout</a>
        </li>

        <!-- </div> -->

        <li v-if="isLogin === false">
          <router-link
            to="/login"
            id="login"
            class="waves-effect waves-hard btn white grey-text text-darken-4"
          >login</router-link>
        </li>

        <li id="write" class="right">
          <a>
            <!-- <i class="material-icons black">create</i> -->
          </a>
        </li>
        <!-- </div> -->
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "navbar",
  computed: mapState(["isLogin"]),
  data() {
    return {
      tes: "tes"
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("notif", {
        type: "success",
        message: "You Have Successfully Logged Out"
      });
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
#logo {
  /* margin-top: 4px; */
  margin-bottom: 3px;
  margin-left: 18rem;
}

nav {
  height: 3.5rem;
  border-top: 3.5px solid rgb(255, 119, 35);
  position: fixed;
  z-index: 100000000;
}

#button {
  margin-right: 3rem;
}

#nav-mobile {
  margin-right: 18rem;
  /* margin-bottom:10px;  */
}

#logout {
  margin-bottom: 13px;
}

#login {
  margin-bottom: 13px;
}

#ask {
  width: 5.9rem;
  margin-bottom: 13px;
}
</style>
