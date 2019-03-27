<template>
  <div id="main" class="container center">
    <div class="card" id="card">
      <div id="add-question" class="row">
        <div id="form-add" class="container fixed col s12">
          <div class="row">
            <div class="col m10 offset-m1 s12">
              <h4 id="add-question-header" class="center-align">Edit Question</h4>
              <div class="row">
                <form class="col s12" @submit.prevent="submitEdit">
                  <div class="row">
                    <div class="input-field col s8 offset-s2">
                      <input
                        id="input-title"
                        type="text"
                        class="validate"
                        autocomplete="off"
                        v-model="titleEdit"
                      >
                      <label class="active" for="title">Title</label>
                    </div>
                  </div>

                  <div class="row">
                    <div class="input-field col s10 offset-s1">
                      <ckeditor :editor="editor" v-model="contentEdit" :config="editorConfig"></ckeditor>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s8 offset-s2">
                      <button
                        class="btn waves-effect waves-hard blue-grey darken-4"
                        type="submit"
                        name="action"
                      >
                        Submit
                        <i class="material-icons right">send</i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "edit-question-form",
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {},
      titleEdit: "",
      contentEdit: "",
      currentId: 0
    };
  },
  created() {
    axios
      .get(`http://localhost:3000/questions/find?id=${this.$route.params.id}`)
      .then(gotQuestion => {
        this.titleEdit = "";
        this.contentEdit = "";

        this.currentId = gotQuestion.data._id;
        this.titleEdit = gotQuestion.data.title;
        this.contentEdit = gotQuestion.data.content;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    submitEdit() {
      console.log("CURRENT: ",this.currentId);
      axios
        .put(
          `http://localhost:3000/questions/edit?id=${this.currentId}`,
          {
            title: this.titleEdit,
            content: this.contentEdit
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(createdQuestion => {
          console.log("success created question");
          this.$store.dispatch("notif", {
            type: "success",
            message: "Success edit question"
          });
          this.$store.dispatch("getQuestion", {
            questionId: this.currentId
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
#card {
  width: 60rem;
  margin-left: 11rem;
}

#add-question {
  /* margin-left: 8rem; */
  margin-top: 8rem;
}

#add-question-header {
  margin-top: 3rem;
}

#input-title:focus {
  border-bottom: 1px solid rgb(255, 119, 35);
  box-shadow: 0 1px 0 0 rgb(255, 119, 35);
}

#input-title:focus + label {
  color: rgb(255, 119, 35);
}

#input-content:focus {
  border-bottom: 1px solid rgb(255, 119, 35);
  box-shadow: 0 1px 0 0 rgb(255, 119, 35);
}

#input-content:focus + label {
  color: rgb(255, 119, 35);
}

#main {
  padding-top: 3.3rem;
}
</style>
