<template>
    <div>
        <div class='flex justify-between items-center q-mb-xl relative-position'>
            <breadcrumbs-menu :breadcrumbs="[
               { name: 'Главная', route: { name: 'allTests' } },
               { name: test.name, route: { name: 'allTests' } },
               { name: test.select_subtest.name, route: { name: 'allTests' } },
          ]"/>
            <AppError class="absolute-right"/>
            <q-no-ssr>
                <!--				<test-timer class="q-mb-md" v-if="isStartTest" :timer-value="selectSubtest.time_for_solution"-->
                <!--							@stop="getSubTest(true)"/>-->
                <test-timer class="q-mb-md" v-if="isStartTest" :timer-value="selectSubtest.time_for_solution"/>
            </q-no-ssr>
        </div>
        <div
            class="loader"
            v-if="showLoaderTest"
        >
            <q-circular-progress
                indeterminate
                rounded
                size="50px"
                color="primary"
                class="q-ma-md"
            />
        </div>
        <div v-else class="test">
            <div v-if="!isStartTest" class="card test__shadow">
                <div class="description description__point q-mb-lg">
                    {{ selectSubtest.description }}
                </div>
                <div class="flex justify-end">
                    <q-btn class="q-px-xl" color="primary" @click="startTest">Начать</q-btn>
                </div>
            </div>
            <div v-else class="row">
                <div class="col-12 col-sm-11">
                    <Splide
                        class=" q-mb-sm"
                        ref="reviews"
                        :options="slideOptions"
                    >
                        <SplideSlide
                            v-for="(question, index) in selectSubtest.question"
                            :key="`question-${question.id}`"
                            class="q-pa-lg q-pb-xl"
                        >
                            <div class="card test__shadow">
                                <div class="text-h2 text-bold text-center q-mb-xl">
                                    {{ question.name }}
                                </div>
                                <div class="test__cover q-mb-md" v-if="question.question_img">
                                    <img :src="question.question_img" alt="">
                                </div>
                                <div class="row">
                                    <div
                                        v-for="ans in question.answer"
                                        :key="`answer-${ans.id+index}`"
                                        :class="['q-mb-sm', ans.answer_img ? 'col-12 col-sm-6  col-lg-4 q-px-sm': 'col-12']"
                                    >
                                        <template v-if="question.type_question">
                                            <q-checkbox
                                                :val="ans.id"
                                                v-model="test.answers[question.id]"
                                                class="full-width"
                                            >
                                                <template v-if="ans.answer_img">
                                                    <div class="row items-center justify-between">
                                                        <div class="col-6 col-sm-5">{{ ans.name || index + 1 }}</div>
                                                        <div class="col-6 col-sm-5 q-cover">
                                                            <img :src="ans.answer_img" alt=""/>
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    {{ ans.name }}
                                                </template>
                                            </q-checkbox>
                                        </template>
                                        <template v-else>
                                            <q-radio
                                                v-model="test.answers[question.id]"
                                                :val="ans.id"
                                                class="full-width"
                                            >
                                                <template v-if="ans.answer_img">
                                                    <div class="row items-center justify-between">
                                                        <div class="col-6 col-sm-5">{{ ans.name || index + 1 }}</div>
                                                        <div class="col-6 col-sm-5 q-cover">
                                                            <img :src="ans.answer_img" alt=""/>
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    {{ ans.name }}
                                                </template>
                                            </q-radio>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </SplideSlide>
                    </Splide>
                    <div class="row justify-between q-px-lg">
                        <q-btn
                            :disable="test.activeSlide < 1"
                            class="q-px-xl q-py-sm"
                            color="primary"
                            outline
                            @click="changeQuestion('prev')"
                        >
                            Назад
                        </q-btn>
						<Splide
							ref="pagination"
							class="test__pagination"
							:options="slidePaginationOptions"
						>
							<SplideSlide
								v-for="(question, index) in selectSubtest.question"
								:key="`pagination_${index}.${question.id}`"
							>
								<div
									:class="['test__pagination--item text-weight-medium', test.activeSlide === index&& 'active']"
								>
									{{ index + 1 }}
								</div>
							</SplideSlide>
						</Splide>
<!--                        <div class="test__pagination">-->
<!--                            <div class="test__pagination-inner">-->
<!--                                <span-->
<!--                                    v-for="(question, index) in selectSubtest.question"-->
<!--                                    :key="`pagination_${index}.${question.id}`"-->
<!--                                    :class="['test__pagination&#45;&#45;item text-weight-medium', test.activeSlide === index&& 'active']"-->
<!--                                >-->
<!--                                {{ index + 1 }}-->
<!--                            </span>-->
<!--                            </div>-->
<!--                        </div>-->
                        <q-btn
                            :disable="disableButton"
                            class="q-px-xl q-py-sm" color="primary" @click="onSubmit()"
                            :loading="showLoaderSending"
                        >
                            Далее
                        </q-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {Splide, SplideSlide} from '@splidejs/vue-splide'
import {app} from 'src/services'
import {helpers} from 'src/utils/helpers'
import BreadcrumbsMenu from 'components/breadcrumb.vue'
import TestTimer from 'components/timer.vue'
import AppError from 'components/app-error.vue'

