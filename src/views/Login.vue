<template>
  <div class="page-container">
    <div class="column left"></div>
    <div class="column middle">
      <div class="login-container" >
        <b-card title="Login" class="form">
          <form @submit.prevent="login" >
            <div class="form-group">
              <label for="username">Username:</label>
              <input type="text" id="username" v-model="username" required>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" v-model="password" required>
            </div>
            <button @click="login" type="submit" class="btn btn-primary">Login</button>

            <div v-if="loginError">{{ loginError }}</div>

            <a href="#" @click="Signup" class="link">Sign Up Here</a>
            
          </form>
        </b-card>
      </div>
    </div>
    <div class="column right"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    showLoginModal: Boolean, // Receive showLoginModal prop from main component
  },

  data() {
    return {
      username: '',
      password: '',
      loginError: null,
    };
  },
  methods: {
    
    login() {
  this.loginError = null; // Initialize error property to store error message
  axios
    .post('api/login', {
      username: this.username,
      password: this.password,
    })

    .then(response => {
    if (response.data.success) {
      // Check if the current route is not the dashboard before navigating
      if (this.$router.currentRoute.path !== '/dashboard') {
        this.$router.push('/dashboard');
      } else {
        // If we're already on the dashboard, do nothing or handle as needed
      }
      // ... other actions ...
    } else {
      
    }
  })
    .catch((error) => {
      console.error('Login error:', error);
      this.loginError = 'please signup.'; // Generic error for user
    });

    
},
    

Signup() {
  this.$router.push('/signup');
},

  },
};
</script>

<style scoped>
.page-container {
  position: fixed;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWhNKDOg3Dd2Cvp6q_D0CPM736bR7msF8fBsuYpe6lb00dWtl6Y2sCurS8rw&s');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}


.column {
  flex: 1;
  padding: 10px; /* Add some spacing between columns */
}

.middle {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  margin-top: 50px; /* Add top margin to the form */
}
.form{
  background-color: rgba(240, 248, 255, 0.909);
}
.link {
  display: block;
  margin-top: 10px;
  text-align: right;
  font-size: 10px;
  text-decoration: none;
  color:rgb(239, 21, 25);
  font-style:italic;
}


</style>
