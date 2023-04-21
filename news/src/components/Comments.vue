
import comment from '@/store/modules/comment';

<template>
    <div>
        <div v-for="com in comments" :key="com.id" >
            <v-col>
                <v-card elevation="10" outlined shaped width="100%" id="comment-card">
                    <div>
                        <v-card-subtitle> {{ com.author.email }} </v-card-subtitle>
                        <v-card-text>{{ com.text }}</v-card-text>
                    </div>
                    <div
                        v-if="com.author.id===getUserId"
                    >
                        <v-btn
                            id="del-btn"
                            class="mx-2"
                            fab
                            dark
                            small
                            color="primary"
                            outlined
                            @click="del(com.id)"
                        >
                            <v-icon dark>
                                mdi-minus
                            </v-icon>
                        </v-btn>
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            outlined
                            color="cyan"
                        >
                            <v-icon dark>
                                mdi-pencil
                            </v-icon>
                        </v-btn>
                    </div>
                </v-card>
            </v-col>
        </div>
    </div>
</template>

<script>

// import Post from '../components/Post.vue';

import { mapActions, mapGetters } from 'vuex';

// import { POSTS_ON_PAGE } from '../../constants';

export default {
  name: 'Comments',
  props: ['comments'],
  computed: mapGetters(['getUserId']),
  methods: {
    ...mapActions(['deleteComment']),
    del(id) {
        this.deleteComment(id)
    }
  }
}

</script>

<style scoped>
    #comment-card  {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    /* #del-btn {
        place-self: center;
    } */
</style>
