<template>
  <v-row>
    <v-dialog
      :fullscreen="false"
      :hide-overlay="true"
      :width="'900px'"
      v-model="dialog"
      style="background-color: white; width: fit-content"
      transition="fab-transition"
    >
      <v-card style="text-align: center">
        <v-card-title>
          {{ state === 'delete' ? 'Löschen' : state === 'edit' ? 'Bearbeiten' : 'Erstellen' }}
        </v-card-title>
        <v-card elevation="0" style="padding: 1em">
          <v-row v-if="(state === 'edit' || state === 'create') && scheme.length !== 0">
            <v-col v-for="(attr, index) in scheme" :key="attr.name">
<!--            <v-col v-for="attr in scheme">-->
              <v-text-field
                dense outlined
                v-model="isEditing[attr.name]"
                hide-details
                :label="attr.label"
              />
            </v-col>
          </v-row>
          <v-row v-else-if="state === 'edit' || state === 'create'">
<!--            <v-col v-for="attr in Object.keys(isEditing)">-->
            <v-col v-for="(attr, index) in Object.keys(isEditing)" :key="attr">
              <v-text-field
                dense outlined
                v-model="isEditing[attr]"
                hide-details
                :label="attr"
              />
            </v-col>
          </v-row>
          <v-row v-else style="width: 100%">
            <v-col cols="12" style="width: 100%">
              Möchten Sie den Standort "{{item.name}}" Objekt wirklich löschen?
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer/>
            <v-btn @click="dialog = false">
              Abbrechen
            </v-btn>
            <v-btn @click="dialog = false">
              <v-icon v-if="state === 'delete'" @click="del(item)">
                mdi-delete
              </v-icon>
              <v-icon v-else @click="state === 'edit' ? edit(isEditing) : create(isEditing)">
                mdi-floppy
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
    <v-col class="ml-0 pl-0 mr-0 pr-0 d-flex justify-end">
      <v-btn-toggle>
        <v-btn @click="clickedEdit()" v-if="edit && item">
          <v-icon color="black" small>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn @click="clickedCreate()" v-if="create && (template || item)">
          <v-icon color="green" small>
            mdi-plus
          </v-icon>
        </v-btn>
        <v-btn @click="clickedDelete()" v-if="del && item">
          <v-icon color="red" small>
            mdi-delete
          </v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>

</template>

<script>
export default {
  name: "awesome-object-action",
  props: {
    edit: Function,
    create: Function,
    del: Function,
    item: Object,
    template: Object,
    // List of Dictionaries with names and descriptions of attribute for the object
    scheme: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      dialog: false,
      state: '',
      isEditing: {},
    }
  },
  methods: {
    clickedEdit() {
      this.state = "edit"
      Object.assign(this.isEditing, this.item)
      this.dialog = true
    },
    clickedCreate() {
      this.state = "create"
      this.$emit('resetSelectedLocation'); // Emit an event to reset selectedLocation
      if (this.template) {
        Object.assign(this.isEditing, this.template)
      } else {
        Object.assign(this.isEditing, this.item)
      }
      this.dialog = true
    },
    clickedDelete() {
      this.state = "delete"
      this.dialog = true
    },
  }
}
</script>




















<!--<template>-->
<!--  <v-row>-->
<!--    <v-dialog-->
<!--      :fullscreen="false"-->
<!--      :hide-overlay="true"-->
<!--      :width="'900px'"-->
<!--      v-model="dialog"-->
<!--      style="background-color: white; width: fit-content"-->
<!--      transition="fab-transition"-->
<!--    >-->
<!--      <v-card style="text-align: center">-->
<!--        <v-card-title>-->
<!--          {{ state === 'delete' ? 'Löschen' : state === 'edit' ? 'Bearbeiten' : 'Erstellen' }}-->
<!--        </v-card-title>-->
<!--        <v-card elevation="0" style="padding: 1em">-->
<!--          <v-row v-if="(state === 'edit' || state === 'create') && scheme.length !== 0">-->
<!--            <v-col v-for="attr in scheme">-->
<!--              <v-text-field-->
<!--                dense outlined-->
<!--                v-model="isEditing[attr.name]"-->
<!--                hide-details-->
<!--                :label="attr.desc"-->
<!--              />-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--          <v-row v-else-if="state === 'edit' || state === 'create'">-->
<!--            <v-col v-for="attr in Object.keys(isEditing)">-->
<!--              <v-text-field-->
<!--                dense outlined-->
<!--                v-model="isEditing[attr]"-->
<!--                hide-details-->
<!--                :label="attr"-->
<!--              />-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--          <v-row v-else style="width: 100%">-->
<!--            <v-col cols="12" style="width: 100%">-->
<!--              Möchten Sie dieses Objekt wirklich löschen?-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--          <v-card-actions>-->
<!--            <v-spacer/>-->
<!--            <v-btn @click="dialog = false">-->
<!--              Abbrechen-->
<!--            </v-btn>-->
<!--            <v-btn @click="dialog = false">-->
<!--              <v-icon v-if="state === 'delete'" @click="del(item)">-->
<!--                mdi-delete-->
<!--              </v-icon>-->
<!--              <v-icon v-else @click="state === 'edit' ? edit(isEditing) : create(isEditing)">-->
<!--                mdi-floppy-->
<!--              </v-icon>-->
<!--            </v-btn>-->
<!--          </v-card-actions>-->
<!--        </v-card>-->
<!--      </v-card>-->
<!--    </v-dialog>-->
<!--    <v-col class="ml-0 pl-0 mr-0 pr-0 d-flex justify-end">-->
<!--      <v-btn-toggle>-->
<!--        <v-btn @click="clickedEdit()" v-if="edit && item">-->
<!--          <v-icon color="black" small>-->
<!--            mdi-pencil-->
<!--          </v-icon>-->
<!--        </v-btn>-->
<!--        <v-btn @click="clickedCreate()" v-if="create && (template || item)">-->
<!--          <v-icon color="green" small>-->
<!--            mdi-plus-->
<!--          </v-icon>-->
<!--        </v-btn>-->
<!--        <v-btn @click="clickedDelete()" v-if="del && item">-->
<!--          <v-icon color="red" small>-->
<!--            mdi-delete-->
<!--          </v-icon>-->
<!--        </v-btn>-->
<!--      </v-btn-toggle>-->
<!--    </v-col>-->
<!--  </v-row>-->

<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "awesome-object-action",-->
<!--  props: {-->
<!--    edit: Function,-->
<!--    create: Function,-->
<!--    del: Function,-->
<!--    item: Object,-->
<!--    template: Object,-->
<!--    // List of Dictionaries with names and descriptions of attribute for the object-->
<!--    scheme: {-->
<!--      type: Array,-->
<!--      default: []-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      dialog: false,-->
<!--      state: '',-->
<!--      isEditing: {},-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    clickedEdit() {-->
<!--      this.state = "edit"-->
<!--      Object.assign(this.isEditing, this.item)-->
<!--      this.dialog = true-->
<!--    },-->
<!--    clickedCreate() {-->
<!--      this.state = "create"-->
<!--      if (this.template) {-->
<!--        Object.assign(this.isEditing, this.template)-->
<!--      } else {-->
<!--        Object.assign(this.isEditing, this.item)-->
<!--      }-->
<!--      this.dialog = true-->
<!--    },-->
<!--    clickedDelete() {-->
<!--      this.state = "delete"-->
<!--      this.dialog = true-->
<!--    },-->
<!--  }-->
<!--}-->
<!--</script>-->
