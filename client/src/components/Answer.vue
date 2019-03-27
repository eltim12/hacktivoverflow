<template>
  <div class="row">
    <div id="vote" class="col s2">
      <div id="height-up" class="row">
        <a class="vote-btn" href @click.prevent="vote('up', answer._id)">
          <i class="material-icons">keyboard_arrow_up</i>
        </a>
      </div>
      <div id="height-mid" class="row">
        <p>{{ answer.totalVotes }}</p>
      </div>
      <div id="height-down" class="row">
        <a href class="vote-btn" @click.prevent="vote('down', answer._id)">
          <i class="material-icons">keyboard_arrow_down</i>
        </a>
      </div>
    </div>
    <div class="col s8 offset-s2">
      <div class="question">
        <h6 v-html="answer.content"></h6>
        <p class="right-align">Answered by: {{ answer.userId.name }}</p>
      </div>
    </div>
    <div class="col s2 offset-s8" v-if="isOwner">
      <div id="edit-button">
        <routerLink id="edit" href :to="'/editanswer/'+ answer._id">
          <h6>edit</h6>
        </routerLink>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Answer",
  data() {
    return {
      clickedUp: false,
      clickedDown: false,
      votes: 0,
      isOwner: false
    };
  },
  props: ["answer", "allData"],
  created() {
    this.votes = this.answer.votes.length;
    if (this.answer.userId._id === localStorage.getItem("userId")) {
      this.isOwner = true;
    }
  },
  methods: {
    vote(direction, id) {
      console.log(id, direction, "dalem voteeeeeee");
      if (direction === "up" && this.clickedUp !== true) {
        this.clickedUp = true;
        this.clickedDown = false;
        // this.index = 1
        this.votes += 1;
        this.answer.totalVotes += 1;
        axios
          .put(
            `http://localhost:3000/answers?userId=${localStorage.getItem(
              "userId"
            )}`,
            {
              answerId: this.answer._id,
              vote: "true"
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(votedUp => {
            console.log("success vote up");
            this.$router.push(`/question/${this.allData.question._id}`);
          })
          .catch(err => {
            console.log(err);
          });

        console.log(this.votes);
      } else if (direction === "down" && this.clickedDown !== true) {
        this.clickedDown = true;
        this.clickedUp = false;

        this.votes -= 1;

        this.answer.totalVotes -= 1;

        axios
          .put(
            `http://localhost:3000/answers?userId=${localStorage.getItem(
              "userId"
            )}`,
            {
              answerId: this.answer._id,
              vote: "false"
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(votedUp => {
            console.log("success vote up");
            this.$router.push(`/question/${this.allData.question._id}`);
          })
          .catch(err => {
            console.log(err);
          });
        console.log(this.votes);
      }
    }
  }
};
</script>

<style>
.vote-btn {
  color: black;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.vote-btn:hover {
  color: grey;
}

#height-up {
  height: 1rem;
}

#height-mid {
  height: 0.8rem;
}

#height-down {
  height: 1rem;
}

#vote {
  margin-top: 2rem;
}

#edit-button {
  border: 1px black solid;
  ransition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.4s ease-in;
}

#edit-button:hover {
  background-color: grey;
  color: white;
}

#edit {
  color: black;
  font-weight: 3px;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

#edit:hover {
  color: white;
}
</style>
