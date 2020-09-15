<template id="single-note">
  <div>
<div class="loading" v-if="loader">Loading&#8230;</div>


    <div class="col-md-4 col-sm-6 m-5 card cardcontainer" :class="bgColorClass">
      <div class="single-note add-note card-body cardbodyContainer">
        <input type="text" class="titletb" placeholder="Type a title ..." v-model="title" />
        <br />
        <small class="dateSetting">Today: {{todayDate}}</small>
        <hr />
        <textarea class="desctb" placeholder="Type a description ..." v-model="description"></textarea>
        <div class="meta" v-if="isOpenColorPallete === true">
          <span>
            <span v-on:click="openColorPallete">
              <i class="fas fa-palette colorpallet"></i>
            </span>
          </span>
          <span>
            <span v-on:click="saveNotes">
              <i class="fas fa-check ml-5 saveIcon"></i>
            </span>
          </span>
        </div>

        <div v-if="isOpenColorPallete === false">
        <div class="colors" v-for="circleColor in colorsArray" :key="circleColor.id"> 
          <button class="circle" :class="circleColor.color" v-on:click="setColor" :id="circleColor.id"></button>          
          </div>
          <span v-on:click="setColor" class="closeIconn"><i class="fas fa-times"></i></span>
       </div>
        
      </div>
    </div>
    <allNoteComponent :allNotes="notesData"  :method="getNotes"></allNoteComponent>
  </div>
</template>


<script>
import axios from "axios";
import stickynotes from "../views/StickyNotes";
export default {
  name: "single-note",
  components: {
    allNoteComponent: stickynotes,
  },
  props: [],
  data() {
    return {
      bgColorClass:"",
      isOpenColorPallete:true,
      notesData: [],
      errors: [],
      colorsArray: [
        {
          color: "yellow",
          id:1
        },
        {
          color: "blue",
          id:2
        },
        {
          color: "red",
          id:3
        },
        {
          color: "green",
          id:4
        },
        {
          color: "orange",
          id:5
        },
        {
          color: "white",
          id:6
        }
      ],
      title: "",
      description: "",
      date: "",
      color: "white",
      loader:false
    };
  },
  computed: {
    todayDate: function () {
      var d = new Date();
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var today =
        d.getDate() + " " + months[d.getMonth()] + ", " + d.getFullYear();

      return today;
    },
  },
  methods: {
    getNotes: function () {
      axios
        .get(`http://localhost:3002/posts`)
        .then((response) => {
          this.notesData = response.data;
          console.log(this.notesData);
          this.loader = false;   
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    saveNotes: function () {  
      if(!this.title)
      {
          // Do somthing
      }else if(!this.description)
      {
              // Do somthing
      }else{
          this.loader = true;   
      axios
        .post(`http://localhost:3002/posts`, {
          title: this.title,
          description: this.description,
          date: this.todayDate,
          color: this.bgColorClass
        })
        .then(() => {
          this.title ="";
          this.description="";
          this.getNotes();
          
        })
        .catch((e) => {
          this.errors.push(e);
        });
      }
      
    },
    openColorPallete: function(){
      this.isOpenColorPallete=false;
    },
    setColor: function(event){
      this.isOpenColorPallete=true;
       var selectColorId = event.target.attributes.id.value;
       
       if(selectColorId == "1")
       {
          this.bgColorClass = "yellow";
       }
       else if(selectColorId == "2")
       {
          this.bgColorClass = "blue";
       }
       else if(selectColorId == "3")
       {
          this.bgColorClass = "red";
       }
       else if(selectColorId == "4")
       {
          this.bgColorClass = "green";
       }
       else if(selectColorId == "5")
       {
          this.bgColorClass = "orange";
       }
       else if(selectColorId == "6")
       {
          this.bgColorClass = "white";
       }
      
    }
  },
  mounted() {
    this.getNotes();
  },
};
</script>

<style lang="scss">
.titletb {
  background: transparent;
  width: 100%;
  padding: 5px;
  font-size: 23px;
  border: none transparent;
  outline: none;
  color: grey;
}
.desctb {
  background: transparent;
  width: 100%;
  height: 124px;
  padding: 5px;
  border: none transparent;
  outline: none;
  color: grey;
}

.dateSetting {
  margin-left: -125px;
}

.cardcontainer {
  width: 359px;
  height: 293px;
  border-radius: 14px;
 float: left;
}

.cardbodyContainer {
  width: 325px;
  height: 275px;
}
.colorpallet,
.saveIcon {
  cursor: pointer;
}



.colors{
  display: inline-block !important;
}

.colors .circle {
  width: 25px;
  height: 25px;
  margin: 0 4px;
  cursor: pointer;
  border-radius: 50%; 
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  
}
.colors .circle.selected {
  border: 2px dashed #777;
}
.yellow {
  background-color: #fff885!important;
   border: solid #fff885 !important;
}
.blue {
  background-color: #baf8ff !important;
  border: solid #baf8ff !important;
}
.red {
  background-color: #ff96a4 !important;
border: solid #ff96a4 !important;
}
.green {
  background-color: #cafacb !important;
  border: solid #cafacb !important;
}
.orange   {
  background-color: #ffb463 !important;
  border: solid #ffb463 !important;
}
.white   {
  background-color: #fff !important;
  border: 1px solid #ccc;
}

.closeIconn{
  cursor: pointer;
  margin-right: -19px;
    margin-left: 21px;
    color: gray;
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
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
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
  content: '';
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
  -webkit-box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.5) -1.5em 0 0 0, rgba(0, 0, 0, 0.5) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
  box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0, rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
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