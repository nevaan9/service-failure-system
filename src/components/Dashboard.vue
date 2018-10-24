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
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: '',
        message: '',
        messages: [],
        snackbar: false,
        y: 'top',
        x: 'right',
        mode: '',
        timeout: 3000,
        text: 'You got a notification!'
      }
    },
    methods: {
      sendMessage() {
        this.$socket.emit('SEND_MESSAGE', {
          user: this.user,
          message: this.message
        });
        this.message = ''
      }
    },
    mounted() {
      this.$socket.on('MESSAGE', (data) => {
        this.messages = [...this.messages, data];
        this.snackbar = true
        // you can also do this.messages.push(data)
      });
    }
  }
</script>
