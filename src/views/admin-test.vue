<template>
  <div class="admin q-pb-lg">
    <div class="row justify-between">
      <div class="col-2">
        <div v-for="(subtest,index) in subtests" :key="`subtest_${index}`" class="admin__important cursor-pointer  q-px-md q-mb-md" @click="selectSubTest(subtest, index)">
          <div class="text-primary text-bold q-mb-sm">Субтест {{index + 1}}</div>
          <div>Описание <span class="text-primary">{{subtest.description!==''?'Есть':'Нет'}}</span></div>
          <div>Количетсво вопросов: <span class="text-primary">{{subtest.questions.length}}</span></div>
        </div>
      </div>
      <div class="col-7">
        <div class="flex q-mb-md justify-between">
          <q-btn color="primary" @click="changeStatusTest('add')">
            Добавить субтест
          </q-btn>
          <q-btn color="primary" @click="changeStatusTest('add')">
            Добавить интерпретацию
          </q-btn>
        </div>
        <div class="card card__shadow card__border--small q-pa-md q-mb-md">
          <q-input
            label="Название теста"
            v-model="text3"
            borderless
            class="q-mb-md"
          />
          <q-input
            class="q-mb-md"
            label="Авторство"
            v-model="text"
            borderless
            type="textarea"
            autogrow
          />
          <q-input
            label="Описание"
            v-model="text2"
            borderless
            type="textarea"
            autogrow
          />
        </div>
        <div class="card q-pa-md" v-if="statusTest">
          <div class="text-primary text-bold text-center q-mb-md">{{statusTest === 'add'?'Добавление субтеста':`Субтест ${subtest.id + 1}`}}</div>
          <q-input
            class="q-mb-lg"
            label="Описание субтеста"
            v-model="subtest.description"
            borderless
            type="textarea"
            autogrow
          />
          <div class="q-pb-lg">
            <div v-for="(question, index) in subtest.questions" :key="`question_${index}`" class="row q-mb-sm">
              <q-input :label="`Вопрос ${index+1}`" v-model="question.name" borderless class="col-12 q-mb-md"/>
              <div class="row col-12 q-gutter-sm items-center q-mb-md">
                <div v-for="(answer,index2) in showAnswerArray(index)" :key="`answer_${index2}`">
                  {{ answer.value }}
                </div>
                <q-uploader v-if="question.answers[question.answers.length - 1].type === 'upload'"
                            v-model="question.answers[question.answers.length - 1].value"
                            label="Вопрос"
                />
                <q-input v-else-if="question.answers[question.answers.length - 1].type !== null" label="Ответ"
                         v-model="question.answers[question.answers.length - 1].value" borderless class="col-2"/>
                <q-btn v-if="question.answers[question.answers.length - 1].value!==''" color="primary"
                       @click="addAnswer(index)" round>
                  <q-icon name="done"/>
                </q-btn>
                <q-btn color="primary" round>
                  <q-icon name="add"/>
                  <q-menu
                    anchor="bottom right"
                    self="bottom left"
                  >
                    <q-list style="min-width: 100px">
                      <q-item clickable v-close-popup>
                        <q-item-section @click="changeTypeQuestion(index, 'upload')">Добавить картинку</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section @click="changeTypeQuestion(index, 'text')">Добавить текст</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
            <div class="flex justify-between">
              <q-btn class="q-mt-lg" color="primary" @click="addQuestion()">Добавить вопрос</q-btn>
              <q-btn v-if="statusTest === 'change'" class="q-mt-lg" color="primary" @click="editSubTest()">Изменить</q-btn>
              <q-btn v-else class="q-mt-lg" color="primary" @click="addSubTest()">Сохранить субтест</q-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2">
        <div v-for="(Integration,index) in Integrations" :key="`integration_${index}`" class="card cursor-pointer  q-px-md q-mb-md" @click="selectSubTest(subtest, index)">
          <div class="text-primary text-bold q-mb-sm">Интерпретация {{index + 1}}</div>
          <div>Описание <span class="text-primary">{{Integration.description!==''?'Есть':'Нет'}}</span></div>
          <div>Кол-во баллов: <span class="text-primary">{{Integration.balls}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'admin-test',
  data () {
    return {
      text: '',
      text2: '',
      text3: '',
      subtests: [],
      addSubtest: false,
      statusTest: null,
      subtest: {
        description: '',
        questions: []
      },
      Integrations: [
        {
          name: 'Интерпретация',
          description: '',
          balls: '1 - 3'
        }
      ]
    }
  },
  methods: {
    uploader (file) {
      console.log(file)
    },
    changeStatusTest (value) {
      this.subtest = {
        description: '',
        questions: []
      }
      this.statusTest = value
    },
    changeTypeQuestion (index, type) {
      this.subtest.questions[index].answers[this.subtest.questions[index].answers.length - 1].type = type
    },
    showAnswerArray (index) {
      return [...this.subtest.questions][index].answers.slice(0, this.subtest.questions[index].answers.length - 1)
    },
    addAnswer (index) {
      this.subtest.questions[index] = {
        ...this.subtest.questions[index],
        answers:
          [
            ...this.subtest.questions[index].answers,
            {
              value: '',
              type: null
            }
          ]
      }
    },
    addQuestion () {
      this.subtest.questions = [
        ...this.subtest.questions,
        {
          name: '',
          answers: [{
            value: '',
            type: null
          }]
        }
      ]
    },
    addSubTest () {
      this.subtests = [...this.subtests, this.subtest]
      this.subtest = {
        description: '',
        questions: []
      }
      this.changeStatusTest(null)
    },
    selectSubTest (subtest, index) {
      this.changeStatusTest('change')
      this.subtest = { ...subtest, id: index }
    },
    editSubTest () {
      this.subtests[this.subtest.id] = this.subtest
    }
  }
}
</script>
