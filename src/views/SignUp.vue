<template>
    <div class="container">
      <div class="column left">
        <!-- Left column content -->
        <!-- ... -->
      </div>
  
      <div class="column middle" style="width: 70%;">
        <!-- Middle column with the sign-up form -->
        <b-card title="Sign Up" style="width: 25rem; margin-top: 30px;">
          <form @submit.prevent="submitForm" class="input_form">
            <div class="form-group">
              <label for="name">Name:</label>
              <input
                v-model="formData.name"
                type="text"
                id="name"
                name="name"
               
                placeholder="Enter Name"
                required
              >
            </div>
  
            <div class="form-group">
              <label for="phone">Phone:</label>
              <input
                v-model="formData.phone"
                type="text"
                id="phone"
                name="phone"
                pattern="^\+254\d{9}$"
                placeholder="+254XXXXXXXXX"
                required
              >
            </div>
  
            <div class="form-group">
              <label for="email">Email:</label>
              <input
                v-model="formData.email"
                type="text"
                id="email"
                name="email"
               
                required
              >
            </div>
  
            <div class="form-group">
              <label for="username">Username:</label>
              <input
                v-model="formData.username"
                type="text"
                id="username"
                name="username"
                required
              >
            </div>
  
            <div class="form-group">
              <label for="password">Password:</label>
              <input
                v-model="formData.password"
                type="text"
                id="password"
                name="password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$"
                placeholder="Min 7 characters"
                required
              >
            </div>
  
            <b-button @click="submitForm" class="submitBtn" variant="outline-primary">Register</b-button>
          </form>
        </b-card>
      </div>
  
      <div class="column right">
        
      </div>
    </div>
  </template>
  
  
  
  <script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        name: '',
        phone: '',
        email: '',
        username: '',
        password: '',
      },
    };
  },
 
  methods: {
    async submitForm(data) {
      try {
        const response = await axios.post('/api/users/register', this.formData);
        if (response.status === 200 || response.status === 201) {
         this.$router.push('/login'); // Redirect using Vue Router
        } else {
          throw new Error('API request failed');
        }
      } catch (error) {
        console.error(error);
        this.$message.error('Data not saved. Please try again.'); // Use Vue's built-in message component
      }
    },
  },


};
</script>
  <style>
  .container {
    display: flex;
    justify-content: space-between;
    background-image: url(); /* Replace with your actual background image URL */
    background-size: cover;
    height: 100vh;

 
  }
  
  .column {
    flex: 1;
    padding: 0px;
 
  }
  input{
    width:60%;
    height: 30px;
    background-color: azure;
    
  }
  label{
    padding: 12px 12px 12px 0;
  display: inline-block;
  }
  .form-group{
    margin-bottom: 15px;
  }
  input[type="text"], select, textarea {
  width: 60%;
  padding:8px;
  border: 2px solid #dbdb87;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
  text-decoration: antiquewhite;
}
  

/* Set equal width for input fields */

  </style>
  