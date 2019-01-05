<template>
  <div id="app">
    <mr-loader v-if="this.isContactingService" :message="'Contacting service...'"/>
    <mr-header :firebaseKey="this.firebaseKey" />
    <router-view class="non-selectable" :onHandleRegister="this.handleRegister" :onHandleInsertBindsToUser="this.handleInsertBindsToUser"
      :firebaseKey="this.firebaseKey" :registerError="this.registerError" :apiBinds="this.apiBinds"></router-view>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import mrHeader from '@/renderer/components/Header';
  import mrLoader from '@/renderer/components/Loader';

  export default {
    name: 'minerity-report',
    components: {
      mrHeader,
      mrLoader
    },
    data() {
      return {
        firebaseKey: localStorage.getItem('firebaseKey'),
        registerError: null,
        isContactingService: false,
        apiBinds: []
      }
    },
    mounted() {
      this.handleLogin();
    },
    methods: {
      handleRegister(seed) {
        this.isContactingService = true;
        if (this.seed !== null) {
          let newUser = firebase.database().ref('users/').push({
            seed: seed,
            timestamp: new Date().getTime()
          }).then((snapshot) => {
            this.firebaseKey = snapshot.key;
            localStorage.setItem('firebaseKey', this.firebaseKey);
            this.$router.push('dashboard');
            this.isContactingService = false;
          }).catch((err) => {
            this.isContactingService = false;
            this.handleRegisterError(err);
          });
        }
      },
      handleLogin() {
        if (this.firebaseKey !== null) {
          firebase.database().ref(`users/${this.firebaseKey}`).once('value')
            .then((snapshot) => {
              this.apiBinds = snapshot.val().binds;
            })
            .catch(err => {
              console.log(err);
            })
        }
      },
      handleInsertBindsToUser(bind) {
        this.isContactingService = true;
        let list = [];
        let ref = firebase.database().ref(`users/${this.firebaseKey}`);

        ref.once('value')
          .then((snapshot) => {
            let snap = snapshot.val().binds;
            list = ( typeof snap !== undefined && snap instanceof Array ) ? snap : []
            list.push(bind);
          })
          .then(() => {
            ref.update({
              binds: list
            });
            this.isContactingService = false;
          })
          .catch(err => {
            this.isContactingService = false;
            console.log(err);
          });

      },
      handleRegisterError(err) {
        this.registerError = err.message;
      }
    }
  }
</script>

<style lang="scss">
// here comes the global css var, mixins, functions, ..
@import url('https://fonts.googleapis.com/css?family=Oxygen:400,700|Source+Sans+Pro:400,600,700');

$main-title   : #fff;
$button-text  : #fff;
$button-background-passive: #2a93c3;
$button-background-active:  #485460;
$primary-color: #1e272e;
$error-color: #f53b57;
$neutral-color: #05c46b;

$text-input-border: 1px solid rgba(255,255,255,0.3);

* {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
}

.non-selectable {
  -webkit-user-select: none;
}

html, body {
    font-family: 'Oxygen', sans-serif;
    background: $primary-color;
}

p {
    margin: 0;
    padding: 0;
    color: white;
    font-size: 13px;
}

.hide {
    display: none !important;
}

/deep/ .stx_xaxis, .stx_yaxis {
    font-family: "Source Sans Pro", sans-serif;
}

/deep/ .stx_yaxis {
    text-align: right;
}

::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(0,0,0,0);
    border-radius: 100px;
}

::-webkit-scrollbar:hover {
    background-color: rgba(0, 0, 0, 0.09);
}

::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.2);
    border-radius: 100px;
}
::-webkit-scrollbar-thumb:active {
    background: rgba(0,0,0,0.61);
    border-radius: 100px;
}

/* add vertical min-height & horizontal min-width */
::-webkit-scrollbar-thumb:vertical {
  min-height: 10px;
}
::-webkit-scrollbar-thumb:horizontal {
  min-width: 10px;
}
</style>
