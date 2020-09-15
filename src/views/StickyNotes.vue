<template id="sticky-notes">
  <section>
    <div class="loading" v-if="loader">Loading&#8230;</div>
    <draggable v-model="allNotes" group="people" @start="drag=true" @end="drag=false">
      <div
        class="col-md-4 col-sm-6 leftclass card cardcontainers"
        v-for="(oneNote,index) in allNotes"
        :key="oneNote._id"
        :class="{ yellowColor: oneNote.color === 'yellow',blueColor: oneNote.color === 'blue', redColor: oneNote.color === 'red',  greenColor: oneNote.color === 'green',  orangeColor: oneNote.color === 'orange' }"
      >
        <div class="card-header cardhead">
          <span class="closeIcon" v-on:click="deleteNotes(oneNote._id)">
            <!-- <i class="fas fa-check"></i> -->
            <i class="fas fa-times"></i>
          </span>
        </div>

        <div class="sticky-notes card-body cardbodyContainers">
          <div>
            <input
              class="titletbs"
              v-model="oneNote.title"
              type="text"
              autofocus="true"
              placeholder="Type a title ..."
            />
          </div>

          <!-- <small>Last update: {{oneNote.date}}</small> -->
          <hr class="hrDevider" />
          <textarea class="desctbs" v-model="oneNote.description"></textarea>

          <div class="meta">
            <span class="actionbtn editbtn" v-on:click="updateNotes(oneNote._id,index)">
              <i class="fas fa-pencil-alt"></i>
            </span>
            <span class="actionbtn palettebtn ml-2 mr-2">
              <!-- <i class="fas fa-palette ml-3 mr-3"></i> -->
            </span>
            <span class="actionbtn deletebtn" v-on:click="deleteNotes(oneNote._id)">
              <i class="far fa-trash-alt"></i>
            </span>

            <span class="dateSpan">{{oneNote.date}}</span>
          </div>
        </div>
      </div>
    </draggable>
  </section>
</template>


<script>
import draggable from "vuedraggable";
import axios from "axios";
export default {
  name: "stickynotes",
  components: {
    draggable,
  },
  props: {
    allNotes: [],
    method: { type: Function },
  },
  data() {
    return {
      errors: [],
      loader: false,
    };
  },
  methods: {
    deleteNotes: function (id) {
      this.loader = true;
      axios.delete("http://localhost:3002/posts/" + id, {}).then((res) => {
        this.method();
        this.loader = false;
        console.log(res);
      });
    },
    updateNotes: function (id, index) {
      if (!this.allNotes[index].title) {
        //do something here
      } else if (!this.allNotes[index].description) {
        //do something here
      } else {
        this.loader = true;
        axios
          .put("http://localhost:3002/posts/" + id, {
            title: this.allNotes[index].title,
            description: this.allNotes[index].description,
            // date: this.todayDate,
            // color: this.bgColorClass
          })
          .then((res) => {
            this.method();
            this.loader = false;
            console.log(res);
          });
      }
    },
  },
};
</script>

<style lang="scss">
.leftclass {
  float: left;
}

.titletbs {
  background: transparent;
  width: 100%;
  padding: 5px;
  font-size: 18px;
  border: none transparent;
  outline: none;
  color: black;
}
.desctbs {
  background: transparent;
  width: 100%;
  height: 146px;
  padding: 5px;
  border: none transparent;
  outline: none;
  color: black;
}

.cardcontainers {
  width: 290px;
  height: 287px;
  // border-radius: 14px;
  float: left;
  padding: 0;
  margin-top: 45px;
  margin-right: 18px;
  // background: #fff885;
}

.cardbodyContainers {
  width: 283px;
  height: 275px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.cardhead {
  text-align: right;
  cursor: grab;
}

.hrDevider {
  margin: 0;
  margin-bottom: 11px;
}

.actionbtn {
  cursor: pointer;
  color: #4e5257;
}

.palettebtn:hover {
  color: black;
}

.editbtn:hover {
  color: black;
}

.deletebtn:hover {
  color: black;
}

.closeIcon {
  cursor: pointer;
}

.dateSpan {
  font-size: 9px;
  margin-right: -94px;
  margin-left: 24px;
  color: gray;
}

.yellowColor {
  background: #fff885;
}

.blueColor {
  background: #baf8ff;
}

.redColor {
  background: #ff96a4;
}

.greenColor {
  background: #cafacb;
}

.orangeColor {
  background: #ffb463;
}

/* Absolute Center Spinner */
.loading {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* Transparent Overlay */
.loading:before {
  content: "";
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

/* :not(:required) hides these rules from IE9 and below */
.loading:not(:required) {
  /* hide "loading..." text */
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: "";
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  -webkit-animation: spinner 1500ms infinite linear;
  -moz-animation: spinner 1500ms infinite linear;
  -ms-animation: spinner 1500ms infinite linear;
  -o-animation: spinner 1500ms infinite linear;
  animation: spinner 1500ms infinite linear;
  border-radius: 0.5em;
  -webkit-box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0,
    rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0,
    rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.5) -1.5em 0 0 0,
    rgba(0, 0, 0, 0.5) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0,
    rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
  box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0,
    rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0,
    rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0,
    rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0,
    rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
}

/* Animation */

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>