<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Group</h3>
        <hr>
      </div>
      <div class="card-body">
        <div class="messages">

        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="gorm-group">
          <p>User:</p>
          <v-text-field type="text" v-model="user" />
        </div>
        <div class="gorm-group pb-3">
          <p>Message:</p>
          <v-text-field v-model="message" />
        </div>
        <v-btn @click="sendMessage">Send</v-btn>
      </form>
    </div>
    <div>
      <div v-for="aMessage in messages">
        <p>{{aMessage.user}}</p>
        <p>{{aMessage.message}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import io from 'socket.io-client';
  export default {
    data() {
      return {
        user: '',
        message: '',
        messages: [],
        socket : io('localhost:8081')
      }
    },
    methods: {
      sendMessage() {
        this.socket.emit('SEND_MESSAGE', {
          user: this.user,
          message: this.message
        });
        this.message = ''
      }
    },
    mounted() {
      this.socket.on('MESSAGE', (data) => {
        this.messages = [...this.messages, data];
        // you can also do this.messages.push(data)
      });
    }
  }
</script>
