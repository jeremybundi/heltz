<template>
  <div class="body">
    <b-row>
      <b-col md="4"></b-col>
      <b-col md="4">
       
        <b-card class="card">
          <form @submit.prevent="createPost" class="form">
           
              <div>
              <label class="head">Add Items</label>
            </div>
              <div class="label">
              <label for="item_name">Item Name</label>
              <input type="text" id="item_name" v-model="formData.item_name">
            </div>
            <div class="label">
              <label for="item_url" >Item Link</label>
              <input type="text" id="item_url" v-model="formData.item_url">
            </div>
            <div class="label">
                <label for="details">Description</label>
                <textarea id="details" v-model="formData.details" rows="4"></textarea>
              </div>

            <div class="label">
              <label for="price">Item Cost</label>
              <input type="text"  id="price" v-model="formData.price" style="width: 30%;">
            </div>
            <br>
            <b-button mt="3" @click="createPost" :disabled="isFormSubmitted" variant="outline-primary"
            class="submitBtn">
              {{ isFormSubmitted ? 'Submitting...' : 'Submit Item' }}
            </b-button>
          </form>
      
        </b-card>
  
      </b-col>
      <b-col md="4"></b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      formData: {
        item_name: '',
        item_url: '',
        details: '',
        price: ''
      },
      isFormSubmitted: false,
      error: null,
    };
  },
  methods: {
    async createPost() {
  try {
    this.isFormSubmitted = true;
    const response = await axios.post('api/items/create', this.formData)

    console.log(this.formData);
  
    console.log('Post created successfully:', response.data);
   
  } catch (error) {
    this.error = error.message;
    console.error('Post not created:', error);
  } finally {
    this.isFormSubmitted = false;
    this.resetForm();
  }
},
    resetForm() {
   
      this.formData = {
        item_name: '',
        item_url: '',
        details: '',
        price: '',
      };
      this.error = null;
    },
  },
};
</script>
<style>
.body{
  background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYBjcOJqrFKL9E5sqSCcM235t-gQG6y8STJA&usqp=CAU');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
 .card{
  margin-bottom:70px;
  margin-top: 20px;
 }
 .head{
  color:blue;
  font-weight: bold;
  font-size:18px;
 }
.form{
  margin-right: 0;
  margin-left: 0;
  margin-top: 0;
  margin-bottom:0;
  font-family: 'Times New Roman', Times, serif;
  background-color: rgb(232, 238, 238);
  background-size: cover;
}
.label {
  text-align: left; 
  margin-left: 15px;
  margin-bottom: 5px;
  color: rgb(239, 9, 86);
  font-weight: bold;
  font-size: 16px;
}

.submitBtn{
  margin-bottom: 7px;
  margin-top: 5px;
}
#details {
  width: 60%; 
  min-width: 200px; 
  max-width: 500px; 
  min-height: 60px;
  padding: 10px; 
  border: 1px solid #ccc; 
  border-radius: 4px; 
  font-family: inherit; 
  font-size: 16px;
  resize: vertical; 
}

#item_name,
#item_url{
  width: 60%;
  margin-right: 20px;
}

input[type="text"],
textarea {
  background-color: #f0f0f0; /* Light grey background */
  color: #06323e; /* Dark grey text */
  font-size: 15px;
}
#price {
  margin-bottom: 0; /* Remove bottom margin if any */
}


</style>

