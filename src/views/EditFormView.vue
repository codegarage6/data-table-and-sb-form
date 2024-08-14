<script setup>
import {onMounted, onBeforeMount, ref, computed, watch} from "vue";
import SBForm from "../components/sb-form/SBForm.vue";
import apiService from "../services/apiService";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {SelectField, StringField, TextField} from "../components/sb-form/models";

const route = useRoute()
const router = useRouter()
const store = useStore()
const paramsId = computed(() => route.params.id)
const sbFormRef = ref(null)
const getLanguageList = ref([
  {id: 1, title: 'EN'},
  {id: 2, title: 'FR'},
])
const formData = ref({
  fields: {
    language_id: new SelectField({
      label: 'Language',
      col: '4',
      options: getLanguageList.value,
      value: 1,
      config: {value: 'id', display: 'title'}
    }),
    type: new SelectField({
      label: 'Type',
      col: '4',
      required: true,
      options: [{id: 1, name: 'Packaging'}, {id: 2, name: 'Grocery'}],
      value: 1,
      config: {value: 'id', display: 'name'}
    }),
    name: new StringField({label: 'Name', col: '4', required: true}),
    description: new TextField({label: 'Description', col: '4'})

  },
  title: 'Create Brand',
  url: '/brands',
  method: 'post',
  reset: true,
  fetchUrl: null,
  axios: apiService,
  listRoute: 'listBrand'
})
onBeforeMount(() => {
  if (paramsId.value) {
    formData.value.fetchUrl = `${formData.value.url}/${paramsId.value}`
  }
});
onMounted(() => {
  if (paramsId.value) {
    formData.value.url = `${formData.value.url}/${paramsId.value}`
    formData.value.method = 'put'
    formData.value.reset = true
    formData.value.title = "Update Brand"
    formData.value.language_id = 1
  }
})
const redirect = () => {
  router.push({name: formData.value.listRoute})
}
watch(() => formData.value.fields.language_id.value, (newValue, oldValue) => {
  if (oldValue != undefined && oldValue != newValue) {
    sbFormRef.value?.fetchFromAjax({'accept-language': newValue})
  }
});
</script>

<template>
  <div class="m-sm-3 m-md-5">
    <SBForm ref="sbFormRef" :title="formData.title" :url="formData.url" :method="formData.method"
            :fields="formData.fields"
            :axios="formData.axios" :fetchUrl="formData.fetchUrl" :call-back="redirect">
      <template v-slot:header>
        <div class="row justify-content-between">
          <div class="col">{{ formData.title }}</div>
          <div class="col">

          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="col-12">
          <button type="submit" class="btn btn-primary mt-4 px-5 btn-sm">
            <i class="fa fa-save"></i> <span>{{ formData.method === 'put' ? 'Update' : 'Save' }}</span>
          </button>
        </div>
      </template>
    </SBForm>
  </div>
</template>

<style scoped>

</style>
