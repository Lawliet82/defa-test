<template>
    <div class="search">
        <input type="text" class="search__input"
            @change="filtered_student"
            v-model="search"
            placeholder="Поиск...">

        <table class="search__results" v-if="search">
            <tr v-for="(item, index) in filtered_student()">
                <td>{{ item.name }}</td>
                <td> {{ item.surname }}</td>
                <td> {{ item.date }}</td>
                <td>{{ item.group }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            search: '',
        }
    },
    methods: {
        filtered_student () {
            return this.get_students.filter( (student) => {
                return student.surname.indexOf(this.search) > -1
            });
        },
    },
    computed: {
        ...mapGetters(['get_students']),
    },
}
</script>