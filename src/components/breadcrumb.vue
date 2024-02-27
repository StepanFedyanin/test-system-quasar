<template>
	<q-no-ssr>
		<div class="breadcrumb row">
			<ol>
				<router-link
					v-for="(item, key) in breadcrumbs"
					:key="key"
					v-slot="{ href, navigate }"
					:to="item.route"
					custom
				>
					<a
						v-if="item.name && breadcrumbs[breadcrumbs.length - 1].name !== item.name"
						:href="href"
						class="breadcrumb__item cursor-pointer text-secondary"
						@click="navigate"
					>
						{{ item.name }}
					</a>
				</router-link>
			</ol>
			<h2 class="text-h2 text-primary text-bold">{{ breadcrumbs[breadcrumbs.length - 1]?.name }}</h2>
		</div>
	</q-no-ssr>
</template>

<script>

export default {
	name: 'breadcrumbs-menu',
	props: {
		breadcrumbs: {
			type: Array,
			default () {
				return []
			}
		},
	}
}
</script>
