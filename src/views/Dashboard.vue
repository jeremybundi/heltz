<template>
    <div class="background-image">
        <div class="background-image">
 
    <div class="button-container">
      <b-button @click="addItem"  class="btn btn-success">Add Items</b-button>
      <b-button @click="viewOrder" class="btn btn-success">View Orders</b-button>
    </div>
  </div>
    </div>
  </template>
  
  <script>
export default {
  name: 'BackgroundImageComponent',
  methods: {
    addItem() {
      this.$router.push('/additems');
    },
    viewOrder() {
      this.$router.push('/show');
    }
  }
}
</script>
  
  <style scoped>
  .background-image {
    background-image: url('https://media.istockphoto.com/id/152509232/photo/interior-of-shopping-mall.jpg?s=612x612&w=0&k=20&c=CtO5tpEVW8_LB__qgFrM3czriG-fAIJZPDtkGlDxv8w=');
    background-size: cover;
    background-position: center;
    height: 100vh; 
    position: relative;
    overflow: hidden; 
    }

    .button-container {
    position: absolute;
    top: 20%; 
    left: 50%; 
    transform: translate(-50%, -50%);
    display: flex;
    gap: 70px; 
    }


  @media (max-width: 599px) {
    .background-image {
      height: 50vh; 
      background-size: contain; 
    }
  }
  
  @media (min-width: 600px) and (max-width: 899px) {
    .background-image {
      height: 75vh;
    }
  }

  @media (min-width: 900px) {
    .background-image {
      height: 100vh; 
    }
  }
  .btn-success{
    color: rgb(32, 243, 5);
    font-weight: bold;
  }
  </style>
  