<template>
    <div class='flex justify-between items-center q-mb-xl'>
        <breadcrumbs-menu :breadcrumbs="[
           { name: $route.meta.title, route: { name: $route.name } },
          ]"
        />
        <AppError/>
    </div>
    <div class="tests">
        <div class="description description__point q-mb-lg">
            Быстрая навигация по популярным тестам и тематикам. Всего на сайте более тысячи тестов, найти нужный можно
            при помощи подробного <span class="description__selected">тематического указателя</span>, по каталогу
            <span class="description__selected">авторов</span>, или <span
            class="description__selected">поиском</span> по названию. Можно посмотреть <span
            class="description__selected">полный список</span>.
        </div>
    </div>
    <div
        v-if="showLoaderTests"
        class="loader"
    >
        <q-circular-progress
            indeterminate
            rounded
            size="50px"
            color="primary"
            class="q-ma-md"
        />
    </div>
    <div v-else-if="testsCategory.length > 0" class="row q-pb-lg ">
        <div
            v-for="category in testsCategory"
            :key="`category-${category.id}`"
            class="col-6 col-sm-4 col-lg-3"
        >
            <q-card
                class="card card__border--small q-pb-md q-ma-md"
            >
                <q-card-section class="card__header q-py-sm">
                    <div class="text-white text-ellipsis">{{ category.name }}</div>
                </q-card-section>

                <q-card-actions vertical class="q-pa-none">
                    <router-link
                        v-for="test in category.test"
                        :key="`test-${test.id}`"
                        class="card__item card__link flex no-wrap items-center justify-between"
                        :to="`${this?.$route?.path.replace('/','')}/test/${test.id}`"
                    >
                        <span>{{ test.name }}</span>
                        <q-icon color="primary" name="chevron_right" size="20px"/>
                    </router-link>
                </q-card-actions>
            </q-card>
        </div>
    </div>
    <div v-else class="flex justify-center q-mt-xl text-secondary">
        Список тестов пуст
    </div>
</template>

<script>

import app from 'src/services/app'
import BreadcrumbsMenu from 'components/breadcrumb.vue'
import AppError from 'components/app-error.vue'

export default {
    name: 'all-test',
    async preFetch({store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath}) {
        if (!process.env.SERVER) {
            return null
        }
        console.log(currentRoute.name)
        if (currentRoute.name === 'tests') {
            await app.getCategory().then((res) => {
                store.dispatch('data', {key: 'tests', data: res})
            }).catch((error) => {
                store.dispatch('showError', error)
            })
        }
        if (currentRoute.name === 'authorsTests') {
            await app.getAuthor().then((res) => {
                store.dispatch('data', {key: 'tests', data: res})
            }).catch((error) => {
                store.dispatch('showError', error)
            })
        }
        if (currentRoute.name === 'topicTests') {
            await app.getTopic().then((res) => {
                store.dispatch('data', {key: 'tests', data: res})
            }).catch((error) => {
                store.dispatch('showError', error)
            })
        }
    },
    components: {AppError, BreadcrumbsMenu},
    data() {
        return {
            testFilters: [
                {
                    name: 'Тесты',
                    type: 'test'
                },
                {
                    name: 'Темы',
                    type: 'topics'
                },
                {
                    name: 'Авторы',
                    type: 'authors'
                }
            ],
            testFiltersAds: [
                {
                    name: 'Сложности',
                    type: 'difficulties'
                },
                {
                    name: 'Популярности',
                    type: 'popularity'
                }
            ],
            currentFilter: {type: 'test', sorted: 'difficulties', searchValue: ''},
            showLoaderTests: false
        }
    },
    computed: {
        testsCategory() {
            return this.$store.state.data?.tests || []
        }
    },
    watch: {
        '$route.name': {
            immediate: true,
            handler(to) {
                if (process.env.CLIENT && to === 'tests') this.getCategory()
                if (process.env.CLIENT && to === 'authorsTests') this.getAuthor()
                if (process.env.CLIENT && to === 'topicTests') this.getTopic()
            }
        }
    },
    methods: {
        getCategory() {
            this.showLoaderTests = true
            app.getCategory().then((res) => {
                this.$store.dispatch('data', {key: 'tests', data: res})
                this.showLoaderTests = false
            }).catch((error) => {
                this.$store.dispatch('showError', error)
                this.showLoaderTests = false
            })
        },
        getTopic() {
            this.showLoaderTests = true
            app.getTopic().then((res) => {
                this.$store.dispatch('data', {key: 'tests', data: res})
                this.showLoaderTests = false
            }).catch((error) => {
                this.$store.dispatch('showError', error)
                this.showLoaderTests = false
            })
        },
        getAuthor() {
            this.showLoaderTests = true
            app.getAuthor().then((res) => {
                this.$store.dispatch('data', {key: 'tests', data: res})
                this.showLoaderTests = false
            }).catch((error) => {
                this.$store.dispatch('showError', error)
                this.showLoaderTests = false
            })
        },
        changeCurrentType(type) {
            this.currentFilter = {...this.currentFilter, type}
        },
        changeCurrentSorted(sorted) {
            this.currentFilter = {...this.currentFilter, sorted}
        },
        next(name) {
            this.$router.push({name: name || ''})
        }
    }
}
</script>