export default {
    name: 'test-response',
    async preFetch({
                       store,
                       currentRoute,
                       previousRoute,
                       redirect,
                       ssrContext,
                       urlPath,
                       publicPath
                   }) {
        if (!process.env.SERVER) {
            return null
        }
        const test = store.state.test
        if (test?.subtest[test?.active_subtest]?.id) {
            app.getSubTest(test.subtest[test.active_subtest]?.id).then((data) => {
                const answers = {}
                data.question.forEach(question => {
                    answers[question.id] = {
                        id: question.id,
                        answers: []
                    }
                })
                store.dispatch('updateTest', helpers.removeKeys({
                    ...test,
                    answers,
                    select_subtest: data
                }, ['id']))
            }).catch((error) => {
                store.dispatch('showError', error)
            })
        }
    },
    components: {
        AppError,
        TestTimer,
        BreadcrumbsMenu,
        Splide,
        SplideSlide
    },
    data() {
        return {
            test: {},
            showLoaderTest: false,
            showLoaderSending: false,
            isStartTest: false,
            slideOptions: {
                hasTrack: false,
                drag: false,
                // type: 'loop',
                // rewind      : true,
                start: 0,
                // autoHeight  : true,
                perPage: 1,
                // width       : 800,
                gap: '1rem',
                padding: '2',
                pagination: false,
                // direction   : 'ttb',
                // height      : '100%',
                // heightRatio : 0.6,
                // fixedWidth  : 160,

                // fixedHeight : 220,
                cover: true,
                // focus       : 'center',
                // isNavigation: true,
                cloneStatus: false,
                // arrowPath: '0',
                arrows: false
            },
			slidePaginationOptions: {
				hasTrack: false,
				drag: false,
				// type: 'loop',
				// rewind      : true,
				start: 0,
				// autoHeight  : true,
				perPage: 15,
				// width       : 800,
				// gap: '1rem',
				padding: '2',
				pagination: false,
				// direction   : 'ttb',
				// height      : '100%',
				// heightRatio : 0.6,
				// fixedWidth  : 160,
				
				// fixedHeight : 220,
				cover: true,
				// focus       : 'center',
				// isNavigation: true,
				cloneStatus: false,
				// arrowPath: '0',
				arrows: false
			},
        }
    },
    created() {
    },
    computed: {
        selectSubtest() {
            return this.$store.state.test.select_subtest || {}
        },
        disableButton() {
            const question = this.selectSubtest?.question
            if (question && !question[this.test.activeSlide]?.obligatory) {
                return false
            }
            const answers = this.test.answers[this.selectSubtest?.question[this.test.activeSlide].id]
            if (Number(answers)) return Number(answers) && !question
            return question && !answers.length
        }
    },
    watch: {
        '$store.state.test': {
            immediate: true,
            handler(to) {
                this.test = this.$store.state.test || {}
            }
        },
        '$route.name': {
            immediate: true,
            handler(to) {
                if (process.env.CLIENT && to.includes('Response')) this.getSubTest();
            }
        }
    },
    methods: {
        getSubTest(next = false) {
            if (next) this.test.active_subtest++
            this.showLoaderTest = true;
            if (this.test.subtest[this.test.active_subtest]?.id) {
                app.getSubTest(this.test.subtest[this.test.active_subtest]?.id).then((data) => {
                    const answers = {}
                    data.question.forEach(question => {
                        answers[question.id] = []
                    })
                    this.$store.dispatch('updateTest', {
                        ...this.test,
                        answers,
                        select_subtest: data
                    })
                    this.$nextTick(() => {
                        this.isStartTest = this.test.select_subtest.description === ''
                    })
                    this.showLoaderTest = false
                }).catch((error) => {
                    this.showLoaderTest = true
                    this.$store.dispatch('showError', error)
                })
            } else {
                if (this.test.attempt) {
                    this.next();
                } else {
                    this.$router.go(-1);
                }
            }
        },
        startTest() {
            this.isStartTest = true;
        },
        changeQuestion(type, meaning = false) {
            if (meaning) {
                this.test.activeSlide = type
            } else {
                if (type === 'prev') {
                    this.test.activeSlide -= 1
                } else {
                    this.test.activeSlide += 1
                }
            }
			this.$refs.pagination?.go(this.test.activeSlide)
            this.$refs.reviews?.go(this.test.activeSlide)
        },
        onSubmit() {
            const question = this.test.select_subtest.question[this.test.activeSlide]
            const params = {
                test: this.test.test,
                question: question.id,
                answer: this.test.answers[question.id]
            }
            if (this.test.attempt) {
                params.attempt = this.test.attempt;
            }
            this.showLoaderSending = true;
            app.pushAnswer(params).then((data) => {
                this.$store.dispatch('updateTest', {...this.test, attempt: data.id})
                this.test = this.$store.state.test;
            }).catch((err) => {
                this.$store.dispatch('showError', err)
            }).finally(() => {
                this.showLoaderSending = false;
                if (this.test.activeSlide + 1 > this.test.select_subtest.question.length - 1) {
                    if (this.test.subtest.length <= this.test.active_subtest + 1) {
                        this.next();
                    } else {
                        this.test.activeSlide = 0;
                        this.test.active_subtest++;
                        this.$store.dispatch('updateTest', this.test);
                        this.getSubTest();
                    }
                } else {
                    this.changeQuestion('next', false);
                }
            })
        },
        next(name) {
            if (name) {
                this.$router.push({name})
            } else {
                this.$router.push(this.$route.path.replace('response', `finale/${this.test.attempt}`))
            }
        }
    }
}
</script>
