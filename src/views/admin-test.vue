<template>
  <div class="admin q-pb-lg">
    <div class="card card__shadow text-secondary q-pa-md q-mb-lg">
      <div class="text-primary q-mb-sm">Статус: Черновик</div>
      <div class="q-mb-sm">Кол-во вопросов: 100</div>
      <div class="q-mb-sm">Кол-во шкал: 100</div>
      <div class="q-mb-sm">Время: 3 часа</div>
      <div class="q-mb-sm">Авторы: Арнольд Басс, Энн Дарки (1957)
        Адаптация: А. К. Осницкий (1998); А. А. Хван и др. (2005)</div>
      <div class="q-mb-sm">Многофакторный личностный опросник 16PF (Sixteen Personaflity Factor Questionnaire, 16PF) является одним из наиболее распространенных методов оценки индивидуально-психологических особенностей личности. Методику разработал Рэймонд Кеттелл, автор одной из влиятельных теорий личности, согласно которой люди отличаются друг от друга по набору и степени выраженности у них отдельных независимых черт. В процессе экспериментальных исследований Кеттелл выявил 16 биполярных личностных черт (факторов), степень развитости которых можно измерить с помощью опросника.<br/>
        Стандартный опросник 16PF содержит 187 пунктов и разработан в двух параллельных формах A/B, отличающихся только формулировкой вопросов. Опросник предназначен для обследования взрослых (от 16 лет), имеющих образование не ниже 8-9 классов.</div>
    </div>
    <q-tabs
      v-model="tab"
      dense
      class="text-secondary row"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab content-class="full-width text-left" class="col" name="test">Вопросы</q-tab>
      <q-tab class="col" name="scale">Шкалы</q-tab>
      <q-tab class="col" name="connection">Ключ</q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" class="card">
      <q-tab-panel name="test" class="row">
        <div v-for="test in tests" :key="`subtest_${test.id}`" class="q-mb-lg col-4 q-px-md">
          <div class="q-mb-md text-h3 text-weight-medium">{{ test.name }}</div>
          <div v-for="(question, index) in test.question" :key="question.id" class="q-mb-md">
            <p class="text-h4 text-primary q-mb-sm">{{ index + 1 }}. {{ question.name }}</p>
            <ul class="text-secondary q-pl-md">
              <li v-for="(answer, index) in question.answers" :key="answer">{{ index + 1 }}) {{ answer }}</li>
            </ul>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="scale">
        <div>
          <div class="q-mb-md text-h3 text-weight-medium q-px-md">Шкала 1</div>
            <ul class="text-secondary q-pl-md">
              <li class="q-mb-md">
                <span class="text-h4 text-primary text-weight-medium q-pr-md">1 - 3</span>
                  застенчивый, уклончивый, держится в стороне, «тушуется». Обычно испытывает
                чувство собственной недостаточности. Речь замедлена, затруднена, высказывается трудно.
                Избегает профессий, связанных с личными контактами. Предпочитает иметь 1-2 близких
                друзей, не склонен вникать во все, что происходит вокруг него.
              </li>
              <li class="q-mb-md">
                <span class="text-h4 text-primary text-weight-medium q-pr-md">4</span>
                  застенчивый, сдержанный, неуверенный, боязливый, робкий.
              </li>
              <li class="q-mb-md">
                <span class="text-h4 text-primary text-weight-medium q-pr-md">7</span>
                  авантюрный, социально-смелый, незаторможенный, спонтанный.
              </li>
              <li class="q-mb-md">
                <span class="text-h4 text-primary text-weight-medium q-pr-md">8-10</span>
                  бщительный, смелый, испытывает новые вещи; спонтанный и живой в эмо-
циональной сфере. Его «толстокожесть» позволяет ему переносить жалобы и слезы, трудно-
сти в общении с людьми в эмоционально напряженных ситуациях. Может небрежно отно-
ситься к деталям, не реагировать на сигналы об опасности.
              </li>
            </ul>
        </div>
      </q-tab-panel>
      <q-tab-panel name="connection">
        <div class="q-mb-md">
          <div class="q-mb-md text-h3 text-weight-medium q-px-md">Шкала 1</div>
          <ul class="row q-gutter-x-md q-gutter-y-sm">
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">1.1</span> - 2</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">2.1</span> - 2</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">2.1</span> - 2</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">3.1</span> - 2</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">3.1</span> - 2</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">3.1</span> - 2</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2</li>
          </ul>
        </div>
        <div class="q-mb-md">
          <div class="q-mb-md text-h3 text-weight-medium q-px-md">Шкала 2</div>
          <ul class="row q-gutter-x-md q-gutter-y-sm">
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">1.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">2.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">2.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">3.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">3.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">3.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
          </ul>
        </div>
        <div class="q-mb-md">
          <div class="q-mb-md text-h3 text-weight-medium q-px-md">Шкала 3</div>
          <ul class="row q-gutter-x-md q-gutter-y-sm">
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">1.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">2.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">2.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">3.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">3.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">3.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
            <li class="col-auto text-no-wrap"><span class="text-primary text-weight-medium">4.1</span> - 2 балла</li>
          </ul>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>

export default {
  name: 'admin-test',
  data () {
    return {
      tab: 'connection',
      tests: [
        {
          id: 1,
          name: 'Субтест 1',
          question: [
            {
              id: 1,
              name: ' Вы считаете себя умным? 1',
              answers: ['да', 'нет', 'не уверен', ' не уверен']
            },
            {
              id: 2,
              name: ' Вы считаете себя умным? 2',
              answers: ['да', 'нет', 'не уверен', ' не уверен']
            },
            {
              id: 3,
              name: ' Вы считаете себя умным? 3',
              answers: ['да', 'нет', 'не уверен', ' не уверен']
            }
          ]
        },
        {
          id: 2,
          name: 'Субтест 2',
          question: [
            {
              id: 4,
              name: ' Вы считаете себя умным?',
              answers: ['да', 'нет', 'не уверен', ' не уверен']
            }
          ]
        },
        {
          id: 3,
          name: 'Субтест 3',
          question: [
            {
              id: 5,
              name: ' Вы считаете себя умным? 1',
              answers: ['да', 'нет', 'не уверен', ' не уверен']
            },
            {
              id: 6,
              name: ' Вы считаете себя умным? 2',
              answers: ['да', 'нет', 'не уверен', ' не уверен']
            }
          ]
        }
      ]
    }
  },
  methods: {}
}
</script>
